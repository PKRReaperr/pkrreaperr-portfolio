import { useEffect, useState } from "react";

const FEED_URL = "/api/instagram";
const FEED_TIMEOUT_MS = 8000;

// Loads the gallery from the Instagram feed (newest first). Falls back to the bundled
// placeholder work when the feed is unreachable, so the site never renders empty.
export function useInstagramWork(fallbackItems) {
  const [feed, setFeed] = useState({ items: null, source: "loading" });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);

    fetch(FEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Feed request failed (${response.status})`);
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.items) || data.items.length === 0) {
          throw new Error("Feed returned no posts");
        }
        if (!cancelled) setFeed({ items: data.items, source: data.source ?? "live" });
      })
      .catch(() => {
        if (!cancelled) setFeed({ items: fallbackItems, source: "placeholder" });
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [fallbackItems]);

  return feed;
}
