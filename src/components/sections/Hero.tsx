export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
        Coconut Charcoal Export
      </span>
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Reliable Export Partner for Premium Shisha and BBQ Charcoal Briquettes
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted">
        PT Bara Karbon Energi sources, quality checks, and exports coconut
        shell charcoal briquettes from Central Java. FOB Semarang, ready for
        shipment worldwide.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a href="#contact" className="rounded-lg bg-ember px-6 py-3 font-bold text-coal">
          Request Quotation
        </a>
        <a href="#products" className="rounded-lg border border-line px-6 py-3 font-bold text-ink">
          View Products
        </a>
      </div>

      <div className="mt-10 aspect-[16/7] overflow-hidden rounded-2xl border border-line bg-card">
        <img
          src="/images/factory-container.jpg"
          alt="Factory and export container"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <span className="rounded-lg border border-line bg-card px-4 py-2 text-xs text-muted">
          Partnered with a certified manufacturer
        </span>
        <span className="rounded-lg border border-line bg-card px-4 py-2 text-xs text-muted">
          Export document support
        </span>
      </div>

      <div className="mx-auto mt-9 grid max-w-xl grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl font-extrabold text-ember-light">18 to 25Ton</div>
          <div className="text-xs text-muted">Capacity per container</div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-ember-light">90Ton</div>
          <div className="text-xs text-muted">Partner production capacity per month</div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-ember-light">2024</div>
          <div className="text-xs text-muted">PT Bara Karbon Internasional founded</div>
        </div>
      </div>
    </section>
  );
}
