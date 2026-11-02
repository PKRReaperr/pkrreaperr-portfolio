# Instagram Feed Setup

The gallery loads your posts from Instagram through a Vercel serverless function. Once it's set up, a new post shows up on the site within about 10 minutes, and your newest post becomes the featured image on the Home page.

Until it's set up (or if Instagram can't be reached and nothing is cached), the site shows the bundled placeholder photos.

## How it works

```text
Instagram API  →  /api/instagram (Vercel function, cached ~10 min)  →  the site
                        ↑
   daily cron → /api/instagram-refresh  →  renews the token, saves it in Upstash Redis
```

- `api/instagram.js` fetches up to 100 recent posts, newest first, and converts them into the gallery format:
  - Title: the first line of the caption, without hashtags (shortened to 60 characters).
  - Tag line: up to three hashtags, e.g. `street / night / friends`.
  - Year: from the post date.
  - Carousels show their first photo. Reels and videos use the site's video support.
- Vercel's CDN caches the response for 10 minutes, so Instagram is called a few times an hour at most, however many people visit.
- On Vercel, images go through Vercel's image optimizer (`/_vercel/image`). It resizes them to 1080px WebP and serves them from your own domain, because Instagram's own image links expire.
- Every successful fetch is also saved to Upstash. If Instagram is down, the site serves that last good copy.
- `api/instagram-refresh.js` runs daily at 06:00 UTC. Instagram tokens last 60 days, and refreshing resets that clock, so the token never expires as long as the cron keeps running.

The token only ever lives on the server, in Vercel environment variables and Upstash. Never put it in a `VITE_` variable: Vite builds those into the public JavaScript.

## One-time setup

Meta changes its dashboard wording often. If a label doesn't match exactly, look for the closest equivalent.

### 1. Switch Instagram to a Professional account

In the Instagram app: **Settings → Account type and tools → Switch to professional account**, then choose **Creator**. It's free and reversible, and your posts and followers don't change.

### 2. Create a Meta developer app

1. Go to [developers.facebook.com](https://developers.facebook.com/), log in, and register as a developer if asked.
2. **My Apps → Create app**. When asked for a use case, pick the Instagram one ("Manage messaging & content on Instagram" or similar).
3. In the app, open **Instagram → API setup with Instagram login**.

### 3. Generate an access token

1. In **Generate access tokens**, click **Add account** and log in as your Rayflics Instagram account.
2. Click **Generate token** next to the account and copy it. This is a long-lived token (60 days).
3. The only permission needed is `instagram_business_basic`.

You don't need App Review or to make the app "Live". In development mode, the app can read the accounts you added yourself.

### 4. Add Upstash Redis in Vercel

In your Vercel project: **Storage → Create Database → Upstash (Redis) → connect it to this project**. The free plan is plenty. Vercel adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN` variables automatically.

### 5. Set environment variables in Vercel

**Project → Settings → Environment Variables**, for Production (and Preview if you want previews to show live posts too):

| Variable | Value |
| --- | --- |
| `INSTAGRAM_ACCESS_TOKEN` | the token from step 3 |
| `CRON_SECRET` | any long random string (for example, a password manager's generator, 32+ characters) |
| `INSTAGRAM_HASHTAG` | optional: only show posts with this hashtag, e.g. `rayflics` |
| `INSTAGRAM_EXCLUDE` | optional: comma-separated post links or shortcodes to hide |

Then **redeploy** so the new variables take effect.

### 6. Check it

- Visit `https://<your-site>/api/instagram`. You should see JSON with `"source": "live"` and your posts.
- In Vercel, **Settings → Cron Jobs** should list `/api/instagram-refresh`. You can click **Run** to test it, but Instagram only refreshes tokens that are at least 24 hours old, so a brand-new token will fail that first test. The daily run takes care of it.

## Local development

1. Copy `.env.example` to `.env.local` and fill in `INSTAGRAM_ACCESS_TOKEN`. `.env.local` is ignored by git.
2. Run `npm run dev`. A small Vite plugin runs the `api/` functions locally, so the site loads your real posts.

Without a token, local dev uses the placeholder photos.

## Choosing what appears

- **Everything (default):** every post appears, newest first.
- **Only tagged posts:** set `INSTAGRAM_HASHTAG=rayflics` and add `#rayflics` to the posts you want on the site. The tag itself is hidden from the tag line.
- **Hide specific posts:** add their links to `INSTAGRAM_EXCLUDE`, e.g. `https://www.instagram.com/p/ABC123/`.

Changing any of these needs a redeploy, and the cached feed can take up to 10 minutes to update.

## Limits worth knowing

- **New posts take up to ~10 minutes to appear.** Instagram has no "new post" notification for this API, so the site checks on a schedule (the cache length in `api/instagram.js`).
- **Vercel image optimization** has a monthly quota on the free Hobby plan. A portfolio with up to 100 posts fits comfortably, but if you hit the limit, images will fail to optimize. Check **Usage** in Vercel if images break.
- **Videos** play straight from Instagram's servers, because the image optimizer only handles images.
- **If the token is ever lost or expired** (for example, the cron was off for 60+ days), generate a new one (step 3), replace `INSTAGRAM_ACCESS_TOKEN` in Vercel, and redeploy. The site automatically starts using the new token instead of the stored one.
