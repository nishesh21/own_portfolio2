"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { labNotes } from "@/data/content";

const curve = Array.from({ length: 28 }, (_, i) => {
  const t = i / 27;
  const loss = Math.exp(-t * 2.6) * 0.82 + 0.08 + Math.sin(i * 1.7) * 0.02;
  return { x: t * 100, y: loss * 100 };
});

const curvePath = curve
  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
  .join(" ");

export default function About() {
  const [activeId, setActiveId] = useState(labNotes[0].id);
  const [typed, setTyped] = useState("");
  const [runs, setRuns] = useState(1);
  const reduceRef = useRef(false);

  const active = useMemo(
    () => labNotes.find((n) => n.id === activeId) ?? labNotes[0],
    [activeId],
  );
  const output = useMemo(() => active.lines.join("\n"), [active]);

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (reduceRef.current) {
      setTyped(output);
      return;
    }
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setTyped(output.slice(0, i));
      if (i >= output.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [output]);

  const running = typed.length < output.length;

  return (
    <section id="about" className="relative z-10 px-5 py-24 md:px-10">
      <p className="text-xs uppercase tracking-[0.28em] text-gold">
        03 / lab notes
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl">
        I like models that survive contact with{" "}
        <span className="italic text-gold">messy data</span>, and backends
        that admit when they&apos;re wrong.
      </h2>

      <div className="mt-12 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-4">
          <div className="rounded-[1.6rem] border border-cream/10 bg-cream/[0.03] p-5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-mute">
              <span>training curve</span>
              <span className="text-gold">loss ↓</span>
            </div>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="mt-4 h-32 w-full"
            >
              {[25, 50, 75].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="100"
                  y1={y}
                  y2={y}
                  stroke="rgba(244,239,228,0.08)"
                  strokeWidth="0.4"
                />
              ))}
              <path
                key={runs}
                d={curvePath}
                fill="none"
                stroke="#ffd24a"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeDasharray: 260,
                  strokeDashoffset: 260,
                  animation: "draw 1.6s ease-out forwards",
                }}
              />
            </svg>
            <div className="mt-3 flex justify-between text-[10px] text-mute">
              <span>epoch 0</span>
              <span>epoch 27</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["agents", "eval loops"],
              ["ml", "baseline up"],
              ["infra", "ship, sleep"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-cream/10 p-4 transition hover:border-gold/50"
              >
                <p className="font-display text-xl text-cream">{k}</p>
                <p className="mt-1 text-[11px] text-mute">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.6rem] border border-cream/10 bg-cream/[0.03]">
          <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            <span className="ml-2 text-[11px] text-mute">
              lab_notes.ipynb
            </span>
          </div>

          <div className="flex flex-wrap gap-2 px-4 pt-4">
            {labNotes.map((n, i) => {
              const on = n.id === activeId;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    setActiveId(n.id);
                    setRuns((r) => r + 1);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    on
                      ? "border-gold bg-gold text-ink"
                      : "border-cream/15 text-mute hover:border-gold/50 hover:text-cream"
                  }`}
                >
                  [{i + 1}] {n.cell}
                </button>
              );
            })}
          </div>

          <div className="px-4 pb-6 pt-5">
            <p className="text-sm text-cream">
              <span className="text-gold">In [{runs}]:</span>{" "}
              {active.call}
            </p>
            <pre className="mt-4 min-h-[7.5rem] whitespace-pre-wrap text-sm leading-relaxed text-mute">
              {typed}
              {running && (
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-gold" />
              )}
            </pre>
            <p className="mt-2 text-[11px] text-mute">
              {running ? "running…" : `done · ${active.lines.length} lines`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
