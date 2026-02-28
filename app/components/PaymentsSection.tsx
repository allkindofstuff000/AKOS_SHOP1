"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { payments } from "@/app/lib/payments";
import { useLanguage } from "@/app/lib/useLanguage";

const tickerSymbols = ["$", "\u20AC", "\u00A3", "\u20BF", "RD$", "BHD"];
const floatingSymbols = ["$", "\u20AC", "\u00A3", "\u20BF", "RD$", "BHD"];

export default function PaymentsSection() {
  const { t } = useLanguage();

  return (
    <section className="relative mx-auto mt-6 w-full max-w-6xl px-4 pb-14 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="relative overflow-hidden rounded-2xl bg-[rgba(15,15,22,0.86)] p-6 neon-outline sm:p-8"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(34,211,238,0.08), rgba(168,85,247,0.09), rgba(244,63,94,0.08), rgba(34,211,238,0.08))",
            backgroundSize: "210% 210%",
          }}
        />

        {floatingSymbols.map((symbol, index) => (
          <motion.span
            key={`${symbol}-${index}`}
            aria-hidden
            className="pointer-events-none absolute text-xs font-semibold tracking-wider text-slate-100/15 sm:text-sm"
            style={{
              left: `${12 + index * 14}%`,
              top: `${index % 2 === 0 ? 16 : 68}%`,
            }}
            animate={{ y: [0, -8, 0], opacity: [0.12, 0.24, 0.12] }}
            transition={{
              duration: 4 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.span>
        ))}

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-300/80">
            {t("sections.payments.title")}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-50 sm:text-4xl">
            {t("sections.payments.title")}
          </h2>
          <p className="mt-3 text-sm text-slate-300/80 sm:text-base">
            {t("sections.payments.subtitle")}
          </p>
          <motion.span
            aria-hidden
            className="mt-4 block h-[3px] w-56 rounded-full bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-violet-400"
            animate={{ opacity: [0.75, 1, 0.75], scaleX: [0.88, 1.06, 0.88] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 16px rgba(34, 211, 238, 0.55)" }}
          />

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {payments.map((payment, index) => (
              <motion.article
                key={payment.id}
                initial={{ opacity: 0, y: 26, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                  boxShadow:
                    "0 18px 36px rgba(0,0,0,0.42), 0 0 0 1px rgba(34,211,238,0.26) inset, 0 0 30px rgba(168,85,247,0.24)",
                }}
                animate={{
                  y: [0, -5, 0],
                  boxShadow: [
                    "0 0 0 1px rgba(148,163,184,0.18) inset, 0 0 14px rgba(168,85,247,0.16)",
                    "0 0 0 1px rgba(34,211,238,0.24) inset, 0 0 22px rgba(34,211,238,0.24)",
                    "0 0 0 1px rgba(148,163,184,0.18) inset, 0 0 14px rgba(168,85,247,0.16)",
                  ],
                }}
                className="group relative rounded-2xl border border-slate-300/25 bg-[rgba(12,12,18,0.76)] p-5"
              >
                <div className="flex min-h-[72px] items-center justify-center rounded-xl bg-black/25 p-3">
                  <Image
                    src={payment.logo}
                    alt={`${payment.name} logo`}
                    width={168}
                    height={52}
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <p className="mt-4 text-center text-sm font-semibold tracking-[0.08em] text-slate-50 sm:text-base">
                  {payment.name}
                </p>
                <p
                  className={`mt-1 text-center text-[11px] uppercase tracking-[0.18em] ${
                    payment.available ? "text-emerald-300/90" : "text-fuchsia-300/90"
                  }`}
                >
                  {payment.available
                    ? t("labels.available_yes")
                    : t("labels.available_no")}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-8 overflow-hidden rounded-full border border-slate-300/25 bg-slate-500/10 py-2">
          <motion.div
            className="flex w-max gap-10 px-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200/85"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...tickerSymbols, ...tickerSymbols].map((symbol, index) => (
              <span
                key={`${symbol}-${index}`}
                className="drop-shadow-[0_0_8px_rgba(168,85,247,0.45)]"
              >
                {symbol}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
