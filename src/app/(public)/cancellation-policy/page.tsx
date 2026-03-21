export const metadata = {
  title: "Cancellation Policy | Fresh Face by Abby",
  description:
    "Review the cancellation and no-show policy for Fresh Face by Abby.",
};

export default function CancellationPolicyPage() {
  return (
    <main>
      <section className="py-20 md:py-32 px-6 md:px-24 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6 block">
              Policies
            </span>
            <h1 className="font-headline text-4xl md:text-7xl font-light tracking-tighter mb-10 md:mb-16">
              Cancellation Policy
            </h1>

            <div className="space-y-10 md:space-y-16">
              <div>
                <h2 className="font-headline text-2xl mb-4">
                  24-Hour Notice
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Cancellations must be made at least 24 hours before your
                  appointment to avoid a fee. This allows us to offer the
                  time slot to another client.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">
                  Late Cancellations
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Appointments cancelled within 24 hours of the scheduled time
                  will incur a charge of 50% of the service cost.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">No-Shows</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Clients who do not show up for their appointment will be
                  charged the full service cost and may be required to prepay
                  for future appointments.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">Late Arrivals</h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Arriving more than 10 minutes late may result in rescheduling,
                  subject to the same cancellation policies above.
                </p>
              </div>

              <div>
                <h2 className="font-headline text-2xl mb-4">
                  Emergencies &amp; Illness
                </h2>
                <p className="font-body text-lg leading-relaxed font-light text-on-surface-variant max-w-2xl">
                  Life happens. If you&apos;re ill or facing an emergency,
                  please reach out directly. We value mutual respect for each
                  other&apos;s time and will do our best to accommodate you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
