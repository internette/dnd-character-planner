# GlanceList component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to GlanceList.

## Purpose

A one-panel summary of every level's headline pick and its phase. Sits beside the roadmap intro.

## Anatomy

A panel with a title, then one row per level: level number, pick, phase chip.

## API

```ts
export interface GlanceItem { level: number; pick: string; phase: Phase; href?: string }
export interface GlanceListProps { title?: string; items: GlanceItem[]; className?: string } // title defaults to "At a glance"
```

Composes `Panel` (surface variant) for the panel and title, and `Chip` for each row's phase.

## Markup

```html
<section class="cp-panel cp-panel-surface" aria-labelledby="…">   <!-- rendered by Panel -->
  <h2 class="cp-panel-title">At a glance</h2>
  <ul>
    <li><a class="cp-glance-row" href="#lv9"><span class="cp-glance-lv">Lv 9</span><span class="cp-glance-pick">Synaptic Static</span><Chip variant={PHASE_VARIANT[phase]} value={PHASE_LABEL[phase]}/></a></li>
  </ul>
</section>
```

The reference uses a `div` panel and bare `div` rows; the section and list are a markup improvement, and the look stays the same.

## Configuration

- `title`: default "At a glance".
- `items` (required): one row per level, in level order.
- `pick`: the recommended pick only, joined with "+" when there are two.
- `href`: the level card's anchor, such as `#lv9`.

## Variants

None. Rows look the same with or without links.

## Behavior

- Rows are `<a>` when `href` is set, `<div>` otherwise.
- Linked rows show the focus ring.
- Long pick names wrap inside the pick column.

## Accessibility

- A `<section>` labelled by its heading, with rows in a list.
- Rows are at least `space-12` tall.
- Each row's phase chip carries the phase word.

## Examples

### Stories

`Components/GlanceList`: `Default` from the mockup at 400px max width: Lv 9 Synaptic Static (strike), Lv 10 Maelstrom + Steel Wind Strike (gather), Lv 11 Hypnotic Pattern (hold), Lv 12 Telekinetic feat (gather), Lv 13 Forcecage (hold), Lv 14 Whirlwind + Wind Walk (gather), each with `href="#lvN"`. `WithoutLinks`: same with no `href`.

### MDX docs page

Page order: `Default` with Controls; Without links (`WithoutLinks`); Content rules; Accessibility.

## Styling

Panel and title: from `Panel`. Row: flex, gap `space-3`, padding `space-2` 0, bottom `stroke-hairline` `line` (none on the last), no underline, `ink`. Level column: width `space-12`, `body-strong`, `ink-muted`. Pick: flexible, `min-width: 0`.

## Tests

Rows are links only when `href` is set; default title; each row has a phase chip.

## Acceptance criteria

Keyboard users can tab through linked rows and see the focus ring.

## Open questions

None.
