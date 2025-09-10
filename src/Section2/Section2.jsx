import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Our experience with Haven Hub was outstanding. Their team's dedication and professionalism made finding our dream home a breeze.",
    name: "Wade Warren",
    location: "USA, California",
  },
  {
    quote:
      "Transparent process from inspection to closing. I felt guided at every step and got a great deal in a prime location.",
    name: "Esther Howard",
    location: "Lagos, Nigeria",
  },
  {
    quote:
      "Fast responses, curated options, and honest advice. Easily the best real estate experience I've had.",
    name: "Courtney Henry",
    location: "Abuja, Nigeria",
  },
  {
    quote:
      "Professional agents and clear communication. We closed quickly and stress-free.",
    name: "Jacob Jones",
    location: "Port Harcourt, Nigeria",
  },
];

export const Section2 = () => {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  // autoplay every 5s, pause on hover
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    start();
    return stop;
  }, [index]);

  const start = () => {
    stop();
    timerRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        setIndex((i) => (i + 1) % count);
      }
    }, 5000);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const goTo = (i) => setIndex((i + count) % count);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // touch swipe support
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const threshold = 50; 
    if (touchDeltaX.current > threshold) prev();
    else if (touchDeltaX.current < -threshold) next();
  };

  return (
    <section
      className="scroll-mt-20 max-w-7xl mx-auto px-4 py-20"
      onMouseEnter={() => (isHoveringRef.current = true)}
      onMouseLeave={() => (isHoveringRef.current = false)}
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h3>
        <p className="mt-3 text-[--color-muted] text-sm md:text-base">
          Read the success stories and heartfelt testimonials from our valued clients.
          Discover why they chose Haven Hub for their real estate needs.
        </p>
        <button className="mt-6 rounded-lg px-5 py-2.5 bg-accent text-black font-medium hover:opacity-90 transition">
          View All Testimonials
        </button>
      </div>

      {/* Carousel */}
      <div className="relative mt-10">
        {/* viewport */}
        <div
          ref={containerRef}
          className="overflow-hidden rounded-xl border border-white/5 bg-[--color-surface]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <article key={i} className="min-w-full p-8 md:p-10">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-4 text-accent text-4xl leading-none">“</div>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed">
                    {t.quote}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white font-semibold">
                      {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[--color-muted]">{t.location}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 w-10 h-10 grid place-items-center"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 w-10 h-10 grid place-items-center"
        >
          ›
        </button>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
