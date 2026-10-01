import { FlaskIcon, ClipboardCheckIcon, DocumentIcon, DropletIcon } from "@/components/Icons";

const points = [
  { icon: FlaskIcon, title: "Independent Lab Test", desc: "Verified by a third party inspection body" },
  { icon: ClipboardCheckIcon, title: "Pre Production Sampling", desc: "Approved by the buyer before mass production" },
  { icon: DocumentIcon, title: "Written Specification", desc: "Stated in the contract, not just spoken" },
  { icon: DropletIcon, title: "Moisture Control", desc: "Checked before pressing to prevent cracking" },
];

const lab: [string, string, string][] = [
  ["Moisture", "6.57%", "-"],
  ["Ash Content", "1.94%", "2.08%"],
  ["Volatile Matter", "14.90%", "15.95%"],
  ["Fixed Carbon", "76.59%", "81.97%"],
];

export default function QualityProof() {
  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-6">
        <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-ember-light">
          Quality Proof
        </span>
        <h2 className="mb-9 mt-2 text-center text-3xl font-extrabold">
          Quality You Can Verify, Not Just Promises
        </h2>
        <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-line bg-card p-5 text-center">
              <Icon className="mx-auto mb-3 h-9 w-9 text-ember" />
              <h3 className="mb-1 text-sm font-bold">{title}</h3>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-line bg-card p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm font-bold">
            <span>Certificate of Analysis, Coconut Shell Charcoal Briquette, Hexagonal</span>
            <span className="text-xs font-bold text-ember-light">Tested by Carsurin</span>
          </div>
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-muted">
                <th className="py-2 pr-4 font-semibold">Parameter</th>
                <th className="py-2 pr-4 font-semibold">Wet Basis</th>
                <th className="py-2 font-semibold">Dry Basis</th>
              </tr>
            </thead>
            <tbody>
              {lab.map(([k, wet, dry]) => (
                <tr key={k} className="border-b border-line">
                  <td className="py-2 pr-4">{k}</td>
                  <td className="py-2 pr-4">{wet}</td>
                  <td className="py-2">{dry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
