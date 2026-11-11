# The Archive

> Industrial HUD / Tactical Sci-Fi Portfolio by Chelo (Greeezzz).  
> Live: [https://www.cheloarchive.my.id/](https://www.cheloarchive.my.id/)

---

## Overview

**The Archive** is a personal portfolio showcasing original and fan character designs, banner graphics, and software projects. Styled as an industrial operator dossier terminal, it draws inspiration from tactical sci-fi motion graphics and technical field interfaces.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Routing:** React Router v7
- **Styling:** Vanilla CSS with custom design tokens (`tokens.css`) & BEM-like conventions
- **Motion:** `motion/react` (Framer Motion)
- **Typography:** Chakra Petch (Display), Inter (Body), JetBrains Mono (Code/HUD)

## Project Structure

```
The-Archive/
├── docs/                 # System architecture, PRD, design, and motion specs
├── public/
│   ├── characters/       # Character artwork (.webp)
│   ├── banners/          # Banner artwork (.webp)
│   ├── projects/         # Project showcase images (.webp)
│   └── profile/          # Profile assets
├── src/
│   ├── components/       # Shell & UI components (Navbar, Cursor, Frame, Modals, Cards)
│   │   ├── motion/       # Motion primitives (DecodeText, Reveal, DrawLine)
│   │   └── ui/           # Reusable HUD primitives (Button, Panel, Tag)
│   ├── data/             # characters.json (23 entries), banners.json (2 entries)
│   ├── lib/              # Utility helpers (color, motion tokens)
│   ├── pages/            # Home, Archive, About, Projects, NotFound
│   ├── styles/           # tokens.css (color, typography, geometry tokens)
│   ├── App.jsx           # Root layout & route tree
│   ├── index.css         # Reset & global tokens import
│   └── main.jsx
```

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run ESLint checks
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Adding a New Character Entry

To add a new operator entry to the archive:
1. Place the character image inside `public/characters/` (recommended format: `.webp`).
2. Open `src/data/characters.json` and append a new entry:
```json
{
  "id": 24,
  "number": "024",
  "name": "CHARACTER NAME",
  "quote": "Character voice line or memorable quote.",
  "image": "/characters/archive_24.webp",
  "color": "#E5A93C",
  "category": "ORIGINAL",
  "isWiderDesign": false
}
```
3. Run `npm run build` to verify. The entry will automatically be rendered in the archive grid and search filter.
