# SpellTable component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to SpellTable.

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
| Table | `min-width: var(--layout-table-min)`, padding `space-2` `space-6` `space-6` |
| Row | grid `2fr 3fr 2fr`, gap `space-6`, padding `space-3` 0, top `stroke-hairline` `line` |
| Header row | no top border, bottom `stroke-hairline` `line`, `label`, uppercase, `ink-muted` |
| Group row | flex baseline, gap `space-3`, padding `space-6` 0 `space-2`; title `heading-sm`, `ink`; note `caption` `ink-muted` |
| Spell cell | flex column, gap `space-1`; name display family, `font-weight-semibold`, `font-size-4`/`line-height-6`, `ink`; meta `caption`; tags in a row with gap `space-1` |
| When column | `accent-ink` |

## Stories

`Components/SpellTable`: `Default`, label "Crowd-control spells", with three groups. "Instant" and "No concentration" use the `instant` tone, "Concentration" the `concentration` tone, "Ask your DM" the `dm` tone):

**True grouping spells** (id `grouping`, note "via Magical Secrets")

| Name | Meta | Tags | Does | When |
| --- | --- | --- | --- | --- |
| Maelstrom | XGtE · 5th · Druid | Concentration | A 30 ft swirling vortex of difficult terrain. Every creature that starts its turn inside takes damage and is dragged 10 ft toward the center on a failed Strength save. | Level 10. The plan's first Secret. |
| Gravity Sinkhole | EGtW · 4th · Wizard | Instant, Ask your DM | A 20 ft burst of force damage that yanks everyone who fails a Constitution save to the center point. | Level 10, in place of Steel Wind Strike. |
| Whirlwind | XGtE · 7th · Druid/Wizard | Concentration | A moving tornado that batters enemies, then sucks up and restrains Large or smaller creatures caught inside. | Level 14. The plan's endgame gather. |

**Bard-native gathering** (id `bard-native`, note "no secrets needed")

| Name | Meta | Tags | Does | When |
| --- | --- | --- | --- | --- |
| Command: "Approach" | PHB · 1st · Bard | Instant | Each failed Wisdom save sends a target walking straight to you. Every slot level above 1st adds another target, so a 5th-level slot can gather five enemies at once. | Optional extra pick at any level. |
| Mass Suggestion | PHB · 6th · Bard | No concentration | Up to twelve creatures follow a reasonable suggestion, such as "regroup by the fountain." | Alternative at level 11. |

**Pushes & pulls** (id `pushes`, note "fine-tuning tools")

| Name | Meta | Tags | Does | When |
| --- | --- | --- | --- | --- |
| Telekinetic | TCoE · feat · +1 CHA | | A bonus-action shove of 5 ft, toward you or away, every single turn. | Level 12. The plan's pick. |
| Thorn Whip / Lightning Lure | Cantrips · 10 ft pull | | Drag one straggler 10 ft into the kill zone. | Magic Initiate or a spare Secret. |
| Thunderwave | PHB · 1st · Bard | | Pushes enemies 10 ft away. It scatters rather than groups. | Use it to peel enemies off allies. |

`Narrow`: Default at 375px, showing horizontal scroll inside the box.

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
