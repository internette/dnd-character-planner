# Typography tokens spec

Parent: [root spec](../../../../design-system_spec.md). Defines `src/styles/tokens/typography/typography.css` and `src/styles/tokens/typography/fonts.css`.

## Purpose

Font families, the type scale and the ten named text styles, as CSS custom properties.

## Rules

- Two families: Lora for display, Public Sans for body. Both are OFL-licensed and load from Google Fonts.
- Sizes and line heights are on the 4px grid. Their names count 4px steps, like spacing: `--font-size-4` is 16px, `--line-height-6` is 24px.
- Components use a named text style (`font: var(--type-body)`) wherever one fits. Where a component spec gives a combination no style covers, compose it from the scale tokens, for example `font: var(--font-weight-semibold) var(--font-size-4)/var(--line-height-5) var(--font-body)`.
- `label` is always uppercase. Uppercase is applied with `text-transform` in CSS (the `.cp-label` class or the component's own class), never by uppercasing the text, so screen readers read words.
- Sentence case everywhere except labels.

## File: `fonts.css`

```css
/* Lora (display) and Public Sans (body), both OFL-licensed. Apps that load fonts themselves (next/font) skip this file. */
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Public+Sans:wght@400;500;600;700&display=swap");
```

## File: `typography.css`

```css
/* Character Planner typography tokens. Sizes and line heights are named in 4px steps. */
:root {
  /* Families */
  /* Headings, names and numerals. */
  --font-display: Lora, Georgia, "Times New Roman", serif;
  /* Running text, labels and captions. */
  --font-body: "Public Sans", system-ui, -apple-system, "Segoe UI", sans-serif;

  /* Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Font sizes */
  --font-size-3: 12px;
  --font-size-4: 16px;
  --font-size-5: 20px;
  --font-size-6: 24px;
  --font-size-8: 32px;
  --font-size-10: 40px;
  --font-size-16: 64px;

  /* Line heights */
  --line-height-3: 12px;
  --line-height-4: 16px;
  --line-height-5: 20px;
  --line-height-6: 24px;
  --line-height-7: 28px;
  --line-height-8: 32px;
  --line-height-10: 40px;
  --line-height-12: 48px;
  --line-height-18: 72px;

  /* Text styles: use with the font shorthand, e.g. font: var(--type-body) */
  /* Character name in the page hero. One per page. */
  --type-display-xl: var(--font-weight-semibold) var(--font-size-16)/var(--line-height-18) var(--font-display);
  /* Supplement and secondary hero titles. */
  --type-display-lg: var(--font-weight-semibold) var(--font-size-10)/var(--line-height-12) var(--font-display);
  /* Section titles inside the main column. */
  --type-heading-lg: var(--font-weight-semibold) var(--font-size-8)/var(--line-height-10) var(--font-display);
  /* Level card titles and step names. */
  --type-heading-md: var(--font-weight-semibold) var(--font-size-6)/var(--line-height-8) var(--font-display);
  /* Spell and feat names, panel titles. */
  --type-heading-sm: var(--font-weight-semibold) var(--font-size-5)/var(--line-height-7) var(--font-display);
  /* The one italic line under a hero title. */
  --type-subtitle: italic var(--font-weight-regular) var(--font-size-5)/var(--line-height-7) var(--font-display);
  /* All running text and descriptions. */
  --type-body: var(--font-weight-regular) var(--font-size-4)/var(--line-height-6) var(--font-body);
  /* Option names in alternatives lists. */
  --type-body-strong: var(--font-weight-semibold) var(--font-size-4)/var(--line-height-6) var(--font-body);
  /* Eyebrows, tags and column heads. Always uppercase. */
  --type-label: var(--font-weight-bold) var(--font-size-3)/var(--line-height-4) var(--font-body);
  /* Source, level and class meta; footers. */
  --type-caption: var(--font-weight-regular) var(--font-size-3)/var(--line-height-4) var(--font-body);
}
```

## Text styles

| Style | Font | Weight | Size / line | Sample |
| --- | --- | --- | --- | --- |
| `display-xl` | display | 600 | 64 / 72 | Ciaccona |
| `display-lg` | display | 600 | 40 / 48 | Gather & Strike |
| `heading-lg` | display | 600 | 32 / 40 | Roadmap |
| `heading-md` | display | 600 | 24 / 32 | The Lingering Note |
| `heading-sm` | display | 600 | 20 / 28 | Synaptic Static |
| `subtitle` | display italic | 400 | 20 / 28 | College of Lore Bard — Crowd-Control Roadmap, Levels 9 to 14 |
| `body` | body | 400 | 16 / 24 | A 20 ft psychic burst that keeps dragging down enemies' attacks and checks afterward. |
| `body-strong` | body | 600 | 16 / 24 | Hold Monster |
| `label` | body, uppercase | 700 | 12 / 16 | RECOMMENDED · SECRET 1 |
| `caption` | body | 400 | 12 / 16 | XGtE · 5th · Druid · Concentration |

## Next.js

The web app loads both families with `next/font/google` and sets `--font-display` and `--font-body` on `<html>` from the generated font variables, so it doesn't import `fonts.css` and doesn't load fonts twice. Storybook imports `fonts.css`.

## Tests (`typography.test.ts`)

Parse `typography.css` as text:

- Every `--font-size-N` is N × 4px and every `--line-height-N` is N × 4px.
- Every `--type-*` style references only tokens from this file.

## Docs page

Foundations/Typography: both families, then every text style as a live specimen using its sample, with its token name, weight and size/line. Read the style names and comments from `typography.css?raw`.

## Acceptance criteria

Both files match the content above exactly, and every style renders as in the table in Storybook.
