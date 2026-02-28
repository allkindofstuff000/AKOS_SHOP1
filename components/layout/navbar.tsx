"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/lib/useLanguage";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const navItems = [
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-nav mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:px-5"
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-300/25">
            <Image
              src="/assets/logo.png"
              alt="AKOSSHOP logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-sm font-bold tracking-[0.24em] text-slate-100 sm:text-base">
            AKOSSHOP
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-200/85 transition-colors hover:text-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="inline-flex items-center rounded-full border border-slate-300/25 bg-slate-500/10 p-1">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.12em] transition-all ${
                lang === "es"
                  ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]"
                  : "text-slate-300 hover:text-cyan-300"
              }`}
            >
              {t("lang.es")}
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.12em] transition-all ${
                lang === "en"
                  ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-[0_0_16px_rgba(34,211,238,0.4)]"
                  : "text-slate-300 hover:text-cyan-300"
              }`}
            >
              {t("lang.en")}
            </button>
          </div>
        </div>

      </motion.nav>

      <div className="mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto pb-1 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-slate-300/25 bg-slate-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-slate-200/85"
          >
            {item.label}
          </Link>
        ))}

        <div className="ml-auto inline-flex items-center rounded-full border border-slate-300/25 bg-slate-500/10 p-1">
          <button
            type="button"
            onClick={() => setLang("es")}
            className={`rounded-full px-2 py-1 text-xs font-semibold tracking-[0.12em] transition-all ${
              lang === "es"
                ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white"
                : "text-slate-300"
            }`}
          >
            {t("lang.es")}
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-full px-2 py-1 text-xs font-semibold tracking-[0.12em] transition-all ${
              lang === "en"
                ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white"
                : "text-slate-300"
            }`}
          >
            {t("lang.en")}
          </button>
        </div>
      </div>
    </header>
  );
}
