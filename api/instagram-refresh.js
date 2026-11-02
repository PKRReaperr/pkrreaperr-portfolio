import { hasStore } from "./_lib/store.js";
import { json, refreshAccessToken, secretsMatch } from "./_lib/instagram.js";

// Called daily by the Vercel cron in vercel.json. Instagram-login tokens last 60 days;
// refreshing extends them, and the new token is saved to the Upstash store.
// Unified login tokens don't expire, so for those this is a no-op.
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return json({ error: "CRON_SECRET is not configured" }, 500);
  }

  // Vercel sends "Authorization: Bearer <CRON_SECRET>" with cron requests.
  if (!secretsMatch(request.headers.get("authorization"), `Bearer ${secret}`)) {
    return json({ error: "Unauthorized" }, 401);
  }

  if (!hasStore()) {
    return json({ error: "No token store configured; add Upstash Redis in Vercel" }, 500);
  }

  try {
    const result = await refreshAccessToken();
    return json({ ok: true, ...result }, 200, { "Cache-Control": "no-store" });
  } catch (error) {
    console.error(error.message);
    return json({ error: error.message }, 502, { "Cache-Control": "no-store" });
  }
}
