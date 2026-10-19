# Spacing tokens spec

Parent: [root spec](../../../../design-system_spec.md). Defines `src/styles/tokens/spacing/spacing.css`.

## Purpose

The spacing scale for padding, gaps, margins and element sizes.

## Rules

- Everything sits on a 4px grid. `--space-N` is N × 4px.
- Use only these steps; never hand-type a value between them. There are no 2px or 6px nudges.
- `space-12` (48px) is the minimum height and width of anything tappable.

## File: `spacing.css`

```css
/* Character Planner spacing tokens. --space-N is N x 4px. */
:root {
  /* Tag padding (vertical), gap between a label and a spell name. */
  --space-1: 4px;
  /* Chip padding (horizontal), gap between chips and between list items. */
  --space-2: 8px;
  /* Nav item padding, gap between pick blocks and step cards. */
  --space-3: 12px;
  /* Pick block padding, gap inside a level card, badge-to-card gap. */
  --space-4: 16px;
  /* Padding on compact panels: nav card, At a glance, step cards. */
  --space-5: 20px;
  /* Level card padding, gap between table columns. */
  --space-6: 24px;
  /* Page gutter and the gap between major sections. */
  --space-8: 32px;
  /* Hero padding. */
  --space-10: 40px;
  /* Minimum height and width of anything tappable; level column in At a glance; avatar diameter. */
  --space-12: 48px;
  /* Level badge diameter; spacing above a new page section. */
  --space-16: 64px;
}
```

## Tests (`spacing.test.ts`)

Parse `spacing.css` as text: every `--space-N` equals N × 4px, and every variable has a usage comment.

## Docs page

Foundations/Spacing: the scale as bars sized by the token itself, with name, value and usage, read from `spacing.css?raw`. Explain the 4px rule and the stroke exception (see the shape tokens spec).

## Acceptance criteria

`spacing.css` matches the content above exactly, and the tests pass.
