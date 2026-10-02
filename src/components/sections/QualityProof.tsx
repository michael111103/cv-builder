"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { FlaskIcon, ClipboardCheckIcon, DocumentIcon, DropletIcon } from "@/components/Icons";

const icons = [FlaskIcon, ClipboardCheckIcon, DocumentIcon, DropletIcon];

export default function QualityProof() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.quality.tag}
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">{t.quality.title}</h2>
        <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.quality.points.map((p, i) => {
            const Icon = icons[i];
            return (
              <div key={p.title} className="rounded-xl border border-line bg-card p-5 text-center">
                <Icon className="mx-auto mb-3 h-9 w-9 text-ember" />
                <h3 className="mb-1 text-sm font-bold">{p.title}</h3>
                <p className="text-xs text-muted">{p.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-line bg-card p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm font-bold">
            <span>{t.quality.labTitle}</span>
            <span className="text-xs font-bold text-ember-light">{t.quality.labSource}</span>
          </div>
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                {t.quality.labHeaders.map((h) => (
                  <th key={h} className="py-2 pr-4 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.quality.labRows.map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  <td className="py-2 pr-4">{row[0]}</td>
                  <td className="py-2 pr-4">{row[1]}</td>
                  <td className="py-2">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
