import React, { useEffect, useRef, useState } from "react";

/* Listings (update image paths to match /public) */
const listings = [
  {
    title: "SeaSide Serenity Villa",
    desc: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    price: 300000000,
    images: ["/img1.jpeg", "/img2.jpeg", "/img3.jpeg"],
    facts: "4 Bed • 3 Bath • 420 m²",
  },
  {
    title: "Modern City Apartment",
    desc: "A chic fully-furnished 2-bedroom apartment with panoramic city views.",
    price: 400000000,
    images: ["/img4.jpeg", "/img14.jpeg"],
    facts: "2 Bed • 2 Bath • 160 m²",
  },
  {
    title: "Luxury Town House",
    desc: "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community.",
    price: 600000000,
    images: ["/img8.jpeg", "/img11.jpeg", "/img13.jpeg"],
    facts: "3 Bed • 2.5 Bath • 250 m²",
  },
  {
    title: "Countryside Cottage",
    desc: "A cozy 2-bedroom cottage surrounded by nature, perfect for peaceful living.",
    price: 200000000,
    images: ["/img15.jpeg", "/img16.jpeg", "/img17.jpeg"],
    facts: "2 Bed • 1 Bath • 150 m²",
  },
];

const money = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

/* Per-card image carousel */
function PropertyCard({ p, canAutoPlay }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);
  const count = p.images.length;

  useEffect(() => {
    if (!canAutoPlay || count <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) setIdx((i) => (i + 1) % count);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, [canAutoPlay, count]);

  const go = (i) => setIdx(((i % count) + count) % count);

  // touch swipe
  const startX = useRef(0);
  const dx = useRef(0);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    dx.current = 0;
  };
  const onTouchMove = (e) => (dx.current = e.touches[0].clientX - startX.current);
  const onTouchEnd = () => {
    const t = 50;
    if (dx.current > t) go(idx - 1);
    if (dx.current < -t) go(idx + 1);
  };

  return (
    <div
      className="group bg-[--color-surface] border border-white/5 rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-xl hover:shadow-black/40 transition"
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      {/* Image area — adjusted for phones */}
      <div
        className="relative aspect-[16/10] xs:aspect-[4/3] overflow-hidden min-h-[220px] iphone:min-h-[240px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {p.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${p.title} - image ${i + 1}`}
              className="h-full w-full min-w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>

        {/* Facts badge (tighter on phones) */}
        <span className="absolute top-2 left-2 xs:top-3 xs:left-3 rounded-md bg-black/55 text-[11px] px-2 py-1">
          {p.facts}
        </span>

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {p.images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === idx ? "w-6 bg-[--color-accent]" : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 iphone:p-6">
        <h3 className="text-lg iphone:text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-[12.5px] xs:text-sm text-[--color-muted]">{p.desc}</p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-[--color-muted]">Price</p>
          <p className="font-semibold text-[--color-accent]">{money(p.price)}</p>
        </div>

        <button
          className="mt-5 w-full rounded-lg px-4 py-2
                     border border-[--color-accent] text-[--color-accent]
                     hover:bg-[--color-accent] hover:text-black
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/50
                     active:scale-[.98] transition"
        >
          View Property Details
        </button>
      </div>
    </div>
  );
}

/* Section-level carousel (4/2/1 per view + autoplay) */
function SectionCarousel({ items, children }) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(4);
  const [inView, setInView] = useState(true);

  const hoveringRef = useRef(false);
  const timerRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mqPhone = window.matchMedia("(max-width: 639px)");
    const mqTablet = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerView(mqPhone.matches ? 1 : mqTablet.matches ? 2 : 4);
    update();
    [mqPhone, mqTablet, mqDesktop].forEach((mq) => mq.addEventListener("change", update));
    return () => [mqPhone, mqTablet, mqDesktop].forEach((mq) => mq.removeEventListener("change", update));
  }, []);

  const pages = Math.max(1, Math.ceil(items.length / perView));
  const limit = pages > 1 ? pages : items.length; // slide items when only one page

  const goTo = (i) => setIndex(((i % limit) + limit) % limit);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting && entries[0].intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 1] }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!inView || items.length === 0) return;
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) next();
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [inView, pages, index, items.length]);

  // touch swipe
  const startX = useRef(0);
  const dx = useRef(0);
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; dx.current = 0; };
  const onTouchMove = (e) => { dx.current = e.touches[0].clientX - startX.current; };
  const onTouchEnd  = () => { const t = 60; if (dx.current >  t) prev(); if (dx.current < -t) next(); };

  const transform =
    pages > 1
      ? `translateX(-${(index * 100) / perView}%)`
      : `translateX(-${index * (100 / items.length)}%)`;

  return (
    <div
      ref={wrapRef}
      className="relative mt-10"
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex gap-3 xs:gap-4 iphone:gap-5 md:gap-6 transition-transform duration-500 ease-out"
          style={{ transform, width: `${(items.length * 100) / perView}%` }}
        >
          {items.map((item, i) => (
            <div key={i} className="w-full" style={{ flex: `0 0 ${100 / perView}%` }}>
              {children(item, inView)}
            </div>
          ))}
        </div>
      </div>

      {/* Gold arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 hover:bg-black/70 border border-white/10 w-10 h-10 grid place-items-center text-[--color-accent]"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 hover:bg-black/70 border border-white/10 w-10 h-10 grid place-items-center text-[--color-accent]"
      >
        ›
      </button>

      {/* Dots (pages or items) */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: limit }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${pages > 1 ? "page" : "item"} ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[--color-accent]" : "w-2.5 bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const Section1 = () => {
  return (
    <section
      id="featured"
      className="scroll-mt-20 max-w-7xl mx-auto px-3 xs:px-4 iphone:px-5 plus:px-6 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Properties</h1>
        <p className="mt-3 text-[--color-muted] text-sm sm:text-base">
          Explore our handpicked selection of featured properties. Each listing offers a glimpse into
          exceptional homes and investments available through Haven Hub. Click{" "}
          <span className="text-[--color-accent] font-medium">“View Details”</span> for more information.
        </p>
      </div>

      <SectionCarousel items={listings}>
        {(p, canAutoPlay) => <PropertyCard p={p} canAutoPlay={canAutoPlay} />}
      </SectionCarousel>
    </section>
  );
};

export default Section1;



