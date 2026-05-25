import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const APP_USERNAME = process.env.APP_USERNAME || "admin";
const APP_PASSWORD = process.env.APP_PASSWORD || "password123";
const SESSION_KEY = "app_session";

export function verifyCredentials(username: string, password: string): boolean {
  return username === APP_USERNAME && password === APP_PASSWORD;
}

export function getSession(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(SESSION_KEY)?.value;
}

export function requireAuth() {
  const session = getSession();
  if (!session || session !== process.env.APP_SECRET) {
    redirect("/login");
  }
}

export function isAuthenticated(): boolean {
  const session = getSession();
  return session === process.env.APP_SECRET;
}
