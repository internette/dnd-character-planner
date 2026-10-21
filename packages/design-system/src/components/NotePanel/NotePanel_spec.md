# NotePanel component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to NotePanel.

## Purpose

A sunken panel of short cautions that apply to the whole plan, such as "Before you level up".

## API

```ts
export interface NotePanelProps { id?: string; title: string; notes: React.ReactNode[]; className?: string }
```

```html
<section id="before" class="cp-notes" aria-labelledby="…">
  <h2 class="cp-panel-title">Before you level up</h2>
  <div class="cp-notes-grid"><p>…</p><p>…</p></div>
</section>
```

## Configuration

- `id`: the anchor target for SideNav links, such as `before`.
- `title` (required): names when the notes apply, such as "Before you level up".
- `notes` (required): two to four cautions, not advice already given in level cards. Edition notes (2014 vs 2024) belong here, per constitution Part I §2.

## Variants

None.

## Behavior

Notes sit in a grid that fills as many columns as fit, down to one column on phones.

## Accessibility

- A `<section>` labelled by its `h2`, with one paragraph per note.
- Generate the heading id with `useId` only if it stays server-safe (React 19 `useId` is); otherwise derive it from `id`.

## Examples

`Components/NotePanel`: `Default` from the mockup, title "Before you level up", notes:

1. "Two concentration spells can't run at once. Lead with Maelstrom or Whirlwind, then use instant spells or Forcecage to finish."
2. "Wood Elf speed and Mask of the Wild fit her \"never where you expect\" style. Lean on Stealth when scouting."
3. "On the 2024 rules, Magical Secrets and the Lore subclass work differently, so re-check these picks."

MDX docs page order: `Default` with Controls; Content rules; Accessibility.

## Styling

Panel: `surface-sunken`, `radius-lg`, padding `space-6`, flex column, gap `space-4`, no border. Title: the shared `.cp-panel-title` class. Grid: `repeat(auto-fit, minmax(var(--layout-card-min), 1fr))`, gap `space-4`. Each note: padding-top `space-3`, top border `stroke-strong` `line`, `ink`.

## Tests

Renders one paragraph per note; `id` lands on the section; section is labelled by its heading.

## Acceptance criteria

Three notes sit in three columns at 1024px and one column at 375px.

## Open questions

None.
