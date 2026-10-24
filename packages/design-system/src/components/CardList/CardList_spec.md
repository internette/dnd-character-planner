# CardList component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to CardList.

## Purpose

A grid of short named cards, each a name and one or two sentences. Use it for a numbered sequence when order matters, like the Gather, Hold, Strike loop, and for named spell combinations.

CardList replaced StepCards and ComboCards on 2026-10-24 at Antoinette's request. They differed only in fill, numbering and heading level, so those became options.

## Anatomy

A grid of cards. Each card has an optional "STEP N" label (ordered lists only), a name with an optional phase dot, and a description.

## API

```ts
export interface CardItem { name: string; phase?: Phase; description: React.ReactNode }
export interface CardListProps {
  items: CardItem[];
  variant?: "surface" | "gold"; // default "surface"
  ordered?: boolean;            // default false
  headingLevel?: 3 | 4;         // default 3
  className?: string;
}
```

Uses the phase dot classes from Chip.

## Markup

```html
<ol class="cp-cards cp-cards-surface">           <!-- <ul> when ordered is false -->
  <li class="cp-card-item">
    <span class="cp-card-step" aria-hidden="true">STEP 1</span>   <!-- ordered only -->
    <h3 class="cp-card-name"><span class="cp-dot cp-dot-gather" aria-hidden="true"></span>Gather</h3>
    <p>…</p>
  </li>
</ol>
```

The name renders as `h3` or `h4` from `headingLevel`.

## Configuration

- `items` (required): one card each, in order.
- `name`: for a step with a phase, the phase word or a name that includes it, so the dot is never the only signal. For a combo, a short evocative name.
- `phase`: adds a phase dot before the name.
- `description`: for a step, what to do in that step. For a combo, the spells in order and why they work together; combos that rely on a non-core spell say so.
- `variant`: default `surface`.
- `ordered`: default `false`. Set it only when order matters.
- `headingLevel`: default `3`. Use `4` when the list sits under a section `h3`, as the combos do.

## Variants

- `surface`: steps. Bordered cards on `surface`, with a `heading-md` name in `accent-ink`.
- `gold`: named combinations. Cards on `gold-tint` with a `gold-line` border, and a bold `heading-sm` name in `ink`.
- Ordered or unordered: `ordered` adds the "STEP N" labels and renders an `<ol>`.

## Behavior

- The step label renders only when `ordered` is set, numbering from 1.
- The dot renders only when an item has a phase.
- Cards sit in a grid that fills as many columns as fit, down to one column on phones.

## Accessibility

- An `<ol>` when ordered, which already conveys order, so the "STEP N" label is hidden from assistive tech to avoid "1. Step 1". A `<ul>` otherwise, so screen readers announce how many cards there are.
- The phase dot is decorative; the name carries the word.
- `headingLevel` keeps the page outline correct wherever the list sits.

## Examples

### Stories

`Components/CardList`:

- `Steps`: `ordered`, from the mockup:
  1. Gather (gather): "Pull the enemies into one tight cluster with a grouping spell or an upcast Command."
  2. Hold (hold): "Keep them there with difficult terrain, restraints or a nudge from the Telekinetic feat."
  3. Strike (strike): "Drop Synaptic Static, Shatter or Hypnotic Pattern on the whole group at once."
- `StepsWithoutPhases`: Steps without `phase`.
- `Combos`: `variant="gold"`, `headingLevel={4}`, from the mockup:
  - The Vortex: "Maelstrom, then Synaptic Static on the center next turn. Static is instant, so it doesn't break concentration."
  - The Encore: "Upcast Command to call enemies to you, then a teammate's area spell or your own Shatter."
  - The Lullaby: "Gravity Sinkhole into Hypnotic Pattern. The whole pack is down for the fight."

### MDX docs page

Page order: `Steps` with Controls; Without phases (`StepsWithoutPhases`); Gold (`Combos`); Content rules; Accessibility.

## Styling

| Part | Tokens |
| --- | --- |
| List | grid `repeat(auto-fit, minmax(min(var(--layout-card-min), 100%), 1fr))`, gap `space-3`, no bullets or padding |
| Card | `radius-lg`, padding `space-5`, flex column |
| Surface card | `surface`, `stroke-hairline` `line`, gap `space-1` |
| Gold card | `gold-tint`, `stroke-hairline` `gold-line`, gap `space-2` |
| Step label | `label`, uppercase, `gold` |
| Surface name | `heading-md`, `accent-ink`, flex with gap `space-2` |
| Gold name | `heading-sm` with `font-weight-bold`, `ink` |
| Dot | `size-dot-lg` square with `radius-sm` |
| Description | surface `ink-body`; gold `ink` |

StepCards used a wrapping flex row and ComboCards a grid; both now use the grid, which gives the same three-across and stacked layouts.

## Tests

- Renders an `<ol>` when `ordered`, a `<ul>` otherwise; step labels number from 1 and are hidden from assistive tech.
- The dot renders only with a phase.
- `headingLevel` sets `h3` or `h4`; `variant` sets the variant class.

## Acceptance criteria

Three cards in a row at 1024px, stacked at 375px, in both variants. `gold` matches the combo cards and `surface` the step cards in the mockup.

## Open questions

None.
