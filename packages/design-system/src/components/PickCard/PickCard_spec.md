# PickCard component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to PickCard.

## Purpose

A recommended spell or feat inside a LevelCard: gold label, display name, source meta, and one or two sentences on why.

## API

```ts
/** label defaults to "Recommended"; meta is "Source edition · spell level · class list" for a spell, "Source edition · Feat" for a feat. */
export interface PickCardProps {
  label?: string;
  name: string;
  meta?: string;
  children?: React.ReactNode; // the description
  className?: string;
}
```

## Markup and accessibility

```html
<div class="cp-pick">
  <span class="cp-pick-label">Recommended</span>
  <div class="cp-pick-head">
    <h4 class="cp-pick-name">Hypnotic Pattern</h4>
    <span class="cp-meta">PHB 2014 · 3rd · Bard · Concentration</span>
  </div>
  <p class="cp-pick-body">…</p>
</div>
```

Omit the meta span and the paragraph when their props are empty. The name is an `h4` because PickCard sits under LevelCard's `h3` (see open questions).

## Styling

| Part | Tokens |
| --- | --- |
| Block | `gold-tint` fill, `radius-md`, padding `space-4`, flex column, gap `space-1`. No border, no side rule. |
| Label | `label`, `gold`. Text shows exactly as passed, never uppercased (matches Chip). |
| Head | flex wrap, baseline aligned, gap `space-2` |
| Name | `heading-sm`, `ink` |
| Meta | `caption`, `ink-muted` (shared `.cp-meta`) |
| Body | `body`, `ink` |

## Stories

`Components/PickCard`: `Default` from the mockup (Hypnotic Pattern, meta "PHB 2014 · 3rd · Bard · Concentration", description "Stops everyone in a 30 ft cube who fails the save. Drop it on a cluster Maelstrom already pulled together and the whole group is out of the fight."), shown at 640px max width. `SecretLabel` with label "Recommended · Secret 1".

## MDX docs page

Content rules: label is "Recommended" or "Recommended · Secret N". Meta always names source book and edition (constitution Part I §2): "PHB 2014 · 3rd · Bard · Concentration" for a spell, "PHB 2014 · Feat" for a feat. Description says what the pick does at the table, then why it fits, in the mockup's own words; never paste book text.

## Tests

Default label is "Recommended"; meta and body are omitted when empty.

## Acceptance criteria

Gold label, `ink` name and body, and `ink-muted` meta all pass 4.5:1 on `gold-tint` in both themes.

## Open questions

- Heading level is fixed at `h4`. If PickCard is ever used outside LevelCard, it may need a heading-level prop. Per constitution Part II §4, ask Antoinette before adding it.
