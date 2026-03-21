"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/calendar", label: "Calendar", icon: "calendarView" },
  { href: "/admin/appointments", label: "Appointments", icon: "calendar" },
  { href: "/admin/customers", label: "Customers", icon: "users" },
  { href: "/admin/contacts", label: "Messages", icon: "mail" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "bell" },
];

function TabIcon({ icon }: { icon: string }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  };

  switch (icon) {
    case "grid":
      return (
        <svg {...props}>
          <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
        </svg>
      );
    case "calendarView":
      return (
        <svg {...props}>
          <path d="M3 6h18v15H3zM3 6V4h18v2M8 2v4M16 2v4M3 10h18M3 14h18M7 10v11M11 10v11M15 10v11M19 10v11" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <path d="M3 6h18v15H3zM3 6V4h18v2M8 2v4M16 2v4M3 10h18" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <circle cx="9" cy="7" r="4" />
          <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
          <path d="M16 3a4 4 0 010 8M21 21v-2a4 4 0 00-3-3.87" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <path d="M3 5h18v14H3zM3 5l9 7 9-7" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      );
    default:
      return null;
  }
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-inverse-surface text-surface flex-col fixed h-screen">
        <div className="p-6 pb-8">
          <Link
            href="/admin"
            className="font-headline text-lg font-light tracking-tighter"
          >
            Fresh Face by Abby
          </Link>
          <p className="font-label text-[10px] uppercase tracking-widest text-surface-dim mt-1">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 px-3">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 mb-1 font-body text-sm transition-colors ${
                  isActive
                    ? "bg-surface/15 text-surface font-medium"
                    : "text-surface-dim hover:bg-surface/10 hover:text-surface"
                }`}
              >
                <TabIcon icon={tab.icon} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full font-label text-[10px] uppercase tracking-widest text-surface-dim hover:text-surface transition-colors py-3"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-inverse-surface text-surface">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/admin"
            className="font-headline text-lg font-light tracking-tighter"
          >
            Admin
          </Link>
          <button
            onClick={handleLogout}
            className="font-label text-[10px] uppercase tracking-widest text-surface-dim"
          >
            Sign Out
          </button>
        </div>
        <div className="flex overflow-x-auto px-2 pb-2 gap-1">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex-shrink-0 px-3 py-2 font-label text-[10px] uppercase tracking-widest transition-colors ${
                  isActive
                    ? "bg-surface/15 text-surface"
                    : "text-surface-dim"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-24 md:pt-0">
        <div className="p-6 md:p-10 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
