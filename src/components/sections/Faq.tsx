import { ChevronDownIcon } from "@/components/Icons";

const items = [
  { q: "What is the MOQ?", a: "1 x 20FT container (about 18 tons) or 1 x 40FT container (about 25 tons)." },
  { q: "What shipping term do you use?", a: "FOB Tanjung Emas Port, Semarang." },
  { q: "What is the payment scheme?", a: "Bank transfer (TT). 50% deposit before production, 50% before stuffing." },
  { q: "Are samples available?", a: "Yes, on request. Factory visits can also be arranged." },
];

export default function Faq() {
  return (
    <section id="faq" className="border-t border-line py-14">
      <div className="mx-auto max-w-2xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          FAQ and MOQ
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          Good to Know Before You Order
        </h2>
        <div className="space-y-3">
          {items.map((item) => (
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
