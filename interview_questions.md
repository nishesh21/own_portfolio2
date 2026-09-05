# Interview questions from this project

Questions are tied to work actually done in this repo (Next.js 14 App Router, React client components, canvas motion, Tailwind, webpack watch, prod vs dev). Answers are what you should be able to say out loud.

---

## 1. Next.js App Router

**Q. What is the App Router, and why did this portfolio use `src/app/` instead of `pages/`?**

**A.** App Router (Next.js 13+) uses the filesystem under `app/` with `layout.tsx` and `page.tsx`. Nested layouts wrap children, and you get React Server Components by default. This site is a simple marketing/portfolio page, but App Router still gives us colocated layout + metadata, `next/font`, and a clear path to add routes later (`/projects/[slug]`) without mixing two routers.

**Q. What is the difference between `layout.tsx` and `page.tsx`?**

**A.** `layout.tsx` is a shared shell that does **not** remount on navigation between sibling pages. It is where we set `<html>`, `<body>`, fonts, and `metadata`. `page.tsx` is the unique UI for that URL. On `/`, `page.tsx` composes Hero, Experiments, etc. The not-found UI also renders **inside** the root layout, which is why a 404 HTML document can still contain the site title from layout metadata.

**Q. Server Components vs Client Components — how did you split them?**

**A.** Default in App Router is a Server Component (no `"use client"`). Interactive pieces need the client: canvas + `pointermove` (`EmbeddingField`), scroll listener (`SiteNav`), `setInterval` epoch (`Hero`), hover state (`Experiments`, `StackPlot`), form submit (`Contact`). `page.tsx` and `About.tsx` / `TickStrip.tsx` can stay on the server because they only render static structure (TickStrip has no hooks). Rule of thumb: push `"use client"` to the **leaves**, not the whole page, so the server can still send HTML for the static parts.

**Q. Why `"use client"` cannot be sprinkled only on a function inside a server file?**

**A.** The directive is file-level. If a file imports a client hook (`useState`, `useEffect`, event handlers that close over state), the whole module must be a client module. Server files may **import** client components; they just cannot use hooks themselves.

---

## 2. `next/font` and metadata

**Q. How does `next/font/google` work, and what did you configure?**

**A.** `next/font` downloads the font at **build time**, self-hosts the files, and injects a className / CSS variable. That avoids a render-blocking Google Fonts CSS request and reduces layout shift. We used:

- `Fraunces` as `--font-display` with variable axes `SOFT`, `WONK`, `opsz` (optical size).
- `IBM_Plex_Mono` as `--font-mono` with weights 400 and 500.

Those variables are applied on `<html>` and consumed in `tailwind.config.ts` via `fontFamily.display` / `fontFamily.mono`.

**Q. What is `export const metadata` doing?**

**A.** In a Server Component layout or page, Next.js turns that object into `<title>`, `<meta name="description">`, and related head tags. Ours sets the document title to “Nishesh Kumar — signal, models, backends”. Client components cannot export `metadata`.

---

## 3. Tailwind and design tokens

**Q. How are colors shared between CSS and Tailwind?**

**A.** Custom properties live in `globals.css` (`--ink`, `--cream`, `--lime`, …). Tailwind `theme.extend.colors` repeats the hex values so utilities like `bg-ink`, `text-lime` exist. `::selection` and canvas particle colors use the same palette by hand because canvas cannot read Tailwind class names.

**Q. Why `content` paths in `tailwind.config.ts` matter?**

**A.** Tailwind 3 scans those globs at build time and only emits CSS for classes it finds. If you put a class in a file outside `src/app`, `src/components`, `src/pages`, it will be missing in production unless you add that path. Dynamic class names like `bg-${color}` are **not** detected — we used inline `style={{ background: exp.accent }}` for per-card accents instead.

---

## 4. Canvas, animation, and accessibility

**Q. Explain the embedding particle field.**

**A.** `EmbeddingField` is a full-viewport `<canvas>` (`position: fixed`, `pointer-events: none` so clicks still hit the page). On mount we:

1. Size the canvas to `window.innerWidth/Height` and recreate N particles from area (`min(140, area/14000)`).
2. Each frame: optional attraction toward the pointer if distance < 180, damping (`vx *= 0.96`), wrap around edges, draw filled circles in four accent colors.
3. `requestAnimationFrame` loop; cleanup cancels rAF and removes listeners.

This is a simple **Euler integration** of 2D points with a radial force and drag — the same idea as a toy n-body or boids attractor, not a real embedding model. The metaphor is product design, not t-SNE.

**Q. How do you handle `prefers-reduced-motion`?**

**A.** `window.matchMedia("(prefers-reduced-motion: reduce)")`. If true, we skip velocity updates (particles stay put after the first paint). CSS animations (`marquee`, `bob`, `spin-slow`) are disabled in the same media query. Interviewers like this because motion-heavy UIs often fail a11y.

