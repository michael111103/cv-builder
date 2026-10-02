"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function OrderFlow() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.order.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.order.title}</h2>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {t.order.steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-ember text-sm font-extrabold text-ember-light">
                {i + 1}
              </div>
              <h4 className="mb-1 text-sm font-bold">{s.title}</h4>
              <p className="text-xs text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
