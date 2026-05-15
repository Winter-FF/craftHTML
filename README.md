<p align="center">
  <img src="assets/logo.png" alt="craftHTML" width="120">
</p>

<h1 align="center">craftHTML Skill</h1>

<p align="center">
  <strong><em>Make your AI output fit for reading</em></strong>
</p>

<p align="center"><em>
  A lightweight skill that converts any agent output into publication-quality HTML<br>
  Zero dependencies, auto-adapting
</em></p>

<p align="center">
  <a href="README.zh.md">中文文档</a> · <a href="#quick-start">Quick Start</a> · <a href="#showcase">Showcase</a>
</p>

## What It Does

| Skill | Purpose |
|---|---|
| **`/html`** | Document → HTML. Auto-detects document type and language, applies the best reading architecture. |
| **`/html-map`** | Project → HTML. Auto-scans codebase and generates visual architecture, dependencies, key files, and reading path. |

## Quick Start

### Install

**Option A — One command (recommended):**

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/install.sh | bash
```

**Option B — Global install (all projects):**

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/install.sh | bash -s -- --global
```

**Option C — Manual:**

```bash
mkdir -p .claude/commands
curl -sSfO https://raw.githubusercontent.com/Winter-FF/craftHTML/main/skills/html.md
curl -sSfO https://raw.githubusercontent.com/Winter-FF/craftHTML/main/skills/html-map.md
mv html.md html-map.md .claude/commands/
```

### Use

After install, restart Claude Code. Then:

```
/html document.md               → convert to HTML
/html-map                       → visualize current project
```

That's it. No config, no dependencies.

## Showcase

### `/html`

Converts any markdown document into a beautifully designed HTML page. Auto-detects document type, language, and script family — applies the optimal information architecture.

```bash
/html my-spec.md              → auto-detect language and type
/html design-doc.md --lang zh → specify output language (English → Chinese HTML)
/html output.html --lang en   → translate existing HTML (Chinese → English)
/html output.html "change heading to serif" → adjust (incremental edit, no regeneration)
```

### `/html-map`

Scans an entire codebase and generates a single-page visual map — from "what is this?" to "how do I modify it?"

```bash
/html-map                    → scan current project
/html-map path/to/project    → scan specified directory
/html-map --lang zh          → Chinese descriptions
/html-map --deep             → import graph + git activity
/html-map --quick            → inventory only (no deep analysis)
```

## What It Looks Like

Every document deserves to be presented with care.

**Restrained palette** — Warm paper tones, not eye-catching, built for long reading sessions.

**Light & dark mode** — Light mode like warm paper, dark mode like warm ink. Fully calibrated.

**Clear hierarchy** — Sidebar navigation + heading structure for readability.

**Smart architecture** — Beautify + restructure:

| Document Type | Structure |
|---|---|
| Spec | Sidebar nav + collapsible sections |
| Code Review | Findings ordered by severity |
| Report | Summary first, details follow |
| Proposal | Side-by-side option comparison |
| Tutorial | Progressive disclosure |
| Dashboard | KPI cards + trend charts |
| ... | extensible |

**Global language** — Auto-detects from content. Supports CJK, Latin, RTL, and Cyrillic with tailored typographic rules.

**Interactive** — Light/dark toggle, copy buttons, sidebar navigation, section glow. Every HTML ships with all of them.

## Project Structure

```
craftHTML/
├── skills/
│   ├── html.md          ← /html (document conversion)
│   └── html-map.md      ← /html-map (project visual map)
├── README.md            ← This file
├── README.zh.md         ← Chinese documentation
├── CHANGELOG.md
├── CONTRIBUTING.md
├── install.sh           ← One-click installer
└── examples/            ← Before / After examples
```

## Uninstall

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/install.sh | bash -s -- --uninstall
```

Or manually delete `.claude/commands/html.md` and `.claude/commands/html-map.md`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
