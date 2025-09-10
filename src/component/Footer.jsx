import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="scroll-mt-20 mt-20 border-t border-white/5 bg-[--color-surface]">
      {/* CTA Strip */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Start Your Real Estate Journey Today
        </h2>
        <p className="mt-3 max-w-3xl mx-auto text-[--color-muted] text-sm md:text-base">
          Your dream property is just a click away. Whether you're looking for a
          new home, a strategic investment, or expert real estate advice, Haven
          Hub is here to assist you every step of the way.
        </p>
        <button className="mt-6 rounded-lg px-6 py-2.5 bg-accent text-black font-medium hover:opacity-90 transition">
          Explore Properties
        </button>
      </div>

      {/* Main footer grid */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-5">
          {/* Logo + newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white">Haven Hub</h3>
            <p className="mt-3 text-sm text-[--color-muted]">
              Subscribe for updates
            </p>
            <div className="mt-3 flex rounded-lg overflow-hidden border border-white/10">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-transparent text-sm text-white placeholder-[--color-muted] outline-none"
              />
              <button className="px-3 bg-accent text-black">📩</button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white">Home</h4>
            <ul className="mt-3 space-y-1 text-sm text-[--color-muted]">
              <li>Hero Section</li>
              <li>Features</li>
              <li>Properties</li>
              <li>Testimonials</li>
              <li>FAQ’s</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">About Us</h4>
            <ul className="mt-3 space-y-1 text-sm text-[--color-muted]">
              <li>Our Story</li>
              <li>Our Works</li>
              <li>How it Works</li>
              <li>Our Team</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Services</h4>
            <ul className="mt-3 space-y-1 text-sm text-[--color-muted]">
              <li>Valuation Mastery</li>
              <li>Strategic Marketing</li>
              <li>Negotiation Wizardry</li>
              <li>Closing Success</li>
              <li>Property Management</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contact Us</h4>
            <ul className="mt-3 space-y-1 text-sm text-[--color-muted]">
              <li>Contact Form</li>
              <li>Our Offices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-4 text-center text-xs text-[--color-muted]">
  © {new Date().getFullYear()} Haven Hub. All rights reserved.{" "}
  <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
  {" "}• Designed & Built by{" "}
  <a
    href="https://lumeon.dev"
    target="_blank"
    rel="noopener noreferrer"
    className="text-accent hover:underline"
  >
    Lumeon.dev
          </a>
      </div>
    </footer>
  );
};

export default Footer;
