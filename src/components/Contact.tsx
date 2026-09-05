"use client";

import { FormEvent, useState } from "react";
import { profile } from "@/data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const note = String(data.get("note") || "");
    const body = encodeURIComponent(
      `hey nishesh — I'm ${name}.\n\n${note}`,
    );
    window.location.href = `mailto:${profile.email}?subject=portfolio ping&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative z-10 px-5 py-24 md:px-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold via-[#f5b83d] to-[#e0952b] px-6 py-12 text-ink md:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cream/25 blur-3xl" />
        <p className="relative text-xs uppercase tracking-[0.28em]">04 / ping</p>
        <h2 className="relative mt-4 max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl">
          got a messy dataset, a flaky agent, or a job that needs someone
          who reads traces?
        </h2>
        <form
          onSubmit={onSubmit}
          className="relative mt-10 grid gap-4 md:grid-cols-2"
        >
          <label className="block">
            <span className="text-xs uppercase tracking-widest">name</span>
            <input
              required
              name="name"
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-ink/5 px-4 py-3 outline-none placeholder:text-ink/40"
              placeholder="you"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest">note</span>
            <input
              required
              name="note"
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-ink/5 px-4 py-3 outline-none placeholder:text-ink/40"
              placeholder="a prompt, a role, a weird idea"
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-ink px-6 py-3 text-sm text-cream transition hover:bg-ink/80 md:col-span-2"
          >
            {sent ? "opening mail…" : "fire the query"}
          </button>
        </form>
        <p className="relative mt-6 text-sm">
          or just write {profile.email} · update the links in{" "}
          <code>src/data/content.ts</code>
        </p>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-4 py-10 text-xs text-mute">
        <p>© {new Date().getFullYear()} {profile.name}. no stock templates were harmed, much.</p>
        <div className="flex gap-4">
          <a href={profile.github} className="hover:text-lime">
            github
          </a>
          <a href={profile.linkedin} className="hover:text-lime">
            linkedin
          </a>
        </div>
      </footer>
    </section>
  );
}
