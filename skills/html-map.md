# /html-map Design System

Scan a project directory and generate a single self-contained HTML page that maps its structure, architecture, data flow, dependencies, and reading path — enough for a developer to genuinely understand the project. The output MUST follow `html.md` design system.

## Quick Reference

- Three-phase scan: A (inventory) → B (module snapshot) → C (deep analysis)
- Read `.gitignore` first; merge with default ignore rules
- Discover modules from manifest files (package.json, pyproject.toml, go.mod, Cargo.toml, etc.)
- Output: one self-contained HTML file, up to 15 sections across 6 understanding levels
- Track and display coverage (files scanned vs skipped)
- Use `html.md` design tokens for ALL colors, typography, spacing, and components
- **MUST include ALL interactive components from html.md**: theme toggle, copy buttons on every `<pre>`, section glow on h2, sidebar navigation
- **MUST handle missing data gracefully** — omit sections silently, never show empty sections

---

## 1. Scanning Strategy

### Ignore Rules

1. Read `.gitignore` from project root
2. Merge with defaults: `node_modules/**, .git/**, .github/**, dist/**, build/**, .next/**, __pycache__/**, *.lock, *.log, *.bin, *.pdf, *.png, *.jpg, *.jpeg, *.gif, *.mp4, *.zip, *.tar, *.gz, *.min.js, *.min.css, coverage/**`
3. Use merged rules for ALL subsequent `Glob` and `Grep` calls

### Phase A — Inventory (always runs, fast)

Use `Glob` in batches. Extract:

- File count, directory count, max depth
- Language breakdown (by extension): count and percentage
- Module candidates: directories with manifest files
- Tech stack from manifests:

```
package.json       → Node.js (name, description, scripts, dependencies, devDependencies)
pyproject.toml     → Python (name, dependencies, scripts)
requirements.txt   → Python (packages)
go.mod             → Go (module, dependencies)
Cargo.toml         → Rust (name, dependencies)
Gemfile            → Ruby (gems)
pom.xml            → Java (dependencies)
Dockerfile         → Container (base image, exposed ports)
docker-compose.yml → Multi-service (services, ports, volumes)
```

- Entry point guesses: `main.*`, `index.*`, `app.*`, `server.*`, `cmd/*/main.go`, `src/main.rs`
- Config files: `.env.example`, `*.config.*`, `tsconfig.json`, `webpack.*`, `vite.*`

### Phase B — Module Snapshot (for each module)

Read in order (skip if not found):

1. **Entry & startup**: main files, app bootstrap, server setup
2. **External interfaces**: routes, controllers, API definitions, proto/openapi
3. **Dependencies & config**: manifest deps, env files, config directories
4. **Data layer**: schema files, ORM models, migration directories
5. **Tests**: test directories, test config, coverage config
6. **Code quality**: linter configs, formatter configs

Extract high-signal only (paths, names, types). NEVER paste large code blocks.

### Phase C — Deep Analysis (auto-trigger if < 200 files, or user requests)

1. **Import graph**: `Grep` for import/require across source files. Build `{ file → [imports] }`. Identify hub files (most imported).

2. **Git analysis**:
   - `git log --oneline -20` → recent commits
   - `git log --since="30 days ago" --format="%ad" --date=short | sort | uniq -c` → daily frequency
   - `git log --since="30 days ago" --name-only --pretty=format:"" | sort | uniq -c | sort -rn | head -10` → most active files

3. **Architecture inference**:
   - Identify layers: controllers/routes → services → data access → database
   - Identify patterns: MVC, microservices, monolith, serverless
   - From directory names + import patterns + config files

4. **Data flow tracing**:
   - Start from entry point (main.*, server.*)
   - Follow imports to identify: request handling chain, middleware stack, service calls, data access
   - Produce ordered path: "Request → [middleware] → [router] → [controller] → [service] → [model] → Response"

5. **API endpoint extraction**:
   - Grep for route definitions: `app.get`, `app.post`, `router.`, `@app.route`, `@GetMapping`, etc.
   - Extract: method, path, handler location
   - Group by resource/module

