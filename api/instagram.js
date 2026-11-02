import { fetchInstagramWork, json, loadLastGoodFeed, saveLastGoodFeed } from "./_lib/instagram.js";

// Vercel's CDN caches the response, so Instagram is called at most every ~10 minutes
// no matter how many people visit. New posts appear within that window.
const LIVE_CACHE = "public, s-maxage=600, stale-while-revalidate=3600";
const FALLBACK_CACHE = "public, s-maxage=60";

export async function GET() {
  try {
    const items = await fetchInstagramWork();
    await saveLastGoodFeed(items).catch(() => {});
    return json({ items, source: "live" }, 200, { "Cache-Control": LIVE_CACHE });
  } catch (error) {
    console.error(error.message);

    const cached = await loadLastGoodFeed().catch(() => null);
    if (cached?.length) {
      return json({ items: cached, source: "cache" }, 200, { "Cache-Control": FALLBACK_CACHE });
    }

    return json({ error: "Instagram feed unavailable" }, 502, { "Cache-Control": "no-store" });
  }
}
