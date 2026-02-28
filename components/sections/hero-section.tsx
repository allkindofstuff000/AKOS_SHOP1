"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import NeonButton from "@/components/ui/neon-button";
import { useLanguage } from "@/app/lib/useLanguage";

const heroVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export default function HeroSection() {
  const { t } = useLanguage();
  const bullets = [
    t("hero.bullet.immediate"),
    t("hero.bullet.support"),
    t("hero.bullet.warranty"),
  ];

  return (
    <section className="mx-auto mt-8 w-full max-w-6xl px-4 pb-14 pt-8 sm:px-8 sm:pt-12">
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="show"
        className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center"
      >
        <div>
          <motion.p
            variants={itemVariants}
            className="inline-flex rounded-full border border-slate-300/25 bg-slate-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200/90"
          >
            {t("hero.badge")}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-extrabold uppercase leading-[0.95] text-slate-50 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)] sm:text-6xl md:text-7xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-300/85 sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.ul variants={itemVariants} className="mt-8 grid gap-3 sm:grid-cols-3">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="neon-outline flex items-center gap-2 rounded-2xl bg-slate-500/10 px-3 py-2 text-sm text-slate-100/90"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                {bullet}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <NeonButton href="/#services">{t("hero.cta.services")}</NeonButton>
            <NeonButton
              href="/contact"
              className="bg-transparent from-transparent to-transparent"
            >
              {t("hero.cta.contact")}
            </NeonButton>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative mx-auto w-full max-w-md">
          <motion.div
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/25 to-violet-500/20 blur-2xl"
            animate={{ rotate: [0, 3, -2, 0], scale: [1, 1.06, 0.98, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="neon-outline relative overflow-hidden rounded-[2rem] bg-[rgba(15,15,22,0.88)] p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
              <Image
                src="/assets/logo.png"
                alt="AKOSSHOP Hero Visual"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
