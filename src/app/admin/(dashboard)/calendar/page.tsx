"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
  notes: string;
  customers: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  } | null;
  services: { name: string } | null;
}

const STATUS_DOT: Record<string, string> = {
  confirmed: "bg-primary",
  completed: "bg-on-surface-variant",
  cancelled: "bg-error/50",
  no_show: "bg-error",
};

export default function CalendarPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/appointments?view=all`)
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
  }, [router]);

  // Group bookings by date string (YYYY-MM-DD)
  const bookingsByDate = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    bookings.forEach((b) => {
      if (!b.starts_at) return;
      const dateKey = b.starts_at.slice(0, 10);
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(b);
    });
    // Sort each day's bookings by time
    Object.values(map).forEach((arr) =>
      arr.sort(
        (a, b) =>
          new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
      )
    );
    return map;
  }, [bookings]);

  // Calendar grid computation
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  function dateKey(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  }

  function goToday() {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    );
  }

  const todayKey = (() => {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
  })();

  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedBookings = selectedDate ? bookingsByDate[selectedDate] ?? [] : [];

  function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formatSelectedDate(ds: string) {
    const d = new Date(ds + "T12:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div>
      <div className="mb-10">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
          Schedule
        </span>
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
          Calendar
        </h1>
      </div>

      {loading ? (
        <p className="font-body text-sm text-on-surface-variant">Loading...</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Grid */}
          <div className="flex-1">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-surface-container transition-colors"
                aria-label="Previous month"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-4">
                <h2 className="font-headline text-xl tracking-tight">
                  {monthLabel}
                </h2>
                <button
                  onClick={goToday}
                  className="px-3 py-1 font-label text-[10px] uppercase tracking-widest bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
                >
                  Today
                </button>
              </div>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-surface-container transition-colors"
                aria-label="Next month"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div
                  key={d}
                  className="text-center font-label text-[10px] uppercase tracking-widest text-on-surface-variant py-2"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7 border-t border-l border-outline-variant/30">
              {weeks.flat().map((day, i) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${i}`}
                      className="border-r border-b border-outline-variant/30 bg-surface-container-low/30 min-h-[72px] md:min-h-[88px]"
                    />
                  );
                }
                const dk = dateKey(day);
                const dayBookings = bookingsByDate[dk] ?? [];
                const isToday = dk === todayKey;
                const isSelected = dk === selectedDate;

                return (
                  <button
                    key={dk}
                    onClick={() => setSelectedDate(dk)}
                    className={`border-r border-b border-outline-variant/30 min-h-[72px] md:min-h-[88px] p-1.5 md:p-2 text-left transition-colors relative ${
                      isSelected
                        ? "bg-primary/8"
                        : "hover:bg-surface-container-low"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 font-body text-sm ${
                        isToday
                          ? "bg-on-surface text-surface font-medium"
                          : "text-on-surface"
                      }`}
                    >
                      {day}
                    </span>
                    {dayBookings.length > 0 && (
                      <div className="mt-1 flex flex-col gap-0.5">
                        {/* On desktop show up to 3 labels, on mobile show dots */}
                        <div className="hidden md:flex flex-col gap-0.5">
                          {dayBookings.slice(0, 3).map((b) => (
                            <div
                              key={b.id}
                              className={`text-[10px] font-body leading-tight truncate px-1 py-0.5 ${
                                b.status === "cancelled" || b.status === "no_show"
                                  ? "text-on-surface-variant/50 line-through"
                                  : "text-on-surface"
                              } ${
                                b.status === "confirmed"
                                  ? "bg-secondary-container/50"
                                  : "bg-surface-container"
                              }`}
                            >
                              {formatTime(b.starts_at)}{" "}
                              {b.customers
                                ? b.customers.first_name
                                : "Client"}
                            </div>
                          ))}
                          {dayBookings.length > 3 && (
                            <span className="text-[9px] font-label text-on-surface-variant px-1">
                              +{dayBookings.length - 3} more
                            </span>
                          )}
                        </div>
                        {/* Mobile: just dots */}
                        <div className="flex md:hidden gap-0.5 mt-0.5">
                          {dayBookings.slice(0, 4).map((b) => (
                            <span
                              key={b.id}
                              className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[b.status] ?? "bg-on-surface-variant"}`}
                            />
                          ))}
                          {dayBookings.length > 4 && (
                            <span className="text-[8px] text-on-surface-variant leading-none">
                              +{dayBookings.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Detail */}
          <div className="lg:w-80 flex-shrink-0">
            {selectedDate ? (
              <div>
                <h3 className="font-headline text-lg tracking-tight mb-1">
                  {formatSelectedDate(selectedDate)}
                </h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-6">
                  {selectedBookings.length} appointment
                  {selectedBookings.length !== 1 ? "s" : ""}
                </p>
                {selectedBookings.length === 0 ? (
                  <div className="py-12 text-center bg-surface-container-low">
                    <p className="font-body text-sm text-on-surface-variant italic">
                      No appointments
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {selectedBookings.map((b) => (
                      <div
                        key={b.id}
                        className={`p-4 bg-surface-container-low border-l-2 ${
                          b.status === "confirmed"
                            ? "border-primary"
                            : b.status === "completed"
                              ? "border-on-surface-variant"
                              : "border-error/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="font-body text-sm font-medium">
                            {b.customers
                              ? `${b.customers.first_name} ${b.customers.last_name}`
                              : "Unknown client"}
                          </p>
                          <span
                            className={`flex-shrink-0 px-2 py-0.5 font-label text-[9px] uppercase tracking-widest ${
                              b.status === "confirmed"
                                ? "bg-secondary-container text-on-surface"
                                : b.status === "completed"
                                  ? "bg-surface-container-high text-on-surface"
                                  : "bg-error/10 text-error"
                            }`}
                          >
                            {b.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="font-body text-xs text-on-surface-variant">
                          {formatTime(b.starts_at)}
                          {b.ends_at && ` – ${formatTime(b.ends_at)}`}
                        </p>
                        {b.services && (
                          <p className="font-body text-xs text-on-surface-variant mt-1">
                            {b.services.name}
                          </p>
                        )}
                        {b.customers?.email && (
                          <p className="font-body text-[11px] text-on-surface-variant/70 mt-2">
                            {b.customers.email}
                            {b.customers.phone && ` · ${b.customers.phone}`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="font-body text-sm text-on-surface-variant italic">
                  Select a day to see appointments
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
