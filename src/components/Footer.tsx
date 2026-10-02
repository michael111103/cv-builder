"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-10 text-center text-sm text-muted">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-2 font-extrabold text-ink">BARA KARBON ENERGI</div>
        <p>{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
