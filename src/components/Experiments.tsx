"use client";

import { useState } from "react";
import { experiments } from "@/data/content";

export default function Experiments() {
  const [active, setActive] = useState(experiments[0].id);

  return (
    <section id="work" className="relative z-10 px-5 py-24 md:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-lime">
            01 / experiments
          </p>
          <h2 className="mt-3 font-display text-4xl italic md:text-6xl">
            things I let loose
          </h2>
        </div>
        <p className="max-w-sm text-sm text-mute">
          Hover a card. It tilts like a notebook that refuses to sit still.
          Swap the copy whenever your next run lands.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {experiments.map((exp) => {
          const on = active === exp.id;
          return (
            <article
              key={exp.id}
              onMouseEnter={() => setActive(exp.id)}
              className="group relative overflow-hidden rounded-[1.6rem] border border-cream/10 bg-cream/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:rotate-[-1deg]"
              style={{
                boxShadow: on ? `0 0 0 1px ${exp.accent}` : undefined,
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="text-xs"
                  style={{ color: exp.accent }}
                >
                  epoch {exp.epoch}
                </span>
                <span className="rounded-full border border-cream/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-mute">
                  {exp.tag}
                </span>
              </div>
              <h3 className="mt-8 font-display text-3xl">{exp.title}</h3>
              <p className="mt-2 text-xs text-lime">{exp.metric}</p>
              <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-mute">
                {exp.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-cream/5 px-2 py-1 text-[11px] text-cream"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl transition group-hover:opacity-50"
                style={{ background: exp.accent }}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
