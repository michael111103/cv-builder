-- ============================================
-- JALANKAN INI DI SUPABASE SQL EDITOR
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================

-- Tabel untuk data CV
CREATE TABLE IF NOT EXISTS cv_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Data Pribadi
  foto_url TEXT,
  nama_lengkap TEXT,
  nama_furigana TEXT,
  tanggal_lahir DATE,
  usia INTEGER,
  jenis_kelamin TEXT,
  nationality TEXT,
  alamat TEXT,
  furigana_alamat TEXT,
  email TEXT,
  telepon TEXT,

  -- Pendidikan (array of objects)
  pendidikan JSONB DEFAULT '[]',

  -- Pengalaman Kerja (array of objects)
  pengalaman_kerja JSONB DEFAULT '[]',

  -- Lisensi & Kualifikasi
  lisensi JSONB DEFAULT '[]',

  -- Motivasi & Permintaan
  motivasi TEXT,
  permintaan TEXT,

  -- Self PR (自己PR)
  self_pr TEXT,

  -- Status
  is_complete BOOLEAN DEFAULT FALSE
);

-- Tabel untuk riwayat chat
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  session_id TEXT NOT NULL
);

-- Tabel untuk hasil edit foto
CREATE TABLE IF NOT EXISTS foto_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  original_url TEXT,
  result_url TEXT,
  bg_color TEXT,
  type TEXT CHECK (type IN ('background', 'suit', 'both'))
);

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_history(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_history(created_at);

-- Auto update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cv_updated_at
  BEFORE UPDATE ON cv_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Storage bucket untuk foto
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT DO NOTHING;

-- Policy agar foto bisa diakses publik
CREATE POLICY "Public read photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

CREATE POLICY "Authenticated upload photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Authenticated update photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'photos');

CREATE POLICY "Authenticated delete photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'photos');
