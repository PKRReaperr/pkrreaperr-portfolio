import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Grain from "../components/Grain";
import SiteHeader from "../components/SiteHeader";
import Lightbox from "../components/Lightbox";
import { work } from "../data/work";

export default function SubjectPage() {
  const { slug } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filtered = useMemo(() => work.filter((item) => item.subject === slug), [slug]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (selectedImageIndex === null || filtered.length === 0) return;

      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev + 1) % filtered.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImageIndex, filtered.length]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Grain />
      <SiteHeader />

      <Lightbox
        items={filtered}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onPrev={() =>
          setSelectedImageIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
        }
        onNext={() => setSelectedImageIndex((prev) => (prev + 1) % filtered.length)}
      />

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Subject</p>
          <h1 className="text-3xl font-semibold uppercase tracking-[-0.05em] md:text-5xl">
            {slug}
          </h1>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            {filtered.length} images
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, index) => (
            <motion.button
              key={`${item.image}-${index}`}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-left"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[26rem] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
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
          ))}
        </div>
      </main>
    </div>
  );
}