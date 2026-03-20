import Image from "next/image";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center px-6 md:px-24 py-16 md:py-24 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-12 gap-4 md:gap-6 relative z-10">
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center gap-6 md:gap-8 order-2 md:order-1">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary">
              Cypress, Texas
            </span>
            <h1 className="font-headline text-5xl md:text-8xl lg:text-9xl leading-[0.9] font-light tracking-tighter text-on-surface">
              The Glow of <br />
              <span className="italic font-normal pl-2 md:pl-12 text-primary-dim">
                True Confidence.
              </span>
            </h1>
            <p className="font-body text-base md:text-xl max-w-md text-on-surface-variant font-light leading-relaxed mt-2 md:mt-4">
              Bespoke facial treatments tailored to your skin&apos;s unique
              needs in Cypress, TX.
            </p>
            <div className="mt-4 md:mt-8">
              <a href="/book" className="bg-on-surface text-surface px-10 md:px-12 py-4 md:py-5 text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 inline-block">
                Book Your Appointment
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 order-1 md:order-2 mb-8 md:mb-0 relative">
            <div className="border border-outline-variant/30 p-3 md:p-4 translate-x-2 translate-y-2 md:translate-x-12 md:translate-y-12 mr-2 md:mr-0">
              <Image
                alt="Fresh Face by Abby treatment suite"
                className="w-full grayscale brightness-90 hover:grayscale-0 transition-all duration-700 object-cover"
                src="/studio.jpg"
                width={600}
                height={900}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Signature Quote / Transition */}
      <section className="py-20 md:py-32 bg-surface-container-low px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-2xl md:text-5xl italic font-light leading-snug">
            &ldquo;Skincare is a personal journey. My mission is to provide a
            restorative sanctuary where results meet relaxation.&rdquo;
          </h2>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 md:py-32 px-6 md:px-24 bg-surface" id="services">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-4 md:gap-8">
            <div className="max-w-xl">
              <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
                Our Offerings
              </span>
              <h2 className="font-headline text-4xl md:text-7xl font-light tracking-tighter">
                Client Favorites
              </h2>
            </div>
            <a
              href="/book"
              className="font-body text-sm text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-2 hover:text-on-surface hover:border-on-surface transition-colors"
            >
              View Full Menu
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20">
            {/* Service 1 */}
            <a href="/book?service=abby-s-signature-glow-facial-75-min" className="bg-surface p-8 md:p-10 flex flex-col justify-between md:aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
              <div>
                <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                  75 min / $125
                </span>
                <h3 className="font-headline text-2xl md:text-3xl mt-4 md:mt-6 group-hover:italic transition-all">
                  Abby&apos;s Signature Glow Facial
                </h3>
                <p className="font-body text-sm text-on-surface-variant mt-3 md:mt-4 leading-relaxed font-light">
                  Luxury and deeply restorative. The ultimate reset for your
                  complexion.
                </p>
              </div>
              <svg className="w-8 h-8 mt-6 text-outline-variant group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            {/* Service 2 */}
            <a href="/book?service=ultimate-renewal-facial-90-min" className="bg-surface p-8 md:p-10 flex flex-col justify-between md:aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
              <div>
                <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                  90 min / $150
                </span>
                <h3 className="font-headline text-2xl md:text-3xl mt-4 md:mt-6 group-hover:italic transition-all">
                  Ultimate Renewal Facial
                </h3>
                <p className="font-body text-sm text-on-surface-variant mt-3 md:mt-4 leading-relaxed font-light">
                  Intensive treatment for transformative results and
                  age-defying radiance.
                </p>
              </div>
              <svg className="w-8 h-8 mt-6 text-outline-variant group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            {/* Service 3 */}
            <a href="/book?service=clarifying-acne-facial-60-min" className="bg-surface p-8 md:p-10 flex flex-col justify-between md:aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
              <div>
                <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                  From $110
                </span>
                <h3 className="font-headline text-2xl md:text-3xl mt-4 md:mt-6 group-hover:italic transition-all">
                  Clarifying Acne Facial
                </h3>
                <p className="font-body text-sm text-on-surface-variant mt-3 md:mt-4 leading-relaxed font-light">
                  Calm inflammation and clear congestion with targeted
                  medical-grade products.
                </p>
              </div>
              <svg className="w-8 h-8 mt-6 text-outline-variant group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            {/* Service 4 */}
            <a href="/book?service=customized-facial" className="bg-surface p-8 md:p-10 flex flex-col justify-between md:aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
              <div>
                <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                  60 min / From $100
                </span>
                <h3 className="font-headline text-2xl md:text-3xl mt-4 md:mt-6 group-hover:italic transition-all">
                  Customized Facial
                </h3>
                <p className="font-body text-sm text-on-surface-variant mt-3 md:mt-4 leading-relaxed font-light">
                  Completely personalized to your immediate skin concerns and
                  long-term goals.
                </p>
              </div>
              <svg className="w-8 h-8 mt-6 text-outline-variant group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* About Abby */}
      <section
        className="py-20 md:py-32 px-6 md:px-24 bg-inverse-surface text-surface overflow-hidden"
        id="about"
      >
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="col-span-12 md:col-span-5 relative mb-10 md:mb-0">
            <div className="aspect-[3/2] overflow-hidden border border-surface/20">
              <Image
                alt="Abby - Esthetician"
                className="w-full h-full object-contain"
                src="/abby.webp"
                width={900}
                height={600}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary-fixed-dim mb-6 block">
              Meet The Specialist
            </span>
            <h2 className="font-headline text-4xl md:text-7xl font-light mb-8 md:mb-10 leading-tight">
              Abby
            </h2>
            <p className="font-body text-lg md:text-xl leading-relaxed font-extralight text-surface-dim max-w-lg">
              Hi! I&apos;m Abby, the esthetician behind Fresh Face by Abby. I
              created this space to offer more than just facials &mdash; I
              want each treatment to feel like a calming reset for both your
              skin and your spirit.
            </p>
            <p className="font-body text-lg leading-relaxed font-extralight text-surface-dim/70 max-w-lg mt-6">
              My goal is to help you feel confident in your skin using
              customized treatments, results-driven products, and a gentle,
              relaxing approach. Whether you&apos;re struggling with
              breakouts, dullness, or just need a moment of peace, I&apos;m
              here to support your skin journey in a way that feels intentional
              and personal.
            </p>
            <p className="font-body text-lg leading-relaxed font-extralight text-surface-dim/70 max-w-lg mt-6">
              Every treatment is fully personalized based on your individual
              needs. You&apos;ll leave with aftercare advice to maintain your
              results at home &mdash; and a refreshed, glowing complexion.
            </p>
            <div className="mt-12 h-px bg-surface/20 w-32"></div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 md:py-32 px-6 md:px-24 bg-surface" id="contact">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-4 flex flex-col justify-center">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6 md:mb-8 block">
              Connect
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-light mb-8 md:mb-12">
              Visit the Studio
            </h2>
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
                  @freshface.byabby
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 mt-10 md:mt-0">
            <div className="aspect-video bg-surface-container-high relative overflow-hidden group">
              <div
                className="absolute inset-0 grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-700 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-surface p-8 md:p-12 text-center max-w-xs border border-outline-variant/20">
                  <h4 className="font-headline text-2xl italic mb-4">
                    Cypress Studio
                  </h4>
                  <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant leading-loose">
                    Located in the heart of Cypress Crossing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
