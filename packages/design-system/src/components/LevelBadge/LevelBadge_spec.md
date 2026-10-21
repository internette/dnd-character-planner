# LevelBadge component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to LevelBadge.

## Purpose

The level disc that anchors each LevelCard: a `space-16` (64px) circle with an accent ring, holding a small "LEVEL" label above a display numeral.

## API

```ts
export interface LevelBadgeProps { level: number; className?: string }
```

```html
<div class="cp-level" role="img" aria-label="Level 9">
  <span class="cp-level-label" aria-hidden="true">LEVEL</span>
  <span class="cp-level-num" aria-hidden="true">9</span>
</div>
```

## Configuration

- `level` (required): the character level, 1 to 20.

## Variants

None. Every badge looks the same; only the numeral changes.

## Behavior

Static, with no interaction. The disc keeps its size (`flex: none`) when its row is narrow, and two-digit levels fit inside it.

## Accessibility

- The disc is one image named "Level N" (`role="img"`, `aria-label`). The label and numeral are hidden from assistive tech, so a screen reader says "Level 9" once instead of "Level, 9".
- Label and numeral pass 4.5:1 on `surface` in both themes.

## Examples

`Components/LevelBadge`: `Default` (level 9) and `Range` (levels 9 to 14 in a row, as in the preview). Control `level` as a number 1 to 20.

MDX docs page: note that the badge is only used inside LevelCard in the current system.

## Styling

| Part | Tokens |
| --- | --- |
| Disc | `space-16` square, `radius-full`, `stroke-strong` solid `accent`, `surface` fill, `box-sizing: border-box`, flex column centered, `flex: none`, padding-top `space-1` so the label and numeral sit at the disc's vertical center (Antoinette, 2026-10-20) |
| Label | body family, `font-weight-semibold`, `font-size-3`/`line-height-3`, `ink-muted` |
| Numeral | display family, `font-weight-semibold`, `font-size-5`/`line-height-6`, `accent-ink` |

## Tests

Accessible name is "Level N"; numeral renders; label and numeral are hidden from assistive tech.

## Acceptance criteria

Two-digit levels fit inside the disc without overflow. The ink of the label and numeral together is vertically centered in the disc, within 1px.

## Open questions

None.
