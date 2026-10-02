"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-10 text-center text-sm text-muted">
      <div className="mx-auto max-w-6xl px-6">
        <span className="relative mx-auto mb-2 block h-16 w-16 overflow-hidden">
          <img
            src="/images/logo.png"
            alt="Java Charcoal logo"
            className="h-full w-full scale-150 object-contain"
          />
        </span>
        <div className="mb-2 font-extrabold text-ink">JAVA CHARCOAL</div>
        <p>{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
