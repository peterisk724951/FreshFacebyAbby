"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GIFT_CARD_URL } from "@/lib/links";

const services = [
  {
    name: "The Essential Glow Facial",
    // Site slug (used in /book?service=...). The Calendly event behind it keeps
    // its original link, see calendlySlug.
    slug: "the-essential-glow-facial",
    calendlySlug: "customized-facial",
    duration: "60 min",
    price: "$100",
    description:
      "The right first facial, and the one to keep coming back to. A deep double cleanse, exfoliation suited to your skin, steam and extractions where needed, a customized mask, and a finish of serum, moisturizer and SPF. You leave clean, calm and glowing, in an hour. Good for: first visits, monthly maintenance, and anyone who wants real results on a lunch break. Want more? Abby's Signature Glow adds 15 minutes of massage and advanced treatment for $125.",
    includes: [
      "Deep double cleanse",
      "Exfoliation suited to your skin",
      "Steam & extractions (if needed)",
      "Customized mask",
      "Serum, moisturizer & SPF",
    ],
  },
  {
    name: "Abby's Signature Glow Facial",
    slug: "abby-s-signature-glow-facial",
    duration: "75 min",
    price: "$125",
    description:
      "Your go-to luxury facial. This deeply restorative treatment is fully customized to your skin needs and includes a double cleanse, exfoliation, facial massage, treatment mask, extractions (if needed), and hydration. A diamond-tip microdermabrasion gently resurfaces the skin for a refined texture, while LED light therapy targets inflammation or aging (as needed).",
    includes: [
      "Double cleanse",
      "Exfoliation",
      "Facial massage",
      "Treatment mask",
      "Extractions (if needed)",
      "Microdermabrasion",
      "LED light therapy",
      "Hydration",
    ],
  },
  {
    name: "Ultimate Renewal Facial",
    slug: "ultimate-renewal-facial",
    duration: "90 min",
    price: "$150",
    description:
      "An elevated and intensive treatment for transformative results. Includes all the essentials: deep double cleanse, microdermabrasion, facial massage, LED light therapy, and a professional-grade chemical peel (if suitable for your skin). Helps smooth texture, lighten hyperpigmentation, and target signs of aging with no harsh downtime.",
    includes: [
      "Deep double cleanse",
      "Microdermabrasion",
      "Facial massage",
      "LED light therapy",
      "Chemical peel",
      "Hydration & aftercare",
    ],
  },
  {
    name: "Clarifying Acne Facial",
    slug: "clarifying-acne-facial",
    duration: "60 min",
    price: "From $110",
    description:
      "A targeted facial designed to calm inflammation, clear congestion, and rebalance oily or breakout-prone skin. This treatment includes a double cleanse with pore-purifying ingredients, enzyme exfoliation or a gentle chemical exfoliant, steam, thorough extractions (if needed), a soothing treatment mask, and high frequency to kill acne-causing bacteria.",
    includes: [
      "Pore-purifying double cleanse",
      "Enzyme or chemical exfoliation",
      "Steam",
      "Thorough extractions",
      "Soothing treatment mask",
      "High frequency treatment",
    ],
  },
];

export default function BookPage() {
  return (
    <Suspense>
      <BookContent />
    </Suspense>
  );
}

function MobileCalendar({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div ref={ref} className="lg:hidden bg-surface scroll-mt-24">
      <iframe
        src={url}
        className="w-full border-0"
        style={{ minHeight: "700px" }}
      />
    </div>
  );
}

function BookContent() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) setSelected(service);
  }, [searchParams]);

  function getCalendlyUrl(slug: string) {
    const service = services.find((s) => s.slug === slug);
    const calendlySlug = service?.calendlySlug ?? slug;
    return `https://calendly.com/freshfacebyabby/${calendlySlug}?hide_gdpr_banner=1`;
  }

  return (
    <main>
      <section className="py-20 md:py-32 px-6 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-10 md:mb-16">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              Schedule
            </span>
            <h1 className="font-headline text-4xl md:text-7xl font-light tracking-tighter">
              Book Your Appointment
            </h1>
            <p className="font-body text-base md:text-lg text-on-surface-variant font-light mt-4 md:mt-6 max-w-xl">
              Select a treatment below to view available times.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Services list */}
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-px bg-outline-variant/20">
                {services.map((service) => (
                  <div key={service.slug}>
                    <button
                      onClick={() =>
                        setSelected(
                          selected === service.slug ? null : service.slug
                        )
                      }
                      className={`w-full text-left p-6 md:p-8 transition-all duration-500 group ${
                        selected === service.slug
                          ? "bg-inverse-surface text-surface"
                          : "bg-surface hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`font-label text-[10px] tracking-widest uppercase ${
                            selected === service.slug
                              ? "text-surface-dim"
                              : "text-primary"
                          }`}
                        >
                          {service.duration}
                        </span>
                        <span
                          className={`font-headline text-xl italic ${
                            selected === service.slug
                              ? "text-surface"
                              : "text-on-surface"
                          }`}
                        >
                          {service.price}
                        </span>
                      </div>
                      <h3
                        className={`font-headline text-2xl mb-3 ${
                          selected === service.slug
                            ? "italic text-surface"
                            : "group-hover:italic"
                        }`}
                      >
                        {service.name}
                      </h3>
                      <p
                        className={`font-body text-sm leading-relaxed font-light ${
                          selected === service.slug
                            ? "text-surface-dim"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {service.description}
                      </p>
                      {selected === service.slug && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {service.includes.map((item) => (
                            <span
                              key={item}
                              className="font-label text-[10px] uppercase tracking-wider px-3 py-1.5 bg-surface/10 text-surface-dim"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>

                    {/* Mobile calendar — shows below selected card */}
                    {selected === service.slug && (
                      <MobileCalendar url={getCalendlyUrl(selected)} />
                    )}
                  </div>
                ))}
              </div>

              {/* Gift cards */}
              <div className="mt-12 p-6 md:p-8 bg-surface-container-low">
                <h2 className="font-headline text-2xl font-light tracking-tighter mb-3">
                  Buying for someone else?
                </h2>
                <p className="font-body text-sm text-on-surface-variant font-light mb-6">
                  Give the gift of glow with a Fresh Face by Abby gift card.
                </p>
                <a
                  href={GIFT_CARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-on-surface text-surface px-8 py-4 text-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 active:scale-95"
                >
                  Shop Gift Cards
                </a>
              </div>
            </div>

            {/* Desktop calendar — sticky on the right */}
            <div className="hidden lg:block lg:col-span-7">
              <div className="sticky top-28">
                {selected ? (
                  <div>
                    <h2 className="font-headline text-2xl font-light tracking-tighter mb-6">
                      Select a Time
                    </h2>
                    <iframe
                      key={selected}
                      src={getCalendlyUrl(selected)}
                      className="w-full border-0"
                      style={{ minHeight: "700px" }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 bg-surface-container-low">
                    <p className="font-headline text-2xl italic text-on-surface-variant">
                      Select a service to view times
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
