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

The site emphasizes mood, typography, transitions, image presentation, and a curated gallery feel. It is not an ecommerce site, not a CMS-driven content system, and not a backend application.

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

The photography dataset is currently hardcoded in `src/App.jsx` as an in-memory `work` array.

Each item includes:

- `title`
- `caption`
- `year`
- `image`

This means:

- there is no CMS
- there is no API request for content
- content updates currently require code edits

## State and Behavior

Current application state is local React state only. There is no external state manager.

Important local state includes:

- current theme
- intro boot completion
- hovered archive item
- selected lightbox image index
- mouse position for hover interactions

Persisted state:

- theme preference is stored in `localStorage` under `rayflics-theme`

## Backend Structure

There is effectively no custom backend.

This project does not currently include:

- a Node/Express server
- serverless API routes
- a database
- authentication
- file uploads
- admin tooling
- order processing
- CMS integration

So if another AI is asked about the "backend", the correct answer is:

- this is a static frontend application
- content is bundled at build time
- there is no application backend to maintain

The only externally connected runtime piece presently in the codebase is:

- Vercel Speed Insights, for analytics/performance metrics collection

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
5. Remember there is no backend, so "backend changes" usually mean either no-op or introducing new infrastructure.
6. Validate with `npm run lint` and `npm run build` after meaningful edits.
7. Be cautious around branch choice: `preview` for experimentation, `main` for accepted/live changes.

## Short Context Summary for Prompting Another AI

If a smaller summary is needed, use this:

`This is a React + Vite photography portfolio for Rayflics. The live app is mostly centralized in src/App.jsx, with global theming in src/index.css and bootstrapping in src/main.jsx. It is a frontend-only static site with no custom backend, no database, and no CMS. The design language is cinematic, premium, editorial, dark-forward, and motion-rich. It uses Framer Motion, Tailwind, Lenis, Lucide icons, and Vercel Speed Insights. Main routes are home, archive, statement, and contact. Another AI should preserve the art-directed look, treat App.jsx as the main source of truth, and validate changes with lint and build.`
