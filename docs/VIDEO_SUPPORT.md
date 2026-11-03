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
- Video thumbnails show a frame from the middle of the clip, not the first frame.
- Instagram videos without a video file (`embedUrl` instead of `video`) open in Instagram's embedded player in the lightbox.
