import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get("pdf") as File;

    if (!pdfFile) {
      return NextResponse.json({ error: "Tidak ada file PDF" }, { status: 400 });
    }

    const bytes = await pdfFile.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: base64,
              },
            },
            {
              type: "text",
              text: `Ekstrak informasi dari dokumen ini dan kembalikan sebagai JSON. 
              
Kembalikan HANYA JSON, tidak ada teks lain. Format:
{
  "nama_lengkap": "",
  "nama_furigana": "",
  "tanggal_lahir": "YYYY-MM-DD atau kosong",
  "jenis_kelamin": "Laki-laki / Perempuan / kosong",
  "nationality": "",
  "alamat": "",
  "email": "",
  "telepon": "",
  "pendidikan": [
    {
      "id": "1",
      "tahun_masuk": "YYYY",
      "tahun_keluar": "YYYY",
      "institusi": "",
      "jurusan": "",
      "status": "lulus"
    }
  ],
  "pengalaman_kerja": [
    {
      "id": "1",
      "tahun_masuk": "YYYY",
      "tahun_keluar": "YYYY",
      "perusahaan": "",
      "posisi": "",
      "keterangan": "",
      "status": "keluar"
    }
  ],
  "lisensi": [
    {
      "id": "1",
      "tahun": "YYYY",
      "nama": ""
    }
  ],
  "motivasi": "",
  "self_pr": ""
}

Jika informasi tidak ada, gunakan string kosong. Jangan tambahkan apapun selain JSON.`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "{}";

    // Parse JSON
    const clean = text.replace(/```json|```/g, "").trim();
    const extracted = JSON.parse(clean);

    return NextResponse.json({ data: extracted });
  } catch (error: unknown) {
    console.error("CV extract error:", error);
    const msg = error instanceof Error ? error.message : "Gagal ekstrak PDF";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
