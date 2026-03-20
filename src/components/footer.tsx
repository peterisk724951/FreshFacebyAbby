import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-12 md:py-16 gap-8">
        <Link
          href="/"
          className="font-headline text-xl italic text-on-surface"
        >
          Fresh Face by Abby
        </Link>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:gap-12 font-label text-[10px] uppercase tracking-[0.2em] font-light">
          <a
            className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
            href="https://instagram.com/freshfacebyabby"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <Link
            className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
            href="/cancellation-policy"
          >
            Cancellation Policy
          </Link>
          <Link
            className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
            href="/before-your-appointment"
          >
            Before Your Appointment
          </Link>
          <Link
            className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
            href="/contact"
          >
            Contact
          </Link>
        </div>
        <div className="text-outline font-label text-[10px] uppercase tracking-[0.2em] font-light opacity-60">
          &copy; {new Date().getFullYear()} Fresh Face by Abby. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
