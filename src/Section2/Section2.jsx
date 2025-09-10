import React from "react";

const testimonials = [
  {
    quote:
      "Our experience with Haven Hub was outstanding. Their dedication and professionalism made finding our dream home a breeze.",
    name: "Wade Warren",
    location: "California, USA",
  },
  {
    quote:
      "Seamless process from viewing to closing. Clear communication and great market insight. Highly recommended!",
    name: "Aisha Bello",
    location: "Lagos, Nigeria",
  },
  {
    quote:
      "They understood our needs and guided us to the right investment. Excellent service and follow-through.",
    name: "Daniel Mensah",
    location: "Accra, Ghana",
  },
  {
    quote:
      "The team was responsive and honest. We found a great apartment within our budget in under two weeks.",
    name: "Chiamaka U.",
    location: "Abuja, Nigeria",
  },
];

function MobileAutoCarousel({ items }) {
  const [index, setIndex] = React.useState(0);
  const trackRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const hoveringRef = React.useRef(false);
  const timerRef = React.useRef(null);
  const [inView, setInView] = React.useState(true);

  // Respect reduced-motion
  const prefersReduced = React.useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    []
  );

  // Pause when off-screen
  React.useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold: [0, 0.25] }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  // Autoplay (every 4.5s)
  React.useEffect(() => {
    if (prefersReduced || !inView || items.length <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) {
        setIndex((i) => (i + 1) % items.length);
      }
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, [prefersReduced, inView, items.length]);

  // Scroll to current slide
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.children[index];
    if (!slide) return;
    // smooth scroll works on iOS & Android Chrome
    slide.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", inline: "center" });
  }, [index, prefersReduced]);

  // Touch swipe (Android/Samsung & iPhone)
  const startX = React.useRef(0);
  const dx = React.useRef(0);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    dx.current = 0;
  };
  const onTouchMove = (e) => {
    dx.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const t = 50;
    if (dx.current > t) setIndex((i) => (i - 1 + items.length) % items.length);
    if (dx.current < -t) setIndex((i) => (i + 1) % items.length);
  };

  return (
    <div
      ref={wrapRef}
      className="sm:hidden"
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((t, i) => (
          <article
            key={i}
            className="snap-center shrink-0 w-[85%] rounded-xl border border-white/5 bg-[--color-bg] p-5"
          >
            <p className="text-sm text-white/90">“{t.quote}”</p>
            <div className="mt-4">
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-xs text-[--color-muted]">{t.location}</p>
            </div>
          </article>
        ))}
      </div>

      {/* dots */}
      <div className="mt-3 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-2.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Section2() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-[--color-surface] px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">What Our Clients Say</h3>
          <p className="mt-3 text-[--color-muted] text-sm sm:text-base">
            Read success stories and heartfelt testimonials from our clients. Discover why they
            chose Haven Hub for their real estate needs.
          </p>

          <a
            href="#contact"
            className="mt-5 inline-flex rounded-lg px-4 py-2 bg-accent text-black font-medium hover:opacity-90 transition"
          >
            View All Testimonials
          </a>
        </div>

        {/* Mobile: auto-slide carousel; Tablet+: grid */}
        <div className="mt-8">
          {/* Mobile (auto-slide) */}
          <MobileAutoCarousel items={testimonials} />

          {/* Tablet+ grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="rounded-xl border border-white/5 bg-[--color-bg] p-6 h-full"
              >
                <p className="text-[15px] md:text-base text-white/90">“{t.quote}”</p>
                <div className="mt-4">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-[--color-muted]">{t.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section2;
