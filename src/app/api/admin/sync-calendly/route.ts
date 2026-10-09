import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { syncFromCalendly } from "@/lib/calendly-sync";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const token = process.env.CALENDLY_PERSONAL_TOKEN ?? "";
  if (!token) {
    return NextResponse.json({ error: "Calendly not configured" }, { status: 500 });
  }

  // ?dry=1 reports what would change without writing anything
  const dryRun = new URL(req.url).searchParams.get("dry") === "1";

  try {
    const result = await syncFromCalendly(supabaseAdmin, token, dryRun);
    return NextResponse.json({ dryRun, ...result });
  } catch (err) {
    console.error("Calendly sync failed:", err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
