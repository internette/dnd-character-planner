# Shape tokens spec

Parent: [root spec](../../../../design-system_spec.md). Defines `src/styles/tokens/shape/shape.css`.

## Purpose

Corner radii and stroke widths.

## Rules

- Radii are on the 4px grid.
- Strokes are the one exception to the 4px rule, because they are lines, not space.
- Cards get a hairline border and no shadow. There are no shadow tokens.
- Pills are 24px tall with `radius-xl`; discs use `radius-full`.

## File: `shape.css`

```css
/* Character Planner shape tokens: radii and strokes. */
:root {
  /* Radii */
  /* Chips and square tags. */
  --radius-sm: 4px;
  /* Pick blocks, nav items, buttons. */
  --radius-md: 8px;
  /* Cards, tables, panels. */
  --radius-lg: 12px;
  /* Hero bands and pill tags. */
  --radius-xl: 16px;
  /* Level badge and avatar discs. */
  --radius-full: 50%;

  /* Strokes */
  /* Card, table and app bar borders. */
  --stroke-hairline: 1px;
  /* Level badge ring, icon strokes, focus rings, note dividers. */
  --stroke-strong: 2px;
}
```

## Tests (`shape.test.ts`)

Every `--radius-*` except `radius-full` is a multiple of 4px; strokes are 1px and 2px; every variable has a usage comment.

## Docs page

Part of Foundations/Spacing: a row of boxes showing each radius, and a hairline and a strong line, read from `shape.css?raw`.

## Acceptance criteria

`shape.css` matches the content above exactly, and the tests pass.