6. **Environment variable extraction**:
   - Read `.env.example` or `.env.sample` if exists
   - Grep for `process.env.`, `os.environ`, `os.Getenv` across source
   - Produce: variable name, where used, required vs optional

7. **Design decision extraction**:
   - Read README sections on "Why", "Architecture", "Design", "Tradeoffs"
   - Check for ADR files (`docs/adr/`, `docs/decisions/`, `ADR-*.md`)
   - Extract from commit messages: `git log --all --grep="why\|because\|switch\|migrate\|replace" --oneline -10`

8. **Reading path derivation**:
   - Start from entry points
   - Follow the most-imported chain
   - Include: README → config → entry → core modules → key interfaces
   - Produce ordered list with one-line purpose per file

---

## 2. Output Structure

Generate ONE self-contained HTML file. All CSS inline, all JS inline. Works with `file://`.

Sections are grouped by understanding level. Each section MUST be included if data is available; if not, omit silently (no empty sections).

### Level 1 — "What is this?" (5 seconds)

#### Header

Project name (from manifest or directory name). One-line description (from manifest or README first paragraph). Tech stack badges (one per technology).

#### Overview Metrics

4-card metric grid: Total Files | Primary Language | Modules | Last Commit Date.

### Level 2 — "What does it look like?" (30 seconds)

#### Tech Stack

Table: Category | Name | Version | Purpose. Group by: framework, database, runtime, testing, build, lint, deploy.

#### Directory Structure

Interactive collapsible tree. Each top-level directory MUST have a one-line purpose annotation (derived from README or inferred from contents). File type color-coding: source (heading color), config (muted), test (success), docs (accent). Limit to 4 levels depth.

#### Architecture Overview

SVG diagram showing the system's high-level structure:

- **If single-service**: Show layers (frontend → API → services → database) with file paths annotated
- **If multi-service**: Show services as boxes with connections (API calls, message queues, shared DB)
- Use design token colors. Max 12 nodes. viewBox for responsive.

### Level 3 — "How does it work?" (5 minutes)

#### Data Flow

Visual representation of a core request lifecycle:

```
Request → Middleware → Router → Controller → Service → Model → Database → Response
```

Each node: name + corresponding file path. Use CSS flexbox flow diagram (not SVG) for simple linear flows. If multiple flows exist, show the primary one and list others.

#### Key Files

Card grid (2-3 columns). Each card:

- File path (mono, accent link)
- One-line purpose
- Why it matters (1 sentence)
- Key exports/functions (mono list, max 5)

Include 5-10 most important files. Prioritize: entry points > config > core logic > data models.

#### Module Dependencies

SVG graph (if 2+ modules). Nodes = modules, edges = import relationships. Hub modules (most connections) get accent border. Max 20 nodes; group by directory if more.

#### External Dependencies

Table: Package | Version | Purpose (one-line). Group by: runtime deps vs dev deps. Only include top-level deps (not transitive).

### Level 4 — "How do I use it?" (10 minutes)

#### Getting Started

Numbered steps:

1. Prerequisites (runtime versions, tools)
2. Install command
3. Configure (env vars, see Environment section)
4. Start command
5. Verify (expected output, URL to open)

#### Environment Variables

Table: Variable | Required | Default | Description | Used In. Extract from `.env.example` and source code grep.

#### API Endpoints (if applicable)

Table: Method | Path | Description | Auth | Handler File. Group by resource. If no API detected (e.g., library, CLI tool), omit this section.

### Level 5 — "How do I modify it?" (30 minutes)

#### Design Decisions

Cards explaining key architectural choices. Each card:

- Decision: what was chosen
- Why: the reasoning (from README, ADRs, or commit messages)
- Tradeoff: what was sacrificed

If no explicit decisions found, infer from patterns and note "inferred from codebase."

#### Testing

- Test framework and runner
- Test directory structure
- How to run tests (command)
- Coverage config (if any)
- Test patterns used (unit/integration/e2e)

#### Deployment

- CI/CD platform (from `.github/workflows/`, `Jenkinsfile`, `.gitlab-ci.yml`, etc.)
- Build command
- Deploy command or platform
- Pipeline stages (if detectable)

#### Contributing

- Code style (from linter/formatter configs)
- Branch strategy (from git history patterns)
- PR conventions (from PR templates if exist)

