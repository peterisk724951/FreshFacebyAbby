"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RevenueData {
  thisMonthRevenue: number;
  lastMonthRevenue: number;
  thisWeekRevenue: number;
  totalRevenue: number;
  completedCount: number;
  averageTicket: number;
  months: { label: string; revenue: number }[];
  services: { name: string; count: number; revenue: number }[];
}

function dollars(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function RevenuePage() {
  const [data, setData] = useState<RevenueData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/revenue")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) setData(d);
      });
  }, [router]);

  if (!data) {
    return (
      <p className="font-body text-sm text-on-surface-variant">Loading...</p>
    );
  }

  const maxMonthRevenue = Math.max(...data.months.map((m) => m.revenue), 1);

  const monthChange =
    data.lastMonthRevenue > 0
      ? Math.round(
          ((data.thisMonthRevenue - data.lastMonthRevenue) /
            data.lastMonthRevenue) *
            100
        )
      : null;

  return (
    <div>
      <div className="mb-10">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
          Financials
        </span>
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
          Revenue
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20 mb-12">
        <div className="bg-surface p-8">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary">
            This Month
          </span>
          <div className="mt-4">
            <p className="font-headline text-4xl font-light">
              {dollars(data.thisMonthRevenue)}
            </p>
            {monthChange !== null && (
              <p
                className={`font-body text-xs mt-1 ${monthChange >= 0 ? "text-secondary" : "text-error"}`}
              >
                {monthChange >= 0 ? "+" : ""}
                {monthChange}% vs last month
              </p>
            )}
          </div>
        </div>
        <div className="bg-surface p-8">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary">
            This Week
          </span>
          <div className="mt-4">
            <p className="font-headline text-4xl font-light">
              {dollars(data.thisWeekRevenue)}
            </p>
          </div>
        </div>
        <div className="bg-surface p-8">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary">
            Avg Ticket
          </span>
          <div className="mt-4">
            <p className="font-headline text-4xl font-light">
              {dollars(data.averageTicket)}
            </p>
            <p className="font-body text-xs text-on-surface-variant mt-1">
              per appointment
            </p>
          </div>
        </div>
        <div className="bg-surface p-8">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary">
            All Time
          </span>
          <div className="mt-4">
            <p className="font-headline text-4xl font-light">
              {dollars(data.totalRevenue)}
            </p>
            <p className="font-body text-xs text-on-surface-variant mt-1">
              {data.completedCount} completed
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="mb-12">
        <h2 className="font-headline text-xl tracking-tight mb-6">
          Last 6 Months
        </h2>
        <div className="flex items-end gap-3 h-48">
          {data.months.map((m) => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-2">
              <span className="font-body text-[10px] text-on-surface-variant">
                {m.revenue > 0 ? dollars(m.revenue) : "—"}
              </span>
              <div
                className="w-full bg-primary/20 transition-all relative group"
                style={{
                  height: `${Math.max((m.revenue / maxMonthRevenue) * 160, 4)}px`,
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-primary transition-all"
                  style={{
                    height: `${Math.max((m.revenue / maxMonthRevenue) * 160, 4)}px`,
                  }}
                />
              </div>
              <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">
                {m.label.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Breakdown */}
      <div>
        <h2 className="font-headline text-xl tracking-tight mb-6">
          By Service
        </h2>
        {data.services.length === 0 ? (
          <div className="py-12 text-center bg-surface-container-low">
            <p className="font-body text-sm text-on-surface-variant italic">
              No completed appointments yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-px bg-outline-variant/20">
            {data.services.map((s) => {
              const pct =
                data.totalRevenue > 0
                  ? Math.round((s.revenue / data.totalRevenue) * 100)
                  : 0;
              return (
                <div
                  key={s.name}
                  className="bg-surface p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium">{s.name}</p>
                    <p className="font-body text-xs text-on-surface-variant">
                      {s.count} appointment{s.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="sm:w-48 flex-shrink-0">
                    <div className="w-full bg-surface-container-low h-2">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="sm:w-24 flex-shrink-0 text-right">
                    <p className="font-body text-sm font-medium">
                      {dollars(s.revenue)}
                    </p>
                    <p className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant">
                      {pct}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
