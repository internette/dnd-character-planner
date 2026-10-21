# StepCards component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to StepCards.

## Purpose

A numbered sequence. Use only when order matters, like the Gather, Hold, Strike loop.

## Anatomy

A row of cards. Each card has a "STEP N" label, a name with an optional phase dot, and a description.

## API

```ts
export interface Step { name: string; phase?: Phase; description: React.ReactNode }
export interface StepCardsProps { steps: Step[]; className?: string }
```

Uses the phase dot classes from Chip.

## Markup

```html
<ol class="cp-steps">
  <li class="cp-step">
    <span class="cp-step-label" aria-hidden="true">STEP 1</span>
    <h3 class="cp-step-name"><span class="cp-dot cp-dot-gather" aria-hidden="true"></span>Gather</h3>
    <p>…</p>
  </li>
</ol>
```

## Configuration

- `steps` (required): in the order they happen. The "STEP N" labels number from 1.
- `name`: if a step has a phase, its name should be the phase word or include it, so the dot is never the only signal.
- `phase`: adds a phase dot before the name.
- `description`: what to do in that step.

## Variants

With or without phase dots, set by each step's `phase`.

## Behavior

- The dot renders only when a step has a phase.
- Cards sit in a row and wrap, so they stack on phones.

## Accessibility

- An `<ol>`, which already conveys order, so the "STEP N" label is hidden from assistive tech (`aria-hidden`) to avoid "1. Step 1".
- The phase dot is decorative; the step name carries the word.

## Examples

### Stories

`Components/StepCards`: `Default` from the mockup:

1. Gather (gather): "Pull the enemies into one tight cluster with a grouping spell or an upcast Command."
2. Hold (hold): "Keep them there with difficult terrain, restraints or a nudge from the Telekinetic feat."
3. Strike (strike): "Drop Synaptic Static, Shatter or Hypnotic Pattern on the whole group at once."

`WithoutPhases`: same steps without `phase`.

### MDX docs page

Page order: `Default` with Controls; Without phases (`WithoutPhases`); Content rules; Accessibility.

## Styling

List: no bullets or padding, flex wrap, gap `space-3`. Card: `flex: 1 1 var(--layout-card-min)`, `surface`, `stroke-hairline` `line`, `radius-lg`, padding `space-5`, flex column, gap `space-1`. Label: `label`, uppercase, `gold`. Name: `heading-md`, `accent-ink`, flex with gap `space-2`. Dot here is `size-dot-lg` square with `radius-sm`. Description: `ink-body`.

## Tests

Step labels number from 1; dot renders only with a phase; renders as an ordered list.

## Acceptance criteria

Three cards in a row at 1024px, stacked at 375px.

## Open questions

None.
