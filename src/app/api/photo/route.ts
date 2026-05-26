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

    const bgDescription: Record<string, string> = {
      white: "pure white (#FFFFFF), RGB(255,255,255)",
      "light-gray": "light gray (#F0F0F0), RGB(240,240,240)",
      "light-blue": "light blue (#D6E4F0), RGB(214,228,240)",
      blue: "medium blue (#2E86C1), RGB(46,134,193)",
      gray: "medium gray (#808080), RGB(128,128,128)",
    };

    const bgDesc = bgDescription[bgColor] || `solid ${bgColor}`;

    let prompt = "";
    if (addSuit && bgColor) {
      prompt = `You are a professional photo retoucher. Follow these instructions STRICTLY:

WHAT TO CHANGE:
1. BACKGROUND ONLY: Replace the entire background with a completely flat, solid ${bgDesc} color. Zero shadow, zero gradient, zero vignette, zero texture on background.
2. CLOTHING ONLY: Replace only the shirt/clothing area with a formal black suit jacket, white dress shirt, and black tie.

WHAT TO NEVER CHANGE (ABSOLUTE RULES):
- DO NOT alter, regenerate, smooth, reshape, or modify the face in ANY way
- DO NOT change the eyes, nose, mouth, ears, chin, jawline, or any facial feature
- DO NOT modify, smooth, reshape, or alter the hair — keep every strand pixel-identical to the original
- DO NOT relight, brighten, darken, or change the skin tone or facial lighting
- DO NOT zoom in or crop closer than the original photo
- DO NOT change the head angle, body position, or pose
- DO NOT add makeup, smooth skin, or enhance appearance

The face and hair must be 100% identical to the source photo. Only background and clothing change.`;
    } else if (addSuit) {
      prompt = `You are a professional photo retoucher. Follow these instructions STRICTLY:

WHAT TO CHANGE:
1. CLOTHING ONLY: Replace only the shirt/clothing area with a formal black suit jacket, white dress shirt, and black tie.

WHAT TO NEVER CHANGE (ABSOLUTE RULES):
- DO NOT alter, regenerate, smooth, reshape, or modify the face in ANY way
- DO NOT change the eyes, nose, mouth, ears, chin, jawline, or any facial feature
- DO NOT modify, smooth, reshape, or alter the hair — keep every strand pixel-identical to the original
- DO NOT relight, brighten, darken, or change the skin tone or facial lighting
- DO NOT zoom in or crop closer than the original photo
- DO NOT change the background, head angle, body position, or pose

The face and hair must be 100% identical to the source photo. Only clothing changes.`;
    } else {
      prompt = `You are a professional photo retoucher. Follow these instructions STRICTLY:

WHAT TO CHANGE:
1. BACKGROUND ONLY: Replace the entire background with a completely flat, solid ${bgDesc} color. Zero shadow, zero gradient, zero vignette, zero texture on background.

WHAT TO NEVER CHANGE (ABSOLUTE RULES):
- DO NOT alter, regenerate, smooth, reshape, or modify the face in ANY way
- DO NOT change any part of the person at all — face, hair, clothing, skin, body
- DO NOT relight, brighten, darken, or change the skin tone or facial lighting
- DO NOT zoom in or crop closer than the original photo
- DO NOT change the head angle, body position, or pose

The person must be 100% identical to the source photo. Only the background changes.`;
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
