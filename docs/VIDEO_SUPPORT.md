# Video Support

The site is a static React/Vite app, so videos should be added as static media files unless a real backend or CMS is introduced later.

## Where To Put Videos

Place production-ready video files in:

```text
public/videos/
```

Files in `public` are served from the site root, so this file:

```text
public/videos/example.mp4
```

is referenced in React as:

```js
"/videos/example.mp4"
```

## Recommended Format

- Use `.mp4` with H.264 video for the widest browser support.
- Keep files compressed for web delivery.
- Add a poster image when possible so the grid has a clean thumbnail before playback.

## Work Item Shape

Photo items can stay as they are:

```js
{
  title: "Late Night Window",
  caption: "friends / night / city",
  year: "2024",
  image: img1
}
```

Video items can be added like this:

```js
{
  type: "video",
  title: "Behind The Frame",
  caption: "video / process / street",
  year: "2026",
  image: img1,
  poster: img1,
  video: "/videos/behind-the-frame.mp4"
}
```

`image` and `poster` can point to the same imported image. `video` should point to the video file in `public/videos`.

## Current Behavior

- Archive, home, hover preview, statement image slot, and lightbox are video-aware.
- Video cards show a small `video` badge.
- Clicking a video opens it in the lightbox with native browser controls.

## Your Own File for an Instagram Post

Instagram's API sometimes leaves out the video file for a post (it happens with collab posts and Reels with licensed music). Those posts show only their cover image and can't play on the site.

To make one play, host the video file yourself:

1. Put the file in `public/videos/`, e.g. `public/videos/i-want-to-create-again.mp4`. Use `.mp4` (H.264), compressed for the web.
2. Add it to `src/videoOverrides.js`, keyed by the post's shortcode from its link (`instagram.com/reel/<shortcode>/`):

```js
export const videoOverrides = {
  DRrIUk4DlwU: { video: "/videos/i-want-to-create-again.mp4" },
};
```

`poster` is optional. Without it, the thumbnail shows a frame from the middle of the video.

Only host videos you have the rights to. Instagram's music licenses don't cover playback on your own site.
