---
name: html-map
description: "Scan a codebase and generate a single-page visual map — from 'what is this?' to 'how do I modify it?' Includes architecture, data flow, key files, dependencies, git activity, reading path."
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

MUST use exact token values from `skills/html/assets/tokens.css`:
- `--bg-page: #FAF8F5` (NOT #ffffff)
- `--bg-card-solid: #F7F5F0` (NOT #ffffff)
- `--accent: #8B7B68` (warm taupe, NOT blue/teal)
- Theme toggle: SVG moon/sun (NEVER emoji), `html.dark-mode` class (NEVER data-theme)
- Copy buttons on every `<pre>`
- Section glow on h2
- Sidebar: sticky, 4+ sections, active indicator, scroll detection

### html-map Specific CSS

```css
/* Directory tree */
.tree { font-family: var(--font-mono); font-size: .8125rem; line-height: 1.8; }
.tree details { border: none; background: none; box-shadow: none; margin: 0; }
.tree summary { padding: 0; font-weight: 400; gap: .5rem; }
.tree .indent { padding-left: 1.5rem; }

/* Data flow */
.flow-diagram { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; justify-content: center; }

/* Key files cards */
.key-file { background: var(--bg-card-solid); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); }

/* Git activity bars */
.git-bars { display: flex; align-items: flex-end; gap: 3px; height: 60px; }
.git-bar { flex: 1; min-width: 4px; background: var(--accent-subtle); border-radius: 2px 2px 0 0; }

/* Reading path */
.reading-step { display: flex; align-items: flex-start; gap: var(--space-3); padding: .625rem 0; border-bottom: 1px solid var(--border-subtle); }
.reading-num { width: 28px; height: 28px; border-radius: 50%; background: var(--accent-subtle); color: var(--accent); font-size: .75rem; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
```
