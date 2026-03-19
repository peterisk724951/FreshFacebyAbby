import Image from "next/image";

export const metadata = {
  title: "About | Fresh Face by Abby",
  description:
    "Meet Abby — esthetician and founder of Fresh Face by Abby in Cypress, TX.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-32 px-8 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden">
              <Image
                alt="Abby - Esthetician and founder of Fresh Face by Abby"
                className="w-full h-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC83eyZemjXVd43VP21H0xAKzZRx5-JtmcMOBmEa3NyzOAFbxbWdI-97BBjepL9xQ-WDnjfvb9whEjEUQj3UozUwvqUQJK0Ar36ZnVS1fdxoQUr4yKmeplXBKtl2eAen3IqM4BsRQPxl_HeiFlMKFed3ywis9k7ERtpSXa-ScPQZkjymNAhGiuYa_TvjFu8m1LzmaHcTInykyaTelNQ4YXzA_3SDRs6p_YuOgFlTuEQUnaPF3crKIfT8VHAjskmpa95UHN5OY6KP5M"
                width={500}
                height={625}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6 block">
              About
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tighter mb-10">
              Meet <span className="italic">Abby</span>
            </h1>
            <div className="space-y-6 max-w-lg">
              <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant">
                Fresh Face by Abby is more than just facials &mdash; it&apos;s a
                calming reset for both your skin and your spirit.
              </p>
              <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant">
                Abby offers customized skincare treatments with results-driven
                products and gentle, relaxing service. Whether you&apos;re
                dealing with breakouts, dullness, or simply need a moment of
                calm, she&apos;s here to support you through your skincare
                journey.
              </p>
              <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant">
                Every treatment is fully personalized based on your individual
                skin needs. You&apos;ll leave with aftercare advice to maintain
                your results at home &mdash; and a refreshed, glowing
                complexion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 px-8 md:px-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6 block">
              The Studio
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-light tracking-tighter mb-10">
              Where to Find Us
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-2">
                  Located at
                </p>
                <p className="font-body text-xl font-light">
                  My Salon Suites
                </p>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-2">
                  Address
                </p>
                <p className="font-body text-xl font-light">
                  24300 Hwy 290, Suite 211
                  <br />
                  Cypress, TX 77429
                </p>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-2">
                  Landmark
                </p>
                <p className="font-body text-lg font-light text-on-surface-variant">
                  Next to Goldfish Swim School, behind Mountain Mike Pizza
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
