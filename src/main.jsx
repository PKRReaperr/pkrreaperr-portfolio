import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import Lenis from "@studio-freight/lenis"

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches

if (!prefersReducedMotion && hasFinePointer) {
  const lenis = new Lenis({
    duration: 0.5,
    smoothWheel: true,
    smoothTouch: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
