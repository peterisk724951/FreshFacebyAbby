import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createSessionToken, setSessionCookie } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPw = process.env.ADMIN_PW ?? "";

  if (!adminPw) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const match = crypto.timingSafeEqual(
    Buffer.from(password ?? ""),
    Buffer.from(adminPw)
  );

  if (!match) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createSessionToken();
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
