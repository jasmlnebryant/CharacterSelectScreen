# Checkpoint 03 — 3D Turntable Carousel
**Date:** 2026-03-29
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Carousel implemented and approved. Ready to commit.

---

## 1. Context Resume

The flat 3-column hover layout has been replaced with a 3D turntable carousel. The user swipes left/right (mouse drag or touch) to rotate between companions. The active center companion is full size and full opacity; side companions recede in Z with reduced scale and opacity. An info panel below the carousel reveals the active companion's name, subject, sub-subjects, and flavor line.

**Current file state:**

- **src/App.jsx** — Rewritten. State: `activeIndex`, `dragStartX`, `gridVisible`. Key logic: `getPosition(index, activeIndex, total)` returns `'center'`, `'left'`, or `'right'`. `advance(dir)` cycles index. `handleDragStart` / `handleDragEnd` with `SWIPE_THRESHOLD = 40`. Info panel reads from `companions[activeIndex]`. Click on side card calls `advance(±1)`.
- **src/components/CompanionCard.jsx** — Simplified. Accepts `position` prop (`'center'` / `'left'` / `'right'`). Renders placeholder image + name + subject only. No hover state logic.
- **src/components/CompanionCard.css** — Position-based 3D transforms. Center: `translateX(0) scale(1)` opacity 1. Left/Right: `translateX(±148px) translateZ(-60px) scale(0.72)` opacity 0.45. `perspective` lives on the stage, not the card.
- **src/App.css** — `.companions-row` removed. `.carousel-stage` added: `position: absolute; top: 360px; height: 190px; perspective: 600px`. `.info-panel` added: `position: absolute; top: 566px`, Press Start 2P name, sans-serif subject/sub-subjects/flavor.
- **src/components/GridOverlay.jsx / GridOverlay.css** — Unchanged. G key or GRID button toggles 4-column layout grid with baseline, center crosshairs, and row labels every 10px.
- **src/data/companions.js** — Unchanged. 3 companions: Vexor (Math), Atomix (Science), Archaeon (History).

---

## 2. Human Directions

Steps to reproduce this state from Checkpoint 02:

1. Rewrite `src/App.jsx` with carousel state (`activeIndex`, `dragStartX`), `getPosition()` helper, `advance(dir)` function, swipe handlers (`handleDragStart`, `handleDragEnd`, threshold 40px), and info panel below carousel
2. Rewrite `src/components/CompanionCard.jsx` — accept `position` prop, remove all hover/selection logic, render image + name + subject only
3. Rewrite `src/components/CompanionCard.css` — replace hover/selection classes with `.position-center`, `.position-left`, `.position-right` using 3D transforms; cards are `position: absolute` inside the stage
4. Update `src/App.css` — replace `.companions-row` with `.carousel-stage` (perspective container, absolute positioned) and add `.info-panel` styles below it

---

## 3. Records of Resistance

**R1 — Flat vs. 3D carousel**
- Proposed: Claude offered both a flat sliding approach and a 3D depth approach
- Student chose: 3D turntable with Z-axis depth
- Result: `perspective: 600px` on stage, `translateZ(-60px) scale(0.72)` on side cards

**R2 — Header shift during earlier layout work**
- During pixel-precise positioning of cards against the grid, Claude adjusted the header position when only the card position was requested
- Student flagged: "youre shifting things other than what im telling you to"
- Lesson: Always isolate changes to exactly what was asked. Absolute-positioned elements can feel coupled visually even when they aren't in the DOM — verify with grid overlay before and after.

**R3 — Grid label off-by-one bug**
- Row labels were positioned at `i * ROW_HEIGHT` but displayed value `(i + 1) * ROW_HEIGHT`
- This caused a 40px miscommunication: what the student called the "560 line" was actually pixel 520
- Fixed: labels now positioned at `(i + 1) * ROW_HEIGHT` so label value matches actual pixel position

---

## 4. Successes

**S1 — Grid as shared language**
- The toggleable grid overlay (G key) became the primary communication tool for pixel-precise positioning. Instead of vague descriptions ("lower it a bit"), both student and Claude referenced exact pixel values (e.g., "bottom of cards to the 490 line"). This eliminated ambiguity and reduced back-and-forth.

**S2 — Carousel direction confirmed before build**
- Before writing any carousel code, Claude confirmed 3D vs. flat with the student. The student said "3D" then "confirm." No wasted implementation.

**S3 — Clean architecture for carousel**
- `position` prop (`'center'` / `'left'` / `'right'`) is the single source of truth for each card's visual state. CSS does the rest. No JavaScript style calculations, no inline transforms — all handled by class selectors. Easy to tune visually without touching logic.
