export default function About() {
  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          Who We Are
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          Export Partner, Not Just a Middleman
        </h2>
        <div className="grid items-center gap-7 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-card">
            <img
              src="/images/team-office.jpg"
              alt="Team and office"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="mb-4 inline-block rounded-full border border-line bg-coal-soft px-3 py-1 text-xs font-bold text-ember-light">
              Semarang, Indonesia
            </span>
            <p className="mb-4 text-muted">
              PT Bara Karbon Energi is an export supplier of coconut shell
              charcoal briquettes, working with a certified manufacturing
              partner near Tanjung Emas Port in Semarang.
            </p>
            <p className="text-muted">
              We handle quality control, export documentation, and
              logistics, so buyers get one reliable point of contact from
              quotation to shipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
