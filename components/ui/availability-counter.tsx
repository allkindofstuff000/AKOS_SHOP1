"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/lib/useLanguage";

interface AvailabilityCounterProps {
  count: number;
}

export default function AvailabilityCounter({ count }: AvailabilityCounterProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(0, count, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplayCount(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [count, inView]);

  return (
    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-300/80">
      {t("labels.available")}:{" "}
      <span
        ref={ref}
        className={`text-base font-semibold tracking-normal ${
          count > 0 ? "text-emerald-300" : "text-fuchsia-300"
        }`}
      >
        {displayCount}
      </span>
    </p>
  );
}
