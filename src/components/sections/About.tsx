"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.about.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.about.title}</h2>
        <div className="grid items-center gap-7 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-card">
            <img src="/images/team-office.jpg" alt="Team and office" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="mb-4 inline-block rounded-full border border-line bg-coal-soft px-3 py-1 text-xs font-bold text-ember-light">
              {t.about.badge}
            </span>
            <p className="mb-4 text-muted">{t.about.p1}</p>
            <p className="text-muted">{t.about.p2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
