import React from "react";

export default function Hero() {
  return (
    <section className="relative scroll-mt-20" id="top">
     {/*Background image*/}
      <div className="absolute inset-0 -z-10">
        <img
          src="/img5.jpg"
          alt="Luxury property exterior"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
    
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(10,15,28,0.80))]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="min-h-[65vh] md:min-h-[80vh] flex items-center">
        
          <div className="max-w-3xl py-12 sm:py-16">
            <div className="inline-block rounded-xl bg-black/25 backdrop-blur-[2px] p-4 sm:p-0 sm:bg-transparent sm:backdrop-blur-0">
              <span className="inline-block text-xs md:text-sm text-accent tracking-wide">
                Lagos • Abuja • Port Harcourt
              </span>

              <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                Discover your dream property with{" "}
                <span className="text-accent">Haven Hub</span>
              </h1>

              <p className="mt-3 text-base md:text-lg text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] max-w-2xl">
                Your journey to finding your dream property begins here. Explore our listings
                to find the home that matches your vision.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 bg-accent text-black font-semibold shadow-[0_6px_20px_rgba(245,158,11,0.35)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/60"
                >
                  Browse Properties
                </a>

              
                <span className="inline-flex rounded-lg bg-black/25 backdrop-blur-[2px]">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 border border-white/25 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    Talk to an Agent
                  </a>
                </span>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
}
