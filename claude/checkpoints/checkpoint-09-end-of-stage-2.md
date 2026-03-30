# Checkpoint 09 — End of Stage 2: Base Colors & Companion Art
**Date:** 2026-03-30
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Stage 2 complete. Companion art live, per-companion color system built, dev toggle suite active. Note: floating animation (Stage 3 work) has since been added to the codebase — this checkpoint captures the state immediately before animation began.

---

## 1. Context Resume

Stage 2 is complete. All three companion pixel art pieces are live in the app. A full per-companion color tinting system is built and controlled by dev toggle buttons. A SELECT button has been added at the 760px grid line.

**What changed since Checkpoint 08:**

- **Center card scaled up 20%:** `.position-center` transform changed from `scale(1)` to `scale(1.2)`.
- **SELECT button added:** `position: absolute; top: 760px; transform: translateX(-50%) translateY(-50%) scale(0.8)`. Press Start 2P, 17px, `padding: 20px 30px; width: calc(100% - 60px)`. Background `rgba(0,0,0,0.7)`, border-radius 16px. When COLOR toggle is on, button background adopts the companion's lighter accent color at 40% opacity.
- **Companion tint on SELECT button:** `companion-${active.id}` class applied to select button when `colorVisible` is true. Colors: Vexor `rgba(180,144,212,0.4)`, Atomix `rgba(116,196,186,0.4)`, Archaeon `rgba(208,171,113,0.4)`.
- **Dev toggle — CARDS button added:** 4th toggle button (top: 124px). When toggled off, all card backgrounds and borders become transparent (`no-card` class). Active by default.
- **Dev toggle — VISIBILITY button:** Fills side (non-highlighted) companion art with black via `filter: brightness(0)`.
- **Color toggle scoped to center card only:** `colorVisible && position === 'center'` condition ensures side cards never receive companion tint.

**Dev toggle buttons (top-right, stacked):**
1. GRID (top: 16px)
2. COLOR (top: 52px) — companion hue on center card, info panel text, and SELECT button
3. VISIBILITY (top: 88px) — side companions go black
4. CARDS (top: 124px) — show/hide card backgrounds

**Production pipeline stage:** Stage 2 — Base Colors ✓

---

## 2. Human Directions

Steps to reproduce from Checkpoint 08:

1. Change `.position-center` transform to `scale(1.2)`
2. Add SELECT button to `screen-content` in App.jsx with conditional companion class when `colorVisible`
3. Add `cardsVisible` state + CARDS toggle button to App.jsx; pass to CompanionCard as prop; apply `no-card` class when false
4. Add `.companion-card.no-card { background: transparent; border-color: transparent }` to CompanionCard.css
5. Add SELECT button styles to App.css at 760px grid line
6. Add companion accent color rules for `.select-btn.companion-X` at 40% opacity
7. Ensure VISIBILITY toggle passes `visibilityMode` prop; side cards get `is-silhouette` class → `filter: brightness(0)`

---

## 3. Records of Resistance

**R1 — Companion class bleeding onto info panel (repeated issue)**
- Adding `companion-vexor` class to info panel caused the card's `.companion-vexor { background }` rule to bleed onto the panel
- Fix: always scope companion tint rules to `.companion-card.companion-X` not `.companion-X` alone

**R2 — SELECT button padding iteration**
- Went through several padding values (10px → 15% → 15px → 20px) before landing on `20px 30px`
- `15%` padding top/bottom was a misunderstanding — CSS percentage padding is relative to width, not height

**R3 — Button tint color source**
- First attempt used dark card colors (e.g. `rgba(30,0,60,0.4)`) for the button tint — too dark/invisible
- Correct source: lighter info panel accent colors (`#b490d4`, `#74c4ba`, `#d0ab71`) at 40% opacity — gives a readable, visible tint

---

## 4. Successes

**S1 — Full color system built before art finalization**
- Per-companion color tinting works across card, info panel text, and SELECT button simultaneously — all driven by a single `colorVisible` state and CSS class

**S2 — Dev toggle suite**
- 4 toggles (GRID, COLOR, VISIBILITY, CARDS) give real-time design exploration without touching code — useful for Stage 3 decisions (e.g. testing how companions look with/without cards before committing)

**S3 — SELECT button width decision**
- "Not what I meant, but I'm not mad at it" — `width: calc(100% - 60px)` was a happy accident the student approved, making the button feel grounded and intentional rather than floating
