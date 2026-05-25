# 履歴書 Builder - CV Jepang AI

Web app pribadi untuk membuat CV Jepang (履歴書) profesional dengan bantuan AI.

## Fitur
- 🔐 Login aman (username & password)
- 📝 Form CV Jepang standar JIS
- 🤖 Upload PDF → auto-fill dengan Claude AI
- 💬 AI Konsultan seputar kerja di Jepang
- 📸 Edit foto: ganti background + auto pakai jas hitam (GPT-4o)
- 📄 Export CV siap cetak (print to PDF)

---

## Setup & Install

### 1. Clone / Ekstrak project

### 2. Install dependencies
```bash
npm install
```

### 3. Isi file .env.local
Buat file `.env.local` di root project, copy dari `.env.example`:

```bash
cp .env.example .env.local
```

Lalu isi semua nilai:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxx

ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxx

APP_USERNAME=admin
APP_PASSWORD=password_kamu_disini
APP_SECRET=random_string_panjang_ini_ganti

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Cara dapat API keys:**
- Supabase: dashboard.supabase.com → Settings → API
- Anthropic: console.anthropic.com → API Keys
- OpenAI: platform.openai.com → API Keys

### 4. Setup Supabase Database
Buka Supabase Dashboard → SQL Editor → New Query
Paste isi file `supabase-schema.sql` → klik Run

### 5. Jalankan development
```bash
npm run dev
```
Buka http://localhost:3000

### 6. Deploy ke Vercel
```bash
# Install Vercel CLI (sekali saja)
npm install -g vercel

# Deploy
vercel

# Saat ditanya, ikuti petunjuk
```

**Penting saat deploy Vercel:**
Tambahkan semua environment variables di:
Vercel Dashboard → Project → Settings → Environment Variables

---

## Struktur Project
```
src/
├── app/
│   ├── api/
│   │   ├── auth/login/    ← Login API
│   │   ├── auth/logout/   ← Logout API
│   │   ├── chat/          ← Claude AI Chat
│   │   ├── cv/            ← Save/Load CV
│   │   ├── cv-extract/    ← PDF → CV (Claude)
│   │   └── photo/         ← Edit foto (GPT-4o)
│   ├── login/             ← Halaman login
│   ├── dashboard/         ← Halaman utama
│   ├── cv/                ← Form edit CV
│   ├── chat/              ← AI Chatbot
│   ├── foto/              ← Edit foto
│   └── export/            ← Export PDF
├── components/
│   └── layout/
│       ├── TopNav.tsx     ← Navbar atas
│       ├── BottomNav.tsx  ← Navbar bawah
│       └── AppLayout.tsx  ← Layout wrapper
├── lib/
│   ├── supabase.ts        ← Supabase client
│   └── auth.ts            ← Auth utilities
├── types/
│   └── index.ts           ← TypeScript types
└── middleware.ts          ← Auth protection
```
