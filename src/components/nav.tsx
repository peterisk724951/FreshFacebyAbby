"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-inverse-surface text-surface py-3 px-6 text-center overflow-hidden">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] font-light">
          Grand opening prices until 12/31 &middot;{" "}
          <span className="font-medium italic">Booking Now</span>
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <Link
            href="/"
            className="font-headline text-2xl font-light tracking-tighter text-on-surface"
          >
            Fresh Face by Abby
          </Link>
          <div className="hidden md:flex items-center gap-12">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#", "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-headline italic text-lg tracking-tight transition-colors ${
                    isActive
                      ? "text-on-surface font-medium border-b border-on-surface pb-1"
                      : "text-outline hover:text-on-surface"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <Link
            href="/book"
            className="hidden md:block bg-on-surface text-surface px-8 py-3 text-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 active:scale-95"
          >
            Book Now
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-full bg-on-surface transition-all duration-300 ${
                open ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-on-surface transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-on-surface transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-6 px-8 pb-8 pt-2">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#", "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-headline italic text-2xl tracking-tight transition-colors ${
                    isActive
                      ? "text-on-surface font-medium"
                      : "text-outline hover:text-on-surface"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="bg-on-surface text-surface px-8 py-4 text-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 text-center mt-2"
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
