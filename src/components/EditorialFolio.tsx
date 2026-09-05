"use client";

import { PointerEvent, useState } from "react";
import { experiments, profile } from "@/data/content";

const toolkit = ["Python", "LangGraph", "FastAPI", "AWS", "Next.js"];

export default function EditorialFolio() {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const moveSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  };

  return (
    <section id="folio" className="relative z-10 px-5 py-24 md:px-10">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">
            interlude / pocket folio
          </p>
          <h2 className="mt-3 font-display text-4xl italic md:text-6xl">
            four pages, one signal
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-mute">
          A compact editorial cut of the lab—cover, profile, selected work,
          and a direct line.
        </p>
      </div>

      <div
        onPointerMove={moveSpotlight}
        className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-cream/15 bg-[#ded7c8] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:grid-cols-2"
        style={{
          backgroundImage: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,210,74,0.28), transparent 28%)`,
        }}
      >
        <article className="group relative min-h-[520px] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream p-7 text-ink md:p-10">
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/55">
            data · ml · backend
          </p>
          <h3 className="mt-8 font-display text-[18vw] font-semibold leading-[0.72] tracking-[-0.08em] text-ink/90 md:text-[8vw]">
            PORT
            <br />
            FOL
            <br />
            IO
          </h3>

          <div className="absolute bottom-8 right-8 h-52 w-44 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
            <div className="absolute inset-x-8 bottom-0 h-36 rounded-t-[45%] bg-ink" />
            <div className="absolute left-1/2 top-3 h-28 w-28 -translate-x-1/2 rounded-[45%_45%_42%_42%] bg-gold shadow-[inset_0_-12px_0_rgba(11,10,8,0.1)]">
              <div className="absolute left-3 top-8 h-3 w-10 rounded-full border-2 border-ink" />
              <div className="absolute right-3 top-8 h-3 w-10 rounded-full border-2 border-ink" />
              <div className="absolute left-1/2 top-[2.45rem] h-0.5 w-3 -translate-x-1/2 bg-ink" />
              <div className="absolute left-1/2 top-16 h-7 w-12 -translate-x-1/2 rounded-b-full border-b-2 border-ink/60" />
            </div>
            <div className="absolute left-3 top-0 h-28 w-20 -rotate-12 rounded-[70%_25%_60%_20%] bg-ink" />
            <div className="absolute right-3 top-0 h-28 w-20 rotate-12 rounded-[25%_70%_20%_60%] bg-ink" />
            <span className="absolute -right-1 top-4 font-display text-4xl text-sky">
              ✦
            </span>
          </div>

          <div className="absolute bottom-8 left-7 md:left-10">
            <p className="font-display text-2xl font-semibold">{profile.name}</p>
            <p className="mt-1 text-xs text-ink/55">ML & systems builder · 2026</p>
          </div>
        </article>

        <article className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream p-7 text-ink md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-sky-700">
            page 02
          </p>
          <h3 className="mt-3 font-display text-5xl font-semibold">About me</h3>
          <div className="mt-8 grid gap-7 sm:grid-cols-[0.9fr_1.1fr]">
            <div className="relative h-64 overflow-hidden rounded-[1.4rem] bg-ink">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(244,239,228,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(244,239,228,.1)_1px,transparent_1px)] [background-size:20px_20px]" />
              <p className="absolute left-5 top-5 text-[10px] uppercase tracking-widest text-lime">
                status: learning
              </p>
              <p className="absolute bottom-4 left-5 font-display text-7xl italic text-cream">
                NK
              </p>
              <div className="absolute bottom-5 right-5 h-3 w-3 animate-pulse rounded-full bg-lime" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">
                Nishesh <span className="text-gold">●</span>
              </p>
              <p className="mt-1 text-xs text-ink/50">{profile.location}</p>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                {profile.blurb} I enjoy turning ambiguous ideas into systems
                that can be traced, measured, and trusted.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                My favorite work sits between model behavior and production
                reality: agents, evaluations, retrieval, and reliable APIs.
              </p>
            </div>
          </div>
          <div className="absolute inset-x-7 bottom-8 grid grid-cols-2 gap-5 border-t border-ink/15 pt-5 md:inset-x-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-ink/45">
                specialty
              </p>
              <p className="mt-2 font-display text-2xl text-sky-700">
                Applied AI
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-ink/45">
                toolkit
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {toolkit.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ink/15 px-2 py-1 text-[10px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="min-h-[520px] rounded-[1.5rem] border border-ink/10 bg-cream p-7 text-ink md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-sky-700">
            page 03
          </p>
          <h3 className="mt-3 font-display text-5xl font-semibold">
            Selected work
          </h3>
          <p className="mt-2 text-xs text-ink/50">
            Systems, experiments, and useful mischief
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {experiments.slice(0, 6).map((project, index) => (
              <a
                key={project.id}
                href="#work"
                className="group flex min-h-36 flex-col justify-between rounded-2xl border border-ink/10 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: `${project.accent}22` }}
              >
                <span
                  className="h-8 w-8 rounded-full text-center text-sm leading-8 text-ink"
                  style={{ background: project.accent }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">
                    {project.title}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-ink/50">
                    {project.tag}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <a
            href="#work"
            className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-sky-700"
          >
            open full experiments <span aria-hidden>↗</span>
          </a>
        </article>

        <article className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream p-7 text-ink md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-sky-700">
            page 04
          </p>
          <h3 className="mt-3 max-w-xs font-display text-5xl font-semibold leading-none">
            Let&apos;s connect!
          </h3>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink/65">
            Looking for data, ML, or backend opportunities—and interesting
            problems that deserve honest evaluation.
          </p>
          <div className="mt-9 space-y-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 hover:text-sky-700"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sky">
                @
              </span>
              {profile.email}
            </a>
            <a
              href={profile.github}
              className="flex items-center gap-3 hover:text-sky-700"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sky">
                git
              </span>
              GitHub
            </a>
            <a
              href={profile.linkedin}
              className="flex items-center gap-3 hover:text-sky-700"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sky">
                in
              </span>
              LinkedIn
            </a>
          </div>
          <a
            href="#contact"
            className="absolute bottom-9 right-8 grid h-32 w-32 rotate-3 place-items-center rounded-[1.6rem] border-2 border-dashed border-ink/25 bg-gold text-center transition hover:rotate-0 md:right-10"
          >
            <span className="font-display text-xl leading-tight">
              send a
              <br />
              signal ↗
            </span>
          </a>
          <span className="absolute right-12 top-16 -rotate-12 font-display text-7xl text-sky">
            ↗
          </span>
        </article>
      </div>
    </section>
  );
}
