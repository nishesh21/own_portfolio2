# Portfolio progress

Living log of what shipped, why it shipped, and what is still open. Newest entries stay at the top of the dated list.

## Current snapshot (2026-09-05)

A Next.js 14 App Router site lives in this folder. Stack: React 18, TypeScript, Tailwind CSS 3. Design direction: playful, motion-heavy, data / ML / backend. The homepage is a single long page with an interactive particle field, experiment cards, a skill scatter plot, lab-notes copy, and a mailto contact form.

Run it:

```bash
npm run dev          # http://localhost:3000
npm run build && npx next start -p 3001
```

Content to personalize: `src/data/content.ts` (name, email, GitHub, LinkedIn, projects).

---

## 2026-09-05 — first GitHub push

Remote: [nishesh21/own_portfolio](https://github.com/nishesh21/own_portfolio.git) (empty besides a README).

Important: `git rev-parse --show-toplevel` from this folder resolved to `/Users/nishesh/Desktop`, not the portfolio. Pushing from there would have uploaded the entire Desktop. Fix: `git init` **inside** `my_own_portfolio` so this project is its own repository, then add `origin` and push `main`.

`.gitignore` already excludes `node_modules/`, `.next/`, `.env*.local`, and `next-env.d.ts`.

---

## 2026-09-05 — contact recolor + lab notes rebuild

### Why

The contact panel was solid coral (`#ff5e3a`) — too hot against the ink background and it fought the accent palette. The lab notes section was three static paragraphs and read flat.

### Contact (`src/components/Contact.tsx`)

- Coral → warm amber gradient: `bg-gradient-to-br from-gold via-[#f5b83d] to-[#e0952b]`, border `gold/30`.
- Added a soft cream blur orb at the top-right for depth.
- The orb is `absolute`, so it paints above non-positioned siblings. Fixed by adding `relative` to the heading, form, and footer copy rather than juggling z-index on the parent.

### Lab notes (`src/components/About.tsx`)

Rewritten as a **notebook-style panel**, now a client component.

- New `labNotes` array in `content.ts`: four cells (`whoami`, `how i work`, `off hours`, `looking for`), each with a `call` and output `lines`.
- Cell buttons switch the active note; an `In [n]:` counter increments per run.
- Output types character by character (`setInterval`, 2 chars / 18ms) with a blinking block cursor while running.
- Left column: an animated SVG **training curve** (exponential decay + sine noise) drawn via `stroke-dasharray` / `stroke-dashoffset` and a new `@keyframes draw`. Remounts on each run using `key={runs}`.
- Accent switched from coral to gold to match the new contact panel.
- Reduced motion: typing is skipped (full text immediately) and the curve draw animation is disabled via a `globals.css` override.

Verified with `next build` — compiles clean, `/` still static, page JS 4.92 kB → 6.41 kB.

---

## 2026-09-05 — project kickoff

### Decisions

- Folder was empty. Chose **Next.js 14.2.5** (App Router, `src/` directory, TypeScript, Tailwind, ESLint) over Vite and plain HTML.
- Visual language: ink background (`#0b0a08`), cream type, lime / coral / sky / gold accents. Fonts: **Fraunces** (display, with `SOFT` / `WONK` / `opsz` axes) and **IBM Plex Mono**.
- No extra motion library. Animation is CSS plus `requestAnimationFrame` on a canvas.

### What was built

| Area | Files | Notes |
| --- | --- | --- |
| App shell | `src/app/layout.tsx`, `globals.css`, `page.tsx` | Metadata, CSS variables, Google fonts via `next/font` |
| Content | `src/data/content.ts` | Profile, experiments, skills, marquee ticks |
| Particles | `src/components/EmbeddingField.tsx` | Client canvas; mouse attract; respects `prefers-reduced-motion` |
| Nav / hero | `SiteNav.tsx`, `Hero.tsx` | Sticky nav, epoch counter |
| Marquee | `TickStrip.tsx` | CSS infinite scroll of ML/backend terms |
| Work | `Experiments.tsx` | Cards for Sentinel, Agent Judge, Manim MCP, nishOS, Wine Quality, Vorithm |
| Skills | `StackPlot.tsx` | Absolute-positioned scatter; resample jitter |
| About / contact | `About.tsx`, `Contact.tsx` | Mailto form, footer links |
| Webpack | `next.config.mjs` | `watchOptions.ignored` for `node_modules` and `.git` |

Project names were pulled from local work on the Desktop (agents, evals, MLOps, MCP, nishOS), not from a random template.

### Ops / incidents

1. `create-next-app` hung after files were already on disk; install was finished later with `npm install`.
2. `next dev` hit **Watchpack `EMFILE: too many open files`**. The Desktop parent folder is a git repo with many other `node_modules` trees. Dev then served **`GET /` as 404** while `layout.tsx` still wrapped the not-found page (so the HTML still contained “Nishesh” from metadata). Production `next build` had registered `/` correctly.
3. Port **3000 was in use** (`EADDRINUSE`). Production server was started on **3001**. Homepage verified with `curl`: HTTP 200 and expected copy (Nishesh, Sentinel, Agent Judge, experiments, contact CTA).
4. Webpack `watchOptions` was added so file watching is less likely to walk huge ignored trees.

### Still open

- Real email / GitHub / LinkedIn in `content.ts` (placeholders today).
- Favicon and Open Graph image.
- Deploy (Vercel or similar).
- Photo / resume if wanted.
- Dev-server file-descriptor limit on this machine if `npm run dev` is used from a huge parent git tree.
