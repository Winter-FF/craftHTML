---
name: html
description: "Transform any document into a publication-quality HTML page. Auto-detects document type and language. Supports generate, translate (--lang), and adjust modes."
metadata:
  version: "1.0.5"
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
├── prose.css         → blockquote, hr, img, mark (basic document elements)
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
3. In `<body>`: use this exact HTML structure:
   ```html
   <body>
     <div class="layout">
       <nav class="sidebar"><!-- from sidebar.html --></nav>
       <main class="main"><!-- all content here --></main>
     </div>
     <!-- from theme-toggle.html -->
     <script><!-- from interactive.js --></script>
   </body>
   ```
   The sidebar MUST be inside `.layout`, as a sibling of `.main`. The theme toggle MUST be outside `.layout`.
4. If CJK output: append a `/* CJK Overrides */` block after all CSS modules (see §3)
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

### Assembly Discipline

- **Keep module comments**: Each CSS module has a `/* ===== Name ===== */` header. Preserve them in the `<style>` tag — do NOT compress or minify CSS.
- **CJK overrides as appended block**: When output is CJK, add overrides AFTER all CSS modules in a clearly marked `/* ===== CJK Overrides ===== */` block. Do NOT modify the original values inside the module copies.
- **Sidebar first link active**: The first `<a>` in the sidebar MUST have `class="active"`.
- **No custom CSS classes**: Do NOT add CSS classes not defined in `assets/`. If a standard HTML element needs styling (blockquote, hr, img, mark, figure, figcaption), it is in `prose.css`. Everything else uses browser defaults.
- **No inline style attributes**: Do NOT use `style=""` on elements. All visual styling comes from the CSS modules.
- **Spacing without utility classes**: Do NOT invent margin/padding utility classes. Use the natural spacing of existing components (cards have built-in padding, sections have margins from heading rules, blockquote/hr have defined margins). If you need extra space between elements, use `<hr>` or an empty `<p>` with existing prose styles.

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

### Summary Card Design

- Summary card (card-accent at top) should be concise: 1-2 paragraphs max.
- Do NOT nest blockquotes inside summary cards — keep blockquotes standalone.
- Badges (version, license, tech stack) can appear in summary card, but limit to 3-4 items.
- The summary card's purpose is to orient the reader, not to contain all introductory content.

### Markdown Image Handling

- Convert Markdown `![alt](src)` to `<img src="..." alt="...">`.
- Wrap significant images in `<figure>` with `<figcaption>` for captions.
- Always preserve the original `src` URL, even for external images (e.g., star-history charts, shields.io badges).
- `prose.css` provides styling for `img`, `figure`, and `figcaption`.

---

## 3. Language Rules

Content language: output MUST match input language. NEVER translate unless `--lang` specified.
Detect from content, NEVER from filename.
CJK disambiguation: hiragana/katakana → ja, Hangul → ko, otherwise → zh.

CJK typographic overrides (when output is CJK):
- body line-height: 1.8 (not 1.75)
- h1/h2 letter-spacing: 0.02em (not negative)
- h3 letter-spacing: 0 (not -0.005em)
- font-heading: Noto Serif SC/JP/KR
- font-body: Noto Sans SC/JP/KR first

CJK override block — append AFTER all CSS modules, do NOT modify original values:
```css
/* ===== CJK Overrides ===== */
body { line-height: 1.8; }
h1 { letter-spacing: 0.02em; }
h2 { letter-spacing: 0.02em; }
h3 { letter-spacing: 0; }
```

RTL overrides: `<html dir="rtl">`, sidebar right-aligned, mirrored margins.

Input routing:
- `.md` file → generate
- `.html` file + `--lang` → translate (text layer only)
- `.html` file + prompt → adjust (incremental edit)

---

## 4. Output Constraints

**ONLY use components defined in this skill. NEVER invent components not specified here.**

Components:
- NEVER add language switch/link elements (e.g., "English"/"中文" toggle) unless the user explicitly asks.
- NEVER add header bars, top navigation bars, floating action buttons, or any element not defined in the assets/ modules.
- NEVER add breadcrumb navigation, progress bars, or search boxes.
- NEVER write custom CSS classes not present in assets/. Common elements (blockquote, hr, img, mark) are in `prose.css`.
- NEVER use inline `style=""` attributes.
- Theme toggle MUST be bottom-right (bottom: 2rem, right: 2rem). NEVER top-right or top-left.

Typography enforcement:
- CJK output MUST use: `letter-spacing: 0.02em` for h1/h2, `letter-spacing: 0` for h3, `line-height: 1.8` for body.
- CJK output MUST NOT use negative letter-spacing (the Latin defaults).
- Detection rule: read first 20 lines of content. If >30% CJK characters → apply CJK typographic overrides.

Section glow:
- MUST use `::before` pseudo-element with scaleY animation (from interactive.css).
- NEVER use box-shadow glow, @keyframes animation, or background-color animation.

---

## 5. Anti-Slop Rules

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

## 6. Verification Checklist

Before outputting, verify:
- [ ] All code copied from `assets/` files (no manual CSS)?
- [ ] No color value outside tokens?
- [ ] Theme toggle: SVG icons (NOT emoji), bottom-right (NOT top-right)?
- [ ] Sidebar present with h2 headings?
- [ ] Sidebar first link has `class="active"`?
- [ ] h2 elements borderless?
- [ ] Copy buttons on all `<pre>` blocks?
- [ ] Section glow: ::before pseudo-element (NOT box-shadow)?
- [ ] Dark mode: html.dark-mode class (NOT data-theme)?
- [ ] CJK overrides in appended block (NOT modified original values)?
- [ ] CJK typographic overrides applied (if CJK output)?
- [ ] No custom CSS classes or inline styles?
- [ ] No unauthorized components (lang-switch, header-bar, top-nav, etc.)?
- [ ] CSS modules have section comments (not compressed)?
- [ ] Google Fonts link matches output script?
- [ ] `<html lang="xx">` correct?
- [ ] Print + reduced-motion styles included?
- [ ] All Markdown images preserved (src URLs intact)?
- [ ] Summary card concise (no nested blockquotes)?
