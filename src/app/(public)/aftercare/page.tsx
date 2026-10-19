import Link from "next/link";

export const metadata = {
  title: "Aftercare | Fresh Face by Abby",
  description:
    "How to care for your skin after your facial at Fresh Face by Abby in Cypress, TX.",
};

export default function AftercarePage() {
  return (
    <main>
      <section className="py-20 md:py-32 px-6 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6 block">
              Aftercare
            </span>
            <h1 className="font-headline text-4xl md:text-7xl font-light tracking-tighter mb-10 md:mb-16">
              After Your Facial
            </h1>

            <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl mb-10 md:mb-16">
              Your skin has just been deeply cleansed, exfoliated and treated,
              so it&apos;s a little more sensitive than usual. These guidelines
              help you protect your results and keep your glow going at home.
              Always follow any personalized instructions I gave you during
              your session first.
            </p>

            <div className="space-y-10 md:space-y-16">
              <div>
                <h2 className="font-headline text-2xl mb-4">
                  The First 48 Hours
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Skip makeup for at least 24 hours so your skin can breathe and
                  absorb your treatment products. Avoid workouts, saunas, steam
                  rooms and hot showers, since heat and sweat can irritate
                  freshly treated skin. Stay out of pools and hot tubs. And keep
                  your hands off: no touching, picking or squeezing.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">The Next Week</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Wait 3&ndash;5 days before using retinol, exfoliating acids or
                  scrubs, or 5&ndash;7 days if you had microdermabrasion or
                  dermaplaning. Avoid facial waxing, threading or other hair
                  removal for 7 days. Hold off on at-home peels and skincare
                  devices, and avoid tanning and direct sun.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">
                  Your Everyday Routine
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Cleanse gently with lukewarm water and pat dry. Moisturize
                  morning and night. Apply SPF 30 or higher every morning and
                  reapply when you&apos;re outdoors, even on cloudy days. A
                  fresh pillowcase and a clean phone screen help keep breakouts
                  away.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">What&apos;s Normal</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Mild redness or tightness for a few hours is completely
                  normal. Light flaking 2&ndash;5 days after microdermabrasion or
                  dermaplaning is part of the renewal process, so let it shed
                  naturally and keep moisturizing. A few small breakouts can
                  appear as congestion clears.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">When to Reach Out</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  If you notice redness, swelling, burning or blistering that
                  lasts longer than 48 hours, please contact me right away. You
                  can DM me at{" "}
                  <a
                    href="https://instagram.com/freshfacebyabby"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-on-surface transition-colors"
                  >
                    @freshfacebyabby
                  </a>{" "}
                  or send a message through the{" "}
                  <Link
                    href="/contact"
                    className="underline underline-offset-4 hover:text-on-surface transition-colors"
                  >
                    Contact page
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">Your Next Facial</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  For the best results, I recommend booking your next facial in
                  about 4 weeks, which is roughly how long your skin takes to
                  renew itself. Consistent facials, paired with a good routine
                  at home, are what create lasting results.
                </p>
              </div>
            </div>

            <Link
              href="/book"
              className="inline-block mt-12 md:mt-16 bg-on-surface text-surface px-8 py-4 text-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 active:scale-95"
            >
              Book Your Next Facial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
