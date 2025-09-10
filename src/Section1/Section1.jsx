import React from "react";

const listings = [
  {
    title: "SeaSide Serenity Villa",
    desc: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    price: 300000000,
    cover: "/img1.jpeg",
    facts: "4 Bed • 3 Bath • 420 m²",
  },
  {
    title: "Modern City Apartment",
    desc: "A chic fully-furnished 2-bedroom apartment with panoramic city views.",
    price: 400000000,
    cover: "/img2.jpeg",
    facts: "2 Bed • 2 Bath • 160 m²",
  },
  {
    title: "Luxury Town House",
    desc: "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community.",
    price: 600000000,
    cover: "/img3.jpeg",
    facts: "3 Bed • 2.5 Bath • 250 m²",
  },
];

const money = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

const Section1 = () => {
  return (
    <section id="featured" className="scroll-mt-20 max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Featured Properties
        </h1>
        <p className="mt-3 text-[--color-muted] text-sm md:text-base">
          Explore our handpicked selection of featured properties. Each listing
          offers a glimpse into exceptional homes and investments available
          through Haven Hub. Click{" "}
          <span className="text-[--color-accent] font-medium">“View Details”</span>{" "}
          for more information.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((p) => (
          <div
            key={p.title}
            className="group bg-[--color-surface] border border-white/5 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-black/40 transition"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 rounded-md bg-black/55 text-xs px-2 py-1">
                {p.facts}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-[--color-muted] text-sm">{p.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-[--color-muted]">Price</p>
                <p className="font-semibold text-[--color-accent]">
                  {money(p.price)}
                </p>
              </div>

            <button className="mt-5 w-full rounded-lg px-4 py-2 border border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-black transition">
  View Property Details
</button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section1;
