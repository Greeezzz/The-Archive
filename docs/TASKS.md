# TASKS.md — Phased plan (LEGACY v1)

> **Superseded by `TASKS-V2.md`.** Keep using Phase 0 (bug fixes) and the manual regression checklist below. Phases 1–5 assume the old dark look and are replaced by the v2 plan.

One phase = one commit (or small PR). After each phase run `npm run lint && npm run build`, then the manual checklist at the bottom. Don't start the next phase while the current one is broken.

## Phase 0 — Cleanup & bug fixes (before any redesign)

Real issues found in the current code:

- [ ] `Archive.jsx`: banner search filters on `banner.name`, but `banners.json` uses `title`. Banner search by title never matches. Use `title`.
- [ ] `Cursor.jsx`: hover listeners are attached once at mount with `querySelectorAll`, so cards rendered after mount (Archive grid, banners) don't trigger the hover ring. Switch to event delegation.
- [ ] `App.jsx`: `setScrollProgress` runs on every scroll event, re-rendering the whole app tree. Move progress into its own component/ref (or `useScroll`).
- [ ] `App.jsx`: `/projects` route is declared after `path="*"` and `Projects` import is out of order. Works due to route ranking, but reorder for clarity. Remove unused `useRef` import.
- [ ] `CharacterCard.jsx` and `CharacterModal.jsx` duplicate `isLightColor` (and use deprecated `substr`). Extract to `src/lib/color.js` using `slice`/`parseInt`.
- [ ] `index.html`: `og:image` / `twitter:image` point to `/og-image.png`, which is not in `public/`; `og:url`/`twitter:url` use `greeezzz.github.io` but the site is `cheloarchive.my.id`; favicon `type="image/svg+xml"` for a `.jpg`. Fix (generate an og image or point to an existing asset).
- [ ] `Projects.jsx` uses `page-enter` class directly while other pages use the `PageTransition` wrapper only. Unify during Phase 3.

Acceptance: behavior identical to today except the fixes. Lint + build pass.

## Phase 1 — Foundation

- [ ] `npm i motion` (add `lenis` only if Chelo wants smooth scroll).
- [ ] Create `src/styles/tokens.css` (see `DESIGN.md` §1), import in `index.css`; swap Google Fonts to Chakra Petch / Inter / JetBrains Mono.
- [ ] Strip old neon globals from `index.css` (`.grain`, `.ambient-glow*`, neon classes, hexagon, data-stream, gradient scrollbar/selection). Keep skip-link, restyle focus-visible.
- [ ] Add `src/lib/motion.js` (tokens), `src/components/motion/{DecodeText,Reveal,DrawLine}.jsx`.
- [ ] Reusable `Panel`, `Button`, `Tag` components + CSS (chamfer, bracket, signal variants) in `src/components/ui/`.

Acceptance: app still runs; globals are clean; a throwaway demo route or Storybook-like page is NOT left in the repo.

## Phase 2 — Shell

- [ ] Restyle `Navbar` (desktop + mobile), `BackToTop`, scroll progress.
- [ ] Rebuild `PageTransition` with `AnimatePresence` (M1). Move routes into a child component for `useLocation`.
- [ ] Rebuild `Cursor` (M9) with delegation, fine-pointer only.
- [ ] Page frame + top status bar (hidden < 768px).

## Phase 3 — Pages

Do in this order, one commit each:
1. [ ] `Home` (hero, decode, CTAs, footer strip, boot intro M12).
2. [ ] `Archive` (console header, tabs M7, search, grid, empty state).
3. [ ] `CharacterCard` + `BannerCard` (lock-on M5, stagger M3).
4. [ ] `CharacterModal` + `BannerModal` (M6; keep focus trap/Esc/scroll lock/portal).
5. [ ] `About`.
6. [ ] `Projects`.
7. [ ] `NotFound`.

Delete each old stylesheet block as its replacement lands. No dead CSS left behind.

## Phase 4 — Polish & performance

- [ ] Reduced-motion pass over every motion in `MOTION.md`.
- [ ] Mobile pass at 360 / 390 / 768 widths; fix overflow.
- [ ] Image pass: width/height/aspect-ratio, `decoding="async"`.
- [ ] Lighthouse mobile on `/` and `/archive` (target >= 90 Performance, >= 95 Accessibility).
- [ ] Bundle check: `npm run build`, main chunk < ~250 KB gzipped.
- [ ] Update `README.md` (replace the Vite template text) with the project description, scripts, structure, and how to add a character.

## Phase 5 (optional) — Extras

- [ ] Lenis smooth scroll.
- [ ] Archive "operator view": click-through next/prev entry inside the modal with arrow keys.
- [ ] Per-entry share URL (`/archive?entry=007`).
- [ ] GSAP or a small WebGL background only if Chelo asks.

## Manual regression checklist (every phase)

- [ ] `/`, `/archive`, `/about`, `/projects`, and a bogus URL all render.
- [ ] Direct load / refresh on `/archive` works (host rewrite to index.html is a deploy concern, don't break local dev).
- [ ] Search: type, clear, no-results state; both tabs.
- [ ] Open a card by mouse, Enter, and Space; Esc closes; focus returns to the card; page doesn't scroll behind the modal.
- [ ] Mobile menu opens/closes and closes on route change.
- [ ] Tab through the whole page: visible focus everywhere, skip link works.
- [ ] Reduced motion ON: nothing flashes or sweeps.
- [ ] No console errors/warnings.

## Kickoff prompt for the AI agent

> Read `docs/AGENTS.md`, then `docs/PRD.md`, `docs/DESIGN.md`, `docs/MOTION.md`, `docs/TASKS.md` in that order. Work on **Phase 0** only. Make one commit, run `npm run lint && npm run build`, then summarize what changed and what you want to do next. Do not start Phase 1 until I say so.
