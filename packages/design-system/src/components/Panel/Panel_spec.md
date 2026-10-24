# Panel component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to Panel.

## Purpose

A titled panel that holds a block of related content beside or below the roadmap: GlanceList's rows on `surface`, or short cautions that apply to the whole plan, such as "Before you level up", on `sunken`.

Panel replaced NotePanel on 2026-10-24 at Antoinette's request, so GlanceList and the notes share one panel.

## Anatomy

A panel with a title, then its content: children, a grid of notes (each with a rule above it), or both.

## API

```ts
export interface PanelProps {
  id?: string;
  title: string;
  variant?: "surface" | "sunken"; // default "surface"
  notes?: React.ReactNode[];
  children?: React.ReactNode;
  className?: string;
}
```

## Markup

```html
<section id="before" class="cp-panel cp-panel-sunken" aria-labelledby="…">
  <h2 class="cp-panel-title">Before you level up</h2>
  …children
  <div class="cp-notes-grid"><p>…</p><p>…</p></div>
</section>
```

Replaces the shared `.cp-panel` class in `base.css`; move its rules into `Panel.css`.

## Configuration

- `id`: the anchor target for SideNav links, such as `before`.
- `title` (required): names what the panel holds, such as "At a glance" or "Before you level up".
- `variant`: default `surface`.
- `notes`: two to four cautions, not advice already given in level cards. Edition notes (2014 vs 2024) belong here, per constitution Part I §2.
- `children`: any other content, such as GlanceList's rows.

## Variants

- `surface`: bordered panel on `surface`, for summaries such as GlanceList.
- `sunken`: borderless panel on `surface-sunken`, for cautions.

## Behavior

- Children render before the notes; the notes grid is omitted when `notes` is empty.
- Notes sit in a grid that fills as many columns as fit, down to one column on phones.

## Accessibility

- A `<section>` labelled by its `h2`, with one paragraph per note.
- Generate the heading id with `useId`, which is server-safe in React 19.

## Examples

### Stories

`Components/Panel`:

- `Notes`: `variant="sunken"`, id `before`, title "Before you level up", notes from the mockup:
  1. "Two concentration spells can't run at once. Lead with Maelstrom or Whirlwind, then use instant spells or Forcecage to finish."
  2. "Wood Elf speed and Mask of the Wild fit her \"never where you expect\" style. Lean on Stealth when scouting."
  3. "On the 2024 rules, Magical Secrets and the Lore subclass work differently, so re-check these picks."
- `Surface`: the default variant, title "At a glance", holding a short paragraph, at 400px max width.

### MDX docs page

Page order: `Notes` with Controls; Surface (`Surface`); Content rules; Accessibility.

## Styling

| Part | Tokens |
| --- | --- |
| Panel | `radius-lg`, flex column |
| Surface | `surface`, `stroke-hairline` `line`, padding `space-5`, gap `space-2` |
| Sunken | `surface-sunken`, no border, padding `space-6`, gap `space-4` |
| Title | the shared `.cp-panel-title` class |
| Notes grid | `repeat(auto-fit, minmax(min(var(--layout-card-min), 100%), 1fr))`, gap `space-4` |
| Note | padding-top `space-3`, top border `stroke-strong` `line`, `ink`, no margin |

## Tests

Renders one paragraph per note; omits the grid without notes; `id` lands on the section; section is labelled by its heading; variant class applies.

## Acceptance criteria

Three notes sit in three columns at 1024px and one column at 375px. The surface variant matches the At a glance panel in the mockup.

## Open questions

None.
