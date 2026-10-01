import { CoconutIcon, PressIcon, BoxIcon, ShipIcon } from "@/components/Icons";

const steps = [
  { icon: CoconutIcon, title: "Sourcing", desc: "Coconut shells from Central Java" },
  { icon: PressIcon, title: "Production and QC", desc: "Pressing, drying, and quality testing" },
  { icon: BoxIcon, title: "Packing", desc: "Export standard packaging" },
  { icon: ShipIcon, title: "Export", desc: "FOB Tanjung Emas Port, Semarang" },
];

export default function ProductionProcess() {
  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          Production Process
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          From Coconut Shell to Container
        </h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto mb-3 h-9 w-9 text-ember" />
              <h4 className="mb-1 text-sm font-bold">{title}</h4>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
