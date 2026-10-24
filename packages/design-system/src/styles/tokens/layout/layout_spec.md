# Layout tokens spec

Parent: [root spec](../../../../design-system_spec.md). Defines `src/styles/tokens/layout/layout.css`.

## Purpose

Page widths, grid column minimums and fixed element sizes, so no component CSS needs a raw pixel value.

## Rules

- A page is a container of at most `layout-max-width` with `space-8` on each side: a SideNav between `layout-sidenav-min` and `layout-sidenav-max` wide beside a fluid main column, wrapping to one column on phones.
- Phones are viewports below 480px. CSS custom properties can't be used inside `@media`, so `480px` is written directly in media queries; that's the only raw pixel value allowed in component CSS.
- Wide tables scroll sideways inside their own box, never the page.
- Every value is a multiple of 4px.

## File: `layout.css`

```css
/* Bag of Holding layout and size tokens. Phones are below 480px (written directly in @media). */
:root {
  /* Page */
  /* Maximum width of the page container. */
  --layout-max-width: 1280px;
  /* Narrowest SideNav column. */
  --layout-sidenav-min: 256px;
  /* Widest SideNav column. */
  --layout-sidenav-max: 320px;

  /* Grid column minimums */
  /* Narrowest column in card grids: Panel notes and CardList. */
  --layout-card-min: 208px;
  /* Narrowest column for side-by-side picks in a LevelCard. */
  --layout-pick-min: 256px;
  /* Width below which SpellTable scrolls sideways. */
  --layout-table-min: 720px;

  /* Element sizes */
  /* Inline icons such as the AltList chevron. */
  --size-icon: 16px;
  /* Phase dot in SideNav. */
  --size-dot: 8px;
  /* Phase marker in CardList. */
  --size-dot-lg: 12px;
}
```

## Tests (`layout.test.ts`)

Every pixel value is a multiple of 4; every variable has a usage comment.

## Docs page

Foundations/Layout: the page container, gutter, SideNav range and phone breakpoint as a labelled diagram, and the element sizes, read from `layout.css?raw`.

## Acceptance criteria

`layout.css` matches the content above exactly, and the tests pass.
