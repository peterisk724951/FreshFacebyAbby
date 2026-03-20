"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Yulissa Rodriguez",
    text: "Great experience with Abby! Very sweet and thoughtful! She has great conversations and great fast email responses. Her hands are really soft. She has a really great personality and made me feel so comfortable! I truly recommend to anyone who needs a facial. Thank you so so much for leaving my face GLOWING.",
  },
  {
    name: "Kelsey Burgo",
    text: "If you\u2019re looking for an amazing & talented esthetician, look no further. Very knowledgeable & sweet. 10/10 would recommend Abby! Will be back asap :)",
  },
  {
    name: "Tyrhonda Bradley",
    text: "Literally the best facial I\u2019ve ever received! Let\u2019s not forget to mention Abby\u2019s professionalism and kindness. Also, her suite is incredibly aesthetically pleasing, modern and clean. Prior to beginning the facial, she assessed my desires and any flaws that were concerning to me. Abby made sure that all of my goals were achieved as well as provided me with recommendations for my skin while at home. 10/10 recommended.",
  },
  {
    name: "Michelle Buck",
    text: "Abby has a way of making you feel comfortable that I really appreciate. I am very self conscious about my skin and have always been afraid to go get a facial, Abby has helped me become much more confident and now I look forward to having her help me with my skin.",
  },
  {
    name: "Jerry Parish",
    text: "I look 10 years younger after one visit! Loved my experience, will definitely come back.",
  },
  {
    name: "Amanda Midkiff",
    text: "From start to finish, my experience with Abby was nothing short of amazing. The building felt very secure and private. Abby\u2019s suite is thoughtfully designed for comfort, creating a peaceful escape from the outside world. The facial itself was relaxing and luxurious, and by the end, my skin looked noticeably brighter, clearer, and refreshed. Abby creates a truly serene environment and delivers results you can see and feel.",
  },
  {
    name: "Christine Kujawa",
    text: "Abby gives an amazing facial. From the products to the atmosphere to her kind and gentle personality, the entire experience exudes relaxation and rejuvenation. This was not my first facial with Abby and it certainly will not be my last.",
  },
  {
    name: "J Robinson",
    text: "I have trusted Abby with my skin care for over 8 years now. She is the best and keeps me looking beautiful! I refer all my friends and family to her.",
  },
  {
    name: "Aine Edlin Millan",
    text: "I highly recommend Abby if you\u2019re looking for an esthetician who takes her clients into account and has ample product knowledge. She demonstrates a profound understanding of each individual\u2019s skincare needs and always leaves my skin looking radiant. I struggled with stubborn acne and had tried everything until I finally went to Abby. Her facials helped eliminate my acne and inflammation. I even saw a noticeable difference after just one treatment.",
  },
  {
    name: "Keilah B",
    text: "Abby is the best around! She is very knowledgeable when it comes to skincare and has helped me in so many ways! Please stop in and let her do her magic.",
  },
  {
    name: "lilia martinez",
    text: "I had facials done from other people, but ever since I started going with Abby, I decided that I was going to stick with her. She really knows what my face needs, and always leaves my face radiant, love her products. I really recommend her.",
  },
  {
    name: "Jackelyn Lee",
    text: "Got my 1st ever facial done with Abby and I felt like my skin hadn\u2019t felt that hydrated, soft and glowing in years! Definitely recommend booking with Abby, she makes sure to customize your experience to your skin\u2019s needs and yours!",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % reviews.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + reviews.length) % reviews.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const review = reviews[current];

  return (
    <section className="py-20 md:py-32 px-6 md:px-24 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.4em] text-primary mb-4 block">
              Testimonials
            </span>
            <h2 className="font-headline text-4xl md:text-7xl font-light tracking-tighter">
              Kind Words
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label text-[10px] uppercase tracking-widest text-primary mr-4">
              {String(current + 1).padStart(2, "0")} / {reviews.length}
            </span>
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-12 h-12 flex items-center justify-center bg-on-surface text-surface hover:bg-primary transition-colors duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 3L5 8L10 13" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-12 h-12 flex items-center justify-center bg-on-surface text-surface hover:bg-primary transition-colors duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 3L11 8L6 13" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <p className="font-headline text-2xl md:text-4xl italic font-light leading-snug">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end mt-6 md:mt-0">
            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-secondary text-sm"
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="font-body text-base font-medium text-on-surface">
                {review.name}
              </p>
              <p className="font-label text-[10px] uppercase tracking-widest text-primary mt-1">
                Google Review
              </p>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-10 md:mt-16">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-px transition-all duration-500 ${
                i === current
                  ? "w-8 bg-on-surface"
                  : "w-4 bg-outline-variant hover:bg-primary"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
