import { FlameIcon, AshIcon, LeafIcon, HeatIcon } from "@/components/Icons";

const features = [
  { icon: FlameIcon, title: "Long Burn", desc: "Extended and consistent heat" },
  { icon: AshIcon, title: "Low Ash", desc: "Cleaner burn with less residue" },
  { icon: LeafIcon, title: "100% Natural", desc: "No chemical accelerants" },
  { icon: HeatIcon, title: "High Heat", desc: "Ideal for shisha and BBQ" },
];

export default function WhyCharcoal() {
  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          Why Coconut Charcoal
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          Natural, Renewable, High Performance
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-line bg-card p-5 text-center">
              <Icon className="mx-auto mb-3 h-9 w-9 text-ember" />
              <h3 className="mb-1 text-sm font-bold">{title}</h3>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
