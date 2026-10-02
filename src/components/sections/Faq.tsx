"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ChevronDownIcon } from "@/components/Icons";

export default function Faq() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="border-t border-line py-14">
      <div className="mx-auto max-w-2xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.faq.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.faq.title}</h2>
        <div className="space-y-3">
          {t.faq.items.map((item) => (
            <details key={item.q} className="group rounded-xl border border-line bg-card p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-ember-light">
                {item.q}
                <ChevronDownIcon className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
