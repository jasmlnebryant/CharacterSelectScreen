# Records of Resistance
**Project:** AI 201 Project 1 — Edumon Character Select Screen
**Last updated:** Checkpoint 12 (2026-04-01)

All resistance entries are recorded chronologically. Each entry includes the checkpoint it came from, what was proposed, what the pushback was, and what was decided.

---

## CP01 — Scaffold

**R1 — Push credentials in Claude's shell**
- Proposed: User asked if they could provide GitHub credentials so Claude could push directly
- Resistance: Claude declined — no safe way to pass credentials through this shell
- Decided: User pushes via GitHub Desktop; Claude commits locally only

**R2 — Building before Design Intent**
- Proposed: User asked if we could build out the directory structure
- Resistance: Claude flagged the hard rule — Design Intent must be student-authored before any design code
- Decided: Infrastructure scaffold only (React, Vite, GitHub Actions) — no components, no styles, no layout until Design Intent is locked

---

## CP02 — Design Intent

**R1 — iOS screen clarification**
- Proposed: The PRD said "iOS app screen" which could mean many things
- Resistance: Claude asked for clarification before assuming responsive web vs. fixed phone dimensions
- Decided: Portrait orientation, phone dimensions, rendered in browser — like holding a phone

---

## CP03 — 3D Turntable Carousel

**R1 — Flat vs. 3D carousel**
- Proposed: Claude offered both a flat sliding approach and a 3D depth approach
- Student chose: 3D turntable with Z-axis depth
- Result: `perspective: 600px` on stage, `translateZ(-60px) scale(0.72)` on side cards

**R2 — Header shift during layout work**
- During pixel-precise positioning of cards against the grid, Claude adjusted the header position when only the card position was requested
- Student flagged: "youre shifting things other than what im telling you to"
- Lesson: Always isolate changes to exactly what was asked. Verify with grid overlay before and after.

**R3 — Grid label off-by-one bug**
- Row labels were positioned at `i * ROW_HEIGHT` but displayed value `(i + 1) * ROW_HEIGHT`
- This caused a 40px miscommunication: what the student called the "560 line" was actually pixel 520
- Fixed: labels now positioned at `(i + 1) * ROW_HEIGHT` so label value matches actual pixel position

---

## CP04 — Carousel Polish

**R1 — 0.5px nudge didn't render**
- Attempted `transform: translateX(0.5px)` on `.card-initial` — sub-pixel rendering snapped it back, no visible change
- Switched to `position: relative; left: Xpx` which respects sub-pixel layout better
- Final value: `left: 2px` (confirmed by student against grid center line)

**R2 — Card not horizontally centered in stage**
- Cards were `position: absolute` inside a flex container — they don't participate in flex layout
- Fix: explicit `left: calc(50% - 65px)` anchors the card to the stage's horizontal center
- Same issue existed vertically: fixed with `top: 50%` + `translateY(-50%)` in each position transform

---

## CP05 — Background, Contrast, Phone Scaling

**R1 — Background image path and base path**
- Placing the image in `public/` would break on GitHub Pages due to the `/CharacterSelectScreen/` base path
- Fix: used `src/assets/` with an ES module import — Vite handles the base path correctly in both local dev and production

**R2 — Text vs. background contrast tradeoff**
- Option A: lower background opacity further
- Option B: bump text values up
- Decided: bump text values (subject, sub-subjects, quote) — preserves the type hierarchy that was already calibrated; background opacity stayed at 25%

**R3 — Card darkness increments**
- "30% darker" applied twice in sequence: first pass `rgba(0,0,0,0.3)`, second pass `rgba(0,0,0,0.6)`
- Placeholders darkened separately via `filter: brightness(0.7)` since their colors are defined in data (inline styles), not CSS

---

## CP06 — Layout Centering & Typography

**R1 — Quote font experimentation**
- Tried Press Start 2P on the quote at 14px, then reduced 10% twice to 12px
- Reverted to original system-ui italic — pixel font on a short italic quote felt too heavy and lost the mood distinction from the header/name
- Final: system-ui italic 13px

