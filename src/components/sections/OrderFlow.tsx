const steps = [
  { n: 1, title: "Initial Discussion", desc: "Needs, volume, and specification" },
  { n: 2, title: "Letter of Intent", desc: "Formal interest confirmed by the buyer" },
  { n: 3, title: "Quotation", desc: "Price, quality, and shipping terms" },
  { n: 4, title: "Buyer PO", desc: "Purchase order issued" },
  { n: 5, title: "Approval", desc: "Agreement from both sides" },
  { n: 6, title: "Contract and DP", desc: "Agreement signed and deposit paid" },
];

export default function OrderFlow() {
  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          Order Flow
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          From First Conversation to Shipment
        </h2>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-ember text-sm font-extrabold text-ember-light">
                {s.n}
              </div>
              <h4 className="mb-1 text-sm font-bold">{s.title}</h4>
              <p className="text-xs text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
