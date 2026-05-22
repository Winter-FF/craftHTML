# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-05-17

### Architecture

- **Asset deduplication**: eliminated 100% duplication across 9 asset files (tokens.css, layout.css, typography.css, components.css, interactive.css, interactive.js, sidebar.html, theme-toggle.html, google-fonts.html)
- **Shared design system layer**: added `shared/assets/` directory as canonical source of truth
- **Sync script**: added `scripts/sync-shared.mjs` for distributing shared assets to each skill's `assets/` directory with SHA-256 drift detection
- **Registry**: added `shared/shared-registry.json` for source-to-target mappings
- **Pre-commit hook**: automated sync validation before each commit
- **SOURCE-OF-TRUTH markers**: line-1 comments in synced files preventing direct editing

## [1.0.0] - 2026-05-13

### Added

- **`/html`** core skill (`skills/html/SKILL.md` + `assets/`): modular design system for publication-quality HTML output
  - Warm paper/ink color palette (Solarized-inspired, taupe accent)
  - Serif/sans-serif mixed typography (1.25x type scale)
  - 4px spacing grid
  - 6 document type architectures (Spec, Review, Report, Proposal, Tutorial, Dashboard)
  - Interactive components: theme toggle, copy buttons, sidebar navigation, section glow
  - Anti-slop rules (17 NEVER + 11 ALWAYS)
  - Script-aware language support (CJK, Latin, RTL, Cyrillic)
  - Input routing: generate, translate, adjust modes

- **`/html-map`** extension skill (`skills/html-map/SKILL.md` + `assets/`): project visualization
  - Three-phase scanning (inventory → module snapshot → deep analysis)
  - 15 output sections across 6 understanding levels
  - Graceful degradation for missing data
  - Language-aware output (--lang flag)

- **Multi-platform support**: agentskills.io standard — works with Claude Code, Codex, Cursor, Copilot, Gemini CLI, etc.

- **Examples**
  - Spec: before/after pair demonstrating /html conversion
  - Report: Chinese weekly report demonstrating CJK support
  - Project map: TaskFlow API demonstrating /html-map output

- **Project infrastructure**
  - Apache 2.0 License
  - Contributing guide
  - .gitignore
  - install.sh: universal installer (Claude Code + Codex)
  - `npx skills add Winter-FF/craftHTML` support (agentskills.io standard)
