export const metadata = {
  title: "Booking Confirmed | Fresh Face by Abby",
  description: "Your appointment has been confirmed.",
};

export default function BookingConfirmedPage() {
  return (
    <main>
      <section className="py-20 md:py-32 px-6 md:px-24 bg-surface min-h-[60vh] flex items-center">
        <div className="max-w-screen-2xl mx-auto w-full">
          <div className="max-w-xl">
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              Confirmed
            </span>
            <h1 className="font-headline text-4xl md:text-7xl font-light tracking-tighter mb-8">
              You&apos;re All Set
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed font-light text-on-surface-variant mb-6">
              Your appointment has been booked. A confirmation email with your
              appointment details has been sent to your inbox.
            </p>
            <p className="font-body text-base leading-relaxed font-light text-on-surface-variant/70 mb-10">
              We look forward to seeing you at the studio. If you need to
              reschedule or have any questions, please don&apos;t hesitate to
              reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/"
                className="bg-on-surface text-surface px-10 py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 text-center"
              >
                Back to Home
              </a>
              <a
                href="/before-your-appointment"
                className="border border-outline-variant/30 text-on-surface px-10 py-4 text-sm uppercase tracking-[0.2em] hover:bg-surface-container-low transition-all duration-300 text-center"
              >
                Prepare for Your Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
