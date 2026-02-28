"use client";

import { galleryImages } from "@/app/lib/gallery";
import { useLanguage } from "@/app/lib/useLanguage";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GallerySection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs uppercase tracking-[0.22em] text-slate-300/80">
          {t("sections.gallery.title")}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-50 sm:text-4xl">
          {t("sections.gallery.title")}
        </h2>
        <p className="mt-3 text-sm text-slate-300/80 sm:text-base">
          {t("sections.gallery.subtitle")}
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {galleryImages.map((item, index) => (
          <motion.button
            type="button"
            key={item.id}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            whileHover={{
              y: -7,
              boxShadow:
                "0 20px 38px rgba(0,0,0,0.45), 0 0 0 1px rgba(168,85,247,0.35) inset, 0 0 28px rgba(34,211,238,0.2)",
            }}
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-2xl border border-slate-400/20 bg-[rgba(15,15,22,0.8)] p-1.5 text-left neon-outline"
          >
            <div className="relative h-52 overflow-hidden rounded-xl sm:h-56">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            <p className="px-2 pb-1 pt-3 text-sm font-semibold tracking-[0.08em] text-slate-100">
              {item.title}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-300/25 bg-[#0f0f16] p-2 neon-outline"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label={t("buttons.close")}
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/25 bg-black/50 text-slate-100 transition-colors hover:text-cyan-300"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative h-[70vh] min-h-[320px] w-full overflow-hidden rounded-xl">
                <Image
                  src={galleryImages[activeIndex].src}
                  alt={galleryImages[activeIndex].alt}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
