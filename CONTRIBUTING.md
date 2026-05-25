# Contributing

Thank you for every contribution — it benefits all users.

## What to Contribute

- Design system rules (color tokens, typography, components, anti-slop rules)
- New document type architectures
- New features
- Better multilingual support
- Bug fixes
- And more

## Suggested Workflow

1. Fork → `git checkout -b improve/your-change`
2. Edit files under `skills/`
3. Generate an HTML file with Claude Code (or similar tools) to verify the result
4. Submit a PR with a clear description of what changed and why

## Principles

- **Less is more** — always consider the overall refinement and simplicity
- **Restraint over decoration** — the primary goal is to improve readability
- **Systematic, not scattered** — every rule must be part of the larger system
- **Show your work** — if you changed the visual output, provide a good reason

## Asset Synchronization

If you modify shared design system assets (`shared/assets/*.css`, `*.js`, `*.html`):

1. **Edit files in `shared/assets/`** — NOT in `skills/*/assets/` (those are auto-synced copies)
2. **Run sync**: `node scripts/sync-shared.mjs sync`
3. **Verify sync**: `node scripts/sync-shared.mjs validate` (or let pre-commit hook run it)
4. **Commit**: `git commit` will automatically validate via pre-commit hook

**Why**: Two skills share 9 design system files. We maintain one source (`shared/assets/`) and sync to each skill's `assets/` directory for `npx skills add` compatibility.

**Files covered**:
- tokens.css (colors, shadows, fonts, spacing, motion)
- layout.css (sidebar + main layout)
- typography.css (headings, body, code styles)
- prose.css (blockquote, hr, img, mark)
- components.css (cards, badges, tables, metrics, collapsible)
- interactive.css (theme toggle, copy button, section glow, print)
- interactive.js (theme toggle logic, sidebar tracking, glow animation, copy buttons)
- sidebar.html (sidebar template)
- theme-toggle.html (theme toggle button)
- google-fonts.html (font links for CJK/Latin/mixed)
- map-components.css (directory tree, flow diagram, key files, git bars, reading path — html-map only)

## License

Contributions are licensed under Apache 2.0.
