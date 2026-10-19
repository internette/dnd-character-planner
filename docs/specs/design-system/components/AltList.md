# AltList component spec

Parent: [root spec](../README.md). The root spec's shared component rules apply; this file adds what is specific to AltList.

## Purpose

Alternatives under a pick: each a bold name and a short reason behind an accent chevron. Keeps "the player decides" visible.

## API

```ts
/** joiner sits between the bold name and the text; defaults to ": ". */
export interface AltItem { name: string; text: string; joiner?: string }
export interface AltListProps { items: AltItem[]; className?: string }
```

## Markup and accessibility

```html
<ul class="cp-alts">
  <li><svg class="cp-chev" aria-hidden="true">…</svg><span><strong>Hold Monster</strong>: single-target lockdown for boss fights.</span></li>
</ul>
```

Chevron: 16×16 viewBox, path `M6 4l4 4-4 4`, no fill, `currentColor` stroke 2, round caps and joins. Make it an internal `Chevron` icon component (not exported).

## Styling

| Part | Tokens |
| --- | --- |
| List | no bullets, no padding, flex column, gap `space-2` |
| Item | flex, gap `space-2`, `ink` |
| Chevron | `accent`, `margin-top: space-1`, `flex: none` |

## Stories

`Components/AltList`: `Default` from the preview: Otto's Irresistible Dance ("the musician's pick, but it only hits one target."), Mass Suggestion ("no concentration, up to twelve creatures."). `CustomJoiner`: Shatter with joiner ", " and text "upcast: your existing strike option until this arrives."

## MDX docs page

Content rule: at most three alternatives. Each says what makes it a different choice, not why it is worse.

## Tests

Default joiner is ": "; custom joiner renders; chevron is `aria-hidden`.

## Acceptance criteria

Long text wraps under the text column, not under the chevron.

## Open questions

None.
