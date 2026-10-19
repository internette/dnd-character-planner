# Color tokens spec

Parent: [root spec](../../../../design-system_spec.md). Defines `src/styles/tokens/color/color.css`.

## Purpose

Every color in the system, for light and dark themes, as CSS custom properties. Components and docs never use a hex value directly; they use `var(--color-*)`.

## Rules

- Names are `--color-<role>`. The role says what the color is for (`ink`, `surface`, `gather-tint`), never what it looks like.
- Light values sit on `:root` and `[data-theme="light"]`; dark values on `[data-theme="dark"]`. Theme switching is an attribute on any ancestor, so a subtree can be themed on its own (Storybook stories, docs previews). Light is the default with no attribute.
- No `prefers-color-scheme` here; the app decides the theme and sets the attribute.
- Each variable in the light block has a one-line comment directly above it saying what it is for. The Color docs page reads these comments, so keep them accurate and on one line.
- Set `color-scheme` in each block so form controls and scrollbars follow the theme.
- `on-forest` and `on-forest-muted` are the same in both themes because `forest` stays dark in both.
- `gold` is for the RECOMMENDED and STEP labels only, never body text. `hold` also marks CONCENTRATION.

## File: `color.css`

Create the file with exactly this content:

```css
/* Character Planner color tokens. Light is the default; set data-theme="dark" on any ancestor for dark. */
:root,
[data-theme="light"] {
  color-scheme: light;

  /* Ground and surfaces */
  /* Page background behind every surface. */
  --color-ground: #f4f6f4;
  /* Cards, tables, nav panels and the app bar. */
  --color-surface: #ffffff;
  /* Quiet panels set into the page, such as Before you level up. */
  --color-surface-sunken: #e9f0ec;

  /* Text */
  /* Headings and primary text on ground, surface and surface-sunken. */
  --color-ink: #1c2b26;
  /* Long-form paragraphs and step descriptions. */
  --color-ink-body: #3d4f48;
  /* Source meta (XGtE · 5th · Bard), column labels and captions. Passes 4.5:1 on surface and ground. */
  --color-ink-muted: #4f625b;

  /* Lines */
  /* Card and table borders, the 1px hairline. */
  --color-line: #d5e0db;
  /* Row dividers inside lists and tables. */
  --color-line-subtle: #e6edea;

  /* Brand */
  /* Hero bands and the brand block. Text on it uses on-forest. */
  --color-forest: #1f4038;
  /* Title text on forest. */
  --color-on-forest: #eaf2ee;
  /* Eyebrows, subtitles and hero pill borders on forest. */
  --color-on-forest-muted: #b8d6c9;
  /* Level badge ring, chevrons, focus rings and active nav. */
  --color-accent: #2f6f5a;
  /* Links, chip text, When to take it column, section titles in accent. */
  --color-accent-ink: #24584a;
  /* Feature chips (5th-level spells), current nav item, INSTANT tags. */
  --color-accent-tint: #e6efeb;

  /* Recommendation */
  /* RECOMMENDED and STEP labels only. Never body text. */
  --color-gold: #8a6420;
  /* Recommended pick blocks and combo cards. */
  --color-gold-tint: #faf4e8;
  /* Border on combo cards sitting on ground. */
  --color-gold-line: #eadbbf;

  /* Phases */
  /* GATHER phase text and dot. Blue so it differs from strike by lightness and hue. */
  --color-gather: #2d5a7b;
  /* GATHER tag fill. */
  --color-gather-tint: #e1ecf5;
  /* HOLD phase text and CONCENTRATION tag text. */
  --color-hold: #7a5414;
  /* HOLD and CONCENTRATION tag fill. */
  --color-hold-tint: #f6ebd6;
  /* STRIKE phase text and dot. */
  --color-strike: #8e2f2f;
  /* STRIKE tag fill. */
  --color-strike-tint: #f6e1e1;

  /* Table-dependent */
  /* Table-dependent content: ASK YOUR DM, non-core sources. */
  --color-arcane: #5e3f7a;
  /* ASK YOUR DM tag fill. */
  --color-arcane-tint: #eee6f4;
}

[data-theme="dark"] {
  color-scheme: dark;

  /* Ground and surfaces */
  --color-ground: #121a17;
  --color-surface: #1a2420;
  --color-surface-sunken: #1f2b26;

  /* Text */
  --color-ink: #e7efeb;
  --color-ink-body: #c5d3cc;
  --color-ink-muted: #9db0a8;

  /* Lines */
  --color-line: #2e3d37;
  --color-line-subtle: #25332d;

  /* Brand */
  --color-forest: #1e4a3d;
  --color-on-forest: #eaf2ee;
  --color-on-forest-muted: #b8d6c9;
  --color-accent: #6fb79c;
  --color-accent-ink: #8ccbb2;
  --color-accent-tint: #22362e;

  /* Recommendation */
  --color-gold: #d9b26a;
  --color-gold-tint: #2a2418;
  --color-gold-line: #4a3d24;

  /* Phases */
  --color-gather: #8ec0e4;
  --color-gather-tint: #1c2e3b;
  --color-hold: #e2b76a;
  --color-hold-tint: #33281a;
  --color-strike: #ec9a96;
  --color-strike-tint: #3a2020;

  /* Table-dependent */
  --color-arcane: #c9a8e8;
  --color-arcane-tint: #2d2238;
}
```

## Contrast pairs

Every pair below must pass WCAG 4.5:1 in both themes. The token test checks them all.

| Text | On |
| --- | --- |
| `ink`, `ink-body`, `ink-muted` | `ground`, `surface`, `surface-sunken` |
| `on-forest`, `on-forest-muted` | `forest` |
| `accent-ink` | `surface`, `accent-tint` |
| `gold` | `gold-tint` |
| `gather` | `gather-tint` |
| `hold` | `hold-tint` |
| `strike` | `strike-tint` |
| `arcane` | `arcane-tint` |

## Tests (`color.test.ts`)

Parse `color.css` as text (read the file with `node:fs`; a few regexes are enough, no CSS parser dependency):

- The light block and the dark block declare exactly the same set of `--color-*` names.
- Every value is a 6-digit hex color.
- Every variable in the light block has a usage comment directly above it.
- Every contrast pair above passes 4.5:1 in both themes. Write a small WCAG relative-luminance helper in `src/styles/tokens/test-utils.ts`; no dependency needed.

## Docs page

Foundations/Color: every token grouped as in the file (ground and surfaces, text, lines, brand, recommendation, phases, table-dependent), each with a light and a dark swatch, its hex values, its usage comment, and the contrast pairs it belongs to with their ratios. Swatches read the names, values and comments from `color.css?raw`, so the page can never drift from the file.

## Acceptance criteria

`color.css` matches the file content above exactly, and the tests pass in both themes.
