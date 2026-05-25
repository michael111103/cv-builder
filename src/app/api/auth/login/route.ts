import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const validUser = process.env.APP_USERNAME || "admin";
  const validPass = process.env.APP_PASSWORD || "password123";
  const secret = process.env.APP_SECRET || "secret-key";

  if (username === validUser && password === validPass) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("app_session", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
