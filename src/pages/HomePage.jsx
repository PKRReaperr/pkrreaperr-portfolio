import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronRight, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Grain from "../components/Grain";
import SiteHeader from "../components/SiteHeader";
import { work } from "../data/work";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.2 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  const featured = work.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-white"
        style={{ scaleX }}
      />

      <Grain />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden px-5 pb-16 pt-24 md:px-8 lg:px-10 lg:pb-24 lg:pt-28">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="hero-font max-w-5xl text-[12vw] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[9vw] lg:text-6xl xl:text-7xl"
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
                  <Link
                    to="/archive"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
                  >
                    Enter archive
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>

                  <a
                    href="https://instagram.com/rayflics"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.06]"
                  >
                    Instagram
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

                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3">
                  <div className="relative overflow-hidden rounded-[1.4rem]">
                    <img
                      src={featured[0].image}
                      alt={featured[0].title}
                      className="h-[26rem] w-full object-cover grayscale-[0.12]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">
                        {featured[0].caption}
                      </p>

                      <div className="mt-2 flex items-end justify-between gap-4">
                        <h2 className="text-2xl font-medium">{featured[0].title}</h2>
                        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                          {featured[0].year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((item, index) => (
              <Link
                key={`${item.image}-${index}`}
                to={`/subject/${item.subject}`}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[24rem] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
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
              </Link>
            ))}
          </div>
        </section>

        <section className="px-5 pb-16 pt-8 md:px-8 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-7 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.06em] md:text-6xl xl:text-7xl">
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