# StepCards component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to StepCards.

## Purpose

A numbered sequence. Use only when order matters, like the Gather, Hold, Strike loop.

## API

```ts
export interface Step { name: string; phase?: Phase; description: React.ReactNode }
export interface StepCardsProps { steps: Step[]; className?: string }
```

## Markup and accessibility

```html
<ol class="cp-steps">
  <li class="cp-step">
    <span class="cp-step-label">STEP 1</span>
    <h3 class="cp-step-name"><span class="cp-dot cp-dot-gather" aria-hidden="true"></span>Gather</h3>
    <p>…</p>
  </li>
</ol>
```

The `<ol>` already conveys order, so hide the "STEP N" label from assistive tech (`aria-hidden`) to avoid "1. Step 1". The phase dot is decorative; the step name carries the word.

## Styling

List: no bullets or padding, flex wrap, gap `space-3`. Card: `flex: 1 1 var(--layout-card-min)`, `surface`, `stroke-hairline` `line`, `radius-lg`, padding `space-5`, flex column, gap `space-1`. Label: `label`, uppercase, `gold`. Name: `heading-md`, `accent-ink`, flex with gap `space-2`. Dot here is `size-dot-lg` square with `radius-sm`. Description: `ink-body`.

## Stories

`Components/StepCards`: `Default` from the mockup:

1. Gather (gather): "Pull the enemies into one tight cluster with a grouping spell or an upcast Command."
2. Hold (hold): "Keep them there with difficult terrain, restraints or a nudge from the Telekinetic feat."
3. Strike (strike): "Drop Synaptic Static, Shatter or Hypnotic Pattern on the whole group at once."

`WithoutPhases`: same steps without `phase`.

## MDX docs page

Content rule: only when order matters. If a step has a phase, its name should be the phase word or include it, so the dot is never the only signal.

## Tests

Step labels number from 1; dot renders only with a phase; renders as an ordered list.

## Acceptance criteria

Three cards in a row at 1024px, stacked at 375px.

## Open questions

None.
