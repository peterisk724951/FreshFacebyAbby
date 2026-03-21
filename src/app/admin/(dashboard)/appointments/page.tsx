"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  notes: string;
  customers: { first_name: string; last_name: string; email: string; phone: string } | null;
  services: { name: string } | null;
}

export default function AppointmentsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [view, setView] = useState<"upcoming" | "all">("upcoming");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/appointments?view=${view}`)
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setBookings(data);
        setLoading(false);
      });
  }, [view, router]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  function formatTime(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const statusColors: Record<string, string> = {
    confirmed: "bg-secondary-container text-on-surface",
    completed: "bg-surface-container-high text-on-surface",
    cancelled: "bg-error/10 text-error",
    no_show: "bg-error/10 text-error",
  };

  return (
    <div>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
            Schedule
          </span>
          <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
            Appointments
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("upcoming")}
            className={`px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-colors ${
              view === "upcoming"
                ? "bg-on-surface text-surface"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setView("all")}
            className={`px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-colors ${
              view === "all"
                ? "bg-on-surface text-surface"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {loading ? (
        <p className="font-body text-sm text-on-surface-variant">Loading...</p>
      ) : bookings.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-low">
          <p className="font-headline text-xl italic text-on-surface-variant">
            No appointments found
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-outline-variant/20">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-surface p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
            >
              <div className="md:w-32 flex-shrink-0">
                <p className="font-body text-sm font-medium">
                  {formatDate(booking.starts_at)}
                </p>
                <p className="font-body text-xs text-on-surface-variant">
                  {formatTime(booking.starts_at)}
                  {booking.ends_at && ` – ${formatTime(booking.ends_at)}`}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium truncate">
                  {booking.customers
                    ? `${booking.customers.first_name} ${booking.customers.last_name}`
                    : "Unknown client"}
                </p>
                <p className="font-body text-xs text-on-surface-variant truncate">
                  {booking.customers?.email}
                  {booking.customers?.phone && ` · ${booking.customers.phone}`}
                </p>
              </div>
              <div className="md:w-48 flex-shrink-0">
                <p className="font-body text-sm text-on-surface-variant">
                  {booking.services?.name ?? "—"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`px-3 py-1 font-label text-[10px] uppercase tracking-widest ${
                    statusColors[booking.status] ?? "bg-surface-container-low"
                  }`}
                >
                  {booking.status.replace("_", " ")}
                </span>
                {booking.status === "confirmed" && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateStatus(booking.id, "completed")}
                      className="px-2 py-1 font-label text-[9px] uppercase tracking-widest bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, "no_show")}
                      className="px-2 py-1 font-label text-[9px] uppercase tracking-widest bg-surface-container-low hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors"
                    >
                      No-show
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
