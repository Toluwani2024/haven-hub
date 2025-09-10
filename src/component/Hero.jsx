import React from "react";

const Hero = () => {
  return (
    <section id="top" className="relative scroll-mt-20">
      {/* Background image + stronger readability overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/img5.jpg"
          alt="Modern luxury home exterior with pool and palm"
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Left-to-right + bottom gradient for consistent contrast on phones */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[66vh] md:min-h-[80vh] flex items-center">
          <div className="relative max-w-3xl py-12 xs:py-14 iphone:py-16 md:py-20">
            {/* location chip */}
            <span className="inline-block text-[11.5px] xs:text-xs md:text-sm text-accent tracking-wide bg-black/25 rounded-full px-3 py-1 ring-1 ring-white/10">
              Lagos • Abuja • Port Harcourt
            </span>

            {/* headline (micro breakpoints for phones) */}
            <h1 className="mt-3 text-3xl xs:text-[1.9rem] iphone:text-4xl plus:text-[2.6rem] md:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
              Discover your dream property with{" "}
              <span className="text-accent">Haven Hub</span>
            </h1>

            {/* subtext */}
            <p className="mt-3 max-w-2xl text-[13.5px] xs:text-sm iphone:text-[0.95rem] md:text-lg text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Your journey to finding your dream property begins here. Explore our
              listings to find the home that matches your vision.
            </p>

            {/* CTAs: stack on phones, row from ~390px */}
            <div className="mt-6 flex flex-col iphone:flex-row gap-3 iphone:gap-4">
              <a
                href="#featured"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-accent text-black font-semibold shadow-[0_6px_20px_rgba(245,158,11,0.35)] hover:brightness-95 active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                aria-label="Browse featured properties"
              >
                Browse Properties
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-accent/80 text-accent hover:bg-accent hover:text-black active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-accent/40 transition bg-black/20 backdrop-blur-[2px]"
                aria-label="Talk to an agent"
              >
                Talk to an Agent
              </a>
            </div>

            {/* optional soft glow (kept off by default) */}
            {/* <div className="pointer-events-none absolute inset-x-0 top-[28%] h-40 bg-gradient-to-b from-transparent via-black/15 to-transparent" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
