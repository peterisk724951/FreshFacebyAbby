import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const view = searchParams.get("view") ?? "upcoming";

  let query = supabaseAdmin
    .from("bookings")
    .select("*, customers(first_name, last_name, email, phone), services(name)")
    .order("starts_at", { ascending: view === "upcoming" });

  if (status) {
    query = query.eq("status", status);
  }

  if (view === "upcoming") {
    query = query
      .gte("starts_at", new Date().toISOString())
      .eq("status", "confirmed");
  }

  const { data, error } = await query.limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const { id, status } = await req.json();
  const validStatuses = ["confirmed", "cancelled", "completed", "no_show"];

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
