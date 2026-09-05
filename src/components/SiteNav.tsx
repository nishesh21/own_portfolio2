"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#folio", label: "folio" },
  { href: "#work", label: "experiments" },
  { href: "#stack", label: "latent skills" },
  { href: "#about", label: "lab notes" },
  { href: "#contact", label: "ping" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 transition-colors md:px-8 ${
        scrolled ? "bg-ink/80 backdrop-blur-md" : ""
      }`}
    >
      <a href="#top" className="text-sm tracking-tight text-lime">
        nk::lab
      </a>
      <nav className="hidden items-center gap-4 text-xs text-mute md:flex lg:gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="transition-colors hover:text-cream"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="rounded-full border border-cream/20 bg-cream/5 px-3 py-1 text-xs text-cream transition hover:bg-lime hover:text-ink"
      >
        hire / collab
      </a>
    </header>
  );
}