### Level 6 — "What's been happening?" (ongoing)

#### Git Activity

Two cards:

1. Commit frequency chart (last 30 days): CSS bar chart with hover tooltips
2. Recent commits: last 5 as styled list (hash + message + date)

#### Active Files

Top 10 most-changed files in last 30 days. Table: File | Changes | Last Modified. Color-code by activity level (accent = high, muted = low).

#### Project Health

Summary card:

- Open issues count (if GitHub remote detected)
- Last release/tag date
- Dependency freshness (any major version behind?)
- Test coverage status

If data not available, omit gracefully.

### Footer

#### Reading Path

Numbered list of 5-10 files to read in order. Each: filename (link) + one-line reason. Derived from Phase C step 8.

#### Coverage Report

Stats: files scanned / total, skipped count + reasons, scan phase used, generation timestamp.

### Section Inclusion Rules

NOT every section applies to every project. Include sections based on project type:

| Section | Web App | Library | CLI Tool | Monorepo |
|---|---|---|---|---|
| Tech Stack | ✅ | ✅ | ✅ | ✅ |
| Directory Tree | ✅ | ✅ | ✅ | ✅ |
| Architecture | ✅ | ✅ | ✅ | ✅ |
| Data Flow | ✅ | ✅ (usage flow) | ✅ (command flow) | ✅ |
| Key Files | ✅ | ✅ | ✅ | ✅ |
| External Deps | ✅ | ✅ | ✅ | ✅ |
| Getting Started | ✅ | ✅ | ✅ | ✅ |
| Environment Vars | ✅ | ❌ skip | ✅ | ✅ |
| API Endpoints | ✅ | ✅ (public API) | ❌ skip | ❌ skip |
| Design Decisions | ✅ | ✅ | ✅ | ✅ |
| Testing | ✅ | ✅ | ✅ | ✅ |
| Deployment | ✅ | ❌ skip | ❌ skip | ✅ |
| Git Activity | ✅ | ✅ | ✅ | ✅ |
| Active Files | ✅ | ✅ | ✅ | ✅ |
| Reading Path | ✅ | ✅ | ✅ | ✅ |

Rule: If a section has no meaningful data → omit it entirely. Never show an empty section or "No data available" placeholder.

### Graceful Degradation

When scan data is incomplete:

- **No git repo**: Skip Git Activity and Active Files. Show "No git history detected" as a single muted line, not a full section.
- **No manifest file**: Infer tech stack from file extensions and directory names. Note "inferred" in the Tech Stack table.
- **No tests found**: Skip Testing section entirely.
- **No README**: Generate description from package.json/pyproject.toml or infer from code structure.
- **Single file project**: Skip Directory Tree (no meaningful structure). Focus on Key Files and Data Flow.
- **Phase C not run**: Skip Data Flow, Architecture, and Active Files. Note "Phase A+B only" in Coverage.

### Description Quality Rules

Directory purpose annotations and key file descriptions MUST be:

- **Specific**: "Authentication & authorization" NOT "auth stuff"
- **Action-oriented**: "Handles HTTP requests and routing" NOT "server code"
- **Concise**: Max 15 words per annotation
- **Inferred from actual code**: Read the directory's main files before writing the annotation. NEVER guess based on directory name alone.

Examples:

```
BAD:  src/ — source code
GOOD: src/ — application source: routes, controllers, services

BAD:  lib/ — library stuff
GOOD: lib/ — shared utilities: logger, error handling, config loader

BAD:  packages/auth/ — auth
GOOD: packages/auth/ — JWT authentication, role-based access control
```

### Verification Checklist

Before outputting the HTML, verify:

- [ ] All `<pre>` blocks have copy buttons?
- [ ] Theme toggle present (fixed, bottom-right)?
- [ ] Section glow CSS included for h2 headings?
- [ ] Sidebar navigation present (if 4+ sections)?
- [ ] Sidebar uses `getBoundingClientRect` + bottom detection?
- [ ] Click handler uses `preventDefault` + `scrollIntoView`?
- [ ] No section is empty or shows "No data"?
- [ ] Directory annotations are specific and accurate?
- [ ] Coverage report shows actual scan stats?
- [ ] Both light and dark mode work?
- [ ] Responsive: sidebar hides on mobile?
- [ ] Print styles hide sidebar + toggle + copy buttons?

