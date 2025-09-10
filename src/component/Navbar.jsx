import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top"); // default active section

  const links = [
    { label: "Home", href: "#top" },
    { label: "About Us", href: "#about" },
    { label: "Properties", href: "#featured" },
    { label: "Contact", href: "#contact" },
  ];

  const close = () => setOpen(false);

 
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 } // section must be at least 60% visible
    );

    sections.forEach((s) => s && observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[--color-surface]/80 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent" />
          <span className="text-lg font-semibold tracking-tight">Haven Hub</span>
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.label} className="group relative">
              <a
                href={l.href}
                className={`transition-colors duration-200 ${
                  active === l.href ? "text-accent" : "text-[--color-muted] hover:text-white"
                }`}
              >
                {l.label}
                {/* underline indicator */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${
                    active === l.href ? "w-full bg-accent" : "w-0 bg-accent group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex rounded-lg px-3 py-2 bg-accent text-black font-medium hover:opacity-90 transition"
        >
          Contact Us
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          className="md:hidden inline-flex size-10 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden absolute inset-x-0 top-16 z-50 border-t border-white/5 bg-[--color-surface] transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-4 pointer-events-none opacity-0"
        }`}
      >
        <div className="px-4 py-4">
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={close}
                  className={`block rounded-lg px-3 py-2 transition ${
                    active === l.href
                      ? "bg-accent/10 text-accent"
                      : "text-[--color-muted] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={close}
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg px-3 py-2 bg-accent text-black font-medium hover:opacity-90 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
