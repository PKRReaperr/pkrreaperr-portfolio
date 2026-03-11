import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Instagram,
  Mail,
  X,
} from "lucide-react";

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

const work = [
  {
    title: "Late Night Window",
    caption: "friends / night / city",
    year: "2024",
    image: img1,
  },
  {
    title: "Parking Lot After Rain",
    caption: "street / stillness",
    year: "2024",
    image: img2,
  },
  {
    title: "Corner Store Light",
    caption: "portrait / ambient",
    year: "2024",
    image: img3,
  },
  {
    title: "Crosswalk Frame",
    caption: "movement / blur / street",
    year: "2024",
    image: img4,
  },
  {
    title: "Backseat Conversation",
    caption: "friends / interior",
    year: "2024",
    image: img5,
  },
  {
    title: "Sidewalk Pause",
    caption: "portrait / city",
    year: "2024",
    image: img6,
  },
  {
    title: "Glass Reflection",
    caption: "street / reflection",
    year: "2024",
    image: img7,
  },
  {
    title: "Stairwell",
    caption: "space / structure",
    year: "2024",
    image: img8,
  },
  {
    title: "Passing Car",
    caption: "motion / urban",
    year: "2024",
    image: img9,
  },
  {
    title: "After Midnight",
    caption: "night / environment",
    year: "2024",
    image: img10,
  },
  {
    title: "Concrete Light",
    caption: "brutal / geometry",
    year: "2024",
    image: img11,
  },
  {
    title: "Portrait in Shadow",
    caption: "portrait / soft light",
    year: "2024",
    image: img12,
  },
];

function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] opacity-[0.06] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"1.15\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"1\"/></svg>')",
      }}
    />
  );
}

function FloatingPreview({ item, mouse }) {
  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          key={item.image}
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.96, rotate: 3 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden h-72 w-56 overflow-hidden rounded-[1.75rem] border border-white/15 bg-black shadow-2xl md:block"
          style={{
            transform: `translate(${mouse.x - 40}px, ${mouse.y - 40}px)`,
          }}
        >
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">{item.caption}</p>
            <p className="mt-1 text-sm font-medium text-white">{item.title}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Lightbox({ items, selectedIndex, onClose, onPrev, onNext }) {
  if (selectedIndex === null) return null;

  const current = items[selectedIndex];

  return (
    <AnimatePresence>
      <motion.div
        key={current.image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[110] rounded-full border border-white/15 bg-white/5 p-3 text-white transition hover:bg-white hover:text-black md:right-6 md:top-6"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white transition hover:bg-white hover:text-black md:left-6"
          aria-label="Previous image"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white transition hover:bg-white hover:text-black md:right-6"
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
          <img
            src={current.image}
            alt={current.title}
            className="max-h-[88vh] w-auto max-w-full rounded-[1.5rem] object-contain shadow-2xl"
          />

          <div className="mt-4 flex items-center justify-between text-sm text-white/60">
            <div>
              <p className="uppercase tracking-[0.2em]">{current.caption}</p>
              <p className="mt-1 text-white">{current.title}</p>
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

function SectionLabel({ children }) {
  return <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">{children}</p>;
}

export default function App() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.2 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  const filteredWork = work;

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (selectedImageIndex === null) return;

      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft") {
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black"
    >
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-white"
        style={{ scaleX }}
      />
      <Grain />
      <FloatingPreview item={hovered} mouse={mouse} />
      <Lightbox
        items={filteredWork}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onPrev={goPrev}
        onNext={goNext}
      />

      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10">
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xs">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">rayflics</p>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur md:flex">
            {[
              ["Archive", "#archive"],
              ["Statement", "#statement"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white hover:text-black"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-16 pt-16 md:px-8 lg:px-10 lg:pb-28 lg:pt-20">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
              <div>
                <SectionLabel>Photography / Archive</SectionLabel>

                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="hero-font mt-5 max-w-5xl text-[12vw] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[9vw] lg:text-6xl xl:text-7xl"
                >
                  TIME DOESN&apos;T STOP. I&apos;D LIKE TO TRY.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.7 }}
                  className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg"
                >
                  I&apos;m Rayyan, 18. rayflics is where I document the people around me and the
                  environments we move through. Most of the work is unplanned—friends, streets,
                  late nights, and whatever happens in front of the lens.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <a
                    href="#archive"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
                  >
                    Enter archive
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.06]"
                  >
                    Contact
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full border border-white/10" />

                <button
                  type="button"
                  onClick={() => openLightboxFromFiltered(work[0].image)}
                  className="block w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 text-left backdrop-blur transition hover:border-white/20"
                >
                  <div className="relative overflow-hidden rounded-[1.4rem]">
                    <img
                      src={work[0].image}
                      alt={work[0].title}
                      className="h-[26rem] w-full object-cover grayscale-[0.12] transition duration-700 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">
                        {work[0].caption}
                      </p>

                      <div className="mt-2 flex items-end justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-medium">{work[0].title}</h2>
                        </div>

                        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                          {work[0].year}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2">
            {work.slice(1, 5).map((item, index) => (
              <motion.button
                key={`${item.image}-${index}`}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => openLightboxFromFiltered(item.image)}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[26rem] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/55">
                    <span>{item.caption}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="archive" className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 lg:py-24">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Archive</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
                Work, arranged like an editorial spread.
              </h2>
            </div>

            <div className="text-sm uppercase tracking-[0.25em] text-white/45">
              {work.length} images
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
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => openLightboxFromFiltered(item.image)}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left ${spans[index % spans.length]}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/55">
                        <span>{item.caption}</span>
                        <span>{item.year}</span>
                      </div>
                      <h3 className="text-lg font-medium tracking-[-0.03em] text-white md:text-xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.button
              type="button"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onClick={() => openLightboxFromFiltered(work[4].image)}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left"
            >
              <img
                src={work[4].image}
                alt={work[4].title}
                className="h-full min-h-[28rem] w-full object-cover"
              />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-10"
            >
              <div>
                <SectionLabel>Artist statement</SectionLabel>
                <h2
                  id="statement"
                  className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.05em] md:text-5xl"
                >
                  TIME NEVER STOPS, I LIKE TO TRY
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
                  I shoot moments that feel immediate, personal, and impossible to hold onto for
                  long. The archive is about movement, people, energy, and the feeling of time
                  slipping forward while I try to catch pieces of it.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["12", "Selected frames"],
                  ["01", "Medium"],
                  ["∞", "Ongoing archive"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5"
                  >
                    <p className="text-3xl font-semibold tracking-[-0.04em]">{value}</p>
                    <p className="mt-2 text-sm text-white/55">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-16 pt-8 md:px-8 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-7 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <SectionLabel>Contact</SectionLabel>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.06em] md:text-6xl xl:text-7xl">
                  Available for commissions, prints, and collaborations.
                </h2>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:pkrreaperr@gmail.com"
                  className="group flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 text-white/80 transition hover:border-white/25 hover:text-white"
                >
                  <span className="inline-flex items-center gap-3">
                    <Mail className="h-4 w-4" />
                    pkrreaperr@gmail.com
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="https://instagram.com/rayflics"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 text-white/80 transition hover:border-white/25 hover:text-white"
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
        </section>
      </main>
    </div>
  );
}