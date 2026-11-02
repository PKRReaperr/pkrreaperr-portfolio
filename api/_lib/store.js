// Minimal Upstash Redis client over its REST API (no SDK needed).
// Vercel's Upstash integration sets KV_REST_API_*; a direct Upstash setup sets UPSTASH_REDIS_REST_*.

function getConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function hasStore() {
  return getConfig() !== null;
}

export async function storeGet(key) {
  const config = getConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${config.token}` },
  });
  if (!response.ok) throw new Error(`Store read failed (${response.status})`);

  const { result } = await response.json();
  return result ?? null;
}

export async function storeSet(key, value) {
  const config = getConfig();
  if (!config) return false;

  const response = await fetch(`${config.url}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}` },
    body: value,
  });
  if (!response.ok) throw new Error(`Store write failed (${response.status})`);

  return true;
}
