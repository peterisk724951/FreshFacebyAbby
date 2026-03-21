import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  return process.env.ADMIN_PW ?? "";
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
}

export function createSessionToken(): string {
  const expiry = Date.now() + SESSION_DURATION_MS;
  const signature = sign(String(expiry));
  return `${expiry}.${signature}`;
}

export function verifyToken(token: string): boolean {
  const [expiryStr, signature] = token.split(".");
  if (!expiryStr || !signature) return false;

  const expiry = Number(expiryStr);
  if (Date.now() > expiry) return false;

  const expectedSig = sign(expiryStr);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSig, "hex")
    );
  } catch {
    return false;
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session?.value) return false;
  return verifyToken(session.value);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
