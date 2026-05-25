"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import AppLayout from "@/components/layout/AppLayout";
import { BG_COLORS } from "@/types";

function UploadIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
}
function DownloadIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function RefreshIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.1"/></svg>;
}
function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>;
}

export default function FotoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [selectedBg, setSelectedBg] = useState(BG_COLORS[0]);
  const [addSuit, setAddSuit] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);
    setResult("");
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxFiles: 1,
  });

  async function processPhoto() {
    if (!file) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("bgColor", selectedBg.value);
      form.append("addSuit", String(addSuit));

      const res = await fetch("/api/photo", { method: "POST", body: form });
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setResult(data.url);
      toast.success("Foto berhasil diproses!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal memproses foto";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  function downloadResult() {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "foto-cv-jepang.png";
    a.click();
  }

  function reset() {
    setFile(null);
    setPreview("");
    setResult("");
  }

  return (
    <AppLayout>
      <div className="space-y-5 py-4 page-enter">
        <div>
          <h2 className="text-xl font-display font-bold gradient-text">Edit Foto</h2>
          <p className="text-xs text-surface-200/40 mt-0.5">Buat foto profesional untuk CV Jepang</p>
        </div>

        {/* Upload zone */}
        {!preview ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div
              {...getRootProps()}
              className={`glass rounded-2xl border-2 border-dashed p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragActive ? "border-primary-400 bg-primary-600/10" : "border-white/10 hover:border-primary-600/40"
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-surface-200/30 mb-3 animate-float">
                <UploadIcon />
              </div>
              <p className="text-sm font-medium text-surface-200/60">
                {isDragActive ? "Lepas di sini..." : "Tap atau drag foto"}
              </p>
              <p className="text-xs text-surface-200/30 mt-1">JPG, PNG, WEBP</p>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Preview & Result */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-3">
                <p className="text-[10px] text-surface-200/40 uppercase tracking-wider mb-2">Original</p>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-800">
                  <Image src={preview} alt="Original" fill className="object-cover" />
                </div>
              </div>
              <div className="glass rounded-2xl p-3">
                <p className="text-[10px] text-surface-200/40 uppercase tracking-wider mb-2">Hasil</p>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-800">
                  {result ? (
                    <Image src={result} alt="Result" fill className="object-cover" />
                  ) : loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary-600/30 border-t-primary-400 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-xs text-surface-200/20 text-center px-2">Hasil akan muncul di sini</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Background color picker */}
            <div className="glass rounded-2xl p-4">
              <p className="text-xs font-semibold text-surface-200/60 mb-3">Warna Background</p>
              <div className="flex gap-2 flex-wrap">
                {BG_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedBg(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${
                      selectedBg.value === c.value
                        ? "border-primary-400 bg-primary-600/20 text-white"
                        : "border-white/10 text-surface-200/50 hover:border-white/20"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedBg.value === c.value && (
                        <span className="text-surface-900 scale-75">
                          <CheckIcon />
                        </span>
                      )}
                    </span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Suit toggle */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Pakai Jas Hitam</p>
                  <p className="text-xs text-surface-200/40">Auto ganti baju jadi formal</p>
                </div>
                <button
                  onClick={() => setAddSuit(!addSuit)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                    addSuit ? "bg-primary-500" : "bg-surface-700"
                  }`}
                >
                  <motion.div
                    animate={{ x: addSuit ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                  />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 glass-light border border-white/10 rounded-xl py-3 text-sm text-surface-200/60 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <RefreshIcon /> Ganti Foto
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={processPhoto}
                disabled={loading}
                className="flex-1 btn-primary rounded-xl py-3 text-sm text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Proses...</>
                ) : "Proses Foto"}
              </motion.button>
            </div>

            {/* Download */}
            <AnimatePresence>
              {result && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={downloadResult}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
                >
                  <DownloadIcon /> Unduh Foto
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Tips */}
        <div className="glass rounded-2xl p-4 border border-accent-500/20 bg-gradient-to-br from-accent-500/5 to-transparent">
          <p className="text-xs font-semibold text-accent-400 mb-2">Tips Foto CV Jepang</p>
          <ul className="space-y-1.5">
            {["Foto terbaru (dalam 3 bulan)", "Background putih atau biru muda", "Ekspresi serius tapi ramah", "Baju formal / jas", "Ukuran 3×4 cm"].map((t) => (
              <li key={t} className="flex items-start gap-2 text-xs text-surface-200/50">
                <span className="text-accent-500 mt-0.5">•</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
