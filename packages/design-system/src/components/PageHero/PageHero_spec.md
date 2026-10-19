# PageHero component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to PageHero.

## Purpose

The forest band that opens a character page or a supplement. The Storybook MDX pages also use it (at `lg`) as their page title.

## API

```ts
export interface PageHeroProps {
  id?: string;
  size?: "xl" | "lg";  // default "xl"
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  swirl?: boolean;     // default true
  className?: string;
}
```

## Markup and accessibility

```html
<section id="overview" class="cp-hero">
  <svg class="cp-hero-swirl" aria-hidden="true">…</svg>
  <span class="cp-hero-eyebrow">D&D 5E · Character progression</span>
  <h1 class="cp-hero-title cp-hero-xl">Ciaccona</h1>    <!-- h2 when size="lg" -->
  <p class="cp-hero-sub">…</p>
  <ul class="cp-hero-tags"><li class="cp-hero-tag">Aero theme</li>…</ul>
</section>
```

- `xl` renders `h1`, `lg` renders `h2`.
- Render tags as a list (the reference uses spans).
- Swirl SVG, 480×200 viewBox, three round-capped strokes of width 4 in `currentColor`. Paths:
  - `M0 92c120 0 200-4 280-12s120-40 92-64-60 4-40 28 72 8 108-20`
  - `M60 140c140-8 240-4 320-24 48-12 72-40 48-56s-48 8-28 28 48 12 76-4`
  - `M120 184c120-4 220-4 320-12`

## Styling

| Part | Tokens |
| --- | --- |
| Band | `forest`, text `on-forest`, `radius-xl`, padding `space-10`, flex column, gap `space-3`, `position: relative`, `overflow: hidden` |
| Swirl | absolute, top 0, right `-space-10`, opacity 0.32, `on-forest-muted` |
| Eyebrow | `caption` with `font-weight-semibold`, uppercase, `on-forest-muted` |
| Title xl | `display-xl` |
| Title lg | `display-lg` |
| Subtitle | `subtitle`, `on-forest-muted` |
| Tags | flex wrap, gap `space-2`, padding-top `space-2`; each tag padding `space-1` `space-3`, `radius-xl`, `stroke-hairline` `on-forest-muted`, `caption` with `font-weight-semibold`, uppercase |

Phones: below 480px, step the `xl` title down to `display-lg` and padding to `space-6`, so "Ciaccona" fits at 375px. Antoinette confirmed this on 2026-10-19.

## Stories

`Components/PageHero`: `Character` from the mockup: eyebrow "D&D 5E · Character progression", title "Ciaccona", subtitle "College of Lore Bard — Crowd-Control Roadmap, Levels 9 to 14", tags ["Aero theme", "Wandering performer", "Gather · Hold · Strike"]. `Supplement`: size `lg`, title "Gather & Strike". `NoSwirl`: Character with `swirl={false}`.

## MDX docs page

Content rules: one `xl` hero per page; supplements use `lg`. Eyebrow names the edition and kind of page. Title is the character's name, never a slogan. Subtitle is one italic line: subclass, purpose, level range. Two or three uppercase identity tags. The swirl is decoration for Aero-themed characters; turn it off otherwise.

## Tests

`xl` renders `h1`, `lg` renders `h2`; swirl hidden from assistive tech and removed with `swirl={false}`; optional parts omitted when empty.

## Acceptance criteria

`on-forest` and `on-forest-muted` pass 4.5:1 on `forest` in both themes; the hero matches the mockup at 1440px.
