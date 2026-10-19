# ComboCards component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to ComboCards.

## Purpose

Named spell combinations, each a short recipe in one or two sentences.

## API

```ts
export interface Combo { name: string; description: React.ReactNode }
export interface ComboCardsProps { combos: Combo[]; className?: string }
```

## Markup and accessibility

Render as a list: `<ul class="cp-combos"><li class="cp-combo"><h4>…</h4><p>…</p></li></ul>` (the reference uses divs; a list tells screen readers how many combos there are). Heading stays `h4` under a section `h3`; see open questions.

## Styling

Grid `repeat(auto-fit, minmax(var(--layout-card-min), 1fr))`, gap `space-3`, no bullets. Card: `gold-tint`, `stroke-hairline` `gold-line`, `radius-lg`, padding `space-5`, flex column, gap `space-2`. Name: `heading-sm` with `font-weight-bold`, `ink`. Description: `ink`.

## Stories

`Components/ComboCards`: `Default` from the mockup:

- The Vortex: "Maelstrom, then Synaptic Static on the center next turn. Static is instant, so it doesn't break concentration."
- The Encore: "Upcast Command to call enemies to you, then a teammate's area spell or your own Shatter."
- The Lullaby: "Gravity Sinkhole into Hypnotic Pattern. The whole pack is down for the fight."

## MDX docs page

Content rules: give each combo a short evocative name; the recipe names the spells in order and why they work together. Combos that rely on a non-core spell say so.

## Tests

One list item per combo; name and description render.

## Acceptance criteria

Three cards in a row at 1024px, stacked at 375px.

## Open questions

- Fixed `h4` heading, same as PickCard. Ask before adding a heading-level prop.
