export const metadata = {
  title: "Before Your Appointment | Fresh Face by Abby",
  description:
    "How to prepare for your facial appointment at Fresh Face by Abby in Cypress, TX.",
};

export default function BeforeYourAppointmentPage() {
  return (
    <main>
      <section className="py-32 px-8 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6 block">
              Preparation
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-light tracking-tighter mb-16">
              Before Your Appointment
            </h1>

            <div className="space-y-16">
              <div>
                <h2 className="font-headline text-2xl mb-4">
                  Arrive Early
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Arrive 10&ndash;15 minutes early to settle in and complete
                  your intake form. Come with minimal makeup and avoid facial
                  waxing or tanning for 1&ndash;2 days prior.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">
                  Skincare Adjustments
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Discontinue potent exfoliants, retinoids, and acne
                  medications for several days before your appointment unless
                  instructed otherwise.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">
                  Health &amp; Sensitivities
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Please let us know in advance about any allergies, skin
                  sensitivities, or existing conditions so we can customize your
                  treatment. If you&apos;re pregnant or nursing, inform the
                  studio ahead of time for safe modifications.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">Feeling Unwell?</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  If you&apos;re experiencing any illness, please reschedule
                  your appointment to help maintain a healthy environment for
                  everyone.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">
                  Late Arrivals
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Arriving more than 15 minutes late may result in a shortened
                  session or rescheduling.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">Payment</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  We accept cash, cards, and digital payment options. Payment is
                  collected in person at the studio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
