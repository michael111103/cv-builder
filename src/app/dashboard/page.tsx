"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";

function CVIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
}
function ChatIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function PhotoIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>;
}
function ExportIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
}
function StarIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;
}
function TipIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>;
}

const features = [
  {
    href: "/cv",
    icon: CVIcon,
    title: "Isi / Edit CV",
    desc: "Form履歴書 Jepang standar",
    color: "from-primary-600/20 to-primary-800/10",
    accent: "text-primary-400",
    border: "border-primary-600/20",
  },
  {
    href: "/chat",
    icon: ChatIcon,
    title: "AI Konsultan",
    desc: "Tanya seputar kerja di Jepang",
    color: "from-purple-600/20 to-purple-800/10",
    accent: "text-purple-400",
    border: "border-purple-600/20",
  },
  {
    href: "/foto",
    icon: PhotoIcon,
    title: "Edit Foto",
    desc: "Ganti background + pakai jas",
    color: "from-accent-500/20 to-accent-600/10",
    accent: "text-accent-400",
    border: "border-accent-500/20",
  },
  {
    href: "/export",
    icon: ExportIcon,
    title: "Export CV",
    desc: "Unduh dalam format PDF/Excel",
    color: "from-emerald-600/20 to-emerald-800/10",
    accent: "text-emerald-400",
    border: "border-emerald-600/20",
  },
];

const tips = [
  "Gunakan kalender Barat (2024) secara konsisten di seluruh CV",
  "Foto harus formal, background putih/biru, tampak profesional",
  "Tulis '以上' di akhir riwayat pendidikan/pekerjaan",
  "Kosong = tulis '特になし', jangan biarkan kolom kosong",
  "自己PR harus dalam bahasa Jepang formal (Desu/Masu form)",
];

const todayTip = tips[new Date().getDay() % tips.length];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6 py-4 page-enter">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-2 mb-1">
              <StarIcon />
              <span className="text-xs text-primary-300 font-medium">履歴書 Builder</span>
            </div>
            <h2 className="text-2xl font-display font-bold gradient-text mb-1">
              Selamat Datang!
            </h2>
            <p className="text-sm text-surface-200/50 font-japanese">
              仕事探しを、AIと一緒に。
            </p>
            <p className="text-xs text-surface-200/40 mt-0.5">
              Buat CV Jepang profesionalmu bersama AI
            </p>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div>
          <h3 className="text-xs font-semibold text-surface-200/40 uppercase tracking-widest mb-3">
            Fitur Utama
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link href={f.href}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`glass rounded-2xl p-4 border ${f.border} bg-gradient-to-br ${f.color} cursor-pointer h-full transition-shadow hover:shadow-card`}
                    >
                      <div className={`${f.accent} mb-3`}>
                        <Icon />
                      </div>
                      <p className="text-sm font-semibold text-white mb-0.5">{f.title}</p>
                      <p className="text-xs text-surface-200/40 leading-snug">{f.desc}</p>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Daily tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-4 border border-accent-500/20 bg-gradient-to-br from-accent-500/10 to-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="text-accent-400 mt-0.5 flex-shrink-0">
              <TipIcon />
            </div>
            <div>
              <p className="text-xs font-semibold text-accent-400 mb-1">Tips Hari Ini</p>
              <p className="text-sm text-surface-200/70 leading-relaxed">{todayTip}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
