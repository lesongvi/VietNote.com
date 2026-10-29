# VietNote Design Philosophy

Read this before creating or changing any UI (landing page, web app, Chrome extension, desktop apps). The goal is that any agent or designer produces screens that feel like the same product. The source of truth in code is `web/assets/css/main.css` (tokens + primitives) and `web/components/`. When this document and the code disagree, fix whichever is wrong and keep them in sync.

Reference feel: a modern B2B SaaS landing page in the style of "Haulog" — white canvas, one electric blue, hairline borders, small square corners, dense but calm information, and product UI shown as real interface rather than decoration.

## 1. The feeling in one line

**Precise, calm and trustworthy: a tool for people who work, not a toy.** It should read as "serious software that happens to be friendly", never as a flashy AI demo.

## 2. Principles

1. **One accent, used with intent.** Electric blue (`--blue`) is the only brand color. It marks what is interactive, what matters (key phrase in a headline, numbers, eyebrow labels, icons) and the two full-bleed bands. Everything else is near-black ink, greys and white. No purple/pink gradients, no rainbow.
2. **White canvas, hairline structure.** Structure comes from 1px borders (`--line`), whitespace and a very light blue tint (`--tint`) on alternate sections, not from heavy shadows or filled boxes.
3. **Small, square-ish corners.** Controls 6px, cards 8px, large illustrations 12px. Never pills, never big rounded blobs (the only exception is the tiny "recording" status chip).
4. **Typography does the work.** Big, bold, tightly tracked headlines; calm grey body text; small uppercase eyebrow labels. The key phrase of a hero headline is colored blue (not gradient).
5. **Show the product, honestly.** Use real HTML/CSS interface mock-ups (`ProductMock.vue`) with believable Vietnamese content instead of stock art or emoji. Mock content is always labelled as sample data. **Never invent metrics, customer logos, testimonials, accuracy numbers or "trusted by" claims.** Stats may only state plans or facts (e.g. "4 planned platforms").
6. **Honest status.** The product is in progress. Say so plainly with status tags (`In progress`, `Next`, `Planned`) and keep the progress section truthful. Do not market unbuilt features as shipped.
7. **Vietnamese first.** Layouts must survive long Vietnamese strings and stacked diacritics (generous line-height, no tight fixed heights, no all-caps for long text). Every user-facing string exists in `vi` and `en`.
8. **Accessible by default.** Visible focus rings, 4.5:1 text contrast, keyboard-complete controls, `prefers-reduced-motion` respected, real labels/ARIA. Accessibility is not a later pass.
9. **Quiet motion.** Only functional motion: 120–150 ms fades on popovers, hover color changes, a spinner for "in progress", a pulse on the recording dot. No parallax, no scroll-jacking, no bouncing.

## 3. Design tokens

All colors, radii and sizes are CSS variables in `:root` of `main.css`. Use the variables, never hard-coded hex values, in new CSS.

| Token | Value | Use |
| --- | --- | --- |
| `--blue` | `#1a1aff` | Brand, primary buttons, links on hover, eyebrows, icons, full-bleed bands |
| `--blue-deep` | `#0f0fcc` | Primary hover, text on blue tint |
| `--blue-tint` | `#eef0ff` | Icon tiles, tags, selected/active rows, highlighted English terms |
| `--blue-ring` | `rgba(26,26,255,.16)` | 3px focus/hover ring |
| `--ink` | `#0b0d2b` | Headings and primary text (a navy-black, not pure black) |
| `--ink-2` | `#4a4f6a` | Body copy, secondary text |
| `--ink-3` | `#7d8199` | Placeholders, captions, disabled-ish |
| `--line` | `#e4e6f2` | Card and section borders |
| `--line-strong` | `#cfd3e6` | Input and button borders |
| `--paper` | `#ffffff` | Page and card background |
| `--tint` | `#f5f6ff` | Alternate section background, mock side panels |
| `--ok` / `--err` | `#12804a` / `#c0392b` | Success / error text and recording dot only |
| `--r-sm / --r / --r-lg` | 6 / 8 / 12 px | Controls / cards / large mock-ups |
| `--control-h` | 48px | Inputs, selects and primary buttons (small buttons 38px) |
| `--wrap`, `--gutter` | 1200px, 24px (16px on phones) | Page container |

**Typeface:** Inter (loaded with the Vietnamese subset via Google Fonts), system sans fallback. Weights 400 / 500 / 600 / 700.
**Scale:** h1 `clamp(36px, 5vw, 62px)`, line-height 1.04, tracking -0.04em, 700 · h2 `clamp(28px, 3.6vw, 44px)`, 1.12, -0.03em, 700 · h3 18-20px, 600 · lead 17-18px `--ink-2` · body 15px · eyebrow/tag 10.5-12px, 600, uppercase, tracking 0.08-0.12em · big stat numbers 40px, 700, tabular numerals, blue.
**Spacing:** sections use 96px vertical padding (64px on mobile); cards 24-28px padding; grids use 20px gaps; stay on a 4/8px rhythm.

## 4. Layout

- Centered container `.wrap` (max 1200px). Content is left-aligned by default; only the closing CTA band is centered.
- Page rhythm, top to bottom: sticky white header with hairline → hero (copy left, product mock right, stats row below) → numbered "why" cards → diagram on a tint background → module grid → **full-bleed blue band with the large product mock** → progress steps → **full-bleed blue CTA band with the form** → footer. Keep alternating white / tint / blue so sections are visually distinct. Use at most two blue bands per page.
- Grids collapse: 3 columns → 2 at ≤1024px → 1 at ≤820px; the hero stacks; the flow diagram turns vertical with rotated arrows. No horizontal scroll at 360px.

