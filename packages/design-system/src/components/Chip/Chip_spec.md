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

Also exports two records so every phase chip matches (SideNav, StepCards, GlanceList and LevelCard use them):

- `PHASE_LABEL`: `gather` → "Gather", `hold` → "Hold", `strike` → "Strike".
- `PHASE_VARIANT`: `gather` → `blue`, `hold` → `amber`, `strike` → `red`.

A phase chip is `<Chip variant={PHASE_VARIANT[phase]} value={PHASE_LABEL[phase]} />`.

Renders `<span class="cp-chip cp-chip-{variant} cp-chip-{shape}">`, with `value` as the content.

## Configuration

- `value` (required): the chip's text. The chip never changes its case, so write it in sentence case. A phase chip's `value` must contain the phase word; document this on the Patterns/Phases page and don't enforce it in code.
- `variant`: the color, default `green`. Use `purple` whenever the group must approve something (constitution Part I §3).
- `shape`: default `rectangle`.

## Variants

Color, set by `variant`:

| Variant | Use |
| --- | --- |
| `green` | Features gained (5th-level spells, Song of Rest d8) and casting properties (Instant, No concentration) |
| `amber` | Concentration; the Hold phase |
| `purple` | Table-dependent content (non-core sources, Ask your DM) |
| `blue` | The Gather phase |
| `red` | The Strike phase |

Shape, set by `shape`: `rectangle` for lists and tables, `pill` for the phase on a level card.

## Behavior

Static: no interactivity, no hover or focus state. The text never wraps or changes case.

## Accessibility

- The text is the content, so the chip needs no ARIA.
- Each variant's text and fill pass 4.5:1 in both themes.
- Color never carries meaning alone: a phase chip always shows the phase word.

## Examples

`Components/Chip`: one story per variant (`Green` "5th-level spells", `Amber` "Concentration", `Purple` "Ask your DM", `Blue` "Gather", `Red` "Strike"); `AllVariants` (one chip per variant, labelled with its name); `Shapes` (a rectangle and a pill); `AllFacts` matching the preview: "5th-level spells", "Song of Rest d8", "Instant" (green), "Concentration" (amber), "No concentration" (green), "Ask your DM" (purple).

MDX docs page order: the `Green` story with Controls as a playground; Variants (`AllVariants`, one line per variant on when to use it, then `AllFacts` as real examples); Shapes (`Shapes`); Content rules; Accessibility. No Phases section: phase meaning, `PHASE_VARIANT` and `PHASE_LABEL` are documented on the Patterns/Phases page (Antoinette, 2026-10-20). Use lists, not Markdown tables, since Storybook's MDX doesn't render them.

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

## Tests

- Renders `value`; applies the variant and shape classes; defaults to `green` and `rectangle`.
- `PHASE_VARIANT` maps gather, hold and strike to blue, amber and red.
- Each variant's text/fill pair passes 4.5:1 in both themes (covered by the token test; reference it).

## Acceptance criteria

Matches the Chip and PhaseTag previews in both themes in color, size and shape. Two deliberate differences (Antoinette, 2026-10-20): text keeps the case it was written in instead of being uppercased, and every chip is semibold, including features gained and phases (plain merged into green).

## Open questions

None.
