import { createHash, timingSafeEqual } from "node:crypto";
import { storeGet, storeSet } from "./store.js";

// Tokens from "Instagram login" (start with "IG") use the Instagram host. Newer Meta apps only
// offer "Unified login", whose tokens (start with "EAA") must use the Facebook host instead.
const GRAPH_URL = "https://graph.instagram.com";
const FACEBOOK_GRAPH_URL = "https://graph.facebook.com/v24.0";
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

// Pasted tokens often pick up stray whitespace, line breaks, or surrounding quotes.
function readEnvToken() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim().replace(/^["']+|["']+$/g, "").trim();
  return token || undefined;
}

function isFacebookToken(token) {
  return token.startsWith("EAA");
}

// Describes a token's shape for logs without revealing it.
function describeToken(token) {
  const kind = token.startsWith("IG") ? "Instagram-style" : token.startsWith("EAA") ? "Facebook-style" : "unrecognized";
  return `${kind} token, ${token.length} chars`;
}

// The refresh cron stores renewed tokens. A stored token is only trusted while it was
// derived from the current INSTAGRAM_ACCESS_TOKEN, so pasting a new token into Vercel
// always takes effect even if an older refreshed one is still stored.
export async function getAccessToken() {
  const envToken = readEnvToken();
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
  const envToken = readEnvToken();
  if (!envToken) throw new Error("INSTAGRAM_ACCESS_TOKEN is not set");

  const currentToken = await getAccessToken();
  // Unified login tokens are long-lived system-user tokens with no refresh endpoint.
  if (isFacebookToken(currentToken)) {
    return { expiresAt: null, note: "Unified login tokens don't expire; nothing to refresh" };
  }

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
    const token = url.searchParams.get("access_token");
    const hint = data.error?.type === "OAuthException" && token ? ` (${describeToken(token)})` : "";
    throw new Error(`Instagram API error: ${message}${hint}`);
  }

  return data;
}

// Unified login tokens aren't tied to one Instagram account, so the media request needs
// the account's ID: INSTAGRAM_USER_ID if set, otherwise the first account the token can see.
async function getInstagramUserId(token) {
  const configured = process.env.INSTAGRAM_USER_ID?.trim();
  if (configured) return configured;

  const lookups = [
    { path: "/me/assigned_instagram_accounts", fields: "id,username", pick: (data) => data.data?.[0]?.id },
    {
      path: "/me/accounts",
      fields: "instagram_business_account{id,username}",
      pick: (data) => data.data?.find((page) => page.instagram_business_account)?.instagram_business_account.id,
    },
  ];
  const problems = [];

  for (const { path, fields, pick } of lookups) {
    const url = new URL(`${FACEBOOK_GRAPH_URL}${path}`);
    url.searchParams.set("fields", fields);
    url.searchParams.set("access_token", token);

    try {
      const id = pick(await graphRequest(url));
      if (id) {
        console.log(`Using Instagram account ${id} (from ${path}); set INSTAGRAM_USER_ID to skip this lookup`);
        return id;
      }
      problems.push(`${path}: no accounts`);
    } catch (error) {
      problems.push(`${path}: ${error.message}`);
    }
  }

  throw new Error(`Couldn't find the Instagram account for this token; set INSTAGRAM_USER_ID. ${problems.join("; ")}`);
}

async function getMediaUrl(token) {
  if (!isFacebookToken(token)) return new URL(`${GRAPH_URL}/me/media`);
  return new URL(`${FACEBOOK_GRAPH_URL}/${await getInstagramUserId(token)}/media`);
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

// Instagram's official embed player lives at the post's permalink + "embed/".
function getEmbedUrl(permalink) {
  if (!getShortcode(permalink)) return undefined;
  const url = new URL(permalink);
  url.pathname = `${url.pathname.replace(/\/?$/, "/")}embed/`;
  url.search = "";
  return url.toString();
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
    mediaType: media.media_type,
  };

  // Instagram omits media_url for some videos (e.g. Reels with licensed music), since the
  // music license only covers playback inside Instagram. Those play in Instagram's own
  // embedded player instead, and show their cover image as the thumbnail.
  if (isVideo && media.media_url) {
    item.type = "video";
    item.video = media.media_url;
    item.poster = item.image;
  } else if (isVideo) {
    item.embedUrl = getEmbedUrl(post.permalink);
  }

  return item;
}

export async function fetchInstagramWork() {
  const token = await getAccessToken();
  const requiredTag = process.env.INSTAGRAM_HASHTAG?.replace(/^#/, "").trim().toLowerCase() || null;
  const excluded = listFromEnv("INSTAGRAM_EXCLUDE").map((entry) => getShortcode(entry) ?? entry);

  const posts = [];
  let url = await getMediaUrl(token);
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
