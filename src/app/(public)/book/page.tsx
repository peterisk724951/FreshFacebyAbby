"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const services = [
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
  { name: "Microdermabrasion", price: 15 },
  { name: "LED Light Therapy", price: 15 },
  { name: "Enzyme Mask", price: 15 },
];

const BASE_PRICE = 100;

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
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [addonsConfirmed, setAddonsConfirmed] = useState(false);

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) setSelected(service);
  }, [searchParams]);

  function toggleAddon(name: string) {
    setSelectedAddons((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  }

  const addonTotal = selectedAddons.reduce((sum, name) => {
    const addon = customizedAddons.find((a) => a.name === name);
    return sum + (addon?.price ?? 0);
  }, 0);

  const customizedTotal = BASE_PRICE + addonTotal;

  function getCustomizedSlug() {
    const count = selectedAddons.length;
    if (count >= 3) return "customized-facial-75-min-clone"; // 90 min
    if (count >= 2) return "customized-facial-60-min-clone"; // 75 min
    return "customized-facial"; // 60 min
  }

  function getCalendlyUrl(slug: string) {
    const actualSlug = slug === "customized-facial" ? getCustomizedSlug() : slug;
    const base = `https://calendly.com/freshfacebyabby/${actualSlug}?hide_gdpr_banner=1`;
    if (slug === "customized-facial" && selectedAddons.length > 0) {
      const addonsText = `Base Facial ($100) + ${selectedAddons.join(", ")} — Total: $${customizedTotal}`;
      return `${base}&a1=${encodeURIComponent(addonsText)}`;
    }
    if (slug === "customized-facial") {
      return `${base}&a1=${encodeURIComponent(`Base Facial ($100) — No add-ons`)}`;
    }
    return base;
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
                      onClick={() => {
                        setSelected(
                          selected === service.slug ? null : service.slug
                        );
                        setAddonsConfirmed(false);
                        setSelectedAddons([]);
                      }}
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
                    {/* For customized facial, show add-on picker first on mobile */}
                    {selected === service.slug &&
                      service.slug === "customized-facial" &&
                      !addonsConfirmed && (
                        <div className="lg:hidden bg-surface p-6 border-t border-outline-variant/20">
                          <h3 className="font-headline text-xl font-light tracking-tighter mb-4">
                            Customize Your Facial
                          </h3>
                          <p className="font-body text-sm text-on-surface-variant font-light mb-5">
                            Select any add-ons, then continue to pick a time.
                          </p>

                          <div className="p-4 flex justify-between items-center bg-inverse-surface text-surface mb-px">
                            <span className="font-body text-sm font-medium">
                              Base Facial
                            </span>
                            <span className="font-headline text-base italic">
                              $100
                            </span>
                          </div>

                          <div className="flex flex-col gap-px bg-outline-variant/20 mb-4">
                            {customizedAddons.map((addon) => {
                              const isSelected = selectedAddons.includes(addon.name);
                              return (
                                <button
                                  key={addon.name}
                                  onClick={() => toggleAddon(addon.name)}
                                  className={`p-4 flex justify-between items-center transition-all duration-300 text-left ${
                                    isSelected
                                      ? "bg-secondary-container"
                                      : "bg-surface-container-low hover:bg-surface-container"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                                        isSelected
                                          ? "bg-on-surface border-on-surface"
                                          : "border-outline"
                                      }`}
                                    >
                                      {isSelected && (
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="white"
                                          strokeWidth="3"
                                        >
                                          <path d="M5 12l5 5L20 7" />
                                        </svg>
                                      )}
                                    </div>
                                    <span className="font-body text-sm font-light text-on-surface">
                                      {addon.name}
                                    </span>
                                  </div>
                                  <span className="font-headline text-base italic text-primary">
                                    +${addon.price}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="p-4 bg-surface-container-low flex justify-between items-center mb-6">
                            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                              Total
                            </span>
                            <span className="font-headline text-2xl italic">
                              ${customizedTotal}
                            </span>
                          </div>

                          <button
                            onClick={() => setAddonsConfirmed(true)}
                            className="w-full bg-on-surface text-surface py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300"
                          >
                            {selectedAddons.length > 0 ? "Continue to Booking" : "Skip Add-ons & Book"}
                          </button>
                        </div>
                      )}
                    {selected === service.slug &&
                      (service.slug !== "customized-facial" || addonsConfirmed) && (
                        <MobileCalendar url={getCalendlyUrl(selected)} />
                      )}
                  </div>
                ))}
              </div>

              {/* Add-ons — desktop only (mobile has inline picker above) */}
              {selected === "customized-facial" && (
                <div className="mt-12 hidden lg:block">
                  <h2 className="font-headline text-2xl font-light tracking-tighter mb-6">
                    Customize Your Facial
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant font-light mb-6">
                    Add-ons are optional. Select any you&apos;d like to include, or
                    skip and continue straight to booking.
                  </p>

                  {/* Base */}
                  <div className="p-5 flex justify-between items-center bg-inverse-surface text-surface mb-px">
                    <span className="font-body text-sm font-medium">
                      Base Facial
                    </span>
                    <span className="font-headline text-base italic">
                      $100
                    </span>
                  </div>

                  {/* Toggleable add-ons */}
                  <div className="flex flex-col gap-px bg-outline-variant/20">
                    {customizedAddons.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.name);
                      return (
                        <button
                          key={addon.name}
                          onClick={() => toggleAddon(addon.name)}
                          className={`p-5 flex justify-between items-center transition-all duration-300 text-left ${
                            isSelected
                              ? "bg-secondary-container"
                              : "bg-surface-container-low hover:bg-surface-container"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "bg-on-surface border-on-surface"
                                  : "border-outline"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="3"
                                >
                                  <path d="M5 12l5 5L20 7" />
                                </svg>
                              )}
                            </div>
                            <span className="font-body text-sm font-light text-on-surface">
                              {addon.name}
                            </span>
                          </div>
                          <span className="font-headline text-base italic text-primary">
                            +${addon.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Total */}
                  <div className="mt-4 p-5 bg-surface-container-low flex justify-between items-center">
                    <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                      Total
                    </span>
                    <span className="font-headline text-2xl italic">
                      ${customizedTotal}
                    </span>
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
                      key={selected + selectedAddons.join(",")}
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
