# Chip component spec

Parent: [root spec](../README.md). The root spec's shared component rules apply; this file adds what is specific to Chip.

## Purpose

Small facts: features a level grants, and casting properties of a spell in tables.

## API

```ts
export interface ChipProps {
  tone?: "neutral" | "instant" | "concentration" | "dm"; // default "neutral"
  children?: React.ReactNode;
  className?: string;
}
```

| Tone | Use | Look |
| --- | --- | --- |
| `neutral` | Features gained (5th-level spells, Song of Rest d8) | sentence case |
| `instant` | Casting property: Instant, No concentration | uppercase, 600 |
| `concentration` | Casting property: Concentration | uppercase, 600, hold colors |
| `dm` | Table-dependent content (non-core sources, Ask your DM) | uppercase, 600, arcane colors |

## Markup and accessibility

`<span class="cp-chip cp-chip-{tone}">`. Text is the content. No interactivity.

## Styling

Padding `space-1` `space-2`, `radius-sm`, caption size (12/16), `nowrap`.

| Tone | Text | Fill |
| --- | --- | --- |
| neutral | `accent-ink` | `accent-tint` |
| instant | `accent-ink` | `accent-tint` |
| concentration | `hold` | `hold-tint` |
| dm | `arcane` | `arcane-tint` |

## Stories

`Components/Chip`: one story per tone, plus `AllTones` matching the preview: "5th-level spells", "Song of Rest d8", Instant, Concentration, No concentration (instant tone), Ask your DM.

## MDX docs page

Content rules: use `dm` whenever the group must approve something (constitution Part I §3). Uppercase comes from CSS; write children in sentence case.

## Tests

Renders children; applies the tone class; defaults to `neutral`.

## Acceptance criteria

Matches the preview in both themes.

## Open questions

None.
