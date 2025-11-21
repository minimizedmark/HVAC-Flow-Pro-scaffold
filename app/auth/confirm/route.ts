import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerSupabase } from "../../../lib/supabase/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const access_token = payload.access_token || (new URL(request.url).searchParams.get("access_token"));
  const refresh_token = payload.refresh_token || (new URL(request.url).searchParams.get("refresh_token"));
  if (!access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const cookieStore = cookies();
  cookieStore.set({
    name: "sb-access-token",
    value: access_token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30
  });
  if (refresh_token) {
    cookieStore.set({
      name: "sb-refresh-token",
      value: refresh_token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30
    });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
