---
name: html-map
description: "Scan a codebase and generate a single-page visual map — from 'what is this?' to 'how do I modify it?' Includes architecture, data flow, key files, dependencies, git activity, reading path."
metadata:
  version: "1.0.5"
---

# /html-map — Project Visual Map

Scan a project directory and generate a single self-contained HTML page that maps its structure, architecture, data flow, dependencies, and reading path.

The output MUST follow the design system in `skills/html/SKILL.md`. Use `skills/html/assets/` for CSS/HTML/JS modules.

---

## Quick Reference

- Three-phase scan: A (inventory) → B (module snapshot) → C (deep analysis)
- Read `.gitignore` first; merge with default ignore rules
- Discover modules from manifest files (package.json, pyproject.toml, go.mod, etc.)
- Output: one self-contained HTML file, up to 15 sections across 6 understanding levels
- MUST include: theme toggle (SVG), copy buttons, sidebar, section glow
- MUST use exact token values from `skills/html/assets/tokens.css`

---

## 1. Scanning Strategy

### Ignore Rules

1. Read `.gitignore` from project root
2. Merge with defaults: `node_modules/**, .git/**, .github/**, dist/**, build/**, .next/**, __pycache__/**, *.lock, *.log, *.bin, *.pdf, *.png, *.jpg, *.jpeg, *.gif, *.mp4, *.zip, *.tar, *.gz, *.min.js, *.min.css, coverage/**`
3. Use merged rules for ALL subsequent `Glob` and `Grep` calls

### Phase A — Inventory (always runs)

Use `Glob` in batches. Extract:
- File count, directory count, max depth
- Language breakdown (by extension)
- Module candidates: directories with manifest files
- Tech stack from manifests (package.json, pyproject.toml, go.mod, Cargo.toml, Gemfile, pom.xml, Dockerfile, docker-compose.yml)
- Entry point guesses: `main.*`, `index.*`, `app.*`, `server.*`

### Phase B — Module Snapshot

For each module, read (skip if not found):
1. Entry & startup
2. External interfaces (routes, controllers, API definitions)
3. Dependencies & config
4. Data layer (schema, models, migrations)
5. Tests
6. Code quality (linter configs)

Extract high-signal only (paths, names, types). NEVER paste large code blocks.

### Phase C — Deep Analysis (auto if < 200 files, or user requests)

1. **Import graph**: `Grep` for import/require. Build `{ file → [imports] }`.
2. **Git analysis**: `git log --oneline -20`, daily frequency, most active files
3. **Architecture inference**: layers (controllers→services→data), patterns
4. **Data flow tracing**: from entry point through middleware/router/controller/service/model
5. **API endpoint extraction**: grep for route definitions
6. **Environment variable extraction**: `.env.example` + `process.env` / `os.environ` grep
7. **Design decision extraction**: README sections, ADR files, commit messages
8. **Reading path derivation**: entry points → core modules → key interfaces

---

## 2. Output Structure

Generate ONE self-contained HTML file. Omit sections with no data silently.

### Level 1 — "What is this?" (5 seconds)
- Header: project name + description + tech stack badges
- Overview Metrics: 4-card grid (Files | Language | Modules | Last Commit)

### Level 2 — "What does it look like?" (30 seconds)
- Tech Stack table: Category | Name | Version | Purpose
- Directory Tree: collapsible, per-directory purpose annotation, file type color-coding
- Architecture Overview: SVG diagram

### Level 3 — "How does it work?" (5 minutes)
- Data Flow: request lifecycle with file paths
- Key Files: 5-10 cards with path, purpose, why it matters, exports
- Module Dependencies: SVG graph (if 2+ modules)
- External Dependencies table

### Level 4 — "How do I use it?" (10 minutes)
- Getting Started: numbered steps
- Environment Variables table
- API Endpoints table (if applicable)

### Level 5 — "How do I modify it?" (30 minutes)
- Design Decisions cards
- Testing info
- Deployment info
- Contributing info

### Level 6 — "What's been happening?" (ongoing)
- Git Activity: commit frequency chart + recent commits
- Active Files: top 10 most-changed files

### Footer
- Reading Path: 5-10 files with reasons
- Coverage Report

---

## 3. Section Inclusion Rules

| Section | Web App | Library | CLI Tool | Monorepo |
|---|---|---|---|---|
| Tech Stack | Y | Y | Y | Y |
| Directory Tree | Y | Y | Y | Y |
| Architecture | Y | Y | Y | Y |
| Data Flow | Y | Y (usage) | Y (command) | Y |
| API Endpoints | Y | Y (public API) | skip | skip |
| Env Variables | Y | skip | Y | Y |
| Deployment | Y | skip | skip | Y |

If no data -> omit section entirely. Never show empty sections.

---

## 4. Graceful Degradation

- **No git repo**: Skip Git Activity, Active Files
- **No manifest**: Infer tech stack from extensions. Note "inferred"
- **No tests**: Skip Testing
- **No README**: Infer from package.json or code
- **Single file project**: Skip Directory Tree
- **Phase C not run**: Skip Data Flow, Architecture, Active Files

---

## 5. Language

```
/html-map              → auto-detect from project content
/html-map --lang xx    → override (any ISO 639-1 code)
```

Technical terms (package names, file paths) ALWAYS remain in original.

---

## 6. Design Integration

