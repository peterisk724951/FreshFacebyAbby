"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const services = [
  {
    name: "Abby's Signature Glow Facial",
    slug: "abby-s-signature-glow-facial-75-min",
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
    slug: "ultimate-renewal-facial-90-min",
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
    slug: "clarifying-acne-facial-60-min",
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
  {
    name: "Customized Facial",
    slug: "customized-facial",
    duration: "60 / 75 / 90 min",
    price: "From $100",
    description:
      "Fully tailored to your immediate skin concerns and long-term goals. Length varies by options selected. This is the perfect choice if you're not sure what your skin needs — Abby will assess and build your treatment in real time.",
    includes: [
      "Skin assessment & consultation",
      "Customized treatment plan",
      "Tailored product selection",
      "Flexible duration",
    ],
  },
];

const customizedAddons = [
  { name: "Base Facial", price: "$100", tier: "base" },
  { name: "Add-on Microdermabrasion", price: "+$15", tier: "single" },
  { name: "Add-on LED Light Therapy", price: "+$15", tier: "single" },
  { name: "Add-on Enzyme Mask", price: "+$15", tier: "single" },
  { name: "Add-on Microderm + LED", price: "+$30", tier: "double" },
  { name: "Add-on Microderm + Enzyme", price: "+$30", tier: "double" },
  { name: "Add-on LED + Enzyme", price: "+$30", tier: "double" },
  { name: "Add-on Microderm + LED + Enzyme", price: "+$45", tier: "triple" },
];

export default function BookPage() {
  return (
    <Suspense>
      <BookContent />
    </Suspense>
  );
}

function MobileCalendar({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div ref={ref} className="lg:hidden bg-surface scroll-mt-24">
      <iframe
        src={`https://cal.com/freshfacebyabby/${slug}?embed=true&layout=month_view&theme=light`}
        className="w-full border-0"
        style={{ minHeight: "600px" }}
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

  return (
    <main>
      <section className="py-32 px-8 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              Schedule
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tighter">
              Book Your Appointment
            </h1>
            <p className="font-body text-lg text-on-surface-variant font-light mt-6 max-w-xl">
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
                      className={`w-full text-left p-8 transition-all duration-500 group ${
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
                      <MobileCalendar slug={selected} />
                    )}
                  </div>
                ))}
              </div>

              {/* Add-ons — only for Customized Facial */}
              {selected === "customized-facial" && (
                <div className="mt-12">
                  <h2 className="font-headline text-2xl font-light tracking-tighter mb-6">
                    Customize Your Facial
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant font-light mb-6">
                    Select your preferred option when booking. Pricing varies by
                    add-ons selected.
                  </p>
                  <div className="flex flex-col gap-px bg-outline-variant/20">
                    {customizedAddons.map((addon) => (
                      <div
                        key={addon.name}
                        className={`p-5 flex justify-between items-center transition-colors duration-300 ${
                          addon.tier === "base"
                            ? "bg-inverse-surface text-surface"
                            : "bg-surface-container-low hover:bg-surface-container"
                        }`}
                      >
                        <span
                          className={`font-body text-sm ${
                            addon.tier === "base"
                              ? "font-medium text-surface"
                              : "font-light text-on-surface"
                          }`}
                        >
                          {addon.name}
                        </span>
                        <span
                          className={`font-headline text-base italic ${
                            addon.tier === "base"
                              ? "text-surface"
                              : "text-primary"
                          }`}
                        >
                          {addon.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                      src={`https://cal.com/freshfacebyabby/${selected}?embed=true&layout=month_view&theme=light`}
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
