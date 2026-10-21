# PickCard component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to PickCard.

## Purpose

A recommended spell or feat inside a LevelCard: gold label, display name, source meta, and one or two sentences on why.

## Anatomy

A gold-tint block holding the label, a head (name, then meta) and the description.

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

## Markup

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

## Configuration

- `label`: default "Recommended". Use "Recommended · Secret N" when a level grants several picks. Shown exactly as written, never uppercased (matches Chip).
- `name` (required): the spell or feat name, as printed in its source book.
- `meta`: always names the source book and edition (constitution Part I §2): "PHB 2014 · 3rd · Bard · Concentration" for a spell, "PHB 2014 · Feat" for a feat.
- `children`: the description. Say what the pick does at the table, then why it fits, in your own words; never paste book text.

## Variants

None. The label text is the only thing that changes between picks.

## Behavior

- Omit the meta span and the paragraph when their props are empty.
- The meta wraps under the name when the card is narrow.

## Accessibility

- The name is an `h4`, because PickCard sits under LevelCard's `h3` (see open questions).
- The gold label, `ink` name and body, and `ink-muted` meta all pass 4.5:1 on `gold-tint` in both themes.

## Examples

### Stories

`Components/PickCard`, shown at 640px max width: `Default` from the mockup (Hypnotic Pattern, meta "PHB 2014 · 3rd · Bard · Concentration", description "Stops everyone in a 30 ft cube who fails the save. Drop it on a cluster Maelstrom already pulled together and the whole group is out of the fight."). `SecretLabel` with label "Recommended · Secret 1".

### MDX docs page

Page order: `Default` with Controls; Labels (`SecretLabel`); Content rules; Accessibility.

## Styling

| Part | Tokens |
| --- | --- |
| Block | `gold-tint` fill, `radius-md`, padding `space-4`, flex column, gap `space-1`. No border, no side rule. |
| Label | `label`, `gold`, no text transform |
| Head | flex wrap, baseline aligned, gap `space-2` |
| Name | `heading-sm`, `ink` |
| Meta | `caption`, `ink-muted` (shared `.cp-meta`) |
| Body | `body`, `ink` |

## Tests

Default label is "Recommended"; meta and body are omitted when empty.

## Acceptance criteria

Gold label, `ink` name and body, and `ink-muted` meta all pass 4.5:1 on `gold-tint` in both themes.

## Open questions

- Heading level is fixed at `h4`. If PickCard is ever used outside LevelCard, it may need a heading-level prop. Per constitution Part II §4, ask Antoinette before adding it.
