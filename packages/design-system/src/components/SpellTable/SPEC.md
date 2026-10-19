# SpellTable component spec

Parent: [root spec](../../../SPEC.md). The root spec's shared component rules apply; this file adds what is specific to SpellTable.

## Purpose

Grouped spell comparison: what each spell does and when to take it.

## API

```ts
export interface SpellTag { label: string; tone?: ChipProps["tone"] }
export interface SpellRow { name: string; meta?: string; tags?: SpellTag[]; does: React.ReactNode; when: React.ReactNode }
export interface SpellGroup { id?: string; title: string; note?: string; rows: SpellRow[] }
export interface SpellTableProps {
  label?: string;                       // accessible name, default "Spells"
  columns?: [string, string, string];   // default ["Spell", "What it does", "When to take it"]
  groups: SpellGroup[];
  className?: string;
}
```

## Markup and accessibility

The reference uses a CSS grid of divs with ARIA table roles, but puts each group heading directly inside the table, which breaks the ARIA table structure. Fix this:

- Keep the grid layout and ARIA roles (`table`, `rowgroup`, `row`, `columnheader`, `cell`), so rows can lay out with CSS grid.
- Header row in its own `rowgroup`. Each group is a `rowgroup` labelled by its heading. The group heading row is a `row` with one `cell` spanning three columns (`aria-colspan="3"`, `grid-column: 1 / -1`) containing the `<h3>` and the note.
- Column header text is uppercased by CSS, not by `toUpperCase()`, so screen readers read words, not letters.
- The group `id` goes on the heading row so SideNav can link to it.
- The scroll wrapper gets `tabindex="0"`, `role="region"` and the same `aria-label`, so keyboard users can scroll it.

## Styling

| Part | Tokens |
| --- | --- |
| Wrapper | `surface`, `stroke-hairline` `line`, `radius-lg`, `overflow-x: auto` |
| Table | `min-width: 720px`, padding `space-2` `space-6` `space-6` |
| Row | grid `2fr 3fr 2fr`, gap `space-6`, padding `space-3` 0, top `stroke-hairline` `line-subtle` |
| Header row | no top border, bottom `stroke-hairline` `line`, `label` style, `ink-muted` |
| Group row | flex baseline, gap `space-3`, padding `space-6` 0 `space-2`; title display 20/28 600 `ink`; note `caption` `ink-muted` |
| Spell cell | flex column, gap `space-1`; name display 16/24 600 `ink`; meta `caption`; tags in a row with gap `space-1` |
| When column | `accent-ink` |

## Stories

`Components/SpellTable`: `Default` from the preview, label "Crowd-control spells", three groups:

- True grouping spells (id `grouping`, note "via Magical Secrets"): Maelstrom (XGtE · 5th · Druid; Concentration), Gravity Sinkhole (EGtW · 4th · Wizard; Instant, Ask your DM), Whirlwind (XGtE · 7th · Druid/Wizard; Concentration).
- Bard-native gathering (id `bard-native`, note "no secrets needed"): Command: "Approach" (PHB · 1st · Bard; Instant), Mass Suggestion (PHB · 6th · Bard; No concentration as instant tone).
- Pushes & pulls (id `pushes`, note "fine-tuning tools"): Telekinetic (TCoE · feat · +1 CHA), Thorn Whip / Lightning Lure (Cantrips · 10 ft pull), Thunderwave (PHB · 1st · Bard).

Take the `does` and `when` text for each row from `/mnt/project-files/design/design-system/components/SpellTable/preview.html`; they are the mockup's own paraphrases. `Narrow`: Default at 375px, showing horizontal scroll inside the box.

## MDX docs page

Content rules: each row's meta names source, spell level and class; tags carry casting properties; the third column is advice tied to the roadmap's levels. Spells from non-core books get the `dm` tag. Never reproduce a spell's full rules text (constitution Part I §4).

## Tests

- ARIA structure: every `row` is inside a `rowgroup` inside the `table`; axe passes.
- Default columns and label.
- Group ids land on the group heading rows.

## Acceptance criteria

Screen reader announces "Crowd-control spells, table" with three columns; the page never scrolls sideways at 375px, only the table box does.

## Open questions

None.
