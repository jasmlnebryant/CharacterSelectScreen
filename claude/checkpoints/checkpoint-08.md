# Checkpoint 08 — Stage 2: Companion Art, Color System, Dev Toggles
**Date:** 2026-03-30
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Companion art live, per-companion color system built, 4 dev toggle buttons active. Ready to commit.

---

## 1. Context Resume

Stage 2 is underway. Companion art has been generated and dropped into the app. A full per-companion color tinting system has been built and tied to dev toggle buttons for real-time design exploration.

**What changed since Checkpoint 07:**

- **Companion art:** Generated pixel art for Vexor (fierce black panther with geometric markings), Atomix (bubbly green axolotl/frog with goggles), Archaeon (steampunk tortoise with map shell). Copied to `src/assets/`. `companions.js` updated to import and reference each image. `CompanionCard.jsx` replaced placeholder div with `<img className="card-image">`. Card padding removed, `overflow: hidden` added, image fills card edge to edge.
- **Per-companion color system:** Each companion has a card background tint and info panel text hue:
  - Vexor: `rgba(30, 0, 60, 0.35)` card, `#b490d4` subject, `#8855aa` sub-subjects
  - Atomix: `rgba(0, 70, 60, 0.35)` card, `#74c4ba` subject, `#50a399` sub-subjects
  - Archaeon: `rgba(70, 45, 0, 0.35)` card, `#d0ab71` subject, `#b0813e` sub-subjects
- **Companion class scoping fix:** `.companion-vexor` in CompanionCard.css changed to `.companion-card.companion-vexor` to prevent the card tint from bleeding onto the info panel div.
- **Background color:** Removed `grayscale(100%)` from `.screen-bg` filter — background is now full color at 25% opacity.

**Dev toggle buttons (top-right, stacked):**
1. **GRID** (top: 16px) — toggleable design grid overlay
2. **COLOR** (top: 52px) — applies companion hue tints to center card + info panel text only
3. **VISIBILITY** (top: 88px) — fills side (non-highlighted) companion art with black (`filter: brightness(0)`)
4. **CARDS** (top: 124px) — shows/hides card backgrounds and borders (active = visible)

**Color toggle behavior:** Tint only applies to the CENTER (highlighted) card. Side cards always use default black background regardless of COLOR state.

---

## 2. Human Directions

Steps to reproduce from Checkpoint 07:

1. Copy companion art to `src/assets/`: `vexor.png`, `atomix.png`, `archaeon.png`
2. Update `src/data/companions.js`: import images, replace `placeholderValue` with `image` field
3. Update `CompanionCard.jsx`: replace placeholder div with `<img className="card-image" src={companion.image} alt={companion.name} />`
4. Update `CompanionCard.css`: replace placeholder/initial styles with `.card-image { width:100%; height:100%; object-fit:cover; display:block }`. Remove card padding, add `overflow: hidden`
5. Add 3 new state vars to App.jsx: `colorVisible`, `visibilityMode`, `cardsVisible`
6. Add COLOR, VISIBILITY, CARDS buttons to App.jsx viewport (outside phone frame)
7. Pass all toggle props to CompanionCard; apply conditional classes: `companion-${id}` (center + colorVisible only), `is-silhouette` (non-center + visibilityMode), `no-card` (!cardsVisible)
8. Add companion tint rules to CompanionCard.css (scoped to `.companion-card.companion-X`)
9. Add companion info panel tint rules to App.css (scoped to `.info-panel.companion-X`)
10. Add button styles for COLOR, VISIBILITY, CARDS to App.css (stacked at top: 52/88/124px)
11. Remove `grayscale(100%)` from `.screen-bg` filter

---

## 3. Records of Resistance

**R1 — mix-blend-mode: multiply failed on dark background**
- Attempted to drop white image backgrounds using `mix-blend-mode: multiply`
- On dark cards, multiply darkened everything — characters became nearly invisible
- Fix: removed blend mode entirely, let images render naturally inside rounded card

**R2 — Companion class bleeding onto info panel**
- Added `companion-vexor` class to both card and info panel for color tinting
- The `.companion-vexor { background }` rule in CompanionCard.css applied to the info panel div too
- Fix: scoped to `.companion-card.companion-vexor` — CSS specificity prevents bleed

**R3 — COLOR toggle applied tint to all cards**
- Initial implementation applied companion color class to all three cards
- Student specified: only the highlighted (center) card should receive the tint
- Fix: added `&& position === 'center'` condition before applying companion class in CompanionCard.jsx

---

## 4. Successes

**S1 — Companion art quality**
- All three Gemini-generated pixel art companions matched the Meowtra/Ligon reference style exactly: white background, centered, full body, pixel resolution. Dropped in with zero resizing needed.

**S2 — Toggle system architecture**
- The companion ID class system (`companion-${id}`) on both card and info panel creates a clean, extensible color system. Adding a new companion's colors = 3 CSS rules. No JS logic changes needed.

**S3 — Stage 2 underway**
- Character art is live. Color system is built. Next steps: finalize color values per companion, consider removing card borders when art is final, move toward animation (Stage 3).
