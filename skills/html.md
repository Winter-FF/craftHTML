# /html Design System

Generate a single self-contained HTML file that transforms content into something worth reading.

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

## 1. Design Philosophy

Follow these principles in every decision:

- **Less, but better.** Remove before you add. Every element must earn its place.
- **Whitespace is a feature, not waste.** Aman-style negative space — generous margins, breathing room between sections, ample padding.
- **Color is punctuation, not decoration.** The page is overwhelmingly neutral. Color appears only to guide attention: links, status indicators, section accents. Never more than 2 accent colors per document.
- **Tactile quality.** The document should feel like a well-made physical object — like fine stationery or a hardcover book. Rounded corners, subtle shadows, warm tones.
- **Typography carries the experience.** Serif for authority and literary weight. Sans-serif for clarity and reading comfort. The mix is intentional.
- **Earn the scroll.** Each screen should either deliver value or create a reason to continue. No filler, no padding content.

---

## 2. Color Tokens

### Light Mode — "Warm Paper"

```
--bg-page:       #FAF8F5;   /* ivory, never pure white */
--bg-surface:    #F5F2ED;   /* sidebar, subtle layers */
--bg-card-solid: #F7F5F0;   /* card backgrounds */
--bg-code:       #F5F2ED;   /* code block background */
--border:        #E8E4DC;   /* standard borders */
--border-subtle: #EDE9E2;   /* non-emphasized borders */
--border-focus:  #C8C2B8;   /* active/focus state */

--text-primary:  #3A3A3A;   /* deep charcoal, never pure black */
--text-heading:  #1A1A1A;   /* near-black with warmth */
--text-secondary:#6B6B6B;   /* warm gray — dark enough for comfortable reading */
--text-muted:    #8A8780;   /* warm gray — readable even at small sizes */

--accent:        #8B7B68;   /* warm taupe — earth tone, not blue */
--accent-subtle: #8B7B6812; /* accent at ~7% for backgrounds */
--accent-hover:  #75674F;   /* deeper earth for hover states */
--success:       #6B8E5A;   /* muted sage green */
--warning:       #C4956A;   /* warm amber */
--danger:        #B85C5C;   /* low-saturation crimson */
```

### Dark Mode — "Warm Ink"

```
--bg-page:       #1C1C1B;   /* warm ink, never pure black */
--bg-surface:    #242423;   /* sidebar layer */
--bg-card-solid: #262625;   /* card backgrounds */
--bg-code:       #222221;   /* code block */
--border:        #383836;   /* standard borders */
--border-subtle: #30302E;   /* subtle borders */
--border-focus:  #52524E;   /* active state */

--text-primary:  #D2CEC6;   /* warm off-white */
--text-heading:  #E6E2DA;   /* brighter warm white */
--text-secondary:#908C84;   /* brighter for dark mode readability */
--text-muted:    #7A776F;   /* visible on dark background */

--accent:        #C4AD94;   /* warm sand — earth tone, light enough for dark bg */
--accent-subtle: #C4AD9418; /* accent at ~9% */
--accent-hover:  #D4BDA3;   /* lighter sand for hover */
--success:       #8FB07A;
--warning:       #D4AD7A;
--danger:        #D08080;
```

### Elevation System (Shadow Tokens)

```
--shadow-sm:     0 1px 2px rgba(0,0,0,0.04);
--shadow-md:     0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
--shadow-lg:     0 4px 16px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03);
--shadow-hover:  0 8px 24px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03);
```

### Motion Tokens

```
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:   cubic-bezier(0.45, 0, 0.15, 1);
--duration-fast: 180ms;     /* micro-interactions: hover, focus */
--duration-normal: 300ms;   /* state changes: expand, collapse */
--duration-slow: 450ms;     /* page-level transitions */
```

### Radius Tokens

```
--radius-sm:   6px;     /* inline code, small elements */
--radius-md:   10px;    /* collapsible panels, code blocks */
--radius-lg:   14px;    /* cards, metric cards */
--radius-pill: 9999px;  /* badges, active indicators */
```

### Color Rules

```css
MUST:  Use CSS variables from this token set for ALL color values.
MUST:  Respect both light and dark modes via @media (prefers-color-scheme).
MUST:  Keep accent colors in the warm spectrum (earth, taupe, sienna). NEVER use blue/teal/cyan accents.
NEVER: Hard-code hex values outside this token set.
NEVER: Use #ffffff, #fff, #000000, or #000 for any element.
NEVER: Apply gradients to backgrounds.
NEVER: Use more than 2 accent colors in a single document.
NEVER: Apply large blocks of accent color. Use it for small elements only: links, icons, borders, badges.
```

