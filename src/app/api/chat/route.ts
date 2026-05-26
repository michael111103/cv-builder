import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Kamu adalah Sensei AI (先生AI), konsultan ahli CV Jepang dan kehidupan kerja di Jepang.

Keahlianmu meliputi:
- Cara menulis 履歴書 (Rirekisho) yang benar sesuai standar Jepang
- Cara menulis 職務経歴書 (Shokumu Keirekisho)
- Penjelasan tentang SSW (Specified Skilled Worker / 特定技能)
- Perbedaan Tokutei Ginou dan Gijinkoku
- Tips wawancara kerja di Jepang
- Terjemahan Indonesia ↔ Jepang (formal/bisnis)
- Gaji dan kondisi kerja di Jepang
- Kehidupan sehari-hari di Jepang
- Konversi tahun Reiwa ↔ tahun Masehi
- Cara menulis nama dalam Katakana
- Cara menulis 自己PR yang menarik

Cara menjawab:
- Gunakan bahasa Indonesia yang ramah dan mudah dipahami
- Sertakan istilah Jepang (kanji/hiragana) saat relevan
- Beri contoh konkret
- Jika diminta terjemahkan, berikan terjemahan formal/bisnis yang tepat
- Format jawaban dengan rapi, gunakan poin jika perlu
- Selalu ramah dan semangat membantu!

Saat diminta terjemahan Indonesia → Jepang:
- Berikan versi formal (丁寧語/Keigo)
- Sertakan cara baca (romaji jika perlu)
- Jelaskan nuansa jika ada pilihan kata`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, sessionId } = await req.json();

    const messages = [
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const assistantMessage = response.content[0].type === "text"
      ? response.content[0].text
      : "Maaf, terjadi kesalahan.";

    const db = supabaseAdmin();
    await db.from("chat_history").insert([
      { role: "user", content: message, session_id: sessionId },
      { role: "assistant", content: assistantMessage, session_id: sessionId },
    ]);

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ messages: [] });

  const db = supabaseAdmin();
  const { data } = await db
    .from("chat_history")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(50);

  return NextResponse.json({ messages: data || [] });
}
