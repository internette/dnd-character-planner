# LevelCard component spec

Parent: [root spec](../../../design-system_spec.md). The root spec's shared component rules apply; this file adds what is specific to LevelCard.

## Purpose

The core unit of a roadmap: what a level grants, what to pick, and the alternatives.

## Anatomy

LevelBadge on the left; a card on the right holding a head (title, feature chips, PhaseTag), one or two PickCards, and an optional AltList.

## API

```ts
export interface Pick { label?: string; name: string; meta?: string; description?: React.ReactNode }
export interface LevelCardProps {
  id?: string;
  level: number;
  title: string;
  phase?: Phase;
  features?: string[];
  picks?: Pick[];
  alternatives?: AltItem[];
  className?: string;
}
```

Composes `LevelBadge`, `Chip` (neutral, one per feature), `PhaseTag` (md), `PickCard`, `AltList`.

## Markup and accessibility

```html
<article id="lv9" class="cp-levelcard">
  <LevelBadge/>
  <div class="cp-card">
    <div class="cp-card-head">
      <div class="cp-stack" style="gap: space-2"><h3 class="cp-card-title">…</h3><div class="cp-row">chips</div></div>
      <PhaseTag/>
    </div>
    picks (wrapped in .cp-picks when there are two or more)
    <AltList/>
  </div>
</article>
```

- `id` is the anchor target for SideNav and GlanceList links.
- Replace the reference's inline `style` gap with a class (`cp-card-titles`).
- Label the article with its title via `aria-labelledby`.

## Styling

| Part | Tokens |
| --- | --- |
| Outer | flex, gap `space-4`, align start |
| Card | `surface`, `stroke-hairline` `line`, `radius-lg`, padding `space-6`, flex column, gap `space-4`, `min-width: 0` |
| Head | flex wrap, space-between, gap `space-3` |
| Title | `heading-md`, `ink` |
| Picks | grid `repeat(auto-fit, minmax(var(--layout-pick-min), 1fr))`, gap `space-3` |

No shadow.

## Stories

`Components/LevelCard`, from the mockup:

- `OnePick`: level 9, "The Lingering Note", phase strike, features ["5th-level spells", "Song of Rest d8"], pick Synaptic Static (meta "XGtE · 5th · Bard", description "A 20 ft psychic burst that keeps dragging down enemies' attacks and checks afterward. It's instant, so it never competes with a concentration spell you already have running."), alternatives Hold Monster ("single-target lockdown for boss fights.") and Shatter (joiner ", ", "upcast: your existing strike option until this arrives.").
- `TwoPicks`: level 10, "The Vortex Opens", phase gather, features ["Magical Secrets (2 spells)", "Expertise (2 skills)", "Bardic Inspiration d10"], picks "Recommended · Secret 1" Maelstrom ("XGtE · 5th · Druid · Concentration", "A 30 ft swirling vortex of difficult terrain that drags enemies 10 ft toward its center every turn. Gather and hold in a single spell.") and "Recommended · Secret 2" Steel Wind Strike ("XGtE · 5th · Wizard/Ranger", "Hits up to five foes at once. Reflavor the weapon flourish as a gust of pistol shots."), alternatives Gravity Sinkhole (joiner " ", "(EGtW) in place of Steel Wind Strike, if your DM allows Wildemount spells.") and "Expertise:" (joiner " ", "Persuasion and Insight, if not already doubled.").
- `NoAlternatives`: OnePick without alternatives.
- `Narrow`: TwoPicks in a 375px viewport (picks stack).

## MDX docs page

Content rules from the component README: the title is an evocative name for the level; features are class features as chips; one phase per level; two picks side by side on Magical Secrets levels; every pick names its source; at most three alternatives.

## Tests

- One pick renders without the `.cp-picks` wrapper; two picks render inside it.
- Features, phase and alternatives are omitted when empty.
- `id` lands on the article.

## Acceptance criteria

Matches the level 9 and level 10 cards in the Ciaccona mockup at 1440px, and stacks cleanly at 375px.

## Open questions

- At phone width the badge stays beside the card, which narrows the card by 80px. The mockup does not show phones; decide whether the badge moves above the card below 480px. Ask before changing.
