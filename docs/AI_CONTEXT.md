# Rayflics Website Context

This document is intended to give another AI model enough context to work effectively on this project without having to rediscover the architecture, design goals, and operational constraints from scratch.

## Project Identity

- Project name: `pkrreaperr-portfolio`
- Brand / subject: `Rayflics`, a photography portfolio for Rayyan
- Site type: frontend-only portfolio / gallery website
- Core purpose: showcase photography work in a premium, editorial, cinematic way rather than as a generic template portfolio

## High-Level Product Summary

The website is a highly art-directed React single-page application with route-based page views for:

- Home
- Archive
- Statement
- Contact

The site emphasizes mood, typography, transitions, image presentation, and a curated gallery feel. It is not an ecommerce site; its content comes from the Rayflics Instagram account.

## Design Ideology

The design language is intentionally dramatic and polished. The site should feel:

- cinematic
- minimal but not sterile
- premium
- editorial
- atmospheric
- slightly experimental

The visual identity leans on:

- large type and strong headline composition
- dark theme by default, with a warm light mode alternative
- grain, glow, and soft layered backgrounds
- rounded cards and glassy / blurred shells
- motion that feels deliberate and stylish rather than noisy
- photography as the main product, with UI serving the images rather than competing with them

The interface should not drift toward:

- generic startup landing page patterns
- purple-heavy AI defaults
- template-style portfolio sections
- cluttered controls or obvious SaaS conventions

## User Experience Goals

The intended user experience is:

- immediate visual impact on landing
- smooth browsing through photography work
- lightbox viewing for larger images
- clear navigation between chapters of the site
- responsive behavior across desktop and mobile

Important UX behaviors already present:

- boot / intro loading sequence
- theme toggle with persisted preference
- smooth scrolling on fine-pointer devices via Lenis
- hover preview behavior in the archive
- lightbox with keyboard navigation
- route-based pages instead of a single long scroll

## Current Architecture

## Frontend Stack

- React 19
- React Router DOM
- Vite
- Framer Motion
- Tailwind CSS
- Lucide React icons
- Lenis for smooth scrolling
- Vercel Speed Insights for production performance analytics

## Runtime Model

This is a purely client-side React app.

- Entry point: [src/main.jsx](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/main.jsx>)
- Main application and most UI logic: [src/App.jsx](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/App.jsx>)
- Global styling: [src/index.css](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/index.css>)
- Build tooling: [vite.config.js](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/vite.config.js>)
- Package manifest: [package.json](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/package.json>)

## Important Architectural Reality

The live implementation is centralized in [src/App.jsx](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/App.jsx>). The old unused `src/components/`, `src/pages/`, `src/data/` folders and the starter `src/App.css` have been removed.

Smooth scrolling lives in `src/lenis.js`, which exports the shared Lenis instance so overlays (boot screen, lightbox) can pause it.

[vercel.json](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/vercel.json>) rewrites every route to `index.html` (so deep links work) and sets security headers, including a Content-Security-Policy. Any new external script, font, or media host must be added to that CSP or it will be blocked in production.

## Route Structure

The app uses `BrowserRouter` and route-based page rendering:

- `/` -> Home
- `/archive` -> Archive
- `/statement` -> Statement
- `/contact` -> Contact

Unknown routes redirect back to `/`.

## Data Model

The gallery is synced from Instagram. `src/useInstagramWork.js` fetches `/api/instagram` (newest post first) and the newest post becomes the Home page hero. If the feed can't be reached, the app falls back to the bundled `placeholderWork` array in `src/App.jsx`. Setup and behavior: [docs/INSTAGRAM_SETUP.md](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/docs/INSTAGRAM_SETUP.md>).

Each item includes:

- `title`
- `caption` (a short tag line like `street / night`)
- `year`
- `image`
- optionally `id`, `permalink`, `timestamp` (Instagram posts) and `type: "video"`, `video`, `poster`

Content updates happen by posting on Instagram; no code edits are needed.

## State and Behavior

Current application state is local React state only. There is no external state manager.

Important local state includes:

- current theme
- intro boot completion
- hovered archive item
- selected lightbox image index
- the loaded Instagram feed

Persisted state:

- theme preference is stored in `localStorage` under `rayflics-theme`

## Backend Structure

The frontend is static, with a small serverless backend on Vercel:

- `api/instagram.js` fetches posts from the Instagram API (CDN-cached ~10 minutes)
- `api/instagram-refresh.js` is a daily Vercel cron that renews Instagram-login (`IG...`) tokens and does nothing for Unified login (`EAA...`) tokens, which never expire; it requires `CRON_SECRET`
- `api/_lib/instagram.js` reads posts from `graph.instagram.com` for `IG` tokens, or from `graph.facebook.com/{INSTAGRAM_USER_ID}/media` for `EAA` tokens (the account ID is discovered automatically if not set)
- `api/_lib/` holds shared helpers (files starting with `_` are not deployed as endpoints)
- Upstash Redis (via Vercel) stores the refreshed token and a last-good copy of the feed
- `vite.config.js` includes a small plugin that runs `api/` functions during `npm run dev`

