# Chip component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to Chip.

## Purpose

Small facts: features a level grants, casting properties of a spell in tables, and which step of the crowd-control loop (gather, hold, strike) a pick serves.

Chip replaced the separate PhaseTag component on 2026-10-20 at Antoinette's request. Its variants are generic and named by color, so the same chip serves facts and phases. Phase is a language in this system: a phase chip always shows the phase word, and color supports it.

## API

```ts
export type ChipVariant = "green" | "amber" | "purple" | "blue" | "red";
export type Phase = "gather" | "hold" | "strike";
export interface ChipProps {
  variant?: ChipVariant; // default "green"
  shape?: "rectangle" | "pill"; // default "rectangle"
  value: string;         // the chip's text, shown exactly as written
  className?: string;
}
```

| Variant | Use |
| --- | --- |
| `green` | Features gained (5th-level spells, Song of Rest d8) and casting properties (Instant, No concentration) |
| `amber` | Concentration; the Hold phase |
| `purple` | Table-dependent content (non-core sources, Ask your DM) |
| `blue` | The Gather phase |
| `red` | The Strike phase |

Export two records so every phase chip matches (SideNav, StepCards, GlanceList and LevelCard use them):

- `PHASE_LABEL`: `gather` → "Gather", `hold` → "Hold", `strike` → "Strike".
- `PHASE_VARIANT`: `gather` → `blue`, `hold` → `amber`, `strike` → `red`.

A phase chip is `<Chip variant={PHASE_VARIANT[phase]} value={PHASE_LABEL[phase]} />`.

## Markup and accessibility

- Renders `<span class="cp-chip cp-chip-{variant} cp-chip-{shape}">`. `value` is the content. No interactivity, no ARIA.
- A phase chip's `value` must contain the phase word. Document this in the MDX page; do not enforce it in code.

## Styling

Every chip: `caption` text style with `font-weight-semibold`, `nowrap`, inline flex, centered. No text transform: the chip shows `value` exactly as written (Antoinette, 2026-10-20).

| Part | Tokens |
| --- | --- |
| `rectangle` | padding `space-1` `space-2`, `radius-sm` |
| `pill` | padding `space-1` `space-3`, `radius-xl` |

| Variant | Text | Fill |
| --- | --- | --- |
| green | `accent-ink` | `surface-sunken` |
| amber | `hold` | `hold-tint` |
| purple | `arcane` | `arcane-tint` |
| blue | `gather` | `gather-tint` |
| red | `strike` | `strike-tint` |

Also owns the phase dot used by SideNav and StepCards: `.cp-dot` (`size-dot` square, `radius-full`, `flex: none`) with `.cp-dot-{phase}` filled in the phase color. Put these classes in `Chip.css`.

## Stories

`Components/Chip`: one story per variant (`Green` "5th-level spells", `Amber` "Concentration", `Purple` "Ask your DM", `Blue` "Gather", `Red` "Strike"); `AllFacts` matching the preview: "5th-level spells", "Song of Rest d8", "Instant" (green), "Concentration" (amber), "No concentration" (green), "Ask your DM" (purple); and `AllPhases` (three phase pills, then three rectangles, built from `PHASE_VARIANT` and `PHASE_LABEL`).

## MDX docs page

Page order: the `Green` story with Controls as a playground; Variants (`AllFacts` and one line per variant); Phases (`AllPhases`, the meaning of each phase, `PHASE_VARIANT` and `PHASE_LABEL`, `pill` on level cards and `rectangle` in lists and tables, link to Patterns/Phases); Content rules; Accessibility. Use lists, not Markdown tables, since Storybook's MDX doesn't render them.

Content rules: the chip never changes the case of `value`; write it in sentence case. Use `purple` whenever the group must approve something (constitution Part I §3). Never show a phase by color alone.

## Tests

- Renders `value`; applies the variant and shape classes; defaults to `green` and `rectangle`.
- `PHASE_VARIANT` maps gather, hold and strike to blue, amber and red.
- Each variant's text/fill pair passes 4.5:1 in both themes (covered by the token test; reference it).

## Acceptance criteria

Matches the Chip and PhaseTag previews in both themes in color, size and shape. Two deliberate differences (Antoinette, 2026-10-20): text keeps the case it was written in instead of being uppercased, and every chip is semibold, including features gained and phases (plain merged into green).

## Open questions

None.
