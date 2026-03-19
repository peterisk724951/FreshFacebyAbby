import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-inverse-surface text-surface py-3 px-6 text-center overflow-hidden">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] font-light">
          Grand opening prices until 12/31 &middot;{" "}
          <span className="font-medium italic">Booking Now</span>
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="font-headline text-2xl font-light tracking-tighter text-on-surface">
            Fresh Face by Abby
          </div>
          <div className="hidden md:flex items-center gap-12">
            <a
              className="text-on-surface font-medium border-b border-on-surface pb-1 font-headline italic text-lg tracking-tight transition-opacity duration-300"
              href="#"
            >
              Home
            </a>
            <a
              className="text-outline hover:text-on-surface transition-colors font-headline italic text-lg tracking-tight"
              href="#services"
            >
              Services
            </a>
            <a
              className="text-outline hover:text-on-surface transition-colors font-headline italic text-lg tracking-tight"
              href="#about"
            >
              About
            </a>
            <a
              className="text-outline hover:text-on-surface transition-colors font-headline italic text-lg tracking-tight"
              href="#contact"
            >
              Contact
            </a>
          </div>
          <button className="bg-on-surface text-surface px-8 py-3 text-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 active:scale-95">
            Book Now
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-8 md:px-24 py-24 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-12 gap-6 relative z-10">
            <div className="col-span-12 md:col-span-7 flex flex-col justify-center gap-8 order-2 md:order-1">
              <span className="font-label text-xs uppercase tracking-[0.4em] text-primary">
                Cypress, Texas
              </span>
              <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-light tracking-tighter text-on-surface">
                The Glow of <br />
                <span className="italic font-normal pl-4 md:pl-12 text-primary-dim">
                  True Confidence.
                </span>
              </h1>
              <p className="font-body text-lg md:text-xl max-w-md text-on-surface-variant font-light leading-relaxed mt-4">
                Bespoke facial treatments tailored to your skin&apos;s unique
                needs in Cypress, TX.
              </p>
              <div className="mt-8">
                <button className="bg-on-surface text-surface px-12 py-5 text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 inline-block">
                  Book Your Appointment
                </button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 order-1 md:order-2 mb-12 md:mb-0 relative">
              <div className="border border-outline-variant/30 p-4 translate-x-4 translate-y-4 md:translate-x-12 md:translate-y-12">
                <Image
                  alt="Luxury skincare treatment"
                  className="w-full grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyks4aU7es4aQlkvf91CRR-2yNTH0HN-RdQ6BE7D7j9ufeHlclx6SlZE77lKSB-sjJV3qTYym7zmFljqg771bU_k-CoONBZOnMUKQYHJjYP4EzW5r6ozZMag1q_RT0fbYkdZxIlF3JtijL5W69vqmgqmSEz70f92RVugcGMtKK2d7pWaHqGGXaT8E3AS-4PEwrXnxWkgt4VenN1jCTbV9A93WWY7OpVO3GyYcAwh7DGExS1g6slq2lBP1EVzy3tUnwWnC_NQlHW5M"
                  width={600}
                  height={750}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Signature Quote / Transition */}
        <section className="py-32 bg-surface-container-low px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-5xl italic font-light leading-snug">
              &ldquo;Skincare is a personal journey. My mission is to provide a
              restorative sanctuary where results meet relaxation.&rdquo;
            </h2>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-32 px-8 md:px-24 bg-surface" id="services">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-xl">
                <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
                  Our Offerings
                </span>
                <h2 className="font-headline text-5xl md:text-7xl font-light tracking-tighter">
                  Client Favorites
                </h2>
              </div>
              <a
                href="#"
                className="font-body text-sm text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-2 hover:text-on-surface hover:border-on-surface transition-colors"
              >
                View Full Menu
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20">
              {/* Service 1 */}
              <div className="bg-surface p-10 flex flex-col justify-between aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
                <div>
                  <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                    75 min / $125
                  </span>
                  <h3 className="font-headline text-3xl mt-6 group-hover:italic transition-all">
                    Abby&apos;s Signature Glow Facial
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant mt-4 leading-relaxed font-light">
                    Luxury and deeply restorative. The ultimate reset for your
                    complexion.
                  </p>
                </div>
                <span className="text-4xl font-extralight text-outline-variant group-hover:text-primary transition-colors">
                  &#8599;
                </span>
              </div>
              {/* Service 2 */}
              <div className="bg-surface p-10 flex flex-col justify-between aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
                <div>
                  <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                    90 min / $150
                  </span>
                  <h3 className="font-headline text-3xl mt-6 group-hover:italic transition-all">
                    Ultimate Renewal Facial
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant mt-4 leading-relaxed font-light">
                    Intensive treatment for transformative results and
                    age-defying radiance.
                  </p>
                </div>
                <span className="text-4xl font-extralight text-outline-variant group-hover:text-primary transition-colors">
                  &#8599;
                </span>
              </div>
              {/* Service 3 */}
              <div className="bg-surface p-10 flex flex-col justify-between aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
                <div>
                  <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                    From $110
                  </span>
                  <h3 className="font-headline text-3xl mt-6 group-hover:italic transition-all">
                    Clarifying Acne Facial
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant mt-4 leading-relaxed font-light">
                    Calm inflammation and clear congestion with targeted
                    medical-grade products.
                  </p>
                </div>
                <span className="text-4xl font-extralight text-outline-variant group-hover:text-primary transition-colors">
                  &#8599;
                </span>
              </div>
              {/* Service 4 */}
              <div className="bg-surface p-10 flex flex-col justify-between aspect-[3/4] hover:bg-surface-container-low transition-colors duration-500 group">
                <div>
                  <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                    60 min / From $100
                  </span>
                  <h3 className="font-headline text-3xl mt-6 group-hover:italic transition-all">
                    Customized Facial
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant mt-4 leading-relaxed font-light">
                    Completely personalized to your immediate skin concerns and
                    long-term goals.
                  </p>
                </div>
                <span className="text-4xl font-extralight text-outline-variant group-hover:text-primary transition-colors">
                  &#8599;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* About Abby */}
        <section
          className="py-32 px-8 md:px-24 bg-inverse-surface text-surface overflow-hidden"
          id="about"
        >
          <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-5 relative mb-16 md:mb-0">
              <div className="aspect-[4/5] overflow-hidden border border-surface/20">
                <Image
                  alt="Abby - Esthetician"
                  className="w-full h-full object-cover grayscale brightness-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC83eyZemjXVd43VP21H0xAKzZRx5-JtmcMOBmEa3NyzOAFbxbWdI-97BBjepL9xQ-WDnjfvb9whEjEUQj3UozUwvqUQJK0Ar36ZnVS1fdxoQUr4yKmeplXBKtl2eAen3IqM4BsRQPxl_HeiFlMKFed3ywis9k7ERtpSXa-ScPQZkjymNAhGiuYa_TvjFu8m1LzmaHcTInykyaTelNQ4YXzA_3SDRs6p_YuOgFlTuEQUnaPF3crKIfT8VHAjskmpa95UHN5OY6KP5M"
                  width={500}
                  height={625}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <span className="font-label text-xs uppercase tracking-[0.4em] text-primary-fixed-dim mb-6 block">
                Meet The Specialist
              </span>
              <h2 className="font-headline text-5xl md:text-7xl font-light mb-10 leading-tight">
                Abby
              </h2>
              <p className="font-body text-xl leading-relaxed font-extralight text-surface-dim max-w-lg">
                Abby curates every treatment using professional-grade products
                and targeted techniques for your perfect skin reset.
              </p>
              <p className="font-body text-lg leading-relaxed font-extralight text-surface-dim/70 max-w-lg mt-6">
                With an eye for detail and a passion for holistic skin health,
                she combines science-backed methods with an editorial eye for
                beauty.
              </p>
              <div className="mt-12 h-px bg-surface/20 w-32"></div>
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="py-32 px-8 md:px-24 bg-surface" id="contact">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 flex flex-col justify-center">
              <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-8 block">
                Connect
              </span>
              <h2 className="font-headline text-5xl font-light mb-12">
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
            <div className="col-span-12 md:col-span-8 mt-16 md:mt-0">
              <div className="aspect-video bg-surface-container-high relative overflow-hidden group">
                <div
                  className="absolute inset-0 grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-700 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-surface p-12 text-center max-w-xs border border-outline-variant/20">
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

      {/* Footer */}
      <footer className="bg-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-16 gap-8">
          <div className="font-headline text-xl italic text-on-surface">
            Fresh Face by Abby
          </div>
          <div className="flex flex-wrap justify-center gap-12 font-label text-[10px] uppercase tracking-[0.2em] font-light">
            <a
              className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
              href="#"
            >
              Instagram
            </a>
            <a
              className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
              href="#"
            >
              Facebook
            </a>
            <a
              className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
              href="#"
            >
              Location
            </a>
            <a
              className="text-outline hover:text-on-surface transition-colors duration-300 opacity-80 hover:opacity-100"
              href="#"
            >
              Privacy
            </a>
          </div>
          <div className="text-outline font-label text-[10px] uppercase tracking-[0.2em] font-light opacity-60">
            &copy; 2024 Fresh Face by Abby. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