---

## 3. Typography

### Font Stack

```css
--font-heading: "Noto Serif SC", "Playfair Display", "Georgia", "Times New Roman", serif;
--font-body:    "Noto Sans SC", "Inter", "Source Sans 3", system-ui, -apple-system, sans-serif;
--font-mono:    "JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace;
```

### Size Scale

```css
--text-sm:   0.75rem;    /* 12px — labels, captions, code-label */
--text-base: 0.875rem;   /* 14px — sidebar, table headers, badges */
--text-md:   1rem;       /* 16px — body text */
--text-lg:   1.125rem;   /* 18px — lead paragraphs */
--text-xl:   1.1875rem;  /* 19px — h3 */
--text-2xl:  1.5rem;     /* 24px — h2 */
--text-3xl:  2rem;       /* 32px — h1 */

Scale ratio: 1.25x between heading levels (32 → 24 → 19 → 16)
Minimum size for readable text: 12px (only for non-essential labels)
Sidebar/table/badge: 14px — the practical minimum for frequent reading
```

### Typography Rules

```css
Headings:
  font-family: var(--font-heading);
  font-weight: 500;           /* NOT 600 — lighter for elegance */
  color: var(--text-heading);
  line-height: 1.25;
  letter-spacing: -0.025em (h1), -0.015em (h2), -0.005em (h3);
  /* NO bottom borders on h2 — use spacing for separation */

h1: 2rem (32px)    — ×1.25 from h2
h2: 1.5rem (24px)  — ×1.25 from h3
h3: 1.1875rem (19px) — ×1.1875 from body, font-weight: 500
h4: 1rem (16px)    — same as body, differentiated by font-weight: 600

Body:
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.75;
  font-size: 1rem (16px);
  letter-spacing: 0.01em;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga" 1, "kern" 1;

Lead paragraph:
  font-size: 1.125rem (18px);
  color: var(--text-secondary);

Code (inline):
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--bg-code);
  color: var(--text-heading);
  padding: 0.15em 0.45em;
  border-radius: var(--radius-sm);

Code (block):
  font-family: var(--font-mono);
  font-size: 0.8125rem (13px);
  line-height: 1.7;
  background: var(--bg-code);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  box-shadow: var(--shadow-sm);
```

Rules:

- MUST: Use serif fonts ONLY for h1 and h2. h3+ use body font.
- MUST: Use font-weight 500 for all headings (h1-h3). Reserve 600 only for h4 and inline emphasis.
- MUST: Body line-height MUST be 1.65-1.8. Never tighter.
- MUST: All heading sizes follow 1.25x ratio: 32 → 24 → 19 → 16.
- NEVER: Use more than 2 font families (heading + body) in text. Mono is only for code.
- NEVER: Use serif fonts below 20px. They lose legibility at small sizes.
- NEVER: Center-align body text.
- NEVER: Use bottom borders on h2 for section separation. Use margin-top (>= 3rem) instead. h2 is always borderless.

---

## 4. Spacing & Layout

### Spacing Scale (8:4:2 rhythm)

```css
--space-1:  0.25rem;    /*  4px — inline gaps, tight groups */
--space-2:  0.5rem;     /*  8px — list item gaps */
--space-3:  0.75rem;    /* 12px — component internal gaps */
--space-4:  1rem;       /* 16px — default gap */
--space-6:  1.5rem;     /* 24px — section internal gaps */
--space-8:  2rem;       /* 32px — section gap */
--space-12: 3rem;       /* 48px — major section break (h2 margin-top) */
--space-16: 4rem;       /* 64px — page-level breaks */
```

All spacing is based on a 4px grid. Use only these tokens — no arbitrary values.

### Layout

