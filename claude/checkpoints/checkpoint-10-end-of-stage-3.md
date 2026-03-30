# Checkpoint 10 — End of Stage 3: Animation
**Date:** 2026-03-30
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Stage 3 complete. Idle float animation live on highlighted companion. Ready to commit.

---

## 1. Context Resume

Stage 3 is complete. The highlighted companion now has a continuous floating/bobbing idle animation. Additional per-companion art scaling and button polish were applied.

**What changed since Checkpoint 09:**

- **Float animation:** `@keyframes float` added to CompanionCard.css — `translateY(0 → -8px → 0)` over 3s, `ease-in-out`, `infinite`. Applied only to `.position-center .card-image`.
- **Vexor art scale:** Vexor's image permanently scaled up 15% via `[data-companion="vexor"] .card-image { scale: 1.15 }`. Uses CSS `scale` property (not `transform`) to avoid conflicting with the float animation's `transform: translateY`. Applied always — not conditional on COLOR toggle.
- **data-companion attribute:** Added `data-companion={companion.id}` to the card div in CompanionCard.jsx (always present, independent of color toggle) to support always-on per-companion style rules.
- **SELECT button opacity:** Default black background reduced from 70% → 60% opacity (`rgba(0,0,0,0.6)`).

**Current animation spec:**
- Keyframes: `translateY(0) → translateY(-8px) → translateY(0)`
- Duration: 3s
- Easing: ease-in-out
- Loop: infinite
- Scope: center card image only

**Production pipeline stage:** Stage 3 — Animation ✓

---

## 2. Human Directions

Steps to reproduce from Checkpoint 09:

1. Add `@keyframes float` to CompanionCard.css: 0% `translateY(0)`, 50% `translateY(-8px)`, 100% `translateY(0)`
2. Add `.position-center .card-image { animation: float 3s ease-in-out infinite }` to CompanionCard.css
3. Add `data-companion={companion.id}` attribute to card div in CompanionCard.jsx (unconditional)
4. Add `[data-companion="vexor"] .card-image { scale: 1.15 }` to CompanionCard.css
5. Change SELECT button default background from `rgba(0,0,0,0.7)` → `rgba(0,0,0,0.6)`

---

## 3. Records of Resistance

**R1 — Vexor scale only applied when COLOR toggled**
- Initial attempt scoped scale to `.companion-card.companion-vexor .card-image` — but `companion-vexor` class is conditional on COLOR toggle
- Fix: added permanent `data-companion` attribute to card, scoped scale to `[data-companion="vexor"]` — always present regardless of toggle state

**R2 — Float animation vs. per-companion scale conflict**
- `transform: scale(1.15)` would conflict with the float animation's `transform: translateY()`
- Fix: used CSS `scale` property (separate from `transform`) — the two coexist without overriding each other

---

## 4. Successes

**S1 — Lightweight animation**
- Pure CSS keyframe animation — zero JavaScript, zero libraries. Runs on GPU via transform, performant on mobile.

**S2 — Clean separation of always-on vs. toggle-dependent styles**
- `data-companion` attribute handles permanent per-companion rules (art scale, future art adjustments)
- `companion-${id}` class handles toggle-dependent rules (color tints)
- Two systems, clean separation, no conflicts
