"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { FlameIcon, AshIcon, LeafIcon, HeatIcon } from "@/components/Icons";

const icons = [FlameIcon, AshIcon, LeafIcon, HeatIcon];

export default function WhyCharcoal() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.why.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.why.title}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.why.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.title} className="rounded-xl border border-line bg-card p-5 text-center">
                <Icon className="mx-auto mb-3 h-9 w-9 text-ember" />
                <h3 className="mb-1 text-sm font-bold">{item.title}</h3>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
