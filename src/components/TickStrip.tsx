import { ticks } from "@/data/content";

export default function TickStrip() {
  const loop = [...ticks, ...ticks];
  return (
    <div className="relative z-10 overflow-hidden border-y border-cream/10 bg-ink/40 py-3">
      <div className="marquee text-xs uppercase tracking-[0.22em] text-mute">
        {loop.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10">
            <span className="text-lime">●</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
