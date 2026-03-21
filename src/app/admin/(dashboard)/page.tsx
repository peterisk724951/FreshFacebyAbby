"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UpcomingBooking {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  customers: { first_name: string; last_name: string } | null;
  services: { name: string } | null;
}

interface Stats {
  upcomingThisWeek: number;
  upcomingAppointments: UpcomingBooking[];
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

      {/* Upcoming Appointments */}
      <div className="mt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
              Coming Up
            </span>
            <h2 className="font-headline text-2xl font-light tracking-tighter">
              Upcoming Appointments
            </h2>
          </div>
          <Link
            href="/admin/appointments"
            className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
          >
            View All
          </Link>
        </div>

        {stats.upcomingAppointments.length === 0 ? (
          <div className="py-12 text-center bg-surface-container-low">
            <p className="font-headline text-lg italic text-on-surface-variant">
              No upcoming appointments
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-px bg-outline-variant/20">
            {stats.upcomingAppointments.map((booking) => (
              <div
                key={booking.id}
                className="bg-surface p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
              >
                <div className="sm:w-28 flex-shrink-0">
                  <p className="font-body text-sm font-medium">
                    {new Date(booking.starts_at).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="font-body text-xs text-on-surface-variant">
                    {new Date(booking.starts_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {booking.ends_at &&
                      ` – ${new Date(booking.ends_at).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}`}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium truncate">
                    {booking.customers
                      ? `${booking.customers.first_name} ${booking.customers.last_name}`
                      : "Unknown client"}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="font-body text-sm text-on-surface-variant">
                    {booking.services?.name ?? "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
