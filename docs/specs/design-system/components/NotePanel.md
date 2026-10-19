# NotePanel component spec

Parent: [root spec](../README.md). The root spec's shared component rules apply; this file adds what is specific to NotePanel.

## Purpose

A sunken panel of short cautions that apply to the whole plan, such as "Before you level up".

## API

```ts
export interface NotePanelProps { id?: string; title: string; notes: React.ReactNode[]; className?: string }
```

## Markup and accessibility

```html
<section id="before" class="cp-notes" aria-labelledby="…">
  <h2 class="cp-panel-title">Before you level up</h2>
  <div class="cp-notes-grid"><p>…</p><p>…</p></div>
</section>
```

Generate the heading id with `useId` only if it stays server-safe (React 19 `useId` is); otherwise derive it from `id`.

## Styling

Panel: `surface-sunken`, `radius-lg`, padding `space-6`, flex column, gap `space-4`, no border. Title: shared panel title (display, 20/28, 600, `accent-ink`). Grid: `repeat(auto-fit, minmax(208px, 1fr))`, gap `space-4`. Each note: padding-top `space-3`, top border `stroke-strong` `line`, `ink`.

## Stories

`Components/NotePanel`: `Default` from the preview, title "Before you level up", notes:

1. "Two concentration spells can't run at once. Lead with Maelstrom or Whirlwind, then use instant spells or Forcecage to finish."
2. "Wood Elf speed and Mask of the Wild fit her \"never where you expect\" style. Lean on Stealth when scouting."
3. "On the 2024 rules, Magical Secrets and the Lore subclass work differently, so re-check these picks."

## MDX docs page

Content rules: two to four notes; cautions, not advice already given in level cards. Edition notes (2014 vs 2024) belong here, per constitution Part I §2.

## Tests

Renders one paragraph per note; `id` lands on the section; section is labelled by its heading.

## Acceptance criteria

Three notes sit in three columns at 1024px and one column at 375px.

## Open questions

None.
