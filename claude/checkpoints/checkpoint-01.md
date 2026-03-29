# Checkpoint 01 — Scaffold Complete
**Date:** 2026-03-29
**Project:** AI 201 Project 1 — Hero Faction / Character Select Screen
**Status:** Infrastructure live locally. Awaiting push via GitHub Desktop. Design Intent not yet written.

---

## 1. Context Resume

We have set up a complete React + Vite project scaffold for the AI 201 Project 1 "Hero Faction" assignment at SCAD. The project is configured to deploy to GitHub Pages via GitHub Actions on every push to `main`.

**What is built:**
- React 18 + Vite project with base path `/CharacterSelectScreen/`
- CSS reset in `src/index.css`
- Placeholder `App.jsx` currently showing a click-counter test page (used to verify React state works)
- GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and deploys to GitHub Pages
- `.gitignore` excluding `node_modules`, `dist`, `.DS_Store`
- `README.md` skeleton with placeholders for all 6 ESF deliverables (Design Intent, Mermaid Diagram, AI Direction Log, Records of Resistance, Five Questions)
- `claude/docs/` — assignment PDFs (Class Syllabus, Hero Select Screen Companion Doc, Hero Selection Screen Assignment Instructions)
- `claude/checkpoints/` — this file

**What is pending:**
- User pushes current commit via GitHub Desktop
- GitHub repo Settings → Pages → Source set to "GitHub Actions"
- User writes Design Intent (must be student-authored, before any design code)
- Build out actual character select screen components after Design Intent is locked

**Hard rule:** Design Intent must be written by the student before I write any component or styling code.

---

## 2. Human Directions

Steps to reproduce this exact state from scratch:

1. Create a new GitHub repo named `CharacterSelectScreen` under username `jasmlnebryant`
2. Clone it locally to `/Users/jas/Desktop/SCAD AI/CharacterSelectScreen - [NEW]/CharacterSelectScreen`
3. Copy assignment PDFs into `claude/docs/`
4. Create the following files as written (see repo):
   - `package.json` — React 18 + Vite dependencies
   - `vite.config.js` — base path set to `/CharacterSelectScreen/`
   - `index.html`
   - `src/main.jsx`
   - `src/App.jsx` — click counter test component
   - `src/index.css` — CSS reset only
   - `.github/workflows/deploy.yml` — GitHub Actions deploy to Pages
   - `.gitignore`
   - `README.md`
5. Run `npm install` in the project root
6. Run `npm run dev` — verify app loads at `http://localhost:5173/CharacterSelectScreen/`
7. In GitHub Desktop: commit with message `Scaffold: React + Vite + GitHub Actions deploy pipeline` → Push origin
8. On GitHub: Settings → Pages → Source → GitHub Actions → Save
9. Wait for Actions tab to show green — live at `https://jasmlnebryant.github.io/CharacterSelectScreen/`

---

## 3. Records of Resistance

**R1 — Push credentials in Claude's shell**
- Proposed: User asked if they could provide GitHub credentials so Claude could push directly
- Resistance: Claude declined — no safe way to pass credentials through this shell
- Decided: User pushes via GitHub Desktop; Claude commits locally only

**R2 — Building before Design Intent**
- Proposed (implicit): User asked if we could build out the directory structure
- Resistance: Claude flagged the hard rule — Design Intent must be student-authored before any design code
- Decided: Infrastructure scaffold only (React, Vite, GitHub Actions) — no components, no styles, no layout until Design Intent is locked

---

## 4. Successes

**S1 — Test page request**
- Prompt: *"please build me a very quick test page with a single button action that keeps a record of clicks and celebrates each click"*
- Result: User accepted the implementation without revision — dark monospace click counter with rotating celebration messages. Confirmed React useState was working.

**S2 — Checkpoint system proposal**
- Prompt: *"moving forward lets define checkpoints before we commit..."*
- Result: User approved the 4-section checkpoint format (Context Resume, Human Directions, Records of Resistance, Successes) and asked to generate checkpoint-01 immediately.
