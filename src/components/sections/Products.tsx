const products = [
  {
    name: "Shisha Briquettes",
    img: "product-shisha.jpg",
    desc: "Available in Medium, Premium, and Super Premium grades.",
    specs: [
      ["Ash content", "2% to 3%"],
      ["Material", "Coconut shell charcoal"],
      ["Packaging", "Inner plastic, inner box, outer box"],
    ],
  },
  {
    name: "BBQ Briquettes",
    img: "product-bbq.jpg",
    desc: "Hexagonal shape with a consistent size and a long burn time.",
    specs: [
      ["Shape", "Hexagonal, 5x10cm"],
      ["Ash content", "5% to 6%"],
      ["Packaging", "Box, inner plastic"],
    ],
  },
];

export default function Products() {
  return (
    <section id="products" className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          Our Products
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          Shisha and BBQ Charcoal Briquettes
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-2xl border border-line bg-card">
              <div className="aspect-[16/10] overflow-hidden border-b border-line bg-coal-soft">
                <img
                  src={`/images/${p.img}`}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-lg font-bold">{p.name}</h3>
                <p className="mb-4 text-sm text-muted">{p.desc}</p>
                <ul className="text-sm text-muted">
                  {p.specs.map(([k, v]) => (
                    <li key={k} className="flex justify-between border-t border-line py-2">
                      <span>{k}</span>
                      <span className="font-semibold text-ink">{v}</span>
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
