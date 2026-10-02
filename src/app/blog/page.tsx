"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useLanguage } from "@/lib/LanguageContext";
import { articles } from "@/lib/articles";
import { SearchIcon, FilterIcon } from "@/components/Icons";

export default function BlogPage() {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category[locale]));
    return ["all", ...Array.from(set)];
  }, [locale]);

  const filtered = articles.filter((a) => {
    const title = a.title[locale].toLowerCase();
    const matchesQuery = title.includes(query.toLowerCase());
    const matchesCategory = category === "all" || a.category[locale] === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-14">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          {t.blog.tag}
        </span>
        <h1 className="mb-3 mt-2 text-center text-3xl font-extrabold sm:text-4xl">{t.blog.title}</h1>
        <p className="mx-auto mb-9 max-w-xl text-center text-muted">{t.blog.subtitle}</p>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.blog.searchPh}
              className="w-full rounded-lg border border-line bg-card py-2.5 pl-10 pr-4 text-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${
                  category === c ? "border-ember bg-ember text-coal" : "border-line bg-card text-muted"
                }`}
              >
                {c === "all" ? t.blog.filterAll : c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="overflow-hidden rounded-2xl border border-line bg-card transition hover:border-ember"
            >
              <div className="flex aspect-[16/10] items-center justify-center border-b border-line bg-coal-soft text-xs text-muted">
                {a.image}
              </div>
              <div className="p-5">
                <span className="mb-2 inline-block rounded-full border border-line px-2.5 py-1 text-[11px] font-bold text-ember-light">
                  {a.category[locale]}
                </span>
                <h2 className="mb-2 text-base font-bold leading-snug">{a.title[locale]}</h2>
                <p className="mb-3 text-sm text-muted">{a.excerpt[locale]}</p>
                <span className="text-xs text-muted">
                  {a.minRead} {t.blog.minRead}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
