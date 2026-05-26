import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { supabaseAdmin } from "@/lib/supabase";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const bgColor = formData.get("bgColor") as string || "white";
    const addSuit = formData.get("addSuit") === "true";

    if (!imageFile) {
      return NextResponse.json({ error: "Tidak ada gambar" }, { status: 400 });
    }

    let prompt = "";
    if (addSuit && bgColor) {
      prompt = `Edit this photo professionally:
1. Replace the background with a solid ${bgColor} color, clean and uniform
2. The person should be wearing a formal black suit/tuxedo with a white dress shirt and dark tie
3. Keep the person's face, hair, and skin tone exactly the same
4. The result should look like a professional passport/ID photo
5. Background must be completely solid ${bgColor}, no shadows or gradients on background`;
    } else if (addSuit) {
      prompt = `Edit this photo: Replace the person's clothing with a formal black suit/tuxedo with white dress shirt and dark tie. Keep face and hair exactly the same. Professional appearance.`;
    } else {
      prompt = `Replace the background of this photo with a solid, uniform ${bgColor} background. Keep the person exactly the same. The background should be completely flat ${bgColor} color with no shadows or gradients.`;
    }

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const base64Image = response.data?.[0]?.b64_json;

    if (!base64Image) {
      return NextResponse.json({ error: "Gagal generate gambar" }, { status: 500 });
    }

    const resultUrl = `data:image/png;base64,${base64Image}`;

    const db = supabaseAdmin();
    const { data: saved } = await db.from("foto_results").insert({
      result_url: resultUrl,
      bg_color: bgColor,
      type: addSuit ? "both" : "background",
    }).select().single();

    return NextResponse.json({ url: resultUrl, id: saved?.id });
  } catch (error: unknown) {
    console.error("Photo edit error:", error);
    const message = error instanceof Error ? error.message : "Terjadi kesalahan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