**R2 — "Center everything" interpretation**
- Clarified: user meant vertically center the whole layout group on the phone, not just text-align
- Calculated content block center (~449px) vs phone center (422px) = 27px offset
- Shifted all three anchors (header, stage, info panel) up by 27px as a unit

---

## CP07 — End of Stage 1

**R1 — PRD header copy discrepancy**
- Code uses corrected header: "Choose who you will learn with"
- PRD still read: "Choose who will you learn with" (original grammar error)
- Student acknowledged — PRD should be updated to match the code

---

## CP08 — Stage 2: Companion Art, Color System, Dev Toggles

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

## CP09 — End of Stage 2

**R1 — Companion class bleeding onto info panel (repeated)**
- Same issue as CP08 R2 — resurfaced when adding select button tint rules
- Fix: always scope companion tint rules to `.companion-card.companion-X` not `.companion-X` alone

**R2 — SELECT button padding iteration**
- Went through several padding values (10px → 15% → 15px → 20px) before landing on `20px 30px`
- `15%` padding top/bottom was a misunderstanding — CSS percentage padding is relative to width, not height

**R3 — Button tint color source**
- First attempt used dark card colors (e.g. `rgba(30,0,60,0.4)`) for the button tint — too dark/invisible on the dark screen
- Correct source: lighter info panel accent colors (`#b490d4`, `#74c4ba`, `#d0ab71`) at 40% opacity

---

## CP10 — End of Stage 3: Animation

**R1 — Vexor scale only applied when COLOR toggled**
- Initial attempt scoped scale to `.companion-card.companion-vexor .card-image` — but `companion-vexor` class is conditional on COLOR toggle
- Fix: added permanent `data-companion` attribute to card, scoped scale to `[data-companion="vexor"]` — always present regardless of toggle state

**R2 — Float animation vs. per-companion scale conflict**
- `transform: scale(1.15)` would conflict with the float animation's `transform: translateY()`
- Fix: used CSS `scale` property (separate from `transform`) — the two coexist without overriding each other

---

## CP11 — End of Stage 4: Customization

**R1 — Hue slider showing wrong colors**
- Initial implementation stored rotation delta directly; slider at "yellow" position (60°) applied `hue-rotate(60deg)` to Vexor (purple base), producing pink instead of yellow
- Fix: store target hue in state, compute rotation as `(targetHue - baseHue + 360) % 360`

**R2 — Selective hue canvas for Atomix (scratched)**
- Attempted canvas pixel-processing to isolate Atomix's green skin hue (~115°) and leave teal bubbles (~175°) untouched
- Implemented `SelectiveHueCanvas.jsx` with RGB↔HSL conversion and per-pixel hue range detection
- Student decided to scratch the approach entirely — reverted to standard `hue-rotate` for all companions

**R3 — "Original" swatch appeared red**
- `hsl(0, 65%, 55%)` renders as red in the browser, so the "Original" preset swatch (deg: 0) looked like a red color option
- Fix: removed Original from HUE_PRESETS; replaced with a dedicated first swatch styled from `selectedCompanion.baseHue` — then scrapped swatches altogether in favor of the slider

---

## CP12 — Ready Screen, Color Lock, Alternate Art

No resistance recorded this session.

---

## CP13 — End of Stage 4

No resistance recorded this session.

---

## CP14 — Small Tweaks

**R1 — Text stroke tried and reverted**

- Added `1px black -webkit-text-stroke` to subject and sub-subjects text
- Student immediately asked to undo — stroke made the text feel heavy
- Lesson: text-stroke on small sans-serif body text tends to look chunky; skip unless explicitly requested again

**R2 — Quote margin iteration**
- Quote lowered 50px (`margin-top: 50px`), then nudged up twice in 5px increments to land at 40px
- Final value: `margin-top: 40px`

---

## CP15 — More Tweaks

**R1 — "ARE YOU SURE?" removed**
- Previous design had a confirmation overlay between SELECT and customize
- Student decided to remove it entirely — SELECT goes straight to customize
- Simpler flow, fewer taps

**R2 — Info panel space-between shifted the quote**
- First attempt used `height: 220px` with `justify-content: space-between` — quote moved down significantly
- Reverted to original margins, then recalculated panel height to 131px to match original quote position
- Second attempt with 131px worked correctly