## 5. Component rules

| Component | Rule |
| --- | --- |
| **Eyebrow** | Small blue square + uppercase blue label above every section title. On blue bands both become white. |
| **Section head** (`SectionHead.vue`) | Eyebrow → h2 → optional grey lead. Max width 760px. |
| **Buttons** | `.btn-primary` blue fill / white text; `.btn-light` white fill / blue text (on blue bands only); `.btn-ghost` 1px border, ink text. 6px radius, 600 weight, one primary action per view area. |
| **Inputs** | 48px, 1px `--line-strong` border, 6px radius; focus = blue border + 3px `--blue-ring`. |
| **Select** (`AppSelect.vue`) | Custom listbox, never a native `<select>`. Trigger looks exactly like an input with a chevron; popover is white, 1px border, 8px radius, soft shadow; active row `--blue-tint`; chosen row has bold blue label and a check icon; the empty option acts as the placeholder (grey, no check). Opens upward when space below is short. Keyboard: Enter/Space/ArrowDown open, arrows/Home/End move, Enter/Space choose, Esc close and return focus, Tab close, type-ahead. Emits a hidden input when `name` is set. Provide a clear `label` (accessible name). |
| **Cards** | White, 1px `--line`, 8px radius, no shadow. Hover on clickable modules: blue border + `--blue-ring`. |
| **Numbered card** | `01 / 02 / 03` in blue, bold, tabular, above the title; tag at the bottom. |
| **Icon tile** | 40px square, 6px radius, `--blue-tint` background, blue 1.75px Lucide icon. |
| **Tags / status** | Uppercase 10.5px on `--blue-tint`, 4px radius. Wording is honest (`In progress`, `Next`, `Planned`). |
| **Stats** | Large blue number, bold label, grey one-line explanation, separated by hairlines. Plans and facts only. |
| **Flow diagram** | Sources (outlined nodes) → one solid blue hub → outputs (outlined nodes), joined by blue arrows. |
| **Product mock** (`ProductMock.vue`) | White window on blue or tint, 12px radius, soft large shadow. Contains a waveform, transcript with speaker + timestamp, English terms highlighted with `<mark>` on blue tint, summary bullets, action items. Mark with "Sample data". |
| **Progress steps** | 4 outlined cards with status icon + uppercase status + title; the active step gets a blue border and spinning icon. |
| **Blue band** | Solid `--blue`, white text, 96px padding, white focus rings. Hosts the big mock or the final CTA form (`WaitlistForm tone="dark"` with `.btn-light`). |

## 6. Icons and imagery

- **Icons: Lucide only** (`lucide-vue-next`), 1.75-2px stroke, 16-24px, inherit color (blue or ink). **No emoji anywhere** in UI, copy, docs status markers or commit-visible text. No icon fonts, no mixed icon sets, no decorative stock illustrations or 3D art.
- Illustrations are built from the UI itself (mock windows, waveform, diagram nodes). If real screenshots are used later, keep the same white window frame, 12px radius and soft shadow.
- Arrows in text (`→`, `↔`) are typography and fine in copy; do not use them as icons.

## 7. Voice and copy

- Plain, specific, confident; short sentences; second person ("bạn"). Describe what the product does for a work situation (meeting, lecture, video), not abstract AI hype.
- Headline pattern: a concrete promise, with the payoff phrase in blue (e.g. "Every meeting, every video, **fully understood in Vietnamese.**").
- No superlatives without proof ("best", "most accurate"), no fake urgency, no jargon (WER, ASR) on public pages.
- Dates and numbers: Vietnamese conventions in `vi` copy; keep numerals tabular.
- All copy lives in `web/composables/useCopy.ts` (vi + en, same shape). Do not hard-code strings in components.

## 8. Other surfaces (extension, desktop apps, web app)

- Reuse the tokens and component rules; the product UI in `ProductMock.vue` is the visual spec for the in-app look: white surfaces, `--tint` side panels, blue for active state, hairline separators, 13-15px dense text.
- **Chrome side panel / desktop windows:** compact density (40px controls, 13px body), same blue/ink palette, same Lucide icons, the recording state uses `--err` dot + "Recording" chip. Respect OS dark mode only after a dark palette is defined here first (dark tokens are not defined yet; do not improvise one).
- Share tokens through a common package once `packages/` exists (see PLANNING.md); until then copy variables from `main.css`.

## 9. Do / Don't

| Do | Don't |
| --- | --- |
| One blue, white canvas, hairlines | Gradients, glassmorphism, neon, dark-by-default |
| 6-8px corners, square marks | Pill buttons, circular avatars everywhere, large radii |
| Lucide icons in tinted squares | Emoji, mixed icon packs, clip-art |
| Real UI mock-ups with sample-data label | Fabricated stats, logos, reviews |
| Honest status tags | "Coming soon" features presented as live |
| Custom `AppSelect` for choices | Native `<select>` styled with hacks |
| Visible focus + keyboard support | Removing outlines, hover-only affordances |

## 10. Checklist before you ship a UI change

1. Uses only tokens from `main.css` (no new hex colors) and Inter.
2. No emoji; icons are Lucide.
3. New strings added to both `vi` and `en` in `useCopy.ts`.
4. Looks right at 1280px and 390px, no horizontal scroll; long Vietnamese text does not clip.
5. Keyboard: every control reachable, visible focus, Esc closes popovers.
6. Contrast OK on white, tint and blue backgrounds; reduced-motion respected.
7. No invented numbers or claims; status wording matches `ROADMAP.md`.
8. `cd web && npx nuxt build` passes; screenshot checked.
