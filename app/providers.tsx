"use client";

import { LanguageProvider } from "@/app/lib/useLanguage";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
