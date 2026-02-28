"use client";

import { useLanguage } from "@/app/lib/useLanguage";
import SiteFrame from "@/components/layout/site-frame";
import ServicesSection from "@/components/sections/services-section";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <SiteFrame>
      <section className="mx-auto mt-8 w-full max-w-6xl px-4 pb-2 pt-10 sm:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-300/80">
          {t("pages.services.badge")}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-50 sm:text-5xl">
          {t("pages.services.title")}
        </h1>
      </section>
      <ServicesSection compactTop />
    </SiteFrame>
  );
}
