"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Locale, Translations } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("locale") : null;
    if (saved === "en" || saved === "id") setLocaleState(saved);
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    if (typeof window !== "undefined") window.localStorage.setItem("locale", next);
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
