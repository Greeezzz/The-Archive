# AGENTS.md — Rules for AI coding agents

You are redesigning **The Archive** (Chelo's portfolio) into an industrial HUD / motion-graphic style. Read in this order: this file → `PRD.md` → `DESIGN.md` → `MOTION.md` → `TASKS.md`. If documents conflict: `AGENTS.md` > `PRD.md` > `DESIGN.md` > `MOTION.md` > `TASKS.md`.

## Stack (do not change)

React 19 · Vite 8 · React Router 7 · plain CSS (one `.css` next to each component/page) · JavaScript (no TypeScript) · ESLint flat config.

Commands: `npm install` · `npm run dev` · `npm run lint` · `npm run build` · `npm run preview`.

## Repo map

```
src/
  App.jsx              routes + global layers
  main.jsx
  index.css            global styles (becomes: imports tokens + resets)
  App.css              legacy, review and trim
  pages/               Home, Archive, About, Projects, NotFound (+ .css each)
  components/          Navbar, Cursor, PageTransition, BackToTop,
                       CharacterCard, CharacterModal, BannerCard, BannerModal (+ .css each)
  data/                characters.json (23), banners.json (2)
public/                characters/, banners/, projects/, profile/, logo.jpg, favicon.svg
docs/                these files
```

New folders you may create: `src/styles/`, `src/lib/`, `src/components/ui/`, `src/components/motion/`.

## Hard rules

1. **Work one phase at a time** from `TASKS.md`. Stop after each phase and report. Don't jump ahead.
2. **Never change data schemas** in `src/data/*.json`, and don't edit names, quotes, colors, bio, or project copy unless asked.
3. **Never modify, rename, or delete anything in `public/`** (artwork is Chelo's). You may add new files (e.g. an OG image) and say so.
4. **No new dependencies** beyond those approved in `PRD.md` §7 (`motion`; optionally `lenis`, `gsap`, `@gsap/react`). Ask before anything else.
5. **IP boundary** (`PRD.md` §8): never use Arknights/Endfield/Hypergryph logos, wordmarks, art, UI screenshots, or those names on the site. Draw everything yourself in CSS/SVG.
6. **Don't regress behavior**: search, tabs, modal focus trap/Esc/scroll lock, skip link, keyboard card activation, lazy images + fallback, mobile menu, reduced motion. Use the checklist in `TASKS.md`.
7. **Performance**: follow `MOTION.md` §4. Animate `transform`/`opacity`/`clip-path` only.
8. **Accessibility**: `DESIGN.md` §8. Decorative elements get `aria-hidden="true"`.
9. **Delete dead code**: when a component's new CSS replaces the old, remove the old rules and unused imports in the same commit.
10. Do not push to `main` directly if the repo uses PRs; otherwise one commit per phase with a clear message.

## Code conventions

- Function components + hooks. Keep existing `memo` usage on list items.
- CSS class naming follows the existing BEM-like pattern: `block__element--modifier` (`card__info`, `navbar__link--active`). New shared UI uses `ui-` prefix (`ui-panel`, `ui-btn`, `ui-tag`).
- Colors, fonts, spacing come from CSS variables in `src/styles/tokens.css`. No hard-coded hex values in component CSS, except per-entry colors passed through the `--entry` variable from JSON.
- Per-entry color: set inline `style={{ '--entry': character.color }}`. Don't reuse the name `--accent` (it was the old global pink).
- Imports: React is already auto-imported by the Vite plugin; remove unused `import React` / unused hooks when touching a file.
- Keep components small. If a file passes ~200 lines of JSX, split it.
- Comments explain *why*, not *what*. No giant banner comments.
- Text content in Indonesian stays Indonesian; UI labels in English as they are today.

## Definition of done (every phase)

- `npm run lint` passes with no new warnings.
- `npm run build` passes.
- Manual checklist in `TASKS.md` passes, including reduced motion and a 360px-wide viewport.
- No console errors.
- Short report to Chelo: what changed, what you verified, anything you noticed but didn't touch, and your proposed next step.

## When to stop and ask Chelo

- A requirement is ambiguous or contradicts another doc.
- You want a dependency not on the approved list.
- You need to touch `public/` assets or data schemas.
- A visual decision is a matter of taste with no rule in `DESIGN.md` (propose 2 options with a one-line tradeoff each).

## Honesty about verification

Don't claim something was tested if you only wrote the code. Say "built and linted" vs "checked in browser at 360px / 1440px". If you couldn't run the browser, say so.
