"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useLanguage } from "@/lib/LanguageContext";
import { articles } from "@/lib/articles";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { t, locale } = useLanguage();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) return notFound();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-14">
        <Link href="/blog" className="mb-6 inline-block text-xs font-bold text-ember-light">
          {t.blog.backToBlog}
        </Link>
        <span className="mb-3 inline-block rounded-full border border-line px-2.5 py-1 text-[11px] font-bold text-ember-light">
          {article.category[locale]}
        </span>
        <h1 className="mb-3 text-3xl font-extrabold leading-tight">{article.title[locale]}</h1>
        <p className="mb-7 text-xs text-muted">
          {article.minRead} {t.blog.minRead}
        </p>
        <div className="mb-8 flex aspect-[16/9] items-center justify-center rounded-2xl border border-line bg-card text-sm text-muted">
          {article.image}
        </div>
        <div className="space-y-4 text-muted">
          {article.body[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
