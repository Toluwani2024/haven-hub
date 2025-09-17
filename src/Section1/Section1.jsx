
import React, { useEffect, useRef, useState } from "react";

/* Listings: multiple images per card */
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
    images: ["/img16.jpeg", "/img17.jpeg", "/img21.jpeg"],
    facts: "2 Bed • 1 Bath • 150 m²",
  },
];

const money = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

/* ---------- Per-card image carousel (mobile-safe) ---------- */
function PropertyCard({ p, canAutoPlay = true }) {
  const [idx, setIdx] = useState(0);
  const count = p.images.length;
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);

  // autoplay every 4.5s; pause on hover
  useEffect(() => {
    if (!canAutoPlay || count <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) setIdx((i) => (i + 1) % count);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, [canAutoPlay, count]);

  const go = (i) => setIdx(((i % count) + count) % count);

  // touch swipe (works on iPhone/Android)
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
    <article
      className="group bg-[--color-surface] border border-white/5 rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-xl hover:shadow-black/40 transition"
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
    >
      {/* Ratio wrapper keeps images fitting on phones */}
      <div
        className="relative w-full overflow-hidden aspect-[16/10] xs:aspect-[4/3]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {p.images.map((src, i) => (
            // Each slide consumes full width of the card
            <div key={i} className="relative h-full w-full min-w-full">
              <img
                src={src}
                alt={`${p.title} - image ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = "/img1.jpeg"; // fallback if an image path is wrong
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
          ))}
        </div>

        {/* Facts badge */}
        <span className="absolute top-2 left-2 xs:top-3 xs:left-3 rounded-md bg-black/55 text-[11px] px-2 py-1">
          {p.facts}
        </span>

        {/* Arrows (gold) */}
        {count > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() => go(idx - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 hover:bg-black/70 border border-white/10 w-9 h-9 grid place-items-center text-[--color-accent]"
            >
              ‹
            </button>
            <button
              aria-label="Next image"
              onClick={() => go(idx + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 hover:bg-black/70 border border-white/10 w-9 h-9 grid place-items-center text-[--color-accent]"
            >
              ›
            </button>
          </>
        )}

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
        <h3 className="text-lg iphone:text-xl font-semibold text-white">{p.title}</h3>
        {p.desc && <p className="mt-2 text-[12.5px] xs:text-sm text-[--color-muted]">{p.desc}</p>}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-[--color-muted]">Price</p>
          <p className="font-semibold text-[--color-accent]">{money(p.price)}</p>
        </div>

        <button
          className ="mt-5 w-full rounded-lg px-4 py-2
             border border-[--color-accent] text-[--color-accent]
             hover:bg-[--color-accent] hover:text-black
             focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/50
             active:scale-[.98] transition"
        >
          View Property Details
        </button>
      </div>
    </article>
  );
}

/* ---------- Section wrapper: 1/2/4 cards responsively ---------- */
export default function Section1() {
  return (
    <section id="featured" className="scroll-mt-20 max-w-7xl mx-auto px-3 xs:px-4 iphone:px-5 plus:px-6 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Properties</h2>
        <p className="mt-3 text-[--color-muted] text-sm sm:text-base">
          Explore our handpicked selection of featured properties.
        </p>
      </div>

      {/* Grid: 1 col on phones, 2 on tablet, 4 on desktop */}
      <div className="mt-10 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {listings.map((p) => (
          <PropertyCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}
