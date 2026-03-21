"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Stats {
  upcomingThisWeek: number;
  totalCustomers: number;
  newCustomersThisMonth: number;
  unreadContacts: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setStats(data);
      });
  }, [router]);

  if (!stats) {
    return (
      <p className="font-body text-sm text-on-surface-variant">Loading...</p>
    );
  }

  const cards = [
    {
      label: "This Week",
      value: stats.upcomingThisWeek,
      sub: "upcoming appointments",
    },
    {
      label: "Total Clients",
      value: stats.totalCustomers,
      sub: "in your database",
    },
    {
      label: "New This Month",
      value: stats.newCustomersThisMonth,
      sub: "new clients",
    },
    {
      label: "Unread Messages",
      value: stats.unreadContacts,
      sub: "contact submissions",
    },
    {
      label: "Subscribers",
      value: stats.subscribers,
      sub: "newsletter signups",
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
          Overview
        </span>
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-surface p-8 flex flex-col justify-between"
          >
            <span className="font-label text-[10px] uppercase tracking-widest text-primary">
              {card.label}
            </span>
            <div className="mt-4">
              <p className="font-headline text-4xl font-light">{card.value}</p>
              <p className="font-body text-xs text-on-surface-variant font-light mt-1">
                {card.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
