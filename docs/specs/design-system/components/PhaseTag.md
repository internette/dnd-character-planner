# PhaseTag component spec

Parent: [root spec](../README.md). The root spec's shared component rules apply; this file adds what is specific to PhaseTag.

## Purpose

Marks which step of the crowd-control loop (gather, hold, strike) a pick serves. Phase is a language in this system: the word is always shown, and color supports it.

## Anatomy

A single inline label containing the phase word, uppercase, on the phase's tint.

## API

```ts
export type Phase = "gather" | "hold" | "strike";
export interface PhaseTagProps {
  phase: Phase;
  size?: "md" | "sm";        // default "md"
  children?: React.ReactNode; // overrides the default word
  className?: string;
}
```

Default words: `gather` → "Gather", `hold` → "Hold", `strike` → "Strike". Export a `PHASE_LABEL` record with these so other components (SideNav, StepCards) share it.

## Markup and accessibility

- Renders `<span class="cp-phase cp-phase-{phase} cp-phase-{size}">`.
- The text is the accessible name; no ARIA needed.
- If `children` is passed, it must still contain the phase word. Document this in the MDX page; do not enforce it in code.

## Styling

| Part | Tokens |
| --- | --- |
| Text | `label` style (12/16, 700, uppercase), body family |
| `md` | padding `space-1` `space-3`, `radius-xl` (pill) |
| `sm` | padding `space-1` `space-2`, `radius-sm` (square) |
| gather | `gather` text on `gather-tint` |
| hold | `hold` text on `hold-tint` |
| strike | `strike` text on `strike-tint` |

`white-space: nowrap`.

Also owns the phase dot used by SideNav and StepCards: `.cp-dot` (8×8, `radius-full`) with `.cp-dot-{phase}` filled in the phase color. Put these classes in `PhaseTag.css`.

## Stories

`Components/PhaseTag`: `Gather`, `Hold`, `Strike` (md), `Small` (all three at `sm` in a row), `AllPhases` (both sizes, as in the preview).

## MDX docs page

Usage: `md` pill on level cards, `sm` square in lists and tables. Content rule: never color alone. Show the three phases with their meaning (gather pulls enemies together, hold keeps them there, strike hits the group) and link to Patterns/Phases.

## Tests

- Renders the default word for each phase.
- Applies `sm` and `md` classes.
- `children` replaces the word.
- Each phase's text/tint pair passes 4.5:1 in both themes (covered by the token test; reference it).

## Acceptance criteria

Matches the preview: three pills, then three squares, colors per phase, in light and dark.

## Open questions

None.
