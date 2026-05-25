"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import AppLayout from "@/components/layout/AppLayout";
import { CVData, Pendidikan, PengalamanKerja, Lisensi } from "@/types";

// Icons
function SaveIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>; }
function PlusIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function TrashIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>; }
function UploadIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>; }
function SparkleIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 6h6l-5 3.5 1.5 6L12 15l-4 3.5 1.5-6L4.5 9h6z"/></svg>; }

const tabs = [
  { id: "pribadi", label: "Pribadi", jp: "個人情報" },
  { id: "pendidikan", label: "Pendidikan", jp: "学歴" },
  { id: "kerja", label: "Pekerjaan", jp: "職歴" },
  { id: "lisensi", label: "Lisensi", jp: "免許・資格" },
  { id: "lainnya", label: "Lainnya", jp: "その他" },
];

const inputClass = "input-dark w-full rounded-xl px-3 py-2.5 text-sm";
const labelClass = "text-xs font-medium text-surface-200/60 mb-1.5 block";
const sectionClass = "glass rounded-2xl p-4 space-y-3";

export default function CVPage() {
  const [activeTab, setActiveTab] = useState("pribadi");
  const [cv, setCv] = useState<CVData>({
    pendidikan: [],
    pengalaman_kerja: [],
    lisensi: [],
  });
  const [saving, setSaving] = useState(false);
  const [extracting, setExtracting] = useState(false);

  useEffect(() => { loadCV(); }, []);

  async function loadCV() {
    try {
      const res = await fetch("/api/cv");
      const data = await res.json();
      if (data.data) setCv(data.data);
    } catch { /* silent */ }
  }

  async function saveCV() {
    setSaving(true);
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cv),
      });
      if (!res.ok) throw new Error();
      toast.success("CV berhasil disimpan!");
    } catch {
      toast.error("Gagal menyimpan CV");
    } finally {
      setSaving(false);
    }
  }

  // PDF drop
  const onDrop = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setExtracting(true);
    toast("Membaca PDF dengan AI...", { icon: "🤖" });
    try {
      const form = new FormData();
      form.append("pdf", f);
      const res = await fetch("/api/cv-extract", { method: "POST", body: form });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCv((prev) => ({ ...prev, ...data.data }));
      toast.success("PDF berhasil dibaca dan diisi otomatis!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal baca PDF";
      toast.error(msg);
    } finally {
      setExtracting(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  function update(field: keyof CVData, value: unknown) {
    setCv((prev) => ({ ...prev, [field]: value }));
  }

  // Pendidikan
  function addPendidikan() {
    const item: Pendidikan = { id: Date.now().toString(), tahun_masuk: "", tahun_keluar: "", institusi: "", jurusan: "", status: "lulus" };
    update("pendidikan", [...(cv.pendidikan || []), item]);
  }
  function updatePendidikan(id: string, field: keyof Pendidikan, val: string) {
    update("pendidikan", (cv.pendidikan || []).map(p => p.id === id ? { ...p, [field]: val } : p));
  }
  function removePendidikan(id: string) {
    update("pendidikan", (cv.pendidikan || []).filter(p => p.id !== id));
  }

  // Pekerjaan
  function addKerja() {
    const item: PengalamanKerja = { id: Date.now().toString(), tahun_masuk: "", tahun_keluar: "", perusahaan: "", posisi: "", keterangan: "", status: "keluar" };
    update("pengalaman_kerja", [...(cv.pengalaman_kerja || []), item]);
  }
  function updateKerja(id: string, field: keyof PengalamanKerja, val: string) {
    update("pengalaman_kerja", (cv.pengalaman_kerja || []).map(k => k.id === id ? { ...k, [field]: val } : k));
  }
  function removeKerja(id: string) {
    update("pengalaman_kerja", (cv.pengalaman_kerja || []).filter(k => k.id !== id));
  }

  // Lisensi
  function addLisensi() {
    const item: Lisensi = { id: Date.now().toString(), tahun: "", nama: "" };
    update("lisensi", [...(cv.lisensi || []), item]);
  }
  function updateLisensi(id: string, field: keyof Lisensi, val: string) {
    update("lisensi", (cv.lisensi || []).map(l => l.id === id ? { ...l, [field]: val } : l));
  }
  function removeLisensi(id: string) {
    update("lisensi", (cv.lisensi || []).filter(l => l.id !== id));
  }

  return (
    <AppLayout>
      <div className="space-y-4 py-4 page-enter">
        {/* Header with save */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold gradient-text">Edit CV</h2>
            <p className="text-xs text-surface-200/40">履歴書 · Format Standar Jepang</p>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={saveCV} disabled={saving}
            className="btn-primary px-4 py-2 rounded-xl text-sm text-white flex items-center gap-2 disabled:opacity-50">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <SaveIcon />}
            {saving ? "Simpan..." : "Simpan"}
          </motion.button>
        </div>

        {/* PDF Upload */}
        <div {...getRootProps()} className={`glass rounded-2xl p-4 border-2 border-dashed cursor-pointer transition-all ${isDragActive ? "border-primary-400 bg-primary-600/10" : "border-white/8 hover:border-primary-600/30"}`}>
          <input {...getInputProps()} />
          <div className="flex items-center gap-3">
            <div className={`text-primary-400 ${extracting ? "animate-spin" : ""}`}>
              {extracting ? <div className="w-5 h-5 border-2 border-primary-600/30 border-t-primary-400 rounded-full" /> : <SparkleIcon />}
            </div>
            <div>
              <p className="text-sm font-medium text-surface-200/80">
                {extracting ? "AI sedang membaca PDF..." : "Upload PDF untuk auto-fill"}
              </p>
              <p className="text-xs text-surface-200/30">AI akan mengisi form otomatis dari PDF kamu</p>
            </div>
            <div className="ml-auto text-surface-200/30">
              <UploadIcon />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar bg-surface-900/50 rounded-2xl p-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeTab === t.id ? "bg-primary-600/80 text-white shadow-glow" : "text-surface-200/40 hover:text-surface-200/70"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>

            {activeTab === "pribadi" && (
              <div className="space-y-3">
                <div className={sectionClass}>
                  <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Data Dasar</p>
                  <div>
                    <label className={labelClass}>Nama Lengkap</label>
                    <input className={inputClass} value={cv.nama_lengkap || ""} onChange={e => update("nama_lengkap", e.target.value)} placeholder="Nama sesuai paspor/KTP" />
                  </div>
                  <div>
                    <label className={labelClass}>Nama (Katakana) フリガナ</label>
                    <input className={`${inputClass} font-japanese`} value={cv.nama_furigana || ""} onChange={e => update("nama_furigana", e.target.value)} placeholder="カタカナ" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Tanggal Lahir</label>
                      <input type="date" className={inputClass} value={cv.tanggal_lahir || ""} onChange={e => update("tanggal_lahir", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Usia</label>
                      <input type="number" className={inputClass} value={cv.usia || ""} onChange={e => update("usia", Number(e.target.value))} placeholder="Otomatis" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Jenis Kelamin</label>
                      <select className={inputClass} value={cv.jenis_kelamin || ""} onChange={e => update("jenis_kelamin", e.target.value)}>
                        <option value="">Pilih</option>
                        <option value="Laki-laki">Laki-laki (男)</option>
                        <option value="Perempuan">Perempuan (女)</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Kebangsaan</label>
                      <input className={inputClass} value={cv.nationality || ""} onChange={e => update("nationality", e.target.value)} placeholder="Indonesia" />
                    </div>
                  </div>
                </div>
                <div className={sectionClass}>
                  <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Kontak</p>
                  <div>
                    <label className={labelClass}>Alamat Lengkap</label>
                    <input className={inputClass} value={cv.alamat || ""} onChange={e => update("alamat", e.target.value)} placeholder="Alamat lengkap" />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat (Katakana) フリガナ</label>
                    <input className={`${inputClass} font-japanese`} value={cv.furigana_alamat || ""} onChange={e => update("furigana_alamat", e.target.value)} placeholder="カタカナ住所" />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" className={inputClass} value={cv.email || ""} onChange={e => update("email", e.target.value)} placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className={labelClass}>No. Telepon</label>
                    <input className={inputClass} value={cv.telepon || ""} onChange={e => update("telepon", e.target.value)} placeholder="+62 xxx xxxx xxxx" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pendidikan" && (
              <div className="space-y-3">
                {(cv.pendidikan || []).map((p, i) => (
                  <div key={p.id} className={sectionClass}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-primary-400">Pendidikan {i + 1}</p>
                      <button onClick={() => removePendidikan(p.id)} className="text-red-400/60 hover:text-red-400 transition-colors"><TrashIcon /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Tahun Masuk</label>
                        <input className={inputClass} value={p.tahun_masuk} onChange={e => updatePendidikan(p.id, "tahun_masuk", e.target.value)} placeholder="2018" />
                      </div>
                      <div>
                        <label className={labelClass}>Tahun Lulus</label>
                        <input className={inputClass} value={p.tahun_keluar} onChange={e => updatePendidikan(p.id, "tahun_keluar", e.target.value)} placeholder="2022" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Nama Institusi</label>
                      <input className={inputClass} value={p.institusi} onChange={e => updatePendidikan(p.id, "institusi", e.target.value)} placeholder="Universitas / Sekolah" />
                    </div>
                    <div>
                      <label className={labelClass}>Jurusan / Fakultas</label>
                      <input className={inputClass} value={p.jurusan} onChange={e => updatePendidikan(p.id, "jurusan", e.target.value)} placeholder="Teknik Informatika" />
                    </div>
                    <div>
                      <label className={labelClass}>Status</label>
                      <select className={inputClass} value={p.status} onChange={e => updatePendidikan(p.id, "status", e.target.value as Pendidikan["status"])}>
                        <option value="masuk">Masuk (入学)</option>
                        <option value="lulus">Lulus (卒業)</option>
                        <option value="berhenti">Berhenti (中退)</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button onClick={addPendidikan} className="w-full glass-light border border-dashed border-white/10 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-surface-200/40 hover:text-primary-400 hover:border-primary-600/30 transition-all">
                  <PlusIcon /> Tambah Pendidikan
                </button>
              </div>
            )}

            {activeTab === "kerja" && (
              <div className="space-y-3">
                {(cv.pengalaman_kerja || []).map((k, i) => (
                  <div key={k.id} className={sectionClass}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-primary-400">Pekerjaan {i + 1}</p>
                      <button onClick={() => removeKerja(k.id)} className="text-red-400/60 hover:text-red-400 transition-colors"><TrashIcon /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Tahun Masuk</label>
                        <input className={inputClass} value={k.tahun_masuk} onChange={e => updateKerja(k.id, "tahun_masuk", e.target.value)} placeholder="2022" />
                      </div>
                      <div>
                        <label className={labelClass}>Tahun Keluar</label>
                        <input className={inputClass} value={k.tahun_keluar} onChange={e => updateKerja(k.id, "tahun_keluar", e.target.value)} placeholder="2024 / Sekarang" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Nama Perusahaan</label>
                      <input className={inputClass} value={k.perusahaan} onChange={e => updateKerja(k.id, "perusahaan", e.target.value)} placeholder="PT. / CV. / Ltd." />
                    </div>
                    <div>
                      <label className={labelClass}>Posisi / Jabatan</label>
                      <input className={inputClass} value={k.posisi} onChange={e => updateKerja(k.id, "posisi", e.target.value)} placeholder="Staff / Manager / Engineer" />
                    </div>
                    <div>
                      <label className={labelClass}>Keterangan Pekerjaan</label>
                      <textarea className={`${inputClass} resize-none`} rows={2} value={k.keterangan} onChange={e => updateKerja(k.id, "keterangan", e.target.value)} placeholder="Deskripsi singkat pekerjaan" />
                    </div>
                    <div>
                      <label className={labelClass}>Status</label>
                      <select className={inputClass} value={k.status} onChange={e => updateKerja(k.id, "status", e.target.value as PengalamanKerja["status"])}>
                        <option value="masuk">Masuk (入社)</option>
                        <option value="keluar">Keluar (退社)</option>
                        <option value="sekarang">Masih bekerja (在職中)</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button onClick={addKerja} className="w-full glass-light border border-dashed border-white/10 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-surface-200/40 hover:text-primary-400 hover:border-primary-600/30 transition-all">
                  <PlusIcon /> Tambah Pekerjaan
                </button>
              </div>
            )}

            {activeTab === "lisensi" && (
              <div className="space-y-3">
                <div className="glass rounded-2xl p-3 border border-accent-500/20 bg-accent-500/5">
                  <p className="text-xs text-accent-400">Contoh: SIM A, JLPT N3, IT Passport, dll. Jika tidak ada, tulis 特になし saat export.</p>
                </div>
                {(cv.lisensi || []).map((l, i) => (
                  <div key={l.id} className={sectionClass}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-primary-400">Lisensi {i + 1}</p>
                      <button onClick={() => removeLisensi(l.id)} className="text-red-400/60 hover:text-red-400 transition-colors"><TrashIcon /></button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass}>Tahun</label>
                        <input className={inputClass} value={l.tahun} onChange={e => updateLisensi(l.id, "tahun", e.target.value)} placeholder="2023" />
                      </div>
                      <div className="col-span-2">
                        <label className={labelClass}>Nama Lisensi / Sertifikat</label>
                        <input className={inputClass} value={l.nama} onChange={e => updateLisensi(l.id, "nama", e.target.value)} placeholder="JLPT N3 取得" />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addLisensi} className="w-full glass-light border border-dashed border-white/10 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-surface-200/40 hover:text-primary-400 hover:border-primary-600/30 transition-all">
                  <PlusIcon /> Tambah Lisensi
                </button>
              </div>
            )}

            {activeTab === "lainnya" && (
              <div className="space-y-3">
                <div className={sectionClass}>
                  <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider">志望動機 · Motivasi Melamar</p>
                  <textarea className={`${inputClass} resize-none font-japanese`} rows={5}
                    value={cv.motivasi || ""} onChange={e => update("motivasi", e.target.value)}
                    placeholder="御社を志望した理由は..." />
                  <p className="text-xs text-surface-200/30">Tulis dalam bahasa Jepang (Desu/Masu form)</p>
                </div>
                <div className={sectionClass}>
                  <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider">自己PR · Promosi Diri</p>
                  <textarea className={`${inputClass} resize-none font-japanese`} rows={5}
                    value={cv.self_pr || ""} onChange={e => update("self_pr", e.target.value)}
                    placeholder="私の強みは..." />
                  <p className="text-xs text-surface-200/30">Singkat, padat, dan dalam bahasa Jepang formal</p>
                </div>
                <div className={sectionClass}>
                  <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider">本人希望欄 · Permintaan</p>
                  <textarea className={`${inputClass} resize-none`} rows={3}
                    value={cv.permintaan || ""} onChange={e => update("permintaan", e.target.value)}
                    placeholder="希望給与、勤務地など（特になし も可）" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Save bottom */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={saveCV} disabled={saving}
          className="btn-primary w-full rounded-xl py-3 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
          {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menyimpan...</> : <><SaveIcon /> Simpan CV</>}
        </motion.button>
      </div>
    </AppLayout>
  );
}
