"use client";

import { useLanguage } from "@/app/lib/useLanguage";
import SiteFrame from "@/components/layout/site-frame";

export default function AdminPage() {
  const { t } = useLanguage();

  return (
    <SiteFrame showFooter={false}>
      <section className="mx-auto mt-16 w-full max-w-3xl px-4 sm:px-8">
        <div className="rounded-2xl bg-[rgba(15,15,22,0.82)] p-8 text-center neon-outline">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300/75">
            {t("pages.admin.badge")}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-50 sm:text-4xl">
            {t("pages.admin.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300/85 sm:text-base">
            {t("pages.admin.subtitle")}
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
