# GlanceList component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to GlanceList.

## Purpose

A one-panel summary of every level's headline pick and its phase. Sits beside the roadmap intro.

## API

```ts
export interface GlanceItem { level: number; pick: string; phase: Phase; href?: string }
export interface GlanceListProps { title?: string; items: GlanceItem[]; className?: string } // title defaults to "At a glance"
```

## Markup and accessibility

```html
<div class="cp-panel">
  <h2 class="cp-panel-title">At a glance</h2>
  <div>
    <a class="cp-glance-row" href="#lv9"><span class="cp-glance-lv">Lv 9</span><span class="cp-glance-pick">Synaptic Static</span><PhaseTag size="sm"/></a>
  </div>
</div>
```

- Rows are `<a>` when `href` is set, `<div>` otherwise.
- Use a `<section aria-labelledby>` for the panel, and a list (`<ul>`/`<li>`) for the rows instead of bare divs. This is a markup improvement over the reference; the look stays the same.
- Rows are at least `space-12` tall and show the focus ring.

## Styling

Panel: the shared `.cp-panel` class. Title: the shared `.cp-panel-title` class. Row: flex, gap `space-3`, padding `space-2` 0, bottom `stroke-hairline` `line` (none on the last), no underline, `ink`. Level column: width `space-12`, `body-strong`, `ink-muted`. Pick: flexible, `min-width: 0`.

## Stories

`Components/GlanceList`: `Default` from the mockup at 400px max width: Lv 9 Synaptic Static (strike), Lv 10 Maelstrom + Steel Wind Strike (gather), Lv 11 Hypnotic Pattern (hold), Lv 12 Telekinetic feat (gather), Lv 13 Forcecage (hold), Lv 14 Whirlwind + Wind Walk (gather), each with `href="#lvN"`. `WithoutLinks`: same with no `href`.

## MDX docs page

Content rules: one row per level in level order; `pick` is the recommended pick only, joined with "+" when there are two.

## Tests

Rows are links only when `href` is set; default title; each row has a PhaseTag.

## Acceptance criteria

Keyboard users can tab through linked rows and see the focus ring.

## Open questions

None.
