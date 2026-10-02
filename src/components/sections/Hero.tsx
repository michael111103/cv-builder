"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { WhatsAppIcon } from "@/components/Icons";
import { buildWaLink } from "@/lib/constants";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
        {t.hero.eyebrow}
      </span>
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
        {t.hero.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted">{t.hero.subtitle}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a
          href={buildWaLink(t.hero.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-bold text-white"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t.hero.ctaWhatsapp}
        </a>
        <a href="#products" className="rounded-lg border border-line px-6 py-3 font-bold text-ink">
          {t.hero.ctaProducts}
        </a>
      </div>

      <div className="mt-10 aspect-[16/7] overflow-hidden rounded-2xl border border-line bg-card">
        <img
          src="/images/factory-container.jpg"
          alt="Factory and export container"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <span className="rounded-lg border border-line bg-card px-4 py-2 text-xs text-muted">
          {t.hero.badge1}
        </span>
        <span className="rounded-lg border border-line bg-card px-4 py-2 text-xs text-muted">
          {t.hero.badge2}
        </span>
      </div>

      <div className="mx-auto mt-9 grid max-w-xl grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl font-extrabold text-ember-light">18 to 25t</div>
          <div className="text-xs text-muted">{t.hero.stat1}</div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-ember-light">90t</div>
          <div className="text-xs text-muted">{t.hero.stat2}</div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-ember-light">2026</div>
          <div className="text-xs text-muted">{t.hero.stat3}</div>
        </div>
      </div>
    </section>
  );
}