```css
Page:
  max-width: 1100px;     /* total layout including sidebar */
  margin: 0 auto;
  padding: var(--space-12) var(--space-12) var(--space-12) var(--space-8);

Main content:
  max-width: 780px;      /* optimal reading width */
  padding-left: var(--space-12);  /* gap from sidebar */

  @media (max-width: 768px):
    padding: var(--space-6) var(--space-3);

Sidebar (for documents with 4+ sections):
  position: sticky; top: 3rem;
  width: 240px;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
  padding: var(--space-8) var(--space-8) var(--space-8) 0;
  /* NO border-left — sidebar is a separate visual space */

  @media (max-width: 1024px): hide sidebar.

Cards:
  background: var(--bg-card-solid);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6) var(--space-8);
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 300ms var(--ease-out);
  Hover: box-shadow: var(--shadow-md);

Card wrapping rules:
  - Wrap in card: tables that are supplementary to a section (components list, error matrix)
  - Standalone (no card): tables that ARE the section content (tier comparison, pricing)
  - Test: remove the table — does the section still have a point? Yes → wrap. No → standalone.

Data flow / architecture visualization:
  - Simple linear flow (A → B → C): use CSS flexbox + styled step boxes + arrow characters. No SVG needed.
  - Complex flow (branches, loops, parallel): use inline SVG with design token colors.
  - Always wrap in a card with generous padding.

Tables:
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  th: font-weight 500; font-size 0.6875rem; uppercase; color: var(--text-muted);
      padding 0.625rem 0; border-bottom 1px solid var(--border);
  td: padding 0.75rem 0; border-bottom 1px solid var(--border-subtle);
  tr > * + *: padding-left var(--space-4);
  /* NO zebra striping — use hover for row identification */
  tr:hover td: color var(--text-heading);
```

---

## 5. Document Type Architecture

Before generating HTML, identify the document type and apply the corresponding structure.

### SPEC — Technical Specification

```
Goal: Let readers quickly locate the section they care about.
Structure: metadata → summary card → sidebar nav → sections with collapsible detail → open questions
Key: Anchor links on every h2, collapsible deep-dive sections, requirement tables.
```

### REVIEW — Code Review / PR Description

```
Goal: Most critical finding first. Most readers stop after the first screen.
Structure: summary card → findings by severity (Critical > Warning > Info) → action checklist
Key: Severity badges (danger/warning/accent), diff blocks with annotations.
```

### REPORT — Research / Analysis / Incident Report

```
Goal: Decision-makers get the answer in the first screen.
Structure: executive summary card → KPI metric grid → detailed sections → collapsible appendix
Key: Summary-first layout, KPI cards, inverted pyramid content ordering.
```

### PROPOSAL — Plan / RFC / Decision Document

```
Goal: Make the comparison visceral. Side-by-side beats paragraphs.
Structure: problem card → options comparison grid (recommended highlighted) → timeline → risks
Key: Side-by-side comparison grid, accent border on recommended option, visual timeline.
```

### TUTORIAL — Guide / Walkthrough / How-to

```
Goal: Let readers choose their depth.
Structure: what-you'll-learn → steps with progress indicator → collapsible code blocks → troubleshooting
Key: Step counter (Step N of M), collapsible code, sidebar glossary.
```

### DASHBOARD — Status / Metrics / KPI Summary

```
Goal: One glance = current state. Drill down for details.
Structure: KPI cards row → trend charts (SVG) → detail table
Key: Large metric numbers, color-coded status (success/warning/danger).
```

---

## 6. Component Patterns

### Navigation

```html
<nav class="sidebar" role="navigation" aria-label="Document sections">
  <div class="sidebar-title">Contents</div>
  <ul>
    <li><a href="#section-1" class="active">Section Title</a></li>
    <li><a href="#section-2">Section Title</a></li>
  </ul>
</nav>
```

Sidebar rules (EVERY output MUST have a sidebar):

- MUST be sticky (position: sticky; top: 3rem).
- Active section MUST have a 3px rounded accent indicator on the left (::before pseudo-element).
- NO border-left on the sidebar itself — it's a separate visual space.
- Links MUST have comfortable padding (>= 0.4rem vertical).
- On mobile (max-width: 1024px), sidebar MUST be hidden.

Sidebar generation:

- MUST include all h2 headings. MUST NOT include h3/h4 (section-level only).
- Use heading text as label. Truncate if > 30 characters.
- Generate slug-based IDs: "Rate Limit Tiers" → `id="rate-limit-tiers"`.
- First item active by default.
- Only generate sidebar if document has 4+ h2 sections. Fewer → no sidebar needed.

### Collapsible Sections

```html
<details>
  <summary>Section Title</summary>
  <div class="detail-content">
    <!-- content here -->
  </div>
</details>
```

Use native `<details>/<summary>`. Style rules:

- MUST use var(--shadow-sm) by default, var(--shadow-md) on hover.
- MUST use var(--radius-md) border-radius.
- MUST use overflow: hidden for clean rounded corners.
- Custom arrow marker: 4.5px CSS triangle, rotates 90deg on open with 300ms transition.
- Default state:
  - SPEC: open for overview, collapsed for deep-dive sections
  - TUTORIAL: code blocks collapsed, explanations open
  - REPORT: appendix collapsed

Collapsible rules — what to fold:

