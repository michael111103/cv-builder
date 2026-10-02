"use client";

import { useLanguage } from "@/lib/LanguageContext";

const images = ["shisha.jpg", "product-bbq.jpg"];

export default function Products() {
  const { t } = useLanguage();

  return (
    <section id="products" className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.products.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.products.title}</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {t.products.items.map((p, i) => (
            <div key={p.name} className="overflow-hidden rounded-2xl border border-line bg-card">
              <div className="aspect-[16/10] overflow-hidden border-b border-line bg-coal-soft">
                <img src={`/images/${images[i]}`} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-lg font-bold">{p.name}</h3>
                <p className="mb-4 text-sm text-muted">{p.desc}</p>
                <ul className="text-sm text-muted">
                  {p.specs.map((row) => (
                    <li key={row[0]} className="flex justify-between border-t border-line py-2">
                      <span>{row[0]}</span>
                      <span className="font-semibold text-ink">{row[1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
