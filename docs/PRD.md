# PRD — The Archive: Industrial HUD Redesign

Owner: Chelo (Greeezzz) · Repo: `Greeezzz/The-Archive` · Live: https://www.cheloarchive.my.id/
Status: planning · Read order for agents: `AGENTS.md` → this file → `DESIGN.md` → `MOTION.md` → `TASKS.md`

## 1. What this is

The Archive is a personal portfolio of original/fan character design cards (23 entries), plus banners, an About page and a Projects page. It is a Vite + React 19 + React Router 7 SPA, plain CSS per component, no TypeScript.

This redesign replaces the current look (cyberpunk neon + editorial serif: pink/purple/cyan glows, Playfair Display, Orbitron, floating blur orbs) with an **industrial sci-fi HUD / motion-graphic look inspired by the UI language of Arknights: Endfield**: angular chamfered panels, thin technical linework, coded labels, hazard accents, and sharp, mechanical motion.

"Inspired by" is a hard boundary: see §8 (IP).

> **v2 update:** the target look is now a **light** industrial/exhibition style (white paper, black + hazard yellow, dashed hairlines, corner handles, dark side rail) with a loud **poster mode** for Home/404 and a dedicated **line-motion system** (`LINES.md`). Wherever this PRD or v1 docs imply a dark base or the old neon look, `DESIGN.md` v2 wins. The Archive page's modal becomes a full-screen stage viewer with a pager.

## 2. Goals

1. Total visual overhaul of every page and component (Home, Archive, About, Projects, NotFound, Navbar, cards, modals, cursor, transitions).
2. Motion is a first-class feature: page transitions, text decode, line draw, staggered panel reveals, card hover "lock-on", modal open/close.
3. Keep the character art as the hero. The UI frames the art; it never competes with it.
4. Stay fast. Target Lighthouse Performance >= 90 on mobile for `/` and `/archive`; no jank on a mid-range Android phone.
5. Keep content and data model unchanged unless stated.

## 3. Non-goals

- No backend, CMS, auth, or analytics.
- No migration to TypeScript, Next.js, or Tailwind.
- No changing copy/bio text, project descriptions, or character data (quotes, names, colors) unless Chelo asks.
- No copying game assets (see §8).
- No 3D/WebGL in the first pass (optional later phase).

## 4. Audience

Recruiters/clients looking at design work, anime/gaming community, other designers. Mostly mobile visitors from social links (Instagram/X), so mobile quality matters as much as desktop.

## 5. Pages & requirements

Routes (from `src/App.jsx`): `/`, `/archive`, `/about`, `/projects`, `*` (NotFound).

| Page | File | Must have after redesign |
|---|---|---|
| Home | `src/pages/Home.jsx` | HUD-style hero ("A curated Archive of characters"), entry count from `characters.json`, 3 CTAs (Browse Archive, Meet the Creator, View Projects), animated intro sequence (boot/decode), footer status strip |
| Archive | `src/pages/Archive.jsx` | Tabs (Archive / Banner), search, grid of entry cards, empty state, modals. Cards styled as dossier panels. Wide cards (`isWiderDesign`, 4 entries) keep spanning 2 columns |
| About | `src/pages/About.jsx` | Bio, socials (X, Instagram, GitHub), profile photo in framed panel, stats block |
| Projects | `src/pages/Projects.jsx` | "Deployed" vs "Unreleased" project panels with `sysRef`/`env` tags (already in data, a natural fit for the HUD look) |
| NotFound | `src/pages/NotFound.jsx` | Error/"signal lost" screen in the same system |
| Global | `Navbar`, `Cursor`, `BackToTop`, `PageTransition`, scroll progress | Restyled; cursor only on fine pointers |

Behavior that must not regress: search filtering, tab switching, modal focus trap + Escape to close + scroll lock, skip link, keyboard activation of cards, lazy-loaded images with fallback, mobile nav menu, `prefers-reduced-motion` support.

## 6. Data (do not change the schema)

- `src/data/characters.json` — 23 items: `id, number, name, quote, image, color, category, isWiderDesign?`
- `src/data/banners.json` — 2 items: `id, title, description, image, color, githubLink`
- Projects and socials are inline arrays in `Projects.jsx` / `About.jsx`; may be moved to `src/data/` but keep the same fields.
- `color` per character drives each card/modal accent. Keep this behavior; it is the main source of color variety against the otherwise neutral UI.

## 7. Libraries (answer to "can we use React libraries?")

Yes. Current deps: `react`, `react-dom`, `react-router-dom` only. Approved additions:

| Library | Why | Used for |
|---|---|---|
| `motion` (import from `motion/react`; formerly Framer Motion) | Declarative React animation, `AnimatePresence` for route/modal exit animations, layout animations, SVG `pathLength` | Page transitions, modal, staggered reveals, card hover |
| `lenis` | Smooth scrolling | Optional, global scroll feel; must respect reduced motion; drop if it fights with the modal scroll lock |
| `gsap` + `@gsap/react` | Timeline sequencing | Only if a sequence is too awkward in `motion` (e.g. the Home boot sequence). Optional |

Not approved without asking Chelo: `three` / `@react-three/fiber`, Tailwind, UI kits (MUI, Chakra, etc.), any icon pack over ~10 KB (inline SVG instead).

Rule: every new dependency must be justified in the commit message and keep the production bundle reasonable (watch `npm run build` output; the main chunk should stay under ~250 KB gzipped).

## 8. IP / legal boundary

Take the *design language* (angular panels, HUD linework, coded labels, mechanical motion). Do **not** use: Hypergryph/Gryphline logos, wordmarks, game UI screenshots, icons, fonts that are proprietary, game art, or the words "Arknights"/"Endfield" anywhere on the site. Everything must be drawn from scratch (CSS/SVG). The site's identity stays "The Archive by Chelo".

## 9. Success criteria

- Every page visually consistent with `DESIGN.md` (no leftover pink/purple neon, no Playfair/Orbitron).
- `npm run lint` and `npm run build` pass.
- All motions in `MOTION.md` exist and degrade to near-static under `prefers-reduced-motion: reduce`.
- Mobile (360px wide) has no horizontal scroll and no overlapping decorative text.
- Chelo can add a new character by editing only `characters.json` and dropping an image in `public/characters/`.

## 10. Risks

| Risk | Mitigation |
|---|---|
| Heavy effects (blur orbs, full-screen overlays, many infinite animations) hurt mobile perf | `MOTION.md` perf budget: animate only `transform`, `opacity`, `clip-path`; no animating `filter: blur`; cap infinite animations |
| Decorative text overflows on small screens | Decoration is hidden or simplified under 768px |
| Style turns into a Endfield copy | §8 + `DESIGN.md` "original details" rules |
| Large rewrites break working features | Phased plan in `TASKS.md`, one phase per commit, manual regression checklist per phase |

## 11. Open questions for Chelo

1. ~~Signature accent~~ Resolved in v2: hazard yellow + black on a light base.
2. Keep the Indonesian-slang bio as is? (Default: yes, unchanged.)
3. Want a loading/boot intro on first visit only (session-based) or every load? (Default: first visit per session.)
