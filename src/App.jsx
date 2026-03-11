import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronRight, Instagram, Mail, Plus } from "lucide-react";

const work = [
  {
    title: "Afterlight",
    type: "Photography",
    year: "2026",
    location: "Chicago",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    blurb: "Street light, grain, and the last usable seconds before dark.",
  },
  {
    title: "Soft Static",
    type: "Art",
    year: "2026",
    location: "Studio",
    image:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1600&q=80",
    blurb: "Abstract forms built from texture, gesture, and interruption.",
  },
  {
    title: "Concrete Weather",
    type: "Photography",
    year: "2025",
    location: "New York",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    blurb: "Architecture, reflection, and the emotional weight of gray days.",
  },
  {
    title: "Red Thread",
    type: "Art",
    year: "2025",
    location: "Studio",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    blurb: "A series about repetition, memory, and accidental symmetry.",
  },
  {
    title: "Nocturne Index",
    type: "Photography",
    year: "2025",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    blurb: "Night fragments assembled into a private visual language.",
  },
  {
    title: "Passing Signals",
    type: "Photography",
    year: "2024",
    location: "London",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    blurb: "Movement, transit, and small moments caught before they disappear.",
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
          key={item.title}
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
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">{item.type}</p>
            <p className="mt-1 text-lg font-medium text-white">{item.title}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SectionLabel({ children }) {
  return <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">{children}</p>;
}

export default function PKRReaperrPortfolio() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedType, setSelectedType] = useState("All");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.2 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);
  const heroClip = useTransform(scrollYProgress, [0, 0.18], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  const filteredWork = useMemo(() => {
    if (selectedType === "All") return work;
    return work.filter((item) => item.type === selectedType);
  }, [selectedType]);

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-white" style={{ scaleX }} />
      <Grain />
      <FloatingPreview item={hovered} mouse={mouse} />

      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10">
          <div className="backdrop-blur-xs rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">pkrreaperr.me</p>
          </div>
          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur md:flex">
            {[
              ["Index", "#index"],
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
        <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 lg:px-10 lg:pb-28 lg:pt-32">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
              <div>
                <SectionLabel>Photography / Art / Archive</SectionLabel>
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  
                  className="hero-font mt-5 max-w-5xl text-[12vw] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[9vw] lg:text-6xl xl:text-7xl"
                >
                  TIME DOESN'T STOP. I'D LIKE TO TRY.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.7 }}
                  className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg"
                >
                  Rayflics is the idea of freezing time to capture what we think
                  really matters.
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
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 backdrop-blur">
                  <div className="relative overflow-hidden rounded-[1.4rem]">
                    <img
                      src={work[0].image}
                      alt={work[0].title}
                      className="h-[26rem] w-full object-cover grayscale-[0.12] transition duration-700 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">Featured series</p>
                      <div className="mt-2 flex items-end justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-medium">{work[0].title}</h2>
                          <p className="mt-1 text-sm text-white/60">{work[0].blurb}</p>
                        </div>
                        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                          {work[0].year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="index" className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <div className="grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[0.6fr_1.4fr]">
            <div>
              <SectionLabel>Index</SectionLabel>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] md:text-4xl">
                Selected visual worlds.
              </h2>
            </div>
            <div className="grid gap-3">
              {work.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06, duration: 0.55 }}
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <a
                    href="#archive"
                    className="group flex items-center justify-between border-b border-white/10 py-5 transition hover:border-white/25"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-xs text-white/35">0{index + 1}</span>
                      <div>
                        <h3 className="text-2xl font-medium tracking-[-0.03em] transition group-hover:translate-x-1 md:text-4xl">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/45">{item.type} / {item.location}</p>
                      </div>
                    </div>
                    <Plus className="h-5 w-5 text-white/45 transition group-hover:rotate-90 group-hover:text-white" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="archive" className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 lg:py-24">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Archive</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">Work, arranged like an editorial spread.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Photography", "Art"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedType(filter)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedType === filter
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-white/[0.03] text-white/65 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
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
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] ${spans[index % spans.length]}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/55">
                      <span>{item.type}</span>
                      <span>{item.year}</span>
                    </div>
                    <h3 className="max-w-xl text-2xl font-medium tracking-[-0.04em] md:text-3xl">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">{item.blurb}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <img
                src={work[4].image}
                alt={work[4].title}
                className="h-full min-h-[28rem] w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-10"
            >
              <div>
                <SectionLabel>Artist statement</SectionLabel>
                <h2 id="statement" className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
                  Images as residue. Art as interference.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
                  This site is designed like a contemporary exhibition page rather than a traditional
                  portfolio. The motion is restrained, the typography is oversized, and the layout
                  gives each series room to feel cinematic. Replace this statement with your own
                  writing, exhibition notes, process, or print availability.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["06", "Selected works"],
                  ["02", "Mediums"],
                  ["∞", "Ongoing archive"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
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
                  href="mailto:hello@pkrreaperr.me"
                  className="group flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 text-white/80 transition hover:border-white/25 hover:text-white"
                >
                  <span className="inline-flex items-center gap-3"><Mail className="h-4 w-4" /> hello@pkrreaperr.me</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="https://instagram.com/yourhandle"
                  className="group flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 text-white/80 transition hover:border-white/25 hover:text-white"
                >
                  <span className="inline-flex items-center gap-3"><Instagram className="h-4 w-4" /> @yourhandle</span>
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
