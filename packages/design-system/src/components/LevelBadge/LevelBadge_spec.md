# LevelBadge component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to LevelBadge.

## Purpose

The level disc that anchors each LevelCard.

## Anatomy

A `space-16` (64px) circle with an accent ring. Small "LEVEL" label above a display numeral.

## API

```ts
export interface LevelBadgeProps { level: number; className?: string }
```

## Markup and accessibility

```html
<div class="cp-level" role="img" aria-label="Level 9">
  <span class="cp-level-label" aria-hidden="true">LEVEL</span>
  <span class="cp-level-num" aria-hidden="true">9</span>
</div>
```

## Styling

| Part | Tokens |
| --- | --- |
| Disc | `space-16` square, `radius-full`, `stroke-strong` solid `accent`, `surface` fill, `box-sizing: border-box`, flex column centered, `flex: none`, padding-top `space-1` so the label and numeral sit at the disc's vertical center (Antoinette, 2026-10-20) |
| Label | body family, `font-weight-semibold`, `font-size-3`/`line-height-3`, `ink-muted` |
| Numeral | display family, `font-weight-semibold`, `font-size-5`/`line-height-6`, `accent-ink` |

## Stories

`Components/LevelBadge`: `Default` (level 9) and `Range` (levels 9 to 14 in a row, as in the preview). Control `level` as a number 1 to 20.

## MDX docs page

Only used inside LevelCard in the current system; note this.

## Tests

Accessible name is "Level N"; numeral renders; label and numeral are hidden from assistive tech.

## Acceptance criteria

Two-digit levels fit inside the disc without overflow. The ink of the label and numeral together is vertically centered in the disc, within 1px.

## Open questions

None.
