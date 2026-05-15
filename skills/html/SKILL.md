---
name: html
description: "Transform any document into a publication-quality HTML page. Auto-detects document type and language. Supports generate, translate (--lang), and adjust modes."
---

# /html — Document to Publication-Quality HTML

Generate a single self-contained HTML file that transforms content into something worth reading.

**Assemble the output by copying code from the module files in `assets/`. Do NOT interpret or modify the CSS/HTML/JS — copy it exactly.**

---

## Quick Reference

- Warm paper palette: `#FAF8F5` bg, `#8B7B68` accent — NEVER blue/teal/cyan
- Serif h1/h2 (weight 500) + Sans-serif body (weight 400)
- Type scale 1.25x: `32 → 24 → 19 → 16` px (headings → body; 12px for labels only)
- Spacing 4px grid: `4, 8, 12, 16, 24, 32, 48, 64` px
- Cards: 14px radius, `shadow-sm`, hover `shadow-md`
- Sidebar: all h2 headings only, sticky, active indicator
- Every `<pre>` needs a copy button. Every page needs a theme toggle.
- NEVER: pure white/black, gradients, emoji icons, bounce animations, blue accents

---

## 1. Component Assembly

When generating an HTML file, read and copy code from the `assets/` directory:

```
assets/
├── tokens.css        → :root { } CSS variables (paste first in <style>)
├── layout.css        → sidebar + main layout
├── typography.css    → font declarations + sizing
├── components.css    → cards, badges, tables, metrics, collapsible
├── interactive.css   → theme toggle, copy button, section glow, print, responsive
├── interactive.js    → all JS (theme + sidebar + glow + copy)
├── sidebar.html      → sidebar HTML template (replace links with actual h2s)
├── theme-toggle.html → theme toggle button HTML (copy verbatim)
└── google-fonts.html → Google Fonts <link> (pick the one matching your script)
```

Assembly procedure:
1. Create `<!DOCTYPE html>` with `<html lang="xx">` (detect language from content)
2. In `<head>`: Google Fonts link + all CSS modules combined in `<style>` tag
3. In `<body>`: sidebar.html template + main content + theme-toggle.html template
4. Before `</body>`: interactive.js in a `<script>` tag
5. Verify against the checklist below

Google Fonts — copy the link matching your script:
- CJK: `Noto+Serif+SC:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600&family=Inter`
- Latin: `Playfair+Display:wght@400;500;600&family=Inter`
- CJK+Latin: `Noto+Serif+SC` + `Playfair+Display` + `Inter`

Font override for Latin scripts: after copying tokens.css, override:
```css
--font-heading: "Playfair Display", Georgia, serif;
--font-body: "Inter", system-ui, sans-serif;
```
CJK scripts use the defaults from tokens.css.

---

## 2. Content Rules

### Document Type Architecture

Before generating, identify the document type and apply the corresponding structure:

**SPEC** — Sidebar nav → summary card → sections with collapsible detail → open questions
**REVIEW** — Summary card → findings by severity (Critical > Warning > Info) → action checklist
**REPORT** — Executive summary card → KPI metric grid → detailed sections → collapsible appendix
**PROPOSAL** — Problem card → options comparison grid (recommended highlighted) → timeline → risks
**TUTORIAL** — Steps with progress indicator → collapsible code blocks → troubleshooting
**DASHBOARD** — KPI cards row → trend charts (SVG) → detail table

Key rules:
- Sidebar MUST include all h2 headings (4+ h2 required for sidebar)
- Sidebar generation: slug-based IDs, first item active, truncate labels > 30 chars
- Supplementary tables → wrap in card. Core tables → standalone
- Simple data flows → CSS flexbox step boxes. Complex → inline SVG

---

## 3. Language Rules

Content language: output MUST match input language. NEVER translate unless `--lang` specified.
Detect from content, NEVER from filename.
CJK disambiguation: hiragana/katakana → ja, Hangul → ko, otherwise → zh.

CJK typographic overrides (when output is CJK):
- body line-height: 1.8 (not 1.75)
- h1/h2 letter-spacing: +0.02em (not negative)
- font-heading: Noto Serif SC/JP/KR
- font-body: Noto Sans SC/JP/KR first

RTL overrides: `<html dir="rtl">`, sidebar right-aligned, mirrored margins.

Input routing:
- `.md` file → generate
- `.html` file + `--lang` → translate (text layer only)
- `.html` file + prompt → adjust (incremental edit)

---

## 4. Anti-Slop Rules

### NEVER
- #fff / #000 in ANY context (including dark mode, cards, hover states)
- Background gradients on any element
- Emoji as icons — including theme toggle (MUST use SVG moon/sun)
- High-saturation colors (neon, electric blue, hot pink)
- Glassmorphism (backdrop-filter: blur)
- Bouncy/elastic animations (cubic-bezier > 1)
- Full-page loading animations
- Bottom borders on h2 (always borderless)
- data-theme attribute for dark mode (MUST use html.dark-mode class)

### ALWAYS
- Design tokens (CSS variables) for ALL colors, fonts, spacing
- Contrast ratio >= 4.5:1 for body text
- Semantic HTML: article, section, nav, header, footer
- Responsive: sidebar hides at 1024px
- Print stylesheet (exception: print MAY use white background + dark text)
- prefers-reduced-motion support

---

## 5. Verification Checklist

Before outputting, verify:
- [ ] All code copied from `assets/` files (no manual CSS)?
- [ ] No color value outside tokens?
- [ ] Theme toggle: SVG icons (NOT emoji)?
- [ ] Sidebar present with h2 headings?
- [ ] h2 elements borderless?
- [ ] Copy buttons on all `<pre>` blocks?
- [ ] Section glow CSS + JS included?
- [ ] Dark mode: html.dark-mode class (NOT data-theme)?
- [ ] Google Fonts link matches output script?
- [ ] `<html lang="xx">` correct?
- [ ] Print + reduced-motion styles included?