Secrets (`INSTAGRAM_ACCESS_TOKEN`, `CRON_SECRET`, Upstash keys) live only in Vercel environment variables or `.env.local`. Never expose them through `VITE_` variables.

There is still no database of our own, no authentication, no uploads, and no admin tooling.

Other external runtime pieces: Vercel Speed Insights and Vercel Web Analytics.

## Styling System

The site mixes:

- Tailwind utility classes inline in JSX
- custom CSS in `src/index.css`

Global style decisions include:

- dark and light theme CSS variables
- page-level background and foreground variables
- subtle flicker overlay
- grain overlay
- theme transitions across color, border, fill, stroke, and shadow

There is no separate design token file. Theme tokens are effectively defined inside `:root` and `:root[data-theme="light"]` in `src/index.css`.

## Motion System

Motion is a major part of the identity.

Key motion patterns:

- boot loader animation
- hero and section entrance animations
- lightbox transitions
- hover preview behavior
- theme toggle motion
- hover scaling on images/cards

Motion should remain:

- smooth
- intentional
- premium
- not overdone

If adding new animations, preserve the current tone. Avoid making the site feel gimmicky or game-like unless the specific request clearly calls for it.

## Accessibility and Responsiveness

The project already contains some thoughtful responsive decisions:

- Lenis smooth scrolling is disabled on coarse-pointer / touch contexts
- reduced-motion preference is respected in CSS and smooth scrolling setup
- mobile avoids some heavier overlay animation behavior

Still, this is a visually ambitious site, so future changes should be checked carefully on:

- desktop
- laptop trackpads
- phones
- touch devices

## Deployment and Operations

Deployment model:

- local development with Vite
- Git-managed repository
- `main` branch is the live/stable branch
- `preview` branch exists for prerelease testing

Build scripts from `package.json`:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Production analytics:

- Vercel Speed Insights is mounted in [src/main.jsx](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/main.jsx>)

## Git / Branching Context

Current branch strategy:

- `main`: stable/live branch
- `preview`: prerelease/testing branch

Practical intent:

- changes can be tested on `preview`
- only promoted to `main` once they are accepted

If another AI is asked to make risky UI changes, it should prefer doing that work on `preview` first unless the user explicitly requests `main`.

## Files That Matter Most

For most active tasks, start with these:

- [src/App.jsx](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/App.jsx>) - main UI composition, routes, page views, interactions
- [src/main.jsx](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/main.jsx>) - app bootstrapping, router, Lenis, Speed Insights
- [src/index.css](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/src/index.css>) - theme variables, overlays, global transitions, motion fallbacks
- [package.json](</C:/Users/rayya/Desktop/apps/extra files/pkrreaperr-portfolio/pkrreaperr-landing-page/package.json>) - dependency and script truth

## Known Structural Quirks

- The app is larger and more monolithic than ideal because much of the implementation lives in `src/App.jsx`.

An AI making future improvements may want to gradually refactor the monolith into:

- reusable components
- route page modules
- a dedicated data layer

but should do so carefully to avoid breaking the visual design.

## How Another AI Should Approach Changes

When working on this project, another AI should:

1. Treat `src/App.jsx` as the current behavioral source of truth unless evidence shows otherwise.
2. Preserve the cinematic/editorial design language.
3. Prefer incremental changes over broad rewrites.
4. Keep motion tasteful and performant.
5. Remember the only backend is the Instagram feed in `api/`; anything else server-side means introducing new infrastructure.
6. Validate with `npm run lint` and `npm run build` after meaningful edits.
7. Be cautious around branch choice: `preview` for experimentation, `main` for accepted/live changes.

## Short Context Summary for Prompting Another AI

If a smaller summary is needed, use this:

`This is a React + Vite photography portfolio for Rayflics. The live app is mostly centralized in src/App.jsx, with global theming in src/index.css and bootstrapping in src/main.jsx. It is a static site whose gallery is synced from Instagram through a small Vercel serverless function (api/instagram.js) with a daily token-refresh cron. The design language is cinematic, premium, editorial, dark-forward, and motion-rich. It uses Framer Motion, Tailwind, Lenis, Lucide icons, and Vercel Speed Insights. Main routes are home, archive, statement, and contact. Another AI should preserve the art-directed look, treat App.jsx as the main source of truth, and validate changes with lint and build.`