**Q. Why not Framer Motion?**

**A.** Fewer dependencies, smaller JS, and the distinctive motion (canvas + CSS marquee) did not need a animation library. Tradeoff: no spring physics helpers or layout animations; we own the rAF loop and must remember to clean it up (memory leak if you forget `cancelAnimationFrame`).

**Q. What is a CSS marquee and how is yours implemented?**

**A.** Duplicate the list of ticks, put them in a `width: max-content` flex row, animate `translateX` from `0` to `-50%` so the seam is invisible. Duration ~28s linear infinite. Overflow hidden on the parent.

---

## 5. React state patterns used here

**Q. Hero epoch counter — what would you watch for in a review?**

**A.** `setInterval` every 80ms updating React state forces a lot of re-renders. Fine for a portfolio flourish; in a product you’d either:

- write the number via a ref + `textContent` to skip React, or
- slow the interval, or
- pause when the tab is hidden (`document.visibilityState`).

Always `clearInterval` in the effect cleanup.

**Q. StackPlot “resample” — why `useMemo` on points?**

**A.** Points are derived from `skills` plus a `seed`. `useMemo(..., [seed])` recomputes jitter only when seed changes, not on every hover. Hover only updates `hover` state so the highlighted radius/glow can change without regenerating positions.

**Q. Contact form uses `mailto:` — is that a backend?**

**A.** No. `FormData` → `encodeURIComponent` → `window.location.href = mailto:...`. It opens the user’s mail client. Limits: no delivery guarantee, no spam protection, email is public in `content.ts`. A real backend would `POST` to an API route or a form service (Resend, Formspree) and validate server-side.

---

## 6. Data modeling

**Q. Why a `content.ts` module instead of CMS or MDX?**

**A.** One typed module is enough for a first personal site: `profile`, `experiments[]`, `skills[]`, `ticks[]`. Components import data; copy changes do not require hunting JSX. Later options: MDX for long case studies, a headless CMS, or MD files parsed at build time. Typed TS objects give autocomplete and catch missing fields at compile time.

**Q. How would you type an experiment object more strictly?**

**A.**

