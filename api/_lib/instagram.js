import { createHash, timingSafeEqual } from "node:crypto";
import { storeGet, storeSet } from "./store.js";

const GRAPH_URL = "https://graph.instagram.com";
const TOKEN_KEY = "instagram:token";
const FEED_KEY = "instagram:last-good-feed";
const MAX_POSTS = 100;
const IMAGE_WIDTH = 1080;
const MEDIA_FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
  "children{media_type,media_url,thumbnail_url}",
].join(",");

const HASHTAG_PATTERN = /#([\p{L}\p{N}_]+)/gu;

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

export function secretsMatch(provided, expected) {
  const a = Buffer.from(provided ?? "");
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

// The refresh cron stores renewed tokens. A stored token is only trusted while it was
// derived from the current INSTAGRAM_ACCESS_TOKEN, so pasting a new token into Vercel
// always takes effect even if an older refreshed one is still stored.
export async function getAccessToken() {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const stored = await storeGet(TOKEN_KEY).catch(() => null);

  if (stored) {
    const record = JSON.parse(stored);
    if (envToken && record.seedHash === hashToken(envToken)) {
      return record.accessToken;
    }
  }

  if (!envToken) throw new Error("INSTAGRAM_ACCESS_TOKEN is not set");
  return envToken;
}

export async function refreshAccessToken() {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!envToken) throw new Error("INSTAGRAM_ACCESS_TOKEN is not set");

  const currentToken = await getAccessToken();
  const url = new URL(`${GRAPH_URL}/refresh_access_token`);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", currentToken);

  const data = await graphRequest(url);
  const expiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();

  await storeSet(
    TOKEN_KEY,
    JSON.stringify({ accessToken: data.access_token, expiresAt, seedHash: hashToken(envToken) })
  );

  return { expiresAt };
}

async function graphRequest(url) {
  const response = await fetch(url);
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.error) {
    // Instagram's error message never includes the token, so it's safe to surface.
    const message = data.error?.message ?? `HTTP ${response.status}`;
    throw new Error(`Instagram API error: ${message}`);
  }

  return data;
}

function listFromEnv(name) {
  return (process.env[name] ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function getShortcode(permalink) {
  return permalink?.match(/instagram\.com\/(?:[^/]+\/)?(?:p|reel|tv)\/([^/?#]+)/i)?.[1]?.toLowerCase() ?? null;
}

// On Vercel, route images through its optimizer: it resizes them, caches them on our own
// domain, and avoids depending on Instagram's expiring CDN links for every view.
function optimizedImage(url) {
  if (!process.env.VERCEL) return url;
  return `/_vercel/image?url=${encodeURIComponent(url)}&w=${IMAGE_WIDTH}&q=80`;
}

function parseCaption(caption, hiddenTags) {
  const text = caption ?? "";
  const tags = [...text.matchAll(HASHTAG_PATTERN)]
    .map((match) => match[1].toLowerCase())
    .filter((tag) => !hiddenTags.includes(tag));

  const firstLine = text
    .split("\n")
    .map((line) => line.replace(HASHTAG_PATTERN, "").trim())
    .find(Boolean);

  const title = firstLine && firstLine.length > 60 ? `${firstLine.slice(0, 57).trimEnd()}...` : firstLine;

  return {
    title: title || "Untitled",
    caption: [...new Set(tags)].slice(0, 3).join(" / ") || "instagram",
  };
}

function toWorkItem(post, hiddenTags) {
  const media = post.media_type === "CAROUSEL_ALBUM" ? post.children?.data?.[0] ?? post : post;
  const isVideo = media.media_type === "VIDEO";
  const previewUrl = isVideo ? media.thumbnail_url : media.media_url;
  if (!previewUrl) return null;

  const { title, caption } = parseCaption(post.caption, hiddenTags);
  const item = {
    id: post.id,
    title,
    caption,
    year: post.timestamp ? String(new Date(post.timestamp).getUTCFullYear()) : "",
    image: optimizedImage(previewUrl),
    permalink: post.permalink,
    timestamp: post.timestamp,
  };

  if (isVideo && media.media_url) {
    item.type = "video";
    item.video = media.media_url;
    item.poster = item.image;
  }

  return item;
}

export async function fetchInstagramWork() {
  const token = await getAccessToken();
  const requiredTag = process.env.INSTAGRAM_HASHTAG?.replace(/^#/, "").trim().toLowerCase() || null;
  const excluded = listFromEnv("INSTAGRAM_EXCLUDE").map((entry) => getShortcode(entry) ?? entry);

  const posts = [];
  let url = new URL(`${GRAPH_URL}/me/media`);
  url.searchParams.set("fields", MEDIA_FIELDS);
  url.searchParams.set("limit", "50");
  url.searchParams.set("access_token", token);

  while (url && posts.length < MAX_POSTS) {
    const page = await graphRequest(url);
    posts.push(...(page.data ?? []));
    url = page.paging?.next ? new URL(page.paging.next) : null;
  }

  return posts
    .filter((post) => !excluded.includes(getShortcode(post.permalink)))
    .filter((post) => {
      if (!requiredTag) return true;
      const tags = [...(post.caption ?? "").matchAll(HASHTAG_PATTERN)].map((match) => match[1].toLowerCase());
      return tags.includes(requiredTag);
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .map((post) => toWorkItem(post, requiredTag ? [requiredTag] : []))
    .filter(Boolean)
    .slice(0, MAX_POSTS);
}

export async function saveLastGoodFeed(items) {
  await storeSet(FEED_KEY, JSON.stringify(items));
}

export async function loadLastGoodFeed() {
  const stored = await storeGet(FEED_KEY);
  return stored ? JSON.parse(stored) : null;
}
