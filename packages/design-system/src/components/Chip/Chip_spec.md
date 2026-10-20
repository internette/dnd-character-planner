# Chip component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to Chip.

## Purpose

Small facts: features a level grants, casting properties of a spell in tables, and which step of the crowd-control loop (gather, hold, strike) a pick serves.

Chip has a variant for every color. **Fact variants** (`neutral`, `instant`, `concentration`, `dm`) label features and casting properties. **Phase variants** (`gather`, `hold`, `strike`) replaced the separate PhaseTag component on 2026-10-20 at Antoinette's request. Phase is a language in this system: the phase word is always shown, and color supports it.

## API

```ts
export type Phase = "gather" | "hold" | "strike";
export interface ChipProps {
  variant?: "neutral" | "instant" | "concentration" | "dm" | Phase; // default "neutral"
  size?: "sm" | "md";         // default "sm" (square); "md" is the pill
  value?: string;             // the chip's text; phase variants default to the phase word
  className?: string;
}
```

| Variant | Use | Look |
| --- | --- | --- |
| `neutral` | Features gained (5th-level spells, Song of Rest d8) | sentence case |
| `instant` | Casting property: Instant, No concentration | uppercase, 600 |
| `concentration` | Casting property: Concentration | uppercase, 600, hold colors |
| `dm` | Table-dependent content (non-core sources, Ask your DM) | uppercase, 600, arcane colors |
| `gather` | Phase: pulls enemies together | uppercase, 600, gather colors |
| `hold` | Phase: keeps them there | uppercase, 600, hold colors |
| `strike` | Phase: hits the group | uppercase, 600, strike colors |

Default words for phase variants: `gather` → "Gather", `hold` → "Hold", `strike` → "Strike". Export a `PHASE_LABEL` record with these, and the `Phase` type, so other components (SideNav, StepCards, GlanceList, LevelCard) share them.

## Markup and accessibility

- Renders `<span class="cp-chip cp-chip-{variant} cp-chip-{size}">`. `value` is the content. No interactivity, no ARIA.
- With a phase variant and no `value`, the content is the phase word from `PHASE_LABEL`.
- If `value` is passed with a phase variant, it must still contain the phase word. Document this in the MDX page; do not enforce it in code.

## Styling

Every chip: `caption` text style, `nowrap`, inline flex, centered.

| Part | Tokens |
| --- | --- |
| `sm` | padding `space-1` `space-2`, `radius-sm` (square) |
| `md` | padding `space-1` `space-3`, `radius-xl` (pill) |
| every variant except `neutral` | add `font-weight-semibold` and uppercase |

| Variant | Text | Fill |
| --- | --- | --- |
| neutral | `accent-ink` | `surface-sunken` |
| instant | `accent-ink` | `surface-sunken` |
| concentration | `hold` | `hold-tint` |
| dm | `arcane` | `arcane-tint` |
| gather | `gather` | `gather-tint` |
| hold | `hold` | `hold-tint` |
| strike | `strike` | `strike-tint` |

Also owns the phase dot used by SideNav and StepCards: `.cp-dot` (`size-dot` square, `radius-full`, `flex: none`) with `.cp-dot-{phase}` filled in the phase color. Put these classes in `Chip.css`.

## Stories

`Components/Chip`: one story per fact variant (`Neutral`, `Instant`, `Concentration`, `DM`), plus `AllFacts` matching the preview: "5th-level spells", "Song of Rest d8", Instant, Concentration, No concentration (instant variant), Ask your DM.

Phase variants: `Gather`, `Hold`, `Strike` (md pill), `PhaseSmall` (all three at `sm` in a row) and `AllPhases` (three pills, then three squares).

## MDX docs page

Content rules: use `dm` whenever the group must approve something (constitution Part I §3). Uppercase comes from CSS; write `value` in sentence case. The Controls panel shows `variant` as a select and `value` as a text field.

Page order: the `Neutral` story with Controls as a playground; Variants (`AllFacts` and one line per fact variant); Phases (`AllPhases`, the meaning of each phase, `md` pill on level cards and `sm` square in lists and tables, link to Patterns/Phases); Content rules; Accessibility. Use lists, not Markdown tables, since Storybook's MDX doesn't render them. Never color alone.

## Tests

- Renders `value`; applies the variant and size classes; defaults to `neutral` and `sm`.
- Phase variants render their default word; `value` replaces it.
- Each variant's text/fill pair passes 4.5:1 in both themes (covered by the token test; reference it).

## Acceptance criteria

Matches the Chip and PhaseTag previews in both themes: fact chips as before, phase chips as three pills then three squares. Phase text is semibold like the other uppercase variants, not the bold of the old PhaseTag preview (Antoinette, 2026-10-20), so the variants differ only in color, case and the phase word default.

## Open questions

None.
