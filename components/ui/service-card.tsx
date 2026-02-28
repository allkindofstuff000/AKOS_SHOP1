"use client";

import { Service } from "@/app/types/service";
import { useLanguage } from "@/app/lib/useLanguage";
import { CheckCircle2, MessageSquareText } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";
import AvailabilityCounter from "./availability-counter";
import NeonButton from "./neon-button";

interface ServiceCardProps {
  service: Service;
}

const serviceTranslationMap: Record<
  string,
  { title: string; tagline: string; cta: string }
> = {
  "premium-proxies": {
    title: "service.premium.title",
    tagline: "service.premium.tagline",
    cta: "service.premium.cta",
  },
  "sales-accounts": {
    title: "service.sales.title",
    tagline: "service.sales.tagline",
    cta: "service.sales.cta",
  },
  "account-rental": {
    title: "service.rental.title",
    tagline: "service.rental.tagline",
    cta: "service.rental.cta",
  },
  "megaboostv1-bot": {
    title: "service.megaboost.title",
    tagline: "service.megaboost.tagline",
    cta: "service.megaboost.cta",
  },
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useLanguage();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 18, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 18, mass: 0.5 });

  const translationKeys = serviceTranslationMap[service.id];
  const title = translationKeys ? t(translationKeys.title, service.title) : service.title;
  const tagline = translationKeys ? t(translationKeys.tagline, service.tagline) : service.tagline;
  const ctaLabel = translationKeys ? t(translationKeys.cta, service.ctaText) : service.ctaText;

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateYValue = ((x / rect.width - 0.5) * 12).toFixed(2);
    const rotateXValue = ((0.5 - y / rect.height) * 10).toFixed(2);
    rotateY.set(Number(rotateYValue));
    rotateX.set(Number(rotateXValue));
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const imageGallery =
    service.mediaType === "image"
      ? service.mediaGallery && service.mediaGallery.length > 0
        ? service.mediaGallery
        : service.mediaSrc
          ? [service.mediaSrc]
          : []
      : [];

  return (
    <motion.article
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 45px rgba(0,0,0,0.45), 0 0 0 1px rgba(167,139,250,0.35) inset, 0 0 36px rgba(34,211,238,0.2)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex h-full flex-col rounded-2xl bg-[rgba(15,15,22,0.82)] p-6 neon-outline"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300/80">{tagline}</p>
          <h3 className="mt-2 text-xl font-bold tracking-wide text-slate-50">{title}</h3>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-slate-300/90">{service.description}</p>

      {service.highlightInfo ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mt-4 rounded-2xl border border-fuchsia-300/30 bg-gradient-to-r from-fuchsia-500/10 via-cyan-500/10 to-violet-500/10 p-4 shadow-[0_0_24px_rgba(168,85,247,0.25)]"
        >
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-200/90">
            <MessageSquareText className="h-4 w-4" />
            {t("service.sales.info_title")}
          </p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200/90">
            {service.highlightInfo}
          </p>
          <p className="mt-2 text-sm font-semibold text-fuchsia-200">{service.highlightHandle}</p>
          <NeonButton href={service.highlightCtaHref ?? "#"} className="mt-3">
            {t("buttons.text_telegram")}
          </NeonButton>
        </motion.div>
      ) : null}

      {service.detailPoints?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-slate-300/90">
          {service.detailPoints.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {service.extraText ? (
        <p className="mt-4 rounded-xl border border-slate-300/20 bg-slate-400/5 px-3 py-2 text-sm text-slate-200/90">
          {service.extraText}
        </p>
      ) : null}

      {service.logos?.length ? (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {service.logos.map((logo) => (
            <div
              key={logo.id}
              className="group/logo rounded-xl border border-slate-300/20 bg-black/30 p-2 transition-all duration-300 hover:scale-[1.03] hover:border-fuchsia-300/40 hover:shadow-[0_0_18px_rgba(168,85,247,0.3)]"
            >
              <div className="relative mx-auto h-10 w-full max-w-[96px]">
                <Image src={logo.src} alt={logo.name} fill className="object-contain" />
              </div>
              <p className="mt-1 text-center text-[10px] uppercase tracking-[0.12em] text-slate-300/85">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {service.mediaType === "video" ? (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-300/20 bg-black/40">
          <video
            className="h-48 w-full object-cover md:h-56"
            controls
            muted
            playsInline
            loop
            preload="metadata"
          >
            <source src={service.mediaSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null}

      {imageGallery.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {imageGallery.map((imageSrc, index) => (
            <div
              key={`${service.id}-${imageSrc}`}
              className={`relative overflow-hidden rounded-2xl border border-slate-300/20 bg-black/40 ${
                index === 0 ? "h-48 md:h-56" : "h-40"
              }`}
            >
              <Image
                src={imageSrc}
                alt={`${title} preview ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      ) : null}

      <ul className="mt-5 space-y-2.5 text-sm text-slate-200/90">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <p className="text-sm text-slate-300/85">
          {t("labels.price")}: {service.priceText}
        </p>
        <AvailabilityCounter count={service.availableCount} />
        <NeonButton href="/contact" className="mt-4 w-full justify-center">
          {ctaLabel}
        </NeonButton>
      </div>
    </motion.article>
  );
}
