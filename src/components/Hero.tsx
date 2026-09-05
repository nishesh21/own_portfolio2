"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";

export default function Hero() {
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setEpoch((e) => (e + 1) % 10000);
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20"
    >
      <p className="mb-6 max-w-xl text-xs uppercase tracking-[0.28em] text-mute">
        {profile.location} · epoch {String(epoch).padStart(4, "0")}
      </p>
      <h1 className="font-display text-[14vw] leading-[0.85] tracking-[-0.04em] text-cream md:text-[9vw]">
        Nishesh
        <br />
        <span className="italic text-lime">Kumar</span>
      </h1>
      <div className="mt-10 flex max-w-3xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md font-display text-2xl leading-snug text-cream md:text-3xl">
          {profile.role}
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-mute">
          {profile.blurb} Drag the dots. They like attention.
        </p>
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="rounded-full bg-coral px-5 py-2 text-sm text-ink transition hover:-translate-y-0.5"
        >
          peek the lab
        </a>
        <a
          href="#contact"
          className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream transition hover:border-lime hover:text-lime"
        >
          send a signal
        </a>
        <span className="ml-1 text-xs text-mute">data · ml · stubborn backends</span>
      </div>
    </section>
  );
}
