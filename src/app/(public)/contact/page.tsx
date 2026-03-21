"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (res.ok) setSubmitted(true);
  }

  return (
    <main>
      <section className="py-20 md:py-32 px-6 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-4 md:gap-6">
          {/* Info */}
          <div className="col-span-12 md:col-span-4">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6 block">
              Get In Touch
            </span>
            <h1 className="font-headline text-4xl md:text-7xl font-light tracking-tighter mb-8 md:mb-12">
              Contact
            </h1>
            <div className="space-y-10">
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-2">
                  Address
                </p>
                <p className="font-body text-lg font-light">
                  24300 Hwy 290 Suite 211
                  <br />
                  Cypress, TX 77429
                </p>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-2">
                  Social
                </p>
                <p className="font-body text-lg font-light">
                  @freshfacebyabby
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 mt-10 md:mt-0">
            {submitted ? (
              <div className="py-24 text-center">
                <h2 className="font-headline text-3xl italic mb-4">
                  Thank you
                </h2>
                <p className="font-body text-lg font-light text-on-surface-variant">
                  We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-primary block mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-outline py-3 font-body text-lg font-light focus:outline-none focus:border-on-surface transition-colors"
                  />
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-primary block mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-outline py-3 font-body text-lg font-light focus:outline-none focus:border-on-surface transition-colors"
                  />
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-primary block mb-3">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full bg-transparent border-b border-outline py-3 font-body text-lg font-light focus:outline-none focus:border-on-surface transition-colors"
                  />
                </div>
                <div>
                  <label className="font-label text-xs uppercase tracking-widest text-primary block mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-outline py-3 font-body text-lg font-light focus:outline-none focus:border-on-surface transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-on-surface text-surface px-12 py-5 text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
