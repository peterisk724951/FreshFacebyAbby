"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

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

const addons = [
  {
    name: "LED Light Therapy Add-On",
    price: "+$25",
    description: "Boost collagen production and reduce inflammation.",
  },
  {
    name: "Chemical Peel Upgrade",
    price: "+$35",
    description: "Professional-grade peel for deeper exfoliation and glow.",
  },
];

export default function BookPage() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#2f3331",
            "cal-text": "#2f3331",
            "cal-text-emphasis": "#2f3331",
            "cal-border-emphasis": "#afb3b0",
            "cal-text-muted": "#5c605d",
            "cal-bg": "#faf9f7",
            "cal-bg-emphasis": "#f3f4f1",
          },
          dark: {
            "cal-brand": "#2f3331",
            "cal-text": "#2f3331",
            "cal-text-emphasis": "#2f3331",
            "cal-border-emphasis": "#afb3b0",
            "cal-text-muted": "#5c605d",
            "cal-bg": "#faf9f7",
            "cal-bg-emphasis": "#f3f4f1",
          },
        },
      });
    })();
  }, []);

  return (
    <main>
      {/* Service Selection */}
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

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20 mb-24">
            {services.map((service) => (
              <button
                key={service.slug}
                onClick={() =>
                  setSelected(selected === service.slug ? null : service.slug)
                }
                className={`text-left p-10 transition-all duration-500 group ${
                  selected === service.slug
                    ? "bg-inverse-surface text-surface"
                    : "bg-surface hover:bg-surface-container-low"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
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
                    className={`font-headline text-2xl italic ${
                      selected === service.slug
                        ? "text-surface"
                        : "text-on-surface"
                    }`}
                  >
                    {service.price}
                  </span>
                </div>
                <h3
                  className={`font-headline text-3xl mb-4 ${
                    selected === service.slug
                      ? "italic text-surface"
                      : "group-hover:italic"
                  }`}
                >
                  {service.name}
                </h3>
                <p
                  className={`font-body text-sm leading-relaxed font-light mb-6 ${
                    selected === service.slug
                      ? "text-surface-dim"
                      : "text-on-surface-variant"
                  }`}
                >
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.includes.map((item) => (
                    <span
                      key={item}
                      className={`font-label text-[10px] uppercase tracking-wider px-3 py-1.5 ${
                        selected === service.slug
                          ? "bg-surface/10 text-surface-dim"
                          : "bg-surface-container-highest text-on-surface"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mb-24">
            <h2 className="font-headline text-3xl md:text-4xl font-light tracking-tighter mb-10">
              Enhance Your Treatment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20">
              {addons.map((addon) => (
                <div
                  key={addon.name}
                  className="bg-surface-container-low p-8 hover:bg-surface-container transition-colors duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-headline text-xl">{addon.name}</h4>
                    <span className="font-headline text-lg italic text-primary">
                      {addon.price}
                    </span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant font-light leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-on-surface-variant font-light mt-4">
              Mention add-ons when booking or at your appointment. Abby will
              customize your session accordingly.
            </p>
          </div>

          {/* Calendar */}
          {selected ? (
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-light tracking-tighter mb-10">
                Select a Time
              </h2>
              <Cal
                key={selected}
                calLink={`freshfacebyabby/${selected}`}
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "scroll",
                }}
                config={{ layout: "month_view", theme: "light" }}
              />
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="font-headline text-2xl italic text-on-surface-variant">
                Select a service above to view available times
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
