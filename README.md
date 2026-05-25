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

### One-liner install (all platforms)

```bash
npx skills add Winter-FF/craftHTML
```

This installs both `/html` and `/html-map` for any detected AI tool (Claude Code, Codex, Cursor, Copilot, Gemini CLI, etc.).

### Platform-specific

**Claude Code:**

```
/html document.md               → convert to HTML
/html-map                       → visualize current project
```

**Codex (OpenAI):**

```
$html document.md        → convert to HTML
$html-map                → visualize current project
```

**Other tools (Cursor, Windsurf, etc.):**

The design system modules are standalone CSS/HTML/JS — reference them in your project rules. See [Other AI Tools](#other-ai-tools) below.

### Fallback: install.sh

```bash
# Project-level
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/scripts/install.sh | bash

# Global
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/scripts/install.sh | bash -s -- --global
```

### Other AI Tools

The design system modules (`skills/html/assets/`) are standalone CSS/HTML/JS — they work anywhere. For tools that support custom instructions or rules:

**Cursor / Windsurf / VS Code Copilot:**

Paste the contents of `skills/html/SKILL.md` into your project's rules file (e.g., `.cursorrules`, `.windsurfrules`), then reference the asset CSS files from your instructions.

**Any agent with file access:**

Tell the agent: *"Read `skills/html/assets/` and use them as your design system when generating HTML. Follow the rules in `skills/html/SKILL.md`."*

> **Note:** The `/html` and `/html-map` slash commands are Claude Code custom commands. Other tools use the same design system but invoke it differently (as project rules, context files, or inline instructions).

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
├── shared/
│   └── assets/              ← Design system source of truth (10 files)
├── skills/
│   ├── html/                ← /html skill (SKILL.md + assets/)
│   └── html-map/            ← /html-map skill (SKILL.md + assets/)
├── scripts/
│   ├── install.sh           ← Fallback installer
│   └── sync-shared.mjs      ← Sync script (shared/ → skills/)
├── shared-registry.json     ← Source-to-target mappings
├── README.md
├── README.zh.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── assets/logo.png
```

## Uninstall

```bash
curl -sSL https://raw.githubusercontent.com/Winter-FF/craftHTML/main/scripts/install.sh | bash -s -- --uninstall
```

Or manually delete `.claude/commands/html.md` and `.claude/commands/html-map.md`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
