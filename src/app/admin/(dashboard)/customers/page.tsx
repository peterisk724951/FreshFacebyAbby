"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CustomerBooking {
  count: number;
  starts_at: string;
  status: string;
}

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
  bookings: CustomerBooking[];
}

function getLastVisit(bookings: CustomerBooking[]): string | null {
  const completed = bookings
    .filter((b) => b.status === "completed" && b.starts_at)
    .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
  return completed.length > 0 ? completed[0].starts_at : null;
}

function getRetentionFlag(bookings: CustomerBooking[]): "overdue" | "due-soon" | null {
  const lastVisit = getLastVisit(bookings);
  if (!lastVisit) return null;
  const daysSince = Math.floor(
    (Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSince >= 60) return "overdue";
  if (daysSince >= 30) return "due-soon";
  return null;
}

function daysSinceDate(dateStr: string): number {
  return Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      const url = search
        ? `/api/admin/customers?q=${encodeURIComponent(search)}`
        : "/api/admin/customers";
      fetch(url)
        .then((r) => {
          if (r.status === 401) {
            router.push("/admin/login");
            return null;
          }
          return r.json();
        })
        .then((data) => {
          if (data) setCustomers(data);
          setLoading(false);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, router]);

  return (
    <div>
      <div className="mb-10">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
          Clients
        </span>
        <h1 className="font-headline text-3xl md:text-5xl font-light tracking-tighter">
          Customers
        </h1>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-transparent border-b border-outline py-3 font-body text-sm font-light focus:outline-none focus:border-on-surface transition-colors placeholder:text-outline"
        />
      </div>

      {loading ? (
        <p className="font-body text-sm text-on-surface-variant">Loading...</p>
      ) : customers.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-low">
          <p className="font-headline text-xl italic text-on-surface-variant">
            No customers found
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-outline-variant/20">
          {customers.map((customer) => {
            const flag = getRetentionFlag(customer.bookings);
            const lastVisit = getLastVisit(customer.bookings);
            const visitCount = customer.bookings?.length ?? 0;

            return (
              <Link
                key={customer.id}
                href={`/admin/customers/${customer.id}`}
                className="bg-surface p-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 hover:bg-surface-container-low transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm font-medium group-hover:text-primary transition-colors">
                      {customer.first_name} {customer.last_name}
                    </p>
                    {flag === "overdue" && (
                      <span className="px-2 py-0.5 font-label text-[9px] uppercase tracking-widest bg-error/10 text-error">
                        60+ days
                      </span>
                    )}
                    {flag === "due-soon" && (
                      <span className="px-2 py-0.5 font-label text-[9px] uppercase tracking-widest bg-tertiary-container text-on-surface">
                        30+ days
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-on-surface-variant truncate">
                    {customer.email}
                  </p>
                </div>
                <div className="md:w-32 flex-shrink-0">
                  <p className="font-body text-xs text-on-surface-variant">
                    {customer.phone || "—"}
                  </p>
                </div>
                <div className="md:w-36 flex-shrink-0">
                  <p className="font-label text-[10px] uppercase tracking-widest text-primary">
                    {visitCount} visit{visitCount !== 1 ? "s" : ""}
                  </p>
                  {lastVisit && (
                    <p className="font-body text-[10px] text-on-surface-variant">
                      Last: {daysSinceDate(lastVisit)}d ago
                    </p>
                  )}
                </div>
                <div className="md:w-8 flex-shrink-0 text-outline-variant group-hover:text-primary transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