- MUST fold: algorithm details, API schema, raw config, requirements lists, methodology
- MUST NOT fold: overview/summary, key metrics, main findings, action items
- Rule of thumb: if the content is "reference material" that readers may skip → fold it. If it's the core message → keep it visible.

### Theme Toggle

Every HTML file MUST include a dark/light mode toggle button:

- Position: fixed, bottom-right corner (bottom: 2rem, right: 2rem)
- Style: circular (40px), border + shadow, matches card background
- Icons: moon (for switching to dark) / sun (for switching to light), SVG inline
- Behavior: toggle a class on `<html>` (`dark-mode` / `light-mode`), persist in `localStorage`
- Default: honor system `prefers-color-scheme` if no stored preference

Dark mode MUST be class-based on `<html>`. NEVER use `data-theme` attribute.

```css
html.dark-mode { /* dark tokens */ }
html.dark-default:not(.light-mode) { /* system preference fallback */ }
```

### Copy Button for Code Blocks

Every `<pre>` block MUST include a copy button:

- Position: absolute, top-right corner of the pre block
- Style: small pill (border + background matching card), muted text
- Visibility: hidden by default, appears on `pre:hover`
- Icons: copy icon (default) / checkmark icon (after copy), SVG inline
- Behavior: `navigator.clipboard.writeText(textContent)`, show "Copied" for 2 seconds

### Section Glow

When navigating to a section (via sidebar click or scroll), the target heading MUST show a brief accent glow:

```css
h2[id], h3[id] { position: relative; transition: color 0.3s ease; }
h2[id]::before, h3[id]::before {
  content: ""; position: absolute;
  left: -12px; top: -4px; bottom: -4px;
  width: 3px; border-radius: 2px;
  background: var(--accent);
  opacity: 0; transform: scaleY(0);
  transform-origin: center;
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
h2.section-glow::before, h3.section-glow::before { opacity: 1; transform: scaleY(1); }
h2.section-glow, h3.section-glow { color: var(--accent-hover); }
```

JavaScript: add `.section-glow` class on navigate, remove after 1.5s. Use `e.preventDefault()` on sidebar clicks to avoid browser `:target` conflict.

### Status Badges

```html
<span class="badge badge-danger">Critical</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-success">Stable</span>
<span class="badge badge-accent">Info</span>
```

Rounded pill (border-radius: 9999px), small text (0.75rem), subtle background (accent-subtle), solid text color.

### KPI Cards (for Reports and Dashboards)

KPI cards: large metric number (2.25rem, heading font, weight 500), small label above, change indicator below. Grid: 2-4 columns, responsive.

### Comparison Grid (for Proposals)

Side-by-side cards in a grid. Recommended option: accent left-border (3px solid var(--accent)). Others: standard card style.

### Diagrams

Simple linear flows → CSS flexbox + styled step boxes + arrow characters. Complex flows (branches/loops) → inline SVG with design token colors and viewBox.

---

## 7. Anti-Slop Rules

### NEVER

