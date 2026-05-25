"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Selamat datang" },
  "/cv": { title: "Edit CV", subtitle: "履歴書" },
  "/chat": { title: "AI Konsultan", subtitle: "Sensei AI · 先生AI" },
  "/foto": { title: "Edit Foto", subtitle: "Foto Profesional" },
  "/export": { title: "Export CV", subtitle: "Unduh履歴書" },
};

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const page = pageTitles[pathname] || { title: "履歴書 Builder", subtitle: "CV Jepang AI" };

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Berhasil keluar");
    router.push("/login");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-display font-bold text-white">履</span>
          </div>
          <div>
            <motion.h1
              key={page.title}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-white leading-tight"
            >
              {page.title}
            </motion.h1>
            <p className="text-[10px] text-surface-200/40 font-japanese leading-tight">{page.subtitle}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 glass-light rounded-lg flex items-center justify-center text-surface-200/50 hover:text-surface-200 transition-colors">
            <BellIcon />
          </button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-8 h-8 glass-light rounded-lg flex items-center justify-center text-surface-200/50 hover:text-red-400 transition-colors"
          >
            <LogoutIcon />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
