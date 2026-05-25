import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const db = supabaseAdmin();
    const { data, error } = await db
      .from("cv_data")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return NextResponse.json({ data: data || null });
  } catch (error) {
    console.error("CV get error:", error);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = supabaseAdmin();

    // Check if existing record
    const { data: existing } = await db
      .from("cv_data")
      .select("id")
      .limit(1)
      .single();

    let result;
    if (existing?.id) {
      const { data, error } = await db
        .from("cv_data")
        .update({ ...body, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await db
        .from("cv_data")
        .insert(body)
        .select()
        .single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("CV save error:", error);
    return NextResponse.json({ error: "Gagal simpan data" }, { status: 500 });
  }
}