- Pure white backgrounds (#ffffff, #fff) — in ANY context including dark mode, card backgrounds, hover states
- Pure black text or backgrounds (#000000, #000) — in ANY context
- Background gradients on any element
- Emoji as icons or decorative elements — including theme toggle buttons (MUST use SVG moon/sun icons, NEVER emoji)
- High-saturation colors (neon green, electric blue, hot pink)
- Glow, neon, or luminescence effects
- Background images (unless the content specifically requires them)
- Glassmorphism (backdrop-filter: blur)
- Box shadows outside the defined token set (--shadow-sm/md/lg). NEVER add ad-hoc shadows.
- Multiple layered shadows
- Bouncy or elastic animations (cubic-bezier with values > 1)
- Full-page loading animations or splash screens
- Decorative borders or ornamental dividers
- Animated gradients or color-shifting backgrounds
- Card-in-card-in-card nesting beyond 2 levels
- Font sizes below 14px for body text. (Exception: labels 12px, code blocks 13px, table headers 12px are acceptable as secondary text.)
- Line lengths exceeding 80 characters

### ALWAYS

- Use generous whitespace. When in doubt, add more space.
- Use design tokens (CSS variables) for all colors, fonts, and spacing.
- Ensure contrast ratio >= 4.5:1 for body text, >= 3:1 for large text.
- Keep the reading line comfortable: 60-80 characters per line (use max-width: 780px).
- Use semantic HTML: `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`.
- Make the layout responsive: mobile-first, then enhance for wider screens.
- Add anchor links to all headings (h2 and below).
- Include `<meta name="viewport" content="width=device-width, initial-scale=1.">`.
- Include a print stylesheet that removes backgrounds and navigation.
- Respect `prefers-reduced-motion`: disable all animations if set.
- Support both light and dark mode via `prefers-color-scheme`.

---

## 8. Animation

```css
/* Micro-interactions: hover, focus */
transition: color 180ms cubic-bezier(0.16, 1, 0.3, 1);

/* State changes: expand, collapse, elevation */
transition: box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
```

Rules:

- MUST use var(--ease-out) = cubic-bezier(0.16, 1, 0.3, 1) for all transitions. This curve decelerates naturally — it feels like a physical object settling.
- MUST use var(--duration-fast) 180ms for hover/focus, var(--duration-normal) 300ms for state changes.
- NEVER use bounce, elastic, or spring curves. NEVER use ease-in for UI transitions.
- NEVER animate purely for decoration. No spinning, floating, pulsing, or shaking elements.
- NEVER animate the page on load. Content should appear immediately.
- Every animation MUST have a functional purpose: show/hide, expand/collapse, focus/dismiss.

---

## 9. Language & Script

Content language:
- Output MUST match input language. NEVER translate unless `--lang` specified.
- Detect from content, NEVER from filename.
- CJK disambiguation: hiragana/katakana → `ja`, Hangul → `ko`, otherwise → `zh`
- Latin default: `en` (override with common-word detection if clear)
- Mixed language: use dominant language; keep minority-language terms as-is

Script-based typography (auto-applied):

| Script | line-height | heading letter-spacing | heading font | body font |
|---|---|---|---|---|
| CJK | 1.8 | +0.02em | Noto Serif SC/JP/KR | Noto Sans SC/JP/KR |
| Latin | 1.75 | -0.025em (h1), -0.015em (h2) | Playfair Display | Inter |
| RTL | 1.8 | normal | Noto Naskh Arabic | Noto Sans Arabic |
| Cyrillic | 1.75 | -0.025em (h1) | Playfair Display | Inter |

RTL additional rules:
- `<html dir="rtl" lang="ar">`
- Sidebar: right-aligned. All margins/padding: mirrored.

Input routing:
- `.md` file → generate (auto-detect language + script)
- `.html` file + `--lang` → translate (preserve structure, replace text layer)
- `.html` file + modification prompt → adjust (incremental edit)

Google Fonts link MUST include variants for detected script. Example for CJK+Latin:
```
https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600&family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap
```

---

## 10. Output Assembly

When generating an HTML document:

1. **Analyze the content.** Identify the document type from Section 5. If unclear, default to REPORT structure.

2. **Identify the audience.** Self (notes), team (internal), leadership (decision-makers), or public (external). Adjust density and explanation depth accordingly.

3. **Choose the information architecture.** Apply the structure from Section 5 that matches the document type.

4. **Generate a single self-contained HTML file.**
   - All CSS is inline (in a `<style>` tag). No external stylesheets.
   - All JavaScript is inline (in a `<script>` tag) if needed for interactivity. No external scripts.
   - Google Fonts via `<link>` is acceptable for serif/sans-serif. Provide system font fallbacks.
   - The file MUST work when opened directly in a browser (file:// protocol).

5. **Structure the HTML.**
   - CSS variables block at the top of `<style>`
   - Responsive layout styles
   - Component styles
   - Print stylesheet (@media print)
   - prefers-reduced-motion (@media (prefers-reduced-motion: reduce))
   - prefers-color-scheme dark mode (@media (prefers-color-scheme: dark))

6. **Verify before output.**
   - [ ] No color value outside the token set? (No hardcoded #fff, #000, or custom hex anywhere)
   - [ ] Both light and dark mode defined using `html.dark-mode` class? (NEVER data-theme)
   - [ ] Body line-height >= 1.65?
   - [ ] Max line width <= 780px?
   - [ ] All `<pre>` blocks have copy button?
   - [ ] Theme toggle: SVG icons (moon/sun), NOT emoji? Fixed bottom-right?
   - [ ] Sidebar present? h2 only, sticky, active indicator, scroll detection?
   - [ ] h2 elements are borderless? (NEVER bottom borders on h2)
   - [ ] Cards wrapped consistently (supplementary → card, core → standalone)?
   - [ ] Section glow CSS and JS included?
   - [ ] Print styles hide sidebar + toggle + copy buttons?
   - [ ] `<html lang="xx">` matches output language?
   - [ ] Script-based typography rules applied (CJK/Latin/RTL)?
   - [ ] Google Fonts link includes fonts for the detected script?
