import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD || "mekarsari2024";

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const token = await createToken({ role: "admin", name: "Mekar Sari Admin" });

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return response;
}
