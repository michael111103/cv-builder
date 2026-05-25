export interface Pendidikan {
  id: string;
  tahun_masuk: string;
  tahun_keluar: string;
  institusi: string;
  jurusan: string;
  status: "masuk" | "lulus" | "berhenti";
}

export interface PengalamanKerja {
  id: string;
  tahun_masuk: string;
  tahun_keluar: string;
  perusahaan: string;
  posisi: string;
  keterangan: string;
  status: "masuk" | "keluar" | "sekarang";
}

export interface Lisensi {
  id: string;
  tahun: string;
  nama: string;
}

export interface CVData {
  id?: string;
  foto_url?: string;
  nama_lengkap?: string;
  nama_furigana?: string;
  tanggal_lahir?: string;
  usia?: number;
  jenis_kelamin?: string;
  nationality?: string;
  alamat?: string;
  furigana_alamat?: string;
  email?: string;
  telepon?: string;
  pendidikan?: Pendidikan[];
  pengalaman_kerja?: PengalamanKerja[];
  lisensi?: Lisensi[];
  motivasi?: string;
  permintaan?: string;
  self_pr?: string;
  is_complete?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

export interface FotoResult {
  id?: string;
  original_url?: string;
  result_url?: string;
  bg_color?: string;
  type?: "background" | "suit" | "both";
}

export type BgColor = {
  label: string;
  value: string;
  hex: string;
};

export const BG_COLORS: BgColor[] = [
  { label: "Putih", value: "white", hex: "#FFFFFF" },
  { label: "Abu-abu Muda", value: "light gray", hex: "#F5F5F5" },
  { label: "Biru Muda", value: "light blue", hex: "#E3F0FF" },
  { label: "Biru", value: "blue", hex: "#4A90D9" },
  { label: "Abu-abu", value: "gray", hex: "#9E9E9E" },
];
