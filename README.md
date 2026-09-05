# own_portfolio

A personal portfolio site for **Nishesh Kumar**. It is a single-page Next.js app with a data / ML / backend theme: interactive particles, project cards, a skill scatter plot, a notebook-style “lab notes” section, and a contact form that opens email.

Live source: [github.com/nisheshgogia/own_portfolio](https://github.com/nisheshgogia/own_portfolio)

---

## What this project is

This is **not** a backend or a CMS. All copy lives in one TypeScript file. The homepage is assembled from React components. If you want to change the name, projects, or email, you usually do **not** need to touch the layout.

| You want to… | Open this |
| --- | --- |
| Change name, email, GitHub, LinkedIn, projects, skills | `src/data/content.ts` |
| Change how a section looks or behaves | `src/components/…` |
| Change fonts, page title, or global CSS | `src/app/layout.tsx`, `src/app/globals.css` |
| See what shipped and why | `progress.md` |
| Interview Q&A from the technical work | `interview_questions.md` |

---

## Run it locally

You need **Node.js 18+** (this repo was built with Node 18).

```bash
git clone https://github.com/nisheshgogia/own_portfolio.git
cd own_portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `.next/` |
| `npm start` | Serve that production build |
| `npm run lint` | Next.js ESLint |

`node_modules/` and `.next/` are gitignored. Always install from `package-lock.json` (`npm install`), do not delete the lockfile.

---

## How the page is put together

`src/app/page.tsx` is the only route (`/`). Top to bottom:

1. **Embedding field** — canvas of dots that drift toward the cursor  
2. **Nav + hero** — name, tagline, epoch counter  
3. **Tick strip** — scrolling list of ML / backend terms  
4. **Pocket folio** — four-page editorial spread: cover, profile, selected work, and connect  
5. **Experiments** — project cards (Sentinel, Agent Judge, Manim MCP, nishOS, Wine Quality, Vorithm)  
6. **Latent skills** — clickable scatter plot; “resample” jitters positions  
7. **Lab notes** — notebook cells with a typewriter output and a fake training curve  
8. **Ping** — name + note form; submits via `mailto:` (no server)

---

## Folder map

```
src/
  app/
    layout.tsx      # fonts, <html>/<body>, metadata
    page.tsx        # homepage composition
    globals.css     # tokens, marquee, reduced-motion
  components/       # one file per section (see names above)
  data/
    content.ts      # all personal copy and project data
```

Config at the repo root: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `package.json`.

**Stack:** Next.js 14.2 (App Router), React 18, TypeScript, Tailwind CSS 3. No extra animation library — motion is CSS + `requestAnimationFrame`.

---

## Edit your content

In `src/data/content.ts`:

- `profile` — name, role, blurb, location, email, social links  
- `experiments` — the six project cards (`title`, `summary`, `stack`, `accent`)  
- `skills` — scatter-plot points (`x`, `y`, `r`, `cluster`)  
- `labNotes` — notebook cells (`call` + `lines`)  
- `ticks` — words in the marquee  

The contact form emails `profile.email`. Until that (and GitHub / LinkedIn) are real URLs, the footer links are placeholders.

---

## Design tokens

Defined in `src/app/globals.css` and mirrored in `tailwind.config.ts`:

| Token | Hex | Used for |
| --- | --- | --- |
| `ink` | `#0b0a08` | page background |
| `cream` | `#f4efe4` | body text |
| `lime` | `#c8f542` | highlights |
| `coral` | `#ff5e3a` | some card accents |
| `sky` | `#7ad7ff` | some card accents |
| `gold` | `#ffd24a` | contact panel, lab notes accent |

Prefer these names (`bg-ink`, `text-gold`) over one-off hex, unless it is a single decorative stop.

---

## Accessibility and motion

The particle field and typewriter skip animation when the OS has **Reduce Motion** on (`prefers-reduced-motion: reduce`). CSS marquees and the SVG “draw” animation are disabled the same way.

---

## Docs that grow with the repo

- [`progress.md`](./progress.md) — dated log of decisions and incidents  
- [`interview_questions.md`](./interview_questions.md) — Q&A tied to code in this repo  

When you add a feature, update those two files as well as this README if the folder map or “how to edit” steps change.
