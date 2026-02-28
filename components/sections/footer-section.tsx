"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/app/lib/useLanguage";
import Reveal from "@/components/ui/reveal";

export default function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative z-10 px-4 pb-10 sm:px-8">
      <Reveal className="mx-auto mt-8 max-w-6xl rounded-2xl bg-[rgba(15,15,22,0.82)] p-6 neon-outline sm:p-8">
        <h3 className="text-2xl font-bold text-slate-50 sm:text-3xl">
          {t("sections.footer.title")}
        </h3>
        <p className="mt-2 max-w-xl text-sm text-slate-300/85 sm:text-base">
          {t("sections.footer.subtitle")}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="https://wa.me/8801761277837"
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-slate-300/25 bg-slate-500/10 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(34,211,238,0.22)]"
          >
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-300/80">
              <MessageCircle className="h-4 w-4" />
              {t("labels.whatsapp")}
            </p>
            <p className="text-lg font-semibold text-slate-50">+8801761277837</p>
          </a>

          <a
            href="mailto:proficientmanbd1m@gmail.com"
            className="group rounded-2xl border border-slate-300/25 bg-slate-500/10 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(168,85,247,0.22)]"
          >
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-300/80">
              <Mail className="h-4 w-4" />
              {t("labels.email")}
            </p>
            <p className="break-all text-lg font-semibold text-slate-50">
              proficientmanbd1m@gmail.com
            </p>
          </a>
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-slate-400/75">
          {t("labels.copyright")}
        </p>
      </Reveal>
    </footer>
  );
}
