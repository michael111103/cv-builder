"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { CoconutIcon, PressIcon, BoxIcon, ShipIcon } from "@/components/Icons";

const icons = [CoconutIcon, PressIcon, BoxIcon, ShipIcon];

export default function ProductionProcess() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.production.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.production.title}</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {t.production.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <div key={s.title} className="text-center">
                <Icon className="mx-auto mb-3 h-9 w-9 text-ember" />
                <h4 className="mb-1 text-sm font-bold">{s.title}</h4>
                <p className="text-xs text-muted">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
