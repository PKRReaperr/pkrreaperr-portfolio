import Lenis from "lenis"
import "lenis/dist/lenis.css"

export const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches

// Shared so overlays (boot screen, lightbox) can pause smooth scrolling.
export const lenis =
  !prefersReducedMotion && hasFinePointer
    ? new Lenis({
        duration: 0.5,
        smoothWheel: true,
        syncTouch: false,
      })
    : null

if (lenis) {
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}
