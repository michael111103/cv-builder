"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { WhatsAppIcon, MenuIcon, CloseIcon } from "@/components/Icons";

export default function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#products", label: t.nav.products },
    { href: "/#certifications", label: t.nav.documents },
    { href: "/#faq", label: t.nav.faq },
    { href: "/blog", label: t.nav.blog },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-coal/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-wide">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-ember to-ember-light" />
          BARA KARBON ENERGI
        </Link>

        <nav className="hidden gap-7 text-sm text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex overflow-hidden rounded-lg border border-line text-xs font-bold">
            <button
              onClick={() => setLocale("id")}
              className={`px-3 py-1.5 ${locale === "id" ? "bg-ember text-coal" : "text-muted"}`}
            >
              ID
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1.5 ${locale === "en" ? "bg-ember text-coal" : "text-muted"}`}
            >
              EN
            </button>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-whatsapp px-4 py-2 text-sm font-bold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden" aria-label="Open menu">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-coal md:hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <span className="font-extrabold">BARA KARBON ENERGI</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-card"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="px-6">
            <div className="flex w-fit overflow-hidden rounded-lg border border-line text-xs font-bold">
              <button
                onClick={() => setLocale("id")}
                className={`px-3 py-1.5 ${locale === "id" ? "bg-ember text-coal" : "text-muted"}`}
              >
                ID
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`px-3 py-1.5 ${locale === "en" ? "bg-ember text-coal" : "text-muted"}`}
              >
                EN
              </button>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-6 mt-6 flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 text-sm font-bold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
