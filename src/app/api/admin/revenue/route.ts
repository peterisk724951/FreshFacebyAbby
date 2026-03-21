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

  // Get all completed bookings with service price info
  const { data: bookings, error } = await supabaseAdmin
    .from("bookings")
    .select("id, starts_at, status, price_cents, services(name, price_cents)")
    .in("status", ["completed", "confirmed"])
    .order("starts_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  let thisMonthRevenue = 0;
  let lastMonthRevenue = 0;
  let thisWeekRevenue = 0;
  let totalRevenue = 0;
  let completedCount = 0;
  const serviceBreakdown: Record<string, { count: number; revenue: number }> = {};
  const monthlyData: Record<string, number> = {};

  for (const b of bookings ?? []) {
    const svc = b.services as unknown as { name: string; price_cents: number } | null;
    const price = b.price_cents ?? svc?.price_cents ?? 0;
    const date = new Date(b.starts_at);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (b.status === "completed") {
      totalRevenue += price;
      completedCount++;

      // Monthly aggregation
      monthlyData[monthKey] = (monthlyData[monthKey] ?? 0) + price;

      // Service breakdown
      const serviceName = svc?.name ?? "Other";
      if (!serviceBreakdown[serviceName]) {
        serviceBreakdown[serviceName] = { count: 0, revenue: 0 };
      }
      serviceBreakdown[serviceName].count++;
      serviceBreakdown[serviceName].revenue += price;

      if (date >= startOfMonth) thisMonthRevenue += price;
      if (date >= startOfLastMonth && date <= endOfLastMonth) lastMonthRevenue += price;
      if (date >= startOfWeek) thisWeekRevenue += price;
    }

    // Include confirmed future appointments in this month projection
    if (b.status === "confirmed" && date >= startOfMonth) {
      thisMonthRevenue += price;
    }
  }

  // Build last 6 months array
  const months: { label: string; revenue: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months.push({
      label: d.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      revenue: monthlyData[key] ?? 0,
    });
  }

  // Sort service breakdown by revenue
  const services = Object.entries(serviceBreakdown)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  return NextResponse.json({
    thisMonthRevenue,
    lastMonthRevenue,
    thisWeekRevenue,
    totalRevenue,
    completedCount,
    averageTicket: completedCount > 0 ? Math.round(totalRevenue / completedCount) : 0,
    months,
    services,
  });
}