**MUST copy ALL component CSS from `skills/html/assets/` — do NOT re-implement or create your own versions.**

The /html-map output must look identical to /html output. Read these files and copy their contents exactly:

1. `skills/html/assets/tokens.css` — ALL color/spacing/shadow/radius tokens
2. `skills/html/assets/layout.css` — sidebar + main layout
3. `skills/html/assets/typography.css` — ALL heading styles, paragraph styles, code styles
4. `skills/html/assets/prose.css` — blockquote, hr, img, mark (basic document elements)
5. `skills/html/assets/components.css` — cards, badges, tables, metrics, collapsible
6. `skills/html/assets/interactive.css` — section glow, copy button, theme toggle, print, responsive
7. `skills/html/assets/interactive.js` — ALL JavaScript (theme, sidebar, glow, copy)
8. `skills/html-map/assets/map-components.css` — directory tree, data flow, key files, git bars, reading path

### Assembly Discipline

- **Keep module comments**: Each CSS module has a `/* ===== Name ===== */` header. Preserve them in the `<style>` tag — do NOT compress or minify CSS.
- **CJK overrides as appended block**: When output is CJK, add overrides AFTER all CSS modules in a clearly marked `/* ===== CJK Overrides ===== */` block. Do NOT modify the original values inside the module copies.
- **Sidebar first link active**: The first `<a>` in the sidebar MUST have `class="active"`.
- **No custom CSS classes**: Do NOT add CSS classes not defined in the asset files or `map-components.css`. For html-map output, the ONLY additional classes allowed are those in `map-components.css` (`.tree`, `.flow-diagram`, `.flow-step`, `.flow-arrow`, `.key-file`, `.key-file-path`, `.git-bars`, `.git-bar`, `.reading-step`, `.reading-num`). Everything else uses browser defaults.
- **No inline style attributes**: Do NOT use `style=""` on elements. All visual styling comes from the CSS modules.
- **Spacing without utility classes**: Do NOT invent margin/padding utility classes. Use the natural spacing of existing components. If you need extra space between elements, use `<hr>` or an empty `<p>` with existing prose styles.

### Critical: Section Glow

You MUST use the ::before pseudo-element approach from interactive.css. NEVER use box-shadow or @keyframes animation.

```css
/* Section Glow — copy from interactive.css exactly */
h2[id], h3[id] { position: relative; transition: color 0.3s ease; }
h2[id]::before, h3[id]::before {
  content: ""; position: absolute;
  left: -12px; top: -4px; bottom: -4px;
  width: 3px; border-radius: 2px;
  background: var(--accent);
  opacity: 0; transform: scaleY(0);
  transform-origin: center;
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
h2.section-glow::before, h3.section-glow::before { opacity: 1; transform: scaleY(1); }
h2.section-glow, h3.section-glow { color: var(--accent-hover); }
```

### Critical: CJK Typographic Overrides

When the output language is CJK (Chinese, Japanese, Korean), you MUST append an override block AFTER all CSS modules. Do NOT modify the original values:

```css
/* ===== CJK Overrides ===== */
body { line-height: 1.8; }
h1 { letter-spacing: 0.02em; }
h2 { letter-spacing: 0.02em; }
h3 { letter-spacing: 0; }
```

CJK fonts are already in tokens.css defaults. Latin scripts override with Playfair Display + Inter.

### html-map Specific CSS

8. `skills/html-map/assets/map-components.css` — directory tree, data flow, key files, git bars, reading path

Add this file after all shared components. These are the ONLY additional classes allowed beyond shared assets/.

---

## 7. Output Constraints

**ONLY use components defined in skills/html/assets/. NEVER invent components not specified there.**

Components:
- NEVER add language switch/link elements unless the user explicitly asks.
- NEVER add header bars, top navigation bars, or floating action buttons.
- NEVER add breadcrumb navigation, progress bars, search boxes, or any element not defined in assets/.
- NEVER add custom CSS classes not defined in the asset files or the html-map specific CSS (§6). No `.tag`, `.flow-arrow`, `.arch-svg`, or similar inventions.
- NEVER use inline `style=""` attributes.
- Theme toggle MUST be bottom-right (bottom: 2rem, right: 2rem). NEVER top-right.

Layout:
- /html-map uses the same layout as /html: sidebar (left) + main content (right).
- NEVER add a separate header bar above the sidebar + main layout.
- The project name and badges go INSIDE the main content area, not in a separate header bar.

Typography enforcement:
- CJK output MUST use: `letter-spacing: 0.02em` for h1/h2, `letter-spacing: 0` for h3, `line-height: 1.8` for body.
- NEVER use negative letter-spacing for CJK content.

Section glow:
- MUST use `::before` pseudo-element with scaleY animation (from interactive.css).
- NEVER use box-shadow glow or @keyframes animation.

Verification (before outputting):
- [ ] All CSS copied from assets/ files (no custom CSS classes)?
- [ ] Sidebar first link has `class="active"`?
- [ ] CJK overrides in appended block (NOT modified original values)?
- [ ] No custom CSS classes or inline styles?
- [ ] CSS modules have section comments (not compressed)?
- [ ] Google Fonts link included?
- [ ] Theme toggle: SVG icons, bottom-right?
- [ ] Print + reduced-motion styles included?
- [ ] All external images/charts preserved (src URLs intact)?
- [ ] Summary card concise (no nested blockquotes)?
