import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function Lightbox({ items, selectedIndex, onClose, onPrev, onNext }) {
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