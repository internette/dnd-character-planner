# SideNav component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to SideNav.

## Purpose

In-page navigation for a roadmap. Level items carry a phase dot so the gather, hold, strike rhythm reads down the rail.

## API

```ts
export interface NavItem { label: string; href?: string; phase?: Phase; current?: boolean }
export interface SideNavProps {
  label?: string;  // aria-label, default "On this page"
  sections: { heading?: string; items: NavItem[] }[];
  className?: string;
}
```

## Markup and accessibility

```html
<nav class="cp-nav" aria-label="On this page">
  <h2 class="cp-nav-heading" id="…">Roadmap</h2>
  <ul aria-labelledby="…">
    <li><a class="cp-nav-item" href="#lv9"><span>Lv 9 · The Lingering Note</span><span class="cp-dot cp-dot-strike" role="img" aria-label="Strike"></span></a></li>
  </ul>
</nav>
```

- Group items in a `<ul>` per section (the reference renders a flat list of links and spans).
- `current` sets `aria-current="location"` (in-page navigation); style `[aria-current]` generally so `page` and `true` also work.
- Phase dots have `role="img"` and the phase word as label.
- An item without `href` falls back to `#`; prefer requiring `href` in docs.

## Styling

| Part | Tokens |
| --- | --- |
| Nav | `surface`, `stroke-hairline` `line`, `radius-lg`, padding `space-3`, flex column, gap `space-1` |
| Heading | padding `space-3` `space-3` `space-1` (top `space-1` for the first), `label`, uppercase, `ink-muted` |
| Item | flex space-between, gap `space-2`, min-height `size-touch`, padding `space-3`, `radius-md`, body family `font-size-4`/`line-height-5`, `ink`, no underline |
| Hover | `ground` fill |
| Current | `surface-sunken` fill, 600; text `forest` in light, `accent-ink` in dark |
| Focus | outline `stroke-strong` `accent`, offset `space-1` |

## Stories

`Components/SideNav` at 320px max width, from the mockup: section "Roadmap" with Overview (current), Lv 9 · The Lingering Note (strike), Lv 10 · The Vortex Opens (gather), Lv 11 · The Lullaby (hold), Lv 12 · The Unseen Hand (gather), Lv 13 · The Cage of Wind (hold), Lv 14 · Arrival on the Breeze (gather), Before you level up; section "Supplement" with Gather & Strike, True grouping spells, Bard-native gathering, Pushes & pulls, Combos. Hrefs as `#overview`, `#lv9` … `#combos`. Add `Dark` with the theme global set to dark to show the current-item color swap.

## MDX docs page

Content rules: two or three section headings; mark the section in view with `current`; on phones it stacks above the content; never sticky. Scroll-spy (setting `current` from scroll position) is the app's job, not the component's.

## Tests

`aria-current` only on the current item; dots labelled with phase words; each section's list labelled by its heading.

## Acceptance criteria

Every item is at least 44px tall; keyboard focus is visible in both themes.

## Open questions

- Heading element: `h2` inside nav may clash with page outlines. Alternative is a styled `<p>` with `id`. Pick `h2` unless the Roadmap page pattern shows an outline problem.
