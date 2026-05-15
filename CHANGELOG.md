# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-05-13

### Added

- **`/html`** core skill (`skills/html.md`): single-file design system for publication-quality HTML output
  - Warm paper/ink color palette (Solarized-inspired, taupe accent)
  - Serif/sans-serif mixed typography (1.25x type scale)
  - 4px spacing grid
  - 6 document type architectures (Spec, Review, Report, Proposal, Tutorial, Dashboard)
  - Interactive components: theme toggle, copy buttons, sidebar navigation, section glow
  - Anti-slop rules (17 NEVER + 11 ALWAYS)
  - Script-aware language support (CJK, Latin, RTL, Cyrillic)
  - Input routing: generate, translate, adjust modes

- **`/html-map`** extension skill (`skills/html-map.md`): project visualization
  - Three-phase scanning (inventory → module snapshot → deep analysis)
  - 15 output sections across 6 understanding levels
  - Graceful degradation for missing data
  - Language-aware output (--lang flag)

- **Examples**
  - Spec: before/after pair demonstrating /html conversion
  - Report: Chinese weekly report demonstrating CJK support
  - Project map: TaskFlow API demonstrating /html-map output

- **Project infrastructure**
  - Apache 2.0 License
  - Contributing guide
  - .gitignore
  - install.sh: one-click installer (project-level, global, uninstall)
