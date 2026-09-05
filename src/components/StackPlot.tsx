"use client";

import { useMemo, useState } from "react";
import { skills } from "@/data/content";

const clusters: Record<string, string> = {
  core: "#c8f542",
  ml: "#ff5e3a",
  agents: "#7ad7ff",
  backend: "#ffd24a",
  infra: "#e8a0ff",
};

export default function StackPlot() {
  const [hover, setHover] = useState<string | null>(null);
  const [seed, setSeed] = useState(0);

  const points = useMemo(
    () =>
      skills.map((s, i) => ({
        ...s,
        jx: ((Math.sin(seed + i) * 6) % 6),
        jy: ((Math.cos(seed * 1.3 + i) * 6) % 6),
      })),
    [seed],
  );

  return (
    <section id="stack" className="relative z-10 px-5 py-24 md:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sky">
            02 / latent skills
          </p>
          <h2 className="mt-3 font-display text-4xl italic md:text-6xl">
            a noisy scatter, on purpose
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setSeed((n) => n + 1)}
          className="rounded-full border border-cream/20 px-4 py-2 text-xs text-cream hover:border-lime hover:text-lime"
        >
          resample
        </button>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-[1.8rem] border border-cream/10 bg-gradient-to-br from-cream/[0.04] to-transparent md:h-[520px]">
        <div className="pointer-events-none absolute left-4 top-4 text-[10px] uppercase tracking-[0.2em] text-mute">
          dim_0 →
        </div>
        <div className="pointer-events-none absolute bottom-16 left-3 -rotate-90 text-[10px] uppercase tracking-[0.2em] text-mute">
          dim_1 →
        </div>
        {points.map((s) => {
          const color = clusters[s.cluster];
          const on = hover === s.name;
          return (
            <button
              key={s.name}
              type="button"
              onMouseEnter={() => setHover(s.name)}
              onMouseLeave={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-300"
              style={{
                left: `${s.x + s.jx}%`,
                top: `${s.y + s.jy}%`,
                width: on ? s.r * 7 : s.r * 5,
                height: on ? s.r * 7 : s.r * 5,
                background: color,
                boxShadow: on ? `0 0 28px ${color}` : `0 0 12px ${color}55`,
              }}
              aria-label={s.name}
            />
          );
        })}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-2xl">
            {hover ?? "poke a point"}
          </p>
          <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-widest text-mute">
            {Object.entries(clusters).map(([k, v]) => (
              <span key={k} className="flex items-center gap-1">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: v }}
                />
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
