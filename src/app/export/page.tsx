"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import AppLayout from "@/components/layout/AppLayout";
import { CVData } from "@/types";

function DownloadIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
function PrintIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>; }
function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>; }
function WarningIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }

function formatYear(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.getFullYear().toString();
}
function formatDateJP(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function ExportPage() {
  const [cv, setCv] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCV(); }, []);

  async function loadCV() {
    try {
      const res = await fetch("/api/cv");
      const data = await res.json();
      setCv(data.data);
    } finally {
      setLoading(false);
    }
  }

  function printCV() {
    window.print();
    toast.success("Dialog print terbuka!");
  }

  const checks = [
    { label: "Nama lengkap", ok: !!cv?.nama_lengkap },
    { label: "Nama furigana", ok: !!cv?.nama_furigana },
    { label: "Tanggal lahir", ok: !!cv?.tanggal_lahir },
    { label: "Email & Telepon", ok: !!(cv?.email && cv?.telepon) },
    { label: "Pendidikan", ok: (cv?.pendidikan?.length || 0) > 0 },
    { label: "Motivasi (志望動機)", ok: !!cv?.motivasi },
    { label: "Self PR (自己PR)", ok: !!cv?.self_pr },
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary-600/30 border-t-primary-400 rounded-full animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body > * { display: none !important; }
          #print-cv { display: block !important; }
          #print-cv {
            font-family: "Noto Sans JP", sans-serif !important;
            color: #000 !important;
            background: #fff !important;
          }
        }
        #print-cv { display: none; }
      `}</style>

      {/* Printable CV */}
      <div id="print-cv" style={{ fontFamily: "Noto Sans JP, sans-serif", padding: "20mm", maxWidth: "210mm", margin: "0 auto", background: "white", color: "black", fontSize: "10pt" }}>
        <h1 style={{ textAlign: "center", fontSize: "16pt", marginBottom: "16px", borderBottom: "2px solid black", paddingBottom: "8px" }}>履 歴 書</h1>
        <p style={{ textAlign: "right", marginBottom: "12px" }}>{formatDateJP(new Date().toISOString())}現在</p>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #999", padding: "6px 8px", width: "20%", background: "#f5f5f5", fontWeight: "bold" }}>ふりがな</td>
              <td style={{ border: "1px solid #999", padding: "6px 8px", width: "50%" }}>{cv?.nama_furigana || ""}</td>
              <td rowSpan={2} style={{ border: "1px solid #999", padding: "6px", width: "30%", textAlign: "center", verticalAlign: "middle" }}>
                <div style={{ width: "90px", height: "120px", border: "1px dashed #999", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9pt", color: "#999" }}>写真<br/>3×4cm</div>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #999", padding: "6px 8px", background: "#f5f5f5", fontWeight: "bold" }}>氏名</td>
              <td style={{ border: "1px solid #999", padding: "6px 8px", fontSize: "14pt", fontWeight: "bold" }}>{cv?.nama_lengkap || ""}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #999", padding: "6px 8px", background: "#f5f5f5", fontWeight: "bold" }}>生年月日</td>
              <td style={{ border: "1px solid #999", padding: "6px 8px" }} colSpan={2}>{formatDateJP(cv?.tanggal_lahir || "")}　（満{cv?.usia || ""}歳）　{cv?.jenis_kelamin === "Laki-laki" ? "男" : cv?.jenis_kelamin === "Perempuan" ? "女" : ""}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #999", padding: "6px 8px", background: "#f5f5f5", fontWeight: "bold" }}>ふりがな</td>
              <td style={{ border: "1px solid #999", padding: "6px 8px" }} colSpan={2}>{cv?.furigana_alamat || ""}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #999", padding: "6px 8px", background: "#f5f5f5", fontWeight: "bold" }}>住所</td>
              <td style={{ border: "1px solid #999", padding: "6px 8px" }} colSpan={2}>{cv?.alamat || ""}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #999", padding: "6px 8px", background: "#f5f5f5", fontWeight: "bold" }}>電話</td>
              <td style={{ border: "1px solid #999", padding: "6px 8px" }}>{cv?.telepon || ""}</td>
              <td style={{ border: "1px solid #999", padding: "6px 8px" }}>{cv?.email || ""}</td>
            </tr>
          </tbody>
        </table>

        {/* Pendidikan */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "8px" }}>
          <thead>
            <tr><th style={{ border: "1px solid #999", padding: "6px", background: "#f5f5f5", textAlign: "center", width: "20%" }}>年</th><th style={{ border: "1px solid #999", padding: "6px", background: "#f5f5f5", textAlign: "center", width: "10%" }}>月</th><th style={{ border: "1px solid #999", padding: "6px", background: "#f5f5f5", textAlign: "left" }}>学歴・職歴</th></tr>
          </thead>
          <tbody>
            <tr><td colSpan={3} style={{ border: "1px solid #999", padding: "6px 8px", fontWeight: "bold", textAlign: "center" }}>学　歴</td></tr>
            {(cv?.pendidikan || []).map(p => (
              <>
                <tr key={`in-${p.id}`}><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>{formatYear(p.tahun_masuk)}</td><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>4</td><td style={{ border: "1px solid #999", padding: "6px 8px" }}>{p.institusi} {p.jurusan} 入学</td></tr>
                <tr key={`out-${p.id}`}><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>{formatYear(p.tahun_keluar)}</td><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>3</td><td style={{ border: "1px solid #999", padding: "6px 8px" }}>{p.institusi} {p.jurusan} {p.status === "lulus" ? "卒業" : p.status === "berhenti" ? "中退" : "卒業"}</td></tr>
              </>
            ))}
            <tr><td colSpan={3} style={{ border: "1px solid #999", padding: "6px 8px", fontWeight: "bold", textAlign: "center" }}>職　歴</td></tr>
            {(cv?.pengalaman_kerja || []).length === 0 && (
              <tr><td colSpan={3} style={{ border: "1px solid #999", padding: "6px 8px" }}>　　なし</td></tr>
            )}
            {(cv?.pengalaman_kerja || []).map(k => (
              <>
                <tr key={`kin-${k.id}`}><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>{formatYear(k.tahun_masuk)}</td><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>4</td><td style={{ border: "1px solid #999", padding: "6px 8px" }}>{k.perusahaan} 入社　{k.posisi}</td></tr>
                {k.status !== "sekarang" && <tr key={`kout-${k.id}`}><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>{formatYear(k.tahun_keluar)}</td><td style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "center" }}>3</td><td style={{ border: "1px solid #999", padding: "6px 8px" }}>退社</td></tr>}
              </>
            ))}
            <tr><td colSpan={3} style={{ border: "1px solid #999", padding: "6px 8px", textAlign: "right", fontWeight: "bold" }}>以上</td></tr>
          </tbody>
        </table>

        {/* Motivasi & Self PR */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #999", padding: "8px", width: "50%", verticalAlign: "top" }}>
                <strong>志望動機</strong><br />
                <div style={{ marginTop: "8px", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{cv?.motivasi || "特になし"}</div>
              </td>
              <td style={{ border: "1px solid #999", padding: "8px", width: "50%", verticalAlign: "top" }}>
                <strong>自己PR</strong><br />
                <div style={{ marginTop: "8px", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{cv?.self_pr || "特になし"}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ border: "1px solid #999", padding: "8px" }}>
                <strong>本人希望欄</strong>　{cv?.permintaan || "特になし"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppLayout>
        <div className="space-y-5 py-4 page-enter">
          <div>
            <h2 className="text-xl font-display font-bold gradient-text">Export CV</h2>
            <p className="text-xs text-surface-200/40 mt-0.5">Unduh履歴書 siap kirim</p>
          </div>

          {/* Checklist */}
          <div className="glass rounded-2xl p-4 space-y-3">
            <p className="text-xs font-semibold text-surface-200/60 uppercase tracking-wider">Kelengkapan CV</p>
            {checks.map((c) => (
              <div key={c.label} className="flex items-center justify-between">
                <span className="text-sm text-surface-200/70">{c.label}</span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${c.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                  {c.ok ? <CheckIcon /> : <WarningIcon />}
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-white/5">
              <p className="text-xs text-surface-200/40">
                {checks.filter(c => c.ok).length}/{checks.length} kolom terisi
              </p>
              <div className="mt-2 h-1.5 bg-surface-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(checks.filter(c => c.ok).length / checks.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
          </div>

          {/* Print button */}
          <div className="space-y-3">
            <motion.button whileTap={{ scale: 0.97 }} onClick={printCV}
              className="btn-primary w-full rounded-xl py-3 text-white font-semibold flex items-center justify-center gap-2">
              <PrintIcon /> Cetak / Simpan PDF
            </motion.button>
            <p className="text-xs text-center text-surface-200/30">
              Dialog print browser akan terbuka.<br />Pilih "Save as PDF" untuk menyimpan file.
            </p>
          </div>

          {/* Preview info */}
          <div className="glass rounded-2xl p-4 border border-primary-600/20">
            <p className="text-xs font-semibold text-primary-400 mb-2">Tentang Format CV</p>
            <p className="text-xs text-surface-200/50 leading-relaxed">
              Format menggunakan standar JIS 履歴書 resmi Jepang. Tersedia kolom: data pribadi, riwayat pendidikan (学歴), riwayat pekerjaan (職歴), lisensi (免許・資格), motivasi (志望動機), dan promosi diri (自己PR).
            </p>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
