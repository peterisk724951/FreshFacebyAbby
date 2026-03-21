import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  }

  const now = new Date().toISOString();
  const weekFromNow = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const monthAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const [upcoming, upcomingList, totalCustomers, newCustomers, unreadContacts, subscribers] =
    await Promise.all([
      supabaseAdmin
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "confirmed")
        .gte("starts_at", now)
        .lte("starts_at", weekFromNow),
      supabaseAdmin
        .from("bookings")
        .select("id, starts_at, ends_at, status, customers(first_name, last_name), services(name)")
        .eq("status", "confirmed")
        .gte("starts_at", now)
        .order("starts_at", { ascending: true })
        .limit(5),
      supabaseAdmin
        .from("customers")
        .select("*", { count: "exact", head: true }),
      supabaseAdmin
        .from("customers")
        .select("*", { count: "exact", head: true })
        .gte("created_at", monthAgo),
      supabaseAdmin
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("read", false),
      supabaseAdmin
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .is("unsubscribed_at", null),
    ]);

  return NextResponse.json({
    upcomingThisWeek: upcoming.count ?? 0,
    upcomingAppointments: upcomingList.data ?? [],
    totalCustomers: totalCustomers.count ?? 0,
    newCustomersThisMonth: newCustomers.count ?? 0,
    unreadContacts: unreadContacts.count ?? 0,
    subscribers: subscribers.count ?? 0,
  });
}
