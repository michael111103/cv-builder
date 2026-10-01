"use client";

import { useState } from "react";
import { ChatIcon } from "@/components/Icons";

const WHATSAPP_NUMBER = "6285846466029";

export default function ContactForm() {
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
      "Hello, I would like to request a quotation.",
      form.name && `Name or company: ${form.name}`,
      form.product && `Product: ${form.product}`,
      form.quantity && `Quantity: ${form.quantity}`,
      form.destination && `Destination: ${form.destination}`,
      form.notes && `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <section id="contact" className="border-t border-line py-14">
      <div className="mx-auto max-w-xl px-6">
        <div className="rounded-3xl border border-line bg-gradient-to-br from-[#241a10] to-card p-9 text-center">
          <h2 className="mb-2 text-2xl font-extrabold">Request a Quotation</h2>
          <p className="mb-7 text-sm text-muted">
            Tell us your product, quantity, and destination. The more
            complete your first message, the faster we can reply.
          </p>
          <form onSubmit={handleSubmit} className="grid gap-3 text-left">
            <input
              type="text"
              placeholder="Name or company"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <select
              value={form.product}
              onChange={(e) => update("product", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            >
              <option value="">Select a product</option>
              <option>Shisha Briquette, Medium</option>
              <option>Shisha Briquette, Premium</option>
              <option>Shisha Briquette, Super Premium</option>
              <option>BBQ Briquette</option>
            </select>
            <input
              type="text"
              placeholder="Quantity, for example 1x20FT, 18 tons"
              value={form.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <input
              type="text"
              placeholder="Destination country"
              value={form.destination}
              onChange={(e) => update("destination", e.target.value)}
              className="rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <textarea
              placeholder="Additional notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="min-h-[80px] rounded-lg border border-line bg-coal-soft px-4 py-3 text-sm"
            />
            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-ember py-3 font-bold text-coal"
            >
              <ChatIcon className="h-4 w-4" />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
