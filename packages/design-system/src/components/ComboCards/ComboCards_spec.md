# ComboCards component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to ComboCards.

## Purpose

Named spell combinations, each a short recipe in one or two sentences.

## Anatomy

A grid of gold cards, each with a name and a description.

## API

```ts
export interface Combo { name: string; description: React.ReactNode }
export interface ComboCardsProps { combos: Combo[]; className?: string }
```

## Markup

```html
<ul class="cp-combos">
  <li class="cp-combo"><h4>…</h4><p>…</p></li>
</ul>
```

## Configuration

- `combos` (required): one card each.
- `name`: a short evocative name.
- `description`: names the spells in order and why they work together. Combos that rely on a non-core spell say so.

## Variants

None.

## Behavior

Cards sit in a grid that fills as many columns as fit, down to one column on phones.

## Accessibility

- A list, so screen readers announce how many combos there are (the reference uses divs).
- The name is an `h4` under a section `h3`; see open questions.

## Examples

### Stories

`Components/ComboCards`: `Default` from the mockup:

- The Vortex: "Maelstrom, then Synaptic Static on the center next turn. Static is instant, so it doesn't break concentration."
- The Encore: "Upcast Command to call enemies to you, then a teammate's area spell or your own Shatter."
- The Lullaby: "Gravity Sinkhole into Hypnotic Pattern. The whole pack is down for the fight."

### MDX docs page

Page order: `Default` with Controls; Content rules; Accessibility.

## Styling

Grid `repeat(auto-fit, minmax(var(--layout-card-min), 1fr))`, gap `space-3`, no bullets. Card: `gold-tint`, `stroke-hairline` `gold-line`, `radius-lg`, padding `space-5`, flex column, gap `space-2`. Name: `heading-sm` with `font-weight-bold`, `ink`. Description: `ink`.

## Tests

One list item per combo; name and description render.

## Acceptance criteria

Three cards in a row at 1024px, stacked at 375px.

## Open questions

- Fixed `h4` heading, same as PickCard. Ask before adding a heading-level prop.
