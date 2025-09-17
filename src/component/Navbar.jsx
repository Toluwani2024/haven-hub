import React from "react";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#featured", label: "Properties" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [hash, setHash] = React.useState(window.location.hash || "#top");

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#top");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  const isActive = (href) => hash === href;

  const base =
    "px-3 py-2 rounded-md text-[0.95rem] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";
  const idle = "text-white/80 hover:text-white hover:bg-white/5";
  const active =
    "text-white font-semibold underline underline-offset-8 decoration-[--color-accent]";

  return (
    <header className="sticky top-0 z-40 bg-[--color-bg]/85 backdrop-blur supports-[backdrop-filter]:bg-[--color-bg]/70 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 xs:px-4 iphone:px-5 plus:px-6 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 group" aria-label="Haven Hub">
          <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-[--color-accent] text-black font-bold shadow-[0_3px_14px_rgba(245,158,11,0.45)]">
            ●
          </span>
          <span className="text-lg iphone:text-xl font-semibold tracking-tight text-white">
            Haven Hub
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${base} ${isActive(l.href) ? active : idle}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-4 py-2
                       bg-[--color-accent] text-black font-medium
                       shadow-[0_6px_18px_rgba(245,158,11,0.35)]
                       hover:bg-yellow-500 hover:text-black
                       active:bg-yellow-400 active:scale-[.97]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60
                       transition"
          >
            Contact Us
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-white/10 bg-[--color-bg]/95 backdrop-blur ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 xs:px-4 iphone:px-5 plus:px-6 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`${base} ${isActive(l.href) ? active : idle} -mx-2 px-2`}
              >
                {l.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-2
                         bg-[--color-accent] text-black font-medium
                         shadow-[0_6px_18px_rgba(245,158,11,0.35)]
                         hover:bg-yellow-500 hover:text-black
                         active:bg-yellow-400 active:scale-[.97]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60
                         transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
 