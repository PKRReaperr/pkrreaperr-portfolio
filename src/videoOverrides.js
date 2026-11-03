// Videos hosted on this site for Instagram posts whose video file the API doesn't provide
// (e.g. collab posts or Reels with licensed music), so they still play in the lightbox.
//
// Key: the post's shortcode, from its link: instagram.com/reel/<shortcode>/
// Values are paths under public/, e.g. public/videos/clip.mp4 -> "/videos/clip.mp4".
// "poster" is optional; without it the thumbnail shows a frame from the middle of the video.
export const videoOverrides = {};

function getShortcode(permalink) {
  return permalink?.match(/instagram\.com\/(?:[^/]+\/)?(?:p|reel|tv)\/([^/?#]+)/i)?.[1] ?? null;
}

export function applyVideoOverrides(items) {
  return items.map((item) => {
    const override = videoOverrides[getShortcode(item.permalink)];
    if (!override) return item;

    return {
      ...item,
      type: "video",
      video: override.video,
      poster: override.poster ?? item.image,
    };
  });
}
