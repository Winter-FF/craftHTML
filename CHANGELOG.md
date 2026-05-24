# Changelog

All notable changes to this project will be documented in this file.

## [1.0.5] - 2026-05-24

### Architecture

- **Prose elements**: added `shared/assets/prose.css` for basic document elements (blockquote, hr, img, mark)
- **Assembly discipline**: added strict rules in both SKILL.md files — keep module comments, CJK overrides as appended block, sidebar first link active, no custom CSS classes, no inline styles
- **Verification expansion**: html verification checklist expanded to 17 items, html-map checklist added 8 items
- **CJK precision**: fixed h3 letter-spacing override (0 instead of -0.005em), unified all letter-spacing values to `0.02em` (removed `+` prefix for consistency)

## [1.0.4] - 2026-05-17

### Architecture

- **Asset deduplication**: eliminated 100% duplication across 9 asset files (tokens.css, layout.css, typography.css, components.css, interactive.css, interactive.js, sidebar.html, theme-toggle.html, google-fonts.html)
- **Shared design system layer**: added `shared/assets/` directory as canonical source of truth
- **Sync script**: added `scripts/sync-shared.mjs` for distributing shared assets to each skill's `assets/` directory with SHA-256 drift detection
- **Registry**: added `shared/shared-registry.json` for source-to-target mappings
- **Pre-commit hook**: automated sync validation before each commit
- **SOURCE-OF-TRUTH markers**: line-1 comments in synced files preventing direct editing

### Documentation

- **CONTRIBUTING.md**: added Asset Synchronization section with workflow guidance
- **CHANGELOG.md**: added v1.0.1 release notes

## [1.0.3] - 2026-05-15

### Architecture

- **Output constraints**: strengthened rules against inventing components, clarified allowed HTML elements
- **Verification checklist**: expanded from 12 to 13 items, added sidebar-first-link-active check
- **CJK typographic enforcement**: clarified h3 letter-spacing override rule

## [1.0.2] - 2026-05-15

### Architecture

- **agentskills.io standard**: restructured to `skills/*/SKILL.md` + `assets/` format (moved from `skills/*.md`)
- **Asset extraction**: extracted all CSS/JS/HTML modules from inline to `assets/` directory (9 files per skill)
- **Installer update**: moved `install.sh` to `scripts/` directory, updated to download from new structure

## [1.0.1] - 2026-05-15

### Architecture

- **Verification checklist**: enhanced both SKILL.md files with clearer verification steps
- **html-map improvements**: added 6-level understanding structure, clarified output sections

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
