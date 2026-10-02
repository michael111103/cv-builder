"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { DocumentIcon, ShieldIcon, GlobeIcon } from "@/components/Icons";

const icons = [DocumentIcon, ShieldIcon, GlobeIcon];

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.certs.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.certs.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.certs.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.title} className="rounded-xl border border-line bg-card p-6">
                <Icon className="mb-3 h-8 w-8 text-ember" />
                <h3 className="mb-1 text-base font-bold">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
