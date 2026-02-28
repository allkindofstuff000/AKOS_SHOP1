"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Language, translate } from "@/app/lib/i18n";

const STORAGE_KEY = "akosshop_lang";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const fallbackContext: LanguageContextValue = {
  lang: "es",
  setLang: () => undefined,
  t: (key, fallback) => translate("es", key, fallback),
};

const LanguageContext = createContext<LanguageContextValue>(fallbackContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("es");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") {
        setLang(stored);
      }
    } catch {
      // Ignore storage access errors and keep default language.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage access errors and keep in-memory language.
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key, fallback) => translate(lang, key, fallback),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
