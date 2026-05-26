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
      prompt = `You are a photo editor. Your ONLY tasks are:
1. BACKGROUND: Replace ONLY the background with a flat solid ${bgColor} color. No gradients, no shadows, no textures.
2. CLOTHING: Replace ONLY the clothing/shirt area with a formal black suit jacket, white dress shirt, and black tie.
DO NOT change, alter, modify, regenerate, or touch the person's face, skin, eyes, nose, mouth, hair, head shape, or any facial features in ANY way. The face must be 100% pixel-perfect identical to the original photo.
DO NOT change the person's body position, head angle, or pose.
DO NOT add any new lighting effects on the face.
Only edit: background and clothing. Nothing else.`;
    } else if (addSuit) {
      prompt = `You are a photo editor. Your ONLY task is:
1. CLOTHING: Replace ONLY the clothing/shirt area with a formal black suit jacket, white dress shirt, and black tie.
DO NOT change, alter, modify, regenerate, or touch the person's face, skin, eyes, nose, mouth, hair, head shape, or any facial features in ANY way. The face must be 100% pixel-perfect identical to the original photo.
DO NOT change the background, body position, head angle, or pose.
Only edit: clothing. Nothing else.`;
    } else {
      prompt = `You are a photo editor. Your ONLY task is:
1. BACKGROUND: Replace ONLY the background with a flat solid ${bgColor} color. No gradients, no shadows, no textures.
DO NOT change, alter, modify, regenerate, or touch the person's face, skin, eyes, nose, mouth, hair, head shape, body, clothing, or any other part of the person in ANY way.
Only edit: background. Nothing else.`;
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
