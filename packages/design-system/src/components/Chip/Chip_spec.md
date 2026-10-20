# Chip component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to Chip.

## Purpose

Small facts: features a level grants, casting properties of a spell in tables, and which step of the crowd-control loop (gather, hold, strike) a pick serves.

Chip replaced the separate PhaseTag component on 2026-10-20 at Antoinette's request. Its variants are generic and named by color, so the same chip serves facts and phases. Phase is a language in this system: a phase chip always shows the phase word, and color supports it.

## API

```ts
export type ChipVariant = "plain" | "green" | "amber" | "purple" | "blue" | "red";
export type Phase = "gather" | "hold" | "strike";
export interface ChipProps {
  variant?: ChipVariant; // default "plain"
  size?: "sm" | "md";    // default "sm" (square); "md" is the pill
  value: string;         // the chip's text, in sentence case
  className?: string;
}
```

| Variant | Use | Look |
| --- | --- | --- |
| `plain` | Features gained (5th-level spells, Song of Rest d8) | sentence case |
| `green` | Casting properties: Instant, No concentration | uppercase, 600 |
| `amber` | Concentration; the Hold phase | uppercase, 600 |
| `purple` | Table-dependent content (non-core sources, Ask your DM) | uppercase, 600 |
| `blue` | The Gather phase | uppercase, 600 |
| `red` | The Strike phase | uppercase, 600 |

Export two records so every phase chip matches (SideNav, StepCards, GlanceList and LevelCard use them):

- `PHASE_LABEL`: `gather` → "Gather", `hold` → "Hold", `strike` → "Strike".
- `PHASE_VARIANT`: `gather` → `blue`, `hold` → `amber`, `strike` → `red`.

A phase chip is `<Chip variant={PHASE_VARIANT[phase]} value={PHASE_LABEL[phase]} />`.

## Markup and accessibility

- Renders `<span class="cp-chip cp-chip-{variant} cp-chip-{size}">`. `value` is the content. No interactivity, no ARIA.
- A phase chip's `value` must contain the phase word. Document this in the MDX page; do not enforce it in code.

## Styling

Every chip: `caption` text style with `font-weight-semibold`, uppercase, `nowrap`, inline flex, centered. `plain` resets to `font-weight-regular` and no text transform.

| Part | Tokens |
| --- | --- |
| `sm` | padding `space-1` `space-2`, `radius-sm` (square) |
| `md` | padding `space-1` `space-3`, `radius-xl` (pill) |

| Variant | Text | Fill |
| --- | --- | --- |
| plain | `accent-ink` | `surface-sunken` |
| green | `accent-ink` | `surface-sunken` |
| amber | `hold` | `hold-tint` |
| purple | `arcane` | `arcane-tint` |
| blue | `gather` | `gather-tint` |
| red | `strike` | `strike-tint` |

Also owns the phase dot used by SideNav and StepCards: `.cp-dot` (`size-dot` square, `radius-full`, `flex: none`) with `.cp-dot-{phase}` filled in the phase color. Put these classes in `Chip.css`.

## Stories

`Components/Chip`: one story per variant (`Plain` "5th-level spells", `Green` "Instant", `Amber` "Concentration", `Purple` "Ask your DM", `Blue` "Gather", `Red` "Strike"); `AllFacts` matching the preview: "5th-level spells", "Song of Rest d8", Instant (green), Concentration (amber), No concentration (green), Ask your DM (purple); and `AllPhases` (three phase pills, then three squares, built from `PHASE_VARIANT` and `PHASE_LABEL`).

## MDX docs page

Page order: the `Plain` story with Controls as a playground; Variants (`AllFacts` and one line per variant); Phases (`AllPhases`, the meaning of each phase, `PHASE_VARIANT` and `PHASE_LABEL`, `md` pill on level cards and `sm` square in lists and tables, link to Patterns/Phases); Content rules; Accessibility. Use lists, not Markdown tables, since Storybook's MDX doesn't render them.

Content rules: write `value` in sentence case; CSS uppercases every variant except `plain`. Use `purple` whenever the group must approve something (constitution Part I §3). Never show a phase by color alone.

## Tests

- Renders `value`; applies the variant and size classes; defaults to `plain` and `sm`.
- `PHASE_VARIANT` maps gather, hold and strike to blue, amber and red.
- Each variant's text/fill pair passes 4.5:1 in both themes (covered by the token test; reference it).

## Acceptance criteria

Matches the Chip and PhaseTag previews in both themes, except that phase text is semibold like the other uppercase chips (Antoinette, 2026-10-20).

## Open questions

None.
