"use client";

import { useLanguage } from "@/app/lib/useLanguage";
import SiteFrame from "@/components/layout/site-frame";
import NeonButton from "@/components/ui/neon-button";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <SiteFrame>
      <section className="mx-auto mt-10 w-full max-w-4xl px-4 pb-14 sm:px-8">
        <div className="rounded-2xl bg-[rgba(15,15,22,0.82)] p-6 neon-outline sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300/80">
            {t("pages.contact.badge")}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-50 sm:text-4xl">
            {t("pages.contact.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300/85 sm:text-base">
            {t("pages.contact.subtitle")}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <NeonButton href="https://wa.me/8801761277837">
              {t("buttons.open_whatsapp")}
            </NeonButton>
            <NeonButton
              href="mailto:proficientmanbd1m@gmail.com"
              className="bg-transparent from-transparent to-transparent"
            >
              {t("buttons.send_email")}
            </NeonButton>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
