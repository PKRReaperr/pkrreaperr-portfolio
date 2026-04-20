import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Instagram,
  Mail,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import img1 from "./assets/326238254_875997890318220_6284310975885855932_n.jpg";
import img2 from "./assets/620979117_17988771155763036_1148086386839386716_n.webp";
import img3 from "./assets/392788707_287243954108913_8975307292437299975_n.jpg";
import img4 from "./assets/390915082_331968802762081_4842128436742037037_n.jpg";
import img5 from "./assets/392904231_7028236453854753_2106443034315601729_n.jpg";
import img6 from "./assets/391428835_2076813782662109_8551451435011415844_n.jpg";
import img7 from "./assets/405515213_1080955606255859_4492188327945928429_n.jpg";
import img8 from "./assets/405761580_706669138055074_2930975825456933900_n.jpg";
import img9 from "./assets/405498824_892121522615977_2958725416673313541_n.jpg";
import img10 from "./assets/427363632_1589414215150625_7608823201987079377_n.jpg";
import img11 from "./assets/435434831_711772940880320_7139083781688437340_n.jpg";
import img12 from "./assets/649058644_17946815316119720_2722982213037989785_n.jpg";

const THEME_STORAGE_KEY = "rayflics-theme";

const work = [
  { title: "Late Night Window", caption: "friends / night / city", year: "2024", image: img1 },
  { title: "Parking Lot After Rain", caption: "street / stillness", year: "2024", image: img2 },
  { title: "Corner Store Light", caption: "portrait / ambient", year: "2024", image: img3 },
  { title: "Crosswalk Frame", caption: "movement / blur / street", year: "2024", image: img4 },
  { title: "Backseat Conversation", caption: "friends / interior", year: "2024", image: img5 },
  { title: "Sidewalk Pause", caption: "portrait / city", year: "2024", image: img6 },
  { title: "Glass Reflection", caption: "street / reflection", year: "2024", image: img7 },
  { title: "Stairwell", caption: "space / structure", year: "2024", image: img8 },
  { title: "Passing Car", caption: "motion / urban", year: "2024", image: img9 },
  { title: "After Midnight", caption: "night / environment", year: "2024", image: img10 },
  { title: "Concrete Light", caption: "brutal / geometry", year: "2024", image: img11 },
  { title: "Portrait in Shadow", caption: "portrait / soft light", year: "2024", image: img12 },
];

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function Grain({ isLight }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[2] ${
        isLight ? "opacity-[0.04] mix-blend-multiply" : "opacity-[0.06] mix-blend-soft-light"
      }`}
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"1.15\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"1\"/></svg>')",
      }}
    />
  );
}

function BootSequence({ done, setDone, isLight }) {
  const [stage, setStage] = useState(0);
  const stages = [
    "INITIALIZING VISUAL ARCHIVE",
    "LOADING NEGATIVES",
    "CALIBRATING FLASH",
    "SYNCING STREET MEMORY",
    "SYSTEM READY",
  ];

  useEffect(() => {
    if (done) return;

    const timers = [
      setTimeout(() => setStage(1), 350),
      setTimeout(() => setStage(2), 850),
      setTimeout(() => setStage(3), 1400),
      setTimeout(() => setStage(4), 1950),
      setTimeout(() => setDone(true), 2600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [done, setDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className={`fixed inset-0 z-[200] overflow-hidden ${
            isLight ? "bg-[#f4eee3] text-[#17120f]" : "bg-black text-white"
          }`}
        >
          <div
            className={`absolute inset-0 ${
              isLight
                ? "bg-[radial-gradient(circle_at_center,rgba(144,95,51,0.14),transparent_45%)]"
                : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]"
            }`}
          />
          <div
            className={`absolute inset-0 ${
              isLight
                ? "opacity-30 [background-image:linear-gradient(rgba(41,28,18,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(41,28,18,0.08)_1px,transparent_1px)] [background-size:36px_36px]"
                : "opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]"
            }`}
          />
          <div
            className={`absolute inset-0 animate-pulse ${
              isLight
                ? "bg-gradient-to-b from-transparent via-[#fff7ee]/60 to-transparent"
                : "bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"
            }`}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
            <div
              className={`flex items-start justify-between text-[10px] uppercase tracking-[0.35em] ${
                isLight ? "text-black/45" : "text-white/45"
              }`}
            >
              <span>rayflics / boot</span>
              <span>{stage < 4 ? "stand by" : "ready"}</span>
            </div>

            <div className="mx-auto w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-8 flex items-center justify-between border-b pb-4 ${
                  isLight ? "border-black/10" : "border-white/10"
                }`}
              >
                <div>
                  <p
                    className={`text-[11px] uppercase tracking-[0.35em] ${
                      isLight ? "text-black/45" : "text-white/45"
                    }`}
                  >
                    Portfolio OS
                  </p>
                  <h1 className="hero-font mt-3 text-4xl uppercase tracking-[-0.05em] md:text-7xl">
                    RAYFLICS.EXE
                  </h1>
                </div>
                <div
                  className={`hidden text-right text-xs uppercase tracking-[0.25em] md:block ${
                    isLight ? "text-black/35" : "text-white/35"
                  }`}
                >
                  <div>build 01</div>
                  <div>visual bootloader</div>
                </div>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div
                  className={`rounded-[1.5rem] border p-5 ${
                    isLight ? "border-black/10 bg-white/45" : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] ${
                      isLight ? "text-black/45" : "text-white/45"
                    }`}
                  >
                    <span>status</span>
                    <span>{Math.min(100, 18 + stage * 21)}%</span>
                  </div>

                  <div className={`h-2 overflow-hidden rounded-full ${isLight ? "bg-black/10" : "bg-white/10"}`}>
                    <motion.div
                      initial={{ width: "8%" }}
                      animate={{ width: `${Math.min(100, 18 + stage * 21)}%` }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`h-full rounded-full ${isLight ? "bg-[#17120f]" : "bg-white"}`}
                    />
                  </div>

                  <div
                    className={`mt-6 space-y-2 font-mono text-sm ${
                      isLight ? "text-black/70" : "text-white/75"
                    }`}
                  >
                    {stages.slice(0, stage + 1).map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <span className={isLight ? "text-black/35" : "text-white/35"}>&gt;</span>
                        <span>{line}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div
                  className={`rounded-[1.5rem] border p-5 ${
                    isLight ? "border-black/10 bg-white/45" : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className={`mb-4 text-[11px] uppercase tracking-[0.3em] ${isLight ? "text-black/45" : "text-white/45"}`}>
                    diagnostics
                  </div>

                  <div
                    className={`space-y-3 font-mono text-xs uppercase tracking-[0.22em] ${
                      isLight ? "text-black/65" : "text-white/65"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>flash sync</span>
                      <span>{stage >= 2 ? "online" : "pending"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>negative cache</span>
                      <span>{stage >= 1 ? "mounted" : "idle"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>street feed</span>
                      <span>{stage >= 3 ? "locked" : "searching"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>gallery core</span>
                      <span>{stage >= 4 ? "ready" : "loading"}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-8 gap-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.15 }}
                        animate={{ opacity: i < (stage + 1) * 5 ? 1 : 0.15 }}
                        transition={{ duration: 0.2 }}
                        className={`h-2 rounded-full ${isLight ? "bg-[#17120f]" : "bg-white"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex items-end justify-between text-[10px] uppercase tracking-[0.3em] ${
                isLight ? "text-black/35" : "text-white/35"
              }`}
            >
              <span>entering archive...</span>
              <span>pkrreaperr.me</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingPreview({ item, mouse, isLight }) {
  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          key={item.image}
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.96, rotate: 3 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-none fixed left-0 top-0 z-50 hidden h-72 w-56 overflow-hidden rounded-[1.75rem] border shadow-2xl md:block ${
            isLight ? "border-black/10 bg-[#fff9f1]" : "border-white/15 bg-black"
          }`}
          style={{ transform: `translate(${mouse.x - 40}px, ${mouse.y - 40}px)` }}
        >
          <img src={item.image} alt="Photography preview" className="h-full w-full object-cover" />
          <div
            className={`absolute inset-x-0 bottom-0 p-4 ${
              isLight
                ? "bg-gradient-to-t from-[#fff8ee] via-[#fff8ee]/80 to-transparent"
                : "bg-gradient-to-t from-black via-black/60 to-transparent"
            }`}
          >
            <p className={`text-[10px] uppercase tracking-[0.32em] ${isLight ? "text-black/55" : "text-white/60"}`}>
              {item.caption}
            </p>
            <p className={`mt-1 text-lg font-medium ${isLight ? "text-[#17120f]" : "text-white"}`}>
              {item.title}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Lightbox({ items, selectedIndex, onClose, onPrev, onNext, isLight }) {
  const current = items[selectedIndex];
  const [loadedImageSrc, setLoadedImageSrc] = useState(null);

  useEffect(() => {
    if (!current) return undefined;

    let cancelled = false;
    const image = new Image();
    image.src = current.image;

    const markReady = () => {
      if (!cancelled) {
        setLoadedImageSrc(current.image);
      }
    };

    if (image.complete) {
      markReady();
    } else {
      image.onload = markReady;
      image.onerror = markReady;

      if (typeof image.decode === "function") {
        image.decode().then(markReady).catch(() => {});
      }
    }

    return () => {
      cancelled = true;
    };
  }, [current]);

  if (!current) return null;
  const isImageReady = loadedImageSrc === current.image;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 ${
          isLight ? "bg-[#f5eee4]/95" : "bg-black/95"
        }`}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 z-[110] rounded-full border p-3 transition md:right-6 md:top-6 ${
            isLight
              ? "border-black/10 bg-white/70 text-[#17120f] hover:bg-[#17120f] hover:text-[#fff8ef]"
              : "border-white/15 bg-white/5 text-white hover:bg-white hover:text-black"
          }`}
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className={`absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full border p-3 transition md:left-6 ${
            isLight
              ? "border-black/10 bg-white/70 text-[#17120f] hover:bg-[#17120f] hover:text-[#fff8ef]"
              : "border-white/15 bg-white/5 text-white hover:bg-white hover:text-black"
          }`}
          aria-label="Previous image"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className={`absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full border p-3 transition md:right-6 ${
            isLight
              ? "border-black/10 bg-white/70 text-[#17120f] hover:bg-[#17120f] hover:text-[#fff8ef]"
              : "border-white/15 bg-white/5 text-white hover:bg-white hover:text-black"
          }`}
          aria-label="Next image"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-full max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`absolute inset-0 rounded-[1.5rem] transition-opacity duration-200 ${
              isImageReady ? "opacity-0" : "opacity-100"
            } ${isLight ? "bg-[#eadbc8]" : "bg-white/10"}`}
          />
          <img
            src={current.image}
            alt={`Gallery image ${selectedIndex + 1}`}
            className={`max-h-[88vh] w-auto max-w-full rounded-[1.5rem] object-contain shadow-2xl transition-opacity duration-200 ${
              isImageReady ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className={`mt-4 flex items-center justify-between text-sm ${isLight ? "text-black/60" : "text-white/60"}`}>
            <div>
              <div>{current.caption}</div>
              <div className={`mt-1 ${isLight ? "text-[#17120f]" : "text-white"}`}>{current.title}</div>
            </div>
            <span>
              {selectedIndex + 1} / {items.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SectionLabel({ children, isLight }) {
  return (
    <p className={`text-[11px] uppercase tracking-[0.35em] ${isLight ? "text-black/45" : "text-white/45"}`}>
      {children}
    </p>
  );
}

function ThemeToggle({ theme, onToggle, isLight }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={`relative inline-flex h-10 w-[5.2rem] items-center rounded-full border px-1.5 ${
        isLight
          ? "border-black/10 bg-[#fffaf2]/80 text-[#17120f] shadow-[0_10px_35px_rgba(82,58,37,0.12)]"
          : "border-white/10 bg-white/[0.04] text-white"
      }`}
    >
      <span
        className={`absolute left-1.5 top-1.5 h-7 w-7 rounded-full transition-transform duration-500 ${
          isLight ? "translate-x-[2.1rem] bg-[#17120f]" : "translate-x-0 bg-white"
        }`}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1">
        <Sun className={`h-3.5 w-3.5 ${isLight ? "text-[#fff8ef]" : "text-white/55"}`} />
        <Moon className={`h-3.5 w-3.5 ${isLight ? "text-black/45" : "text-[#050505]"}`} />
      </span>
      <span className="sr-only">Current theme: {theme}</span>
    </button>
  );
}

function SiteHeader({ isLight, theme, onToggle, shellClass, navLinkClass }) {
  const location = useLocation();
  const links = [
    ["Home", "/"],
    ["Archive", "/archive"],
    ["Statement", "/statement"],
    ["Contact", "/contact"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10">
        <Link to="/" className={`rounded-full border px-4 py-2 backdrop-blur-xs ${shellClass}`}>
          <p className={`text-[10px] uppercase tracking-[0.35em] ${isLight ? "text-black/55" : "text-white/50"}`}>
            rayflics
          </p>
        </Link>

        <div className="flex items-center gap-3">
          <nav className={`hidden items-center gap-2 rounded-full border p-1.5 backdrop-blur md:flex ${shellClass}`}>
            {links.map(([label, href]) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={label}
                  to={href}
                  className={`${navLinkClass} transition ${isActive ? (isLight ? "bg-[#17120f] text-[#fff8ef]" : "bg-white text-black") : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <ThemeToggle
            theme={theme}
            onToggle={onToggle}
            isLight={isLight}
          />
        </div>
      </div>
    </header>
  );
}

function HomePageView({ isLight, heroY, heroOpacity, shellClass, buttonPrimaryClass, buttonSecondaryClass, onOpenImage }) {
  const featured = work.slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden px-5 pb-16 pt-16 md:px-8 lg:px-10 lg:pb-28 lg:pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <SectionLabel isLight={isLight}>Photography / Archive</SectionLabel>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="hero-font mt-5 max-w-5xl text-[12vw] font-semibold uppercase leading-[0.9] tracking-[-0.05em] sm:text-[9vw] lg:text-6xl xl:text-7xl"
              >
                TIME DOESN&apos;T STOP. I&apos;D LIKE TO TRY.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className={`mt-6 max-w-2xl text-base leading-7 md:text-lg ${isLight ? "text-black/70" : "text-white/70"}`}
              >
                I&apos;m Rayyan, 18. rayflics is where I document the people around me and the
                environments we move through. The archive now opens as dedicated pages so each body of
                work can breathe on its own screen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to="/archive"
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${buttonPrimaryClass}`}
                >
                  Enter archive
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/statement"
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition ${buttonSecondaryClass}`}
                >
                  Artist statement
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              onClick={() => onOpenImage(work[0].image)}
              className={`relative block w-full overflow-hidden rounded-[2rem] border p-3 text-left backdrop-blur transition ${shellClass} ${
                isLight ? "hover:border-black/20" : "hover:border-white/20"
              }`}
            >
              <div className={`absolute -left-8 -top-8 h-24 w-24 rounded-full border ${isLight ? "border-black/10" : "border-white/10"}`} />
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <img
                  src={work[0].image}
                  alt="Featured photograph"
                  className="h-[28rem] w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/70">{work[0].caption}</p>
                  <h2 className="mt-2 text-2xl font-medium">{work[0].title}</h2>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((item, index) => (
            <motion.button
              key={`${item.image}-${index}`}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => onOpenImage(item.image)}
              className={`group relative overflow-hidden rounded-[2rem] border text-left ${shellClass}`}
            >
              <img src={item.image} alt={item.title} className="h-[22rem] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/65">{item.caption}</p>
                <h3 className="mt-2 text-2xl font-medium">{item.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Archive", "/archive", "Browse the full image collection on its own page."],
            ["Statement", "/statement", "Read the project intent without fighting the scroll."],
            ["Contact", "/contact", "Open commissions, prints, and collaboration info directly."],
          ].map(([label, href, copy]) => (
            <Link key={label} to={href} className={`rounded-[1.75rem] border p-6 transition ${shellClass} ${isLight ? "hover:border-black/20" : "hover:border-white/20"}`}>
              <p className={`text-[10px] uppercase tracking-[0.32em] ${isLight ? "text-black/45" : "text-white/45"}`}>{label}</p>
              <p className="mt-3 text-xl font-medium">{label}</p>
              <p className={`mt-3 text-sm leading-7 ${isLight ? "text-black/65" : "text-white/65"}`}>{copy}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function ArchivePageView({ filteredWork, isLight, shellClass, textMutedClass, onOpenImage, onHoverItem, onLeaveHover }) {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-8 lg:px-10">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel isLight={isLight}>Archive</SectionLabel>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
            Work, arranged like an editorial spread.
          </h1>
        </div>

        <div className={`rounded-full border px-4 py-2 text-sm ${shellClass} ${textMutedClass}`}>
          {filteredWork.length} images
        </div>
      </div>

      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        {filteredWork.map((item, index) => {
          const spans = [
            "xl:col-span-7 xl:row-span-2",
            "xl:col-span-5 xl:row-span-1",
            "xl:col-span-5 xl:row-span-2",
            "xl:col-span-7 xl:row-span-1",
            "xl:col-span-4 xl:row-span-1",
            "xl:col-span-8 xl:row-span-2",
          ];

          return (
            <motion.button
              type="button"
              key={`${item.image}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              onMouseEnter={() => onHoverItem(item)}
              onMouseLeave={onLeaveHover}
              onClick={() => onOpenImage(item.image)}
              className={`group relative overflow-hidden rounded-[2rem] border text-left ${shellClass} ${spans[index % spans.length]}`}
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/65">
                  <span>{item.caption}</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="max-w-xl text-2xl font-medium tracking-[-0.04em] md:text-3xl">{item.title}</h3>
              </div>
            </motion.button>
          );
        })}
      </div>
    </main>
  );
}

function StatementPageView({ isLight, shellClass, shellMutedClass, statCardClass, onOpenImage }) {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-8 lg:px-10">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onOpenImage(work[4].image)}
          className={`overflow-hidden rounded-[2rem] border text-left ${shellClass}`}
        >
          <img src={work[4].image} alt={work[4].title} className="h-full min-h-[32rem] w-full object-cover" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex flex-col justify-between rounded-[2rem] border p-7 md:p-10 ${shellMutedClass}`}
        >
          <div>
            <SectionLabel isLight={isLight}>Artist statement</SectionLabel>
            <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
              TIME NEVER STOPS, I LIKE TO TRY
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${isLight ? "text-black/70" : "text-white/70"}`}>
              I shoot moments that feel immediate, personal, and impossible to hold onto for long.
              The archive is about movement, people, energy, and the feeling of time slipping
              forward while I try to catch pieces of it.
            </p>
            <p className={`mt-4 max-w-2xl text-base leading-8 ${isLight ? "text-black/70" : "text-white/70"}`}>
              Splitting the work into pages makes each section feel closer to a chapter than a block
              on a landing page. This one is the pause between images, where the intent gets the full frame.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["12", "Selected frames"],
              ["01", "Medium"],
              ["Infinity", "Ongoing archive"],
            ].map(([value, label]) => (
              <div key={label} className={`rounded-[1.5rem] border p-5 ${statCardClass}`}>
                <p className="text-3xl font-semibold tracking-[-0.04em]">{value}</p>
                <p className={`mt-2 text-sm ${isLight ? "text-black/55" : "text-white/55"}`}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function ContactPageView({ isLight, shellMutedClass, contactCardClass }) {
  return (
    <main className="px-5 pb-16 pt-28 md:px-8 lg:px-10 lg:pb-24">
      <div className={`mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border p-7 md:p-10 lg:p-12 ${shellMutedClass}`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <SectionLabel isLight={isLight}>Contact</SectionLabel>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.06em] md:text-6xl xl:text-7xl">
              Available for commissions, prints, and collaborations.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${isLight ? "text-black/70" : "text-white/70"}`}>
              If you want a portrait session, editorial coverage, print inquiry, or a collaboration,
              this page keeps the conversation front and center without making you scroll back through the gallery.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:pkrreaperr@gmail.com"
              className={`group flex items-center justify-between rounded-[1.5rem] border px-5 py-4 transition ${contactCardClass}`}
            >
              <span className="inline-flex items-center gap-3">
                <Mail className="h-4 w-4" />
                pkrreaperr@gmail.com
              </span>
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a
              href="https://instagram.com/rayflics"
              className={`group flex items-center justify-between rounded-[1.5rem] border px-5 py-4 transition ${contactCardClass}`}
            >
              <span className="inline-flex items-center gap-3">
                <Instagram className="h-4 w-4" />
                @rayflics
              </span>
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [bootDone, setBootDone] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.2 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  const filteredWork = useMemo(() => work, []);
  const isLight = theme === "light";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointerQuery.matches) return undefined;

    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev === null ? 0 : (prev - 1 + filteredWork.length) % filteredWork.length
        );
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev === null ? 0 : (prev + 1) % filteredWork.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImageIndex, filteredWork.length]);

  useEffect(() => {
    if (!bootDone) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [bootDone]);

  useEffect(() => {
    work.forEach((item) => {
      const image = new Image();
      image.src = item.image;

      if (typeof image.decode === "function") {
        image.decode().catch(() => {});
      }
    });
  }, []);

  const openLightboxFromFiltered = (image) => {
    const index = filteredWork.findIndex((item) => item.image === image);
    if (index !== -1) setSelectedImageIndex(index);
  };

  const goPrev = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? 0 : (prev - 1 + filteredWork.length) % filteredWork.length
    );
  };

  const goNext = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? 0 : (prev + 1) % filteredWork.length
    );
  };

  const pageClass = isLight
    ? "min-h-screen bg-[#f4eee3] text-[#17120f] selection:bg-[#17120f] selection:text-[#fff8ef]"
    : "min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black";
  const accentBarClass = isLight ? "bg-[#17120f]" : "bg-white";
  const shellClass = isLight
    ? "border-black/10 bg-[#fffaf2]/80 shadow-[0_12px_35px_rgba(82,58,37,0.1)]"
    : "border-white/10 bg-white/[0.03]";
  const shellMutedClass = isLight
    ? "border-black/10 bg-[#fffaf2]/75 shadow-[0_12px_35px_rgba(82,58,37,0.08)]"
    : "border-white/10 bg-white/[0.04]";
  const textMutedClass = isLight ? "text-black/60" : "text-white/60";
  const buttonPrimaryClass = isLight
    ? "bg-[#17120f] text-[#fff8ef] hover:scale-[1.02]"
    : "bg-white text-black hover:scale-[1.02]";
  const buttonSecondaryClass = isLight
    ? "border-black/15 bg-white/60 text-[#17120f] hover:border-black/25 hover:bg-[#fffaf2]"
    : "border-white/15 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.06]";
  const statCardClass = isLight ? "border-black/10 bg-[#efe2d0]/70" : "border-white/10 bg-black/30";
  const contactCardClass = isLight
    ? "border-black/10 bg-[#fffaf2]/82 text-black/80 hover:border-black/25 hover:text-[#17120f]"
    : "border-white/10 bg-black/30 text-white/80 hover:border-white/25 hover:text-white";
  const navLinkClass = isLight
    ? "rounded-full px-4 py-2 text-sm text-black/70 hover:bg-[#17120f] hover:text-[#fff8ef]"
    : "rounded-full px-4 py-2 text-sm text-white/70 hover:bg-white hover:text-black";

  return (
    <div ref={containerRef} className={`theme-transition ${pageClass}`}>
      <BootSequence done={bootDone} setDone={setBootDone} isLight={isLight} />
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(214,172,129,0.28),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(162,122,82,0.14),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_20%)]"
        }`}
      />
      <motion.div className={`fixed inset-x-0 top-0 z-[60] h-px origin-left ${accentBarClass}`} style={{ scaleX }} />
      <Grain isLight={isLight} />
      <FloatingPreview item={hovered} mouse={mouse} isLight={isLight} />
      <Lightbox
        items={filteredWork}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onPrev={goPrev}
        onNext={goNext}
        isLight={isLight}
      />

      <SiteHeader
        isLight={isLight}
        theme={theme}
        onToggle={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
        shellClass={shellClass}
        navLinkClass={navLinkClass}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePageView
              isLight={isLight}
              heroY={heroY}
              heroOpacity={heroOpacity}
              shellClass={shellClass}
              buttonPrimaryClass={buttonPrimaryClass}
              buttonSecondaryClass={buttonSecondaryClass}
              onOpenImage={openLightboxFromFiltered}
            />
          }
        />
        <Route
          path="/archive"
          element={
            <ArchivePageView
              filteredWork={filteredWork}
              isLight={isLight}
              shellClass={shellClass}
              textMutedClass={textMutedClass}
              onOpenImage={openLightboxFromFiltered}
              onHoverItem={setHovered}
              onLeaveHover={() => setHovered(null)}
            />
          }
        />
        <Route
          path="/statement"
          element={
            <StatementPageView
              isLight={isLight}
              shellClass={shellClass}
              shellMutedClass={shellMutedClass}
              statCardClass={statCardClass}
              onOpenImage={openLightboxFromFiltered}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <ContactPageView
              isLight={isLight}
              shellMutedClass={shellMutedClass}
              contactCardClass={contactCardClass}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
