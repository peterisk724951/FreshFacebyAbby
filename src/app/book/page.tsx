"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookPage() {
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
      <section className="py-32 px-8 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              Schedule
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tighter">
              Book Your Appointment
            </h1>
          </div>
          <Cal
            calLink="freshfacebyabby"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "light" }}
          />
        </div>
      </section>
    </main>
  );
}