---

## 3. Design Integration

All output MUST follow `html.md` design system:

- Warm paper/ink palette, taupe accent
- Serif h1/h2, sans-serif body, 1.25x type scale
- 4px spacing grid
- Cards, badges, tables, metric grid from html.md
- Theme toggle, copy buttons on every `<pre>`, section glow on h2
- Sidebar: sticky, 4+ sections threshold, active indicator, `getBoundingClientRect` + bottom detection
- Anti-slop rules enforced (see html.md Section 7)

### html-map Specific CSS

```css
/* Directory tree */
.tree { font-family: var(--font-mono); font-size: .8125rem; line-height: 1.8; }
.tree details { border: none; background: none; box-shadow: none; margin: 0; }
.tree summary { padding: 0; font-weight: 400; gap: .5rem; }
.tree .indent { padding-left: 1.5rem; }
.tree .dir-purpose { color: var(--text-muted); font-family: var(--font-body); font-size: .75rem; margin-left: .5rem; }
.tree .file-type-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: .4rem; vertical-align: middle; }
.tree .dot-source { background: var(--text-heading); }
.tree .dot-config { background: var(--text-muted); }
.tree .dot-test { background: var(--success); }
.tree .dot-doc { background: var(--accent); }

/* Data flow */
.flow-diagram { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; justify-content: center; }
.flow-step { /* same as html.md */ }
.flow-step .flow-file { font-size: .6875rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 2px; }

/* Key files cards */
.key-file { background: var(--bg-card-solid); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-4); }
.key-file-path { font-family: var(--font-mono); font-size: .8125rem; color: var(--accent); font-weight: 500; }
.key-file-purpose { font-size: .875rem; color: var(--text-primary); margin-top: var(--space-1); }
.key-file-exports { font-size: .75rem; color: var(--text-muted); margin-top: var(--space-2); font-family: var(--font-mono); }

/* Git activity bars */
.git-bars { display: flex; align-items: flex-end; gap: 3px; height: 60px; }
.git-bar { flex: 1; min-width: 4px; background: var(--accent-subtle); border-radius: 2px 2px 0 0; }
.git-bar:hover { background: var(--accent); }

/* Reading path */
.reading-step { display: flex; align-items: flex-start; gap: var(--space-3); padding: .625rem 0; border-bottom: 1px solid var(--border-subtle); }
.reading-num { width: 28px; height: 28px; border-radius: 50%; background: var(--accent-subtle); color: var(--accent); font-size: .75rem; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

/* Architecture SVG */
.arch-svg { max-width: 100%; }
.arch-node { fill: var(--bg-card-solid); stroke: var(--border); stroke-width: 1.5; }
.arch-node-hub { stroke: var(--accent); stroke-width: 2; }
.arch-edge { stroke: var(--text-muted); stroke-width: 1; }
.arch-label { font-family: var(--font-body); font-size: 12px; fill: var(--text-heading); }
.arch-sublabel { font-family: var(--font-mono); font-size: 10px; fill: var(--text-muted); }

/* Heatmap table */
.heatmap-cell { display: inline-block; width: 12px; height: 12px; border-radius: 2px; }
```

---

## 4. Language

```
/html-map                → auto-detect language from project content (README, main comments)
/html-map --lang xx      → override (any ISO 639-1 code: zh, ja, ko, en, fr, ar, etc.)
```

Content language rules:
- Default: detect from project's README and primary source file comments
- All generated descriptions (directory purposes, key file annotations, design decisions) MUST be in the detected/selected language
- Technical terms (package names, file paths, function names, CLI commands) ALWAYS remain in original language
- Script-aware typographic rules apply automatically (see html.md Section 9)

## 5. Usage

```
/html-map                    → scan current directory (Phase A+B, auto Phase C if small)
/html-map path/to/project    → scan specified directory
/html-map --lang xx           → specify output language
/html-map --deep              → force Phase C (import graph, git, architecture)
/html-map --quick             → Phase A only (inventory, no deep analysis)
```
