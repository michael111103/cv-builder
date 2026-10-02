"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { ChatIcon } from "@/components/Icons";
import { buildWaLink } from "@/lib/constants";

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    product: "",
    quantity: "",
    destination: "",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      t.contact.waIntro,
      form.name && `${t.contact.namePh}: ${form.name}`,
      form.product && `${t.contact.productPh}: ${form.product}`,
      form.quantity && `${t.contact.quantityPh}: ${form.quantity}`,
      form.destination && `${t.contact.destinationPh}: ${form.destination}`,
      form.notes && `${t.contact.notesPh}: ${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWaLink(text), "_blank");
  }

  return (
    <section id="contact" className="border-t border-line py-14">
      <div className="mx-auto max-w-xl px-6">
        <div className="rounded-3xl border border-line bg-gradient-to-br from-[#241a10] to-card p-9 text-center">
          <h2 className="mb-2 text-2xl font-extrabold">{t.contact.title}</h2>
          <p className="mb-7 text-sm text-muted">{t.contact.desc}</p>
          <form onSubmit={handleSubmit} className="grid gap-3 text-left">
            <input
              type="text"
              placeholder={t.contact.namePh}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <select
              value={form.product}
              onChange={(e) => update("product", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            >
              <option value="">{t.contact.productPh}</option>
              <option>Shisha Briquette, Medium</option>
              <option>Shisha Briquette, Premium</option>
              <option>Shisha Briquette, Super Premium</option>
              <option>BBQ Briquette</option>
            </select>
            <input
              type="text"
              placeholder={t.contact.quantityPh}
              value={form.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <input
              type="text"
              placeholder={t.contact.destinationPh}
              value={form.destination}
              onChange={(e) => update("destination", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <textarea
              placeholder={t.contact.notesPh}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="min-h-[80px] rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-whatsapp py-3 font-bold text-white"
            >
              <ChatIcon className="h-4 w-4" />
              {t.contact.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
