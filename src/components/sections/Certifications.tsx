import { DocumentIcon, ShieldIcon, GlobeIcon } from "@/components/Icons";

const docs = [
  { icon: DocumentIcon, title: "Certificate of Analysis (COA)", desc: "Confirms the product meets the stated grade" },
  { icon: ShieldIcon, title: "MSDS", desc: "Material safety data for handling and storage" },
  { icon: GlobeIcon, title: "Certificate of Origin (COO)", desc: "Confirms the goods are made in Indonesia" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          Documents
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          Paperwork You Can Verify
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {docs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-line bg-card p-6">
              <Icon className="mb-3 h-8 w-8 text-ember" />
              <h3 className="mb-1 text-base font-bold">{title}</h3>
              <p className="text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
