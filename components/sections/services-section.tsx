"use client";

import { services } from "@/app/lib/services";
import { useLanguage } from "@/app/lib/useLanguage";
import Reveal from "@/components/ui/reveal";
import ServiceCard from "@/components/ui/service-card";

interface ServicesSectionProps {
  compactTop?: boolean;
}

export default function ServicesSection({ compactTop = false }: ServicesSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className={`mx-auto w-full max-w-6xl px-4 pb-14 sm:px-8 ${
        compactTop ? "pt-8" : "pt-6"
      }`}
    >
      <Reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-300/80">
          {t("sections.services.title")}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-50 sm:text-4xl">
          {t("sections.services.title")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300/80 sm:text-base">
          {t("sections.services.subtitle")}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={0.08 * (index + 1)}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
