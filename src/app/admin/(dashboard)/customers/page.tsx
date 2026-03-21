"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
  bookings: { count: number }[];
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
          {customers.map((customer) => (
            <Link
              key={customer.id}
              href={`/admin/customers/${customer.id}`}
              className="bg-surface p-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-8 hover:bg-surface-container-low transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium group-hover:text-primary transition-colors">
                  {customer.first_name} {customer.last_name}
                </p>
                <p className="font-body text-xs text-on-surface-variant truncate">
                  {customer.email}
                </p>
              </div>
              <div className="md:w-32 flex-shrink-0">
                <p className="font-body text-xs text-on-surface-variant">
                  {customer.phone || "—"}
                </p>
              </div>
              <div className="md:w-24 flex-shrink-0">
                <p className="font-label text-[10px] uppercase tracking-widest text-primary">
                  {customer.bookings?.[0]?.count ?? 0} visits
                </p>
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
          ))}
        </div>
      )}
    </div>
  );
}