```ts
type Experiment = {
  id: string;
  epoch: string;
  title: string;
  tag: string;
  metric: string;
  summary: string;
  stack: string[];
  accent: `#${string}`;
};
```

Export `const experiments: Experiment[] = [...]` so a missing `accent` fails the build.

---

## 7. Dev vs production, ports, and file watching

**Q. `next dev` vs `next build` / `next start`?**

**A.** `next dev` compiles on demand, uses filesystem watching, source maps, Fast Refresh. `next build` pre-renders static routes (this app’s `/` is `○` static) and emits `.next/` with a `BUILD_ID`. `next start` only serves that production output. If `.next` was overwritten by a crashed/partial `next dev`, `next start` errors with “Could not find a production build”.

**Q. What does HTTP 404 on `/` with the layout title still visible mean?**

**A.** The request hit the **not-found** boundary, but the **root layout still wrapped it**. So `curl` can match the word “Nishesh” from `<title>` even though `page.tsx` never rendered. Always check status code (`curl -w "%{http_code}"`), not only string presence.

**Q. What is `EADDRINUSE`?**

**A.** Another process already bound that TCP port (here, leftover `next dev` on 3000). Fix: kill the PID (`lsof -ti :3000 | xargs kill`) or listen on another port (`next start -p 3001`).

**Q. What is Watchpack `EMFILE: too many open files`?**

**A.** The watcher opened too many file descriptors (OS `ulimit -n`). Trigger in this project: a git repo at `~/Desktop` with many nested projects/`node_modules`. Webpack/Watchpack may watch a huge tree. Mitigations:

- ignore `**/node_modules/**` and `**/.git/**` in `watchOptions` (done in `next.config.mjs`);
- raise `ulimit -n`;
- put the app in its **own** git repo so the watcher root is small;
- polling (`WATCHPACK_POLLING=true`) as a last resort (CPU heavier).

**Q. Why ignore `node_modules` in webpack watch if Next already does that?**

**A.** Next ignores a lot by default, but a parent `.git` and sibling apps can still explode the watch list. Being explicit is a defensive config; it does not replace a sane project root.

---

## 8. TypeScript and Next config

**Q. Why `next.config.mjs` instead of `.js`?**

**A.** ESM (`export default`) without forcing `"type": "module"` on the whole package. Next supports `next.config.mjs`. The webpack hook receives the default config and **returns** the mutated config; forgetting `return config` would break the build.

**Q. What does `eslint-config-next` check that vanilla ESLint does not?**

**A.** React hooks rules, Next-specific issues (e.g. `<img>` vs `next/image`, missing `rel` on `target="_blank"` — we used `rel="noopener noreferrer"` on external links in the original starter; internal `#` anchors do not need it), and some import rules. We ran `next lint --max-warnings 0`.

---

## 9. Performance talking points

**Q. Is a full-viewport canvas on every page expensive?**

**A.** Cost is **per frame**: O(particles) fill calls, ~140 arcs. That is cheap on desktop. Costs that matter more: (1) Hero `setInterval` re-renders, (2) canvas size = CSS pixels vs **devicePixelRatio** (we did not scale for retina, so dots can look soft on 2x screens — a good follow-up fix is `canvas.width = w * dpr` and `ctx.scale(dpr, dpr)`), (3) `fixed` canvas over the whole page still paints every frame even when scrolled far down; you could pause rAF when `document.hidden` or when the hero is offscreen (`IntersectionObserver`).

**Q. Why is `/` listed as static (`○`) in `next build`?**

**A.** No `dynamic = 'force-dynamic'`, no cookies/headers, no uncached fetch. Next pre-rendered HTML at build time. Client components still hydrate in the browser for interactivity. That is the usual portfolio setup: static HTML + hydrated islands.

---

## 10. Product / ML metaphor (this site’s theme)

**Q. You called the background an “embedding field.” Is it actually an embedding?**

**A.** No. Real embeddings are vectors from a model (word2vec, BERT, image encoders). t-SNE/UMAP then project them to 2D. This canvas is **random 2D points + mouse force**. The StackPlot is also fake 2D coordinates authored in `content.ts`, not a fitted projection. In an interview, say the metaphor first, then the implementation, and never claim a model you did not run.

**Q. How would you make the scatter a real embedding plot?**

**A.** Encode skill descriptions (or repo READMEs) with a small embedding API or ONNX model, reduce with UMAP/PCA offline, store `{x, y}` in `content.ts` or JSON, and render. That is a build-time data pipeline, not something to recompute on every hover.

---

## 11. Stacking contexts and paint order

**Q. You added a blurred glow `div` inside the contact card and the text got washed out. Why, and how did you fix it?**

**A.** Paint order inside a stacking context is: background → non-positioned block descendants → **positioned descendants** (`position` other than `static`) in DOM order. The glow is `absolute`, the heading and form were `static`, so the glow painted **on top** of them regardless of source order. Fix used: add `relative` to the text/form elements so they become positioned and, being later in the DOM with the same z-index, paint above the glow. Alternatives: `z-10` on the content, `-z-10` on the glow, or wrap the content in one `relative` container.

**Q. Why not just give the glow a negative z-index?**

**A.** `-z-10` would push it behind the card's own background if the card creates the stacking context (it does here — `overflow-hidden` plus a gradient background do not create one by themselves, but adding `isolation: isolate` or a transform would). Negative z-index is fragile once ancestors start creating stacking contexts, so promoting the content is the more predictable fix.

**Q. What creates a new stacking context?**

**A.** `position` + `z-index` other than `auto`, `opacity < 1`, `transform`, `filter`, `will-change`, `isolation: isolate`, `mix-blend-mode`, and a few others. Worth knowing because a stray `opacity-90` on a parent can silently trap all your z-index math.

---

## 12. SVG line-drawing animation

**Q. How does the training-curve draw-on animation work?**

**A.** Classic `stroke-dasharray` trick. Set the dash length to at least the path length and offset the dash by the same amount, so the whole stroke is inside the gap and nothing is visible. Then animate `stroke-dashoffset` to `0`, which slides the dash into view and looks like drawing:

```css
@keyframes draw { to { stroke-dashoffset: 0; } }
```

We hardcoded `260` as the dash length. The precise way is `path.getTotalLength()` in an effect, but for a fixed generated curve a safe over-estimate is fine — if the value is too small the line appears in segments, too large just delays the start slightly.

**Q. Why `vectorEffect="non-scaling-stroke"` and `preserveAspectRatio="none"`?**

**A.** The SVG uses a `0 0 100 100` viewBox stretched into a wide, short box. `preserveAspectRatio="none"` lets it distort to fill. Without `non-scaling-stroke`, that distortion would also stretch the stroke width, making the line thick horizontally and thin vertically. `non-scaling-stroke` keeps the stroke at a constant screen width.

**Q. How do you replay a CSS animation on demand in React?**

**A.** CSS animations only run once per element unless the element is recreated or the animation is removed and re-added. We used `key={runs}` on the `<path>` — changing the key unmounts and remounts the node, so the animation restarts. Other options: toggle the class in two frames, or `el.getAnimations().forEach(a => a.play())` with the Web Animations API.

**Q. Where does the curve data come from?**

**A.** Generated, not measured: `exp(-t * 2.6) * 0.82 + 0.08 + sin(i * 1.7) * 0.02`. Exponential decay for the loss shape, a small sine term for realistic jitter, a floor so it does not reach zero. Be explicit in an interview that it is decorative — presenting a synthetic curve as a real training run is the kind of thing that ends an interview badly.

---

## 13. Typewriter effect and effect hygiene

**Q. Walk through the typing animation in the lab notes.**

**A.** State holds `typed`. On every change of `output` (derived from the active cell), the effect resets `typed` to `""`, then `setInterval` advances an index by 2 characters every 18ms and calls `setTyped(output.slice(0, i))`. When `i >= output.length` we clear the interval. The cleanup function also clears it, so switching cells mid-type cancels the previous run instead of leaving two intervals racing.

**Q. Why `output.slice(0, i)` instead of appending characters?**

**A.** Slicing from the source string is idempotent — a dropped or doubled tick cannot corrupt the text, and there is no dependency on the previous state value. Appending (`setTyped(t => t + ch)`) works too but couples correctness to every update landing exactly once.

**Q. Why store the reduced-motion check in a `useRef` instead of state?**

**A.** It is read inside another effect and never needs to trigger a re-render. A ref avoids an extra render pass. The tradeoff: it is captured on mount only, so a user toggling their OS setting mid-session would not be picked up — a `matchMedia` `change` listener would fix that if it mattered.

**Q. `useMemo` on `active` and `output` — necessary?**

**A.** Not for performance; `find` over four items is trivial. It matters for **referential stability**: `output` is a dependency of the typing effect, so a memoized value keeps the effect from re-running on unrelated re-renders (the `runs` counter, for instance). That is the real reason to reach for `useMemo` here.

---

## 14. Color and design-system questions

**Q. How did you pick the replacement color?**

**A.** The palette already had `gold` (`#ffd24a`) defined as a token, so the fix stayed inside the existing system instead of introducing a new hue. A gradient (`gold → #f5b83d → #e0952b`) adds depth that a flat fill lacks. Text stays `ink` on top, which keeps contrast high — a light-on-light or dark-on-dark pairing is where these panels usually fail WCAG.

**Q. The gradient uses arbitrary values like `via-[#f5b83d]`. When is that acceptable?**

**A.** Arbitrary values are fine for one-off decorative stops. If a color gets reused, promote it to `theme.extend.colors` so it is named and greppable. The rule I follow: second usage earns a token.

---

## 15. Git: nested repos, remotes, first push

**Q. `git status` from the project folder showed `?? ../Wine-Prediction-Model/` and `?? ./`. What does that mean?**

**A.** Git walks up until it finds a `.git` directory. Here the repo root was `~/Desktop`, so every sibling folder on the Desktop was untracked in that repo. `?? ./` is this portfolio, still untracked at the parent. Never `git add .` from that root — you would stage unrelated projects, screenshots, and secrets.

**Q. How do you put a project that lives inside another git tree on GitHub by itself?**

**A.** Initialize a **new** repo in the project folder (`git init`). The inner `.git` makes this directory its own root. Then:

```bash
git add .
git commit -m "..."
git remote add origin https://github.com/<user>/<repo>.git
git branch -M main
git push -u origin main
```

The parent repo will now typically see this folder as an untracked directory or, if someone `git add`s it without care, as a **gitlink** (empty-looking submodule). Keep the parent from tracking it.

**Q. What is `git remote add origin` vs `git push -u origin main`?**

**A.** `remote add` only stores a URL named `origin`. Nothing is uploaded. `push -u origin main` sends `main` to that URL and sets **upstream** so later `git push` / `git pull` know the default. `-u` is ` --set-upstream`.

**Q. The GitHub repo already has a README commit. Why might the first push fail?**

**A.** Histories are unrelated — local has our Next.js commit, remote has a different root commit. Git refuses a non-fast-forward push. Options:

1. `git pull origin main --allow-unrelated-histories`, resolve, then push (keeps both histories).
2. `git push --force` — overwrites remote. Only if you own the repo and the README is disposable. Never force-push a shared `main` without saying so.

**Q. What should not be committed from a Next.js app?**

**A.** `node_modules/` (reinstall from lockfile), `.next/` (build output), `.env*.local` (secrets), OS junk (`.DS_Store`). The lockfile (`package-lock.json`) **should** be committed so installs are reproducible.

**Q. HTTPS vs SSH for `origin`?**

**A.** HTTPS: `https://github.com/user/repo.git`, auth via credential helper or a PAT. SSH: `git@github.com:user/repo.git`, needs an SSH key on the GitHub account. Functionally the same remote; only the transport differs.

---

## How this file grows

When we add a technical piece (routing, CMS, auth, deploy, tests, retina canvas, API route), append a numbered section with **Q / A** in the same style, plus a matching dated note in `progress.md`.
