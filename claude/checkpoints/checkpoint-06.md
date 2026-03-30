# Checkpoint 06 — Layout Centering & Typography Pass
**Date:** 2026-03-30
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Status:** Layout centered, typography refined. Ready to commit.

---

## 1. Context Resume

This checkpoint covers layout centering, card aspect ratio matching, and a full typography refinement pass on the info panel.

**What changed since Checkpoint 05:**

- **Card aspect ratio:** `.card-info` hidden on all three cards (not just center). All three cards now share identical proportions — just different scales. Image-wrap margin normalized to `margin: 10px; width: calc(100% - 20px)` on all positions.
- **Text +5%:** All visible font sizes increased by 5%: screen-title 16→17px, info-name 16→17px, info-subject 12→13px, info-sub-subjects 10→11px, info-flavor 12→13px, card-initial 28→29px. `text-align: center` explicitly set on all text elements.
- **Layout centered on phone:** Entire content block (header + carousel + info panel) shifted up 27px so its vertical center aligns with the phone's center (422px). New values: header `top: 317px`, stage `top: 300px`, info panel `top: 483px`.
- **Subject/sub-subjects shifted up 10px:** `margin-bottom` on `.info-name` reduced from 14px → 4px. `.info-sub-subjects` margin-bottom increased from 14px → 24px to maintain quote spacing.
- **Quote:** Color set to `rgba(255, 255, 255, 0.6)`. Font restored to `system-ui, -apple-system, sans-serif`, italic, 13px (original 12px × 1.1).

**Current font sizes:**
- Header title: 17px, Press Start 2P
- Info name: 17px, Press Start 2P
- Info subject: 13px, system-ui bold
- Info sub-subjects: 11px, system-ui
- Info flavor/quote: 13px, system-ui italic, rgba(255,255,255,0.6)
- Card initial letter: 29px, Press Start 2P

**Current layout positions:**
- Header `top`: 317px (header bottom = 317px)
- Carousel stage `top`: 300px (card center ≈ 395px)
- Info panel `top`: 483px

---

## 2. Human Directions

Steps to reproduce from Checkpoint 05:

1. Hide `.card-info` on all three positions in `CompanionCard.css`
2. Apply `margin: 10px; width: calc(100% - 20px)` to all three positions' image-wraps
3. Increase all font sizes by 5%, add `text-align: center` to all text rules
4. Shift header `top` from 344px → 317px, stage from 327px → 300px, info panel from 510px → 483px
5. Reduce `.info-name` margin-bottom from 14px → 4px
6. Increase `.info-sub-subjects` margin-bottom from 14px → 24px
7. Set `.info-flavor` color to `rgba(255,255,255,0.6)`, font to system-ui italic, size 13px

---

## 3. Records of Resistance

**R1 — Quote font experimentation**
- Tried Press Start 2P on the quote at 14px, then reduced 10% twice to 12px
- Reverted to original system-ui italic — pixel font on a short italic quote felt too heavy and lost the mood distinction from the header/name
- Final: system-ui italic 13px (original 12px +10%)

**R2 — "Center everything" interpretation**
- Clarified: user meant vertically center the whole layout group on the phone, not just text-align
- Calculated content block center (~449px) vs phone center (422px) = 27px offset
- Shifted all three anchors (header, stage, info panel) up by 27px as a unit

---

## 4. Successes

**S1 — Unified card aspect ratio**
- All three cards now look identical in shape (just different sizes) — removing card-info from side cards eliminated the taller/shorter mismatch between center and side cards

**S2 — Typography hierarchy maintained through changes**
- After multiple font size passes (5% increase, quote font swap, revert, +10%), the visual hierarchy remains intact: name (bright, large, pixel) → subject (mid, bold, sans) → sub-subjects (dim, small, sans) → quote (60% white, italic, sans)
