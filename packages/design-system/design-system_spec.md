# Design system build spec: Bag of Holding

Status: draft 4, 2026-10-19. Audience: an AI coding agent working in `internette/dnd-character-planner`.

Build the Bag of Holding design system as code in `packages/design-system`, document it in Storybook with themed MDX pages, and publish that Storybook at the `/design-system` route of the web app.

Read `CONSTITUTION.md` before starting. Part II applies to all of this work; §4 ("Build on the design system") is the reason this package exists.

This is the root spec. It links to a spec for each token group and each component, kept in the same folder as the code it describes:

```
packages/design-system/
  design-system_spec.md                  # this file
  component-template_spec.md             # copy for new components
  src/styles/tokens/<group>/<group>_spec.md   # color, typography, spacing, shape, layout
  src/components/<Name>/<Name>_spec.md   # one per component
```

The specs are self-contained: every value, prop and example you need is written in them. Where a spec and anything else disagree, the spec wins.

---

## 1. Background

The design comes from the Ciaccona Lore Bard roadmap mockup: a quiet, rules-first reading surface with a forest-green hero and a three-color phase language for crowd control (gather, hold, strike). Port it; don't redesign it.

### Name

The design system is called **Bag of Holding**: like the magic item, it holds everything the planner needs, and it's bigger on the inside than it looks. Use the name for the design system only (the Storybook brand title, the docs and code comments). The product is still the D&D Character Planner. The package name stays `@dnd/design-system` and CSS classes keep the `cp-` prefix.

### Principles

1. **Everything sits on a 4px grid.** Sizes, line heights, padding, gaps, margins and radii are multiples of 4px and come from tokens. Strokes (1px, 2px) are the only exception.
2. **The rules are the content.** Every spell, feat or feature shows its source book and level in its meta line (`XGtE · 5th · Druid · Concentration`). Anything the table must decide gets the `dm` chip.
3. **Phase is a language.** A pick's role in the loop is always shown with its word. Color supports the word and never replaces it.
4. **The player decides.** Recommendations are marked *Recommended*, with alternatives directly under them. Nothing reads as a requirement.

### Voice

Plain, warm and specific. Lead with what a pick does at the table, then why it fits the character: "Hits up to five foes at once. Reflavor the weapon flourish as a gust of pistol shots." Use game units as written in the books (20 ft, 1,500 gp, d10). Sentence case everywhere except labels, which are uppercase.

### Iconography

Inline stroke SVG at `size-icon` (16px), 2px stroke, round caps and joins, colored with `currentColor`, `aria-hidden="true"`. The AltList chevron is the only icon so far. The PageHero wind swirl is decoration for Aero-themed characters. No emoji. No logo yet; the product name is set in Lora.

### Reference files (optional)

The original design-system bundle and mockup are in the project's shared files (`design/design-system/` and `design/ciaccona-lore-bard/`). They are background only. If you can't reach them, the specs have everything you need.

## 2. Deliverables

1. Token CSS files, one per group, each built to its spec (§4).
2. The 13 components as typed React components with plain CSS, exported from `@dnd/design-system`, each built to its spec (§5).
3. Storybook with a Bag of Holding brand theme, a light/dark toolbar switch, and themed MDX pages (§6).
4. The Storybook static build served by the web app at `/design-system` (§7).
5. Tests for tokens and components.

## 3. Package layout

The package is ESM TypeScript with Storybook 10 (`@storybook/react-vite`). Run it with `pnpm storybook`.

```
packages/design-system/
  design-system_spec.md
  component-template_spec.md
  .storybook/
    main.ts             # story and MDX globs, addons
    manager.ts          # applies the brand theme to the Storybook UI
    preview.tsx         # global CSS, theme toolbar and decorator, docs theme
    theme.ts            # storybook/theming create() for light and dark
    theme.test.ts       # theme colors match color.css
  src/
    styles/
      index.css         # imports tokens.css, base.css and every component CSS
      base.css          # shared classes: .cp-row, .cp-stack, .cp-meta, .cp-label, .cp-panel, .cp-panel-title
      tokens/
        color/        color.css       color_spec.md       color.test.ts
        typography/   typography.css  fonts.css  typography_spec.md  typography.test.ts
        spacing/      spacing.css     spacing_spec.md     spacing.test.ts
        shape/        shape.css       shape_spec.md       shape.test.ts
        layout/       layout.css      layout_spec.md      layout.test.ts
        tokens.css      # imports every token file except fonts.css
        test-utils.ts   # reads a token file and returns { name, value, comment } per variable; WCAG contrast helper
    components/
      <Name>/
        <Name>_spec.md
        <Name>.tsx
        <Name>.css
        <Name>.stories.tsx
        <Name>.mdx
        <Name>.test.tsx
        index.ts
    docs/
      blocks/           # doc-only React blocks, not exported
      Introduction.mdx
      ...
    index.ts            # public exports
```

`package.json` exports:

```json
"exports": {
  ".": "./src/index.ts",
  "./styles.css": "./src/styles/index.css",
  "./tokens.css": "./src/styles/tokens/tokens.css",
  "./fonts.css": "./src/styles/tokens/typography/fonts.css"
}
```

Use plain CSS files with `cp-` class names, not CSS-in-JS or a utility framework. This keeps components server-renderable in the Next.js App Router.

## 4. Tokens

Tokens are CSS custom properties, written by hand in one CSS file per group. There is no JSON, no generator script and no TypeScript copy of the values: the CSS files are the source of truth, and anything else that needs a value (docs pages, tests, the Storybook theme) reads or checks those files.

| Group | Spec | File | Prefixes |
| --- | --- | --- | --- |
| Color | [color_spec.md](./src/styles/tokens/color/color_spec.md) | `color/color.css` | `--color-*` (light and dark) |
| Typography | [typography_spec.md](./src/styles/tokens/typography/typography_spec.md) | `typography/typography.css`, `typography/fonts.css` | `--font-*`, `--font-size-*`, `--line-height-*`, `--type-*` |
| Spacing | [spacing_spec.md](./src/styles/tokens/spacing/spacing_spec.md) | `spacing/spacing.css` | `--space-*` |
| Shape | [shape_spec.md](./src/styles/tokens/shape/shape_spec.md) | `shape/shape.css` | `--radius-*`, `--stroke-*` |
| Layout | [layout_spec.md](./src/styles/tokens/layout/layout_spec.md) | `layout/layout.css` | `--layout-*`, `--size-*` |

Rules for every token file:

- Each variable has a one-line usage comment directly above it. Docs pages show these comments, so they are the token's documentation.
- `tokens.css` imports the five token files in the order above. Token files don't refer to each other, except that typography's text styles use its own scale tokens.
- Themes: light values on `:root`, dark values under `[data-theme="dark"]` on any ancestor. Only color changes between themes.

**How specs refer to tokens.** Component specs name tokens without the prefix or `var()`: a color written `ink` means `var(--color-ink)`, `space-4` means `var(--space-4)`, `radius-lg` means `var(--radius-lg)`, `stroke-hairline` means `var(--stroke-hairline)`, and a text style written `heading-sm` means `font: var(--type-heading-sm)`. Where a component spec gives size/line/weight numbers instead of a style name, compose them from the typography scale tokens as the typography spec describes.

## 5. Components

Build them in this order, since later ones compose earlier ones:

| Order | Component | Spec | Composes |
| --- | --- | --- | --- |
| 1 | PhaseTag | [PhaseTag_spec.md](./src/components/PhaseTag/PhaseTag_spec.md) | |
| 2 | Chip | [Chip_spec.md](./src/components/Chip/Chip_spec.md) | |
| 3 | LevelBadge | [LevelBadge_spec.md](./src/components/LevelBadge/LevelBadge_spec.md) | |
| 4 | PickCard | [PickCard_spec.md](./src/components/PickCard/PickCard_spec.md) | |
| 5 | AltList | [AltList_spec.md](./src/components/AltList/AltList_spec.md) | |
| 6 | LevelCard | [LevelCard_spec.md](./src/components/LevelCard/LevelCard_spec.md) | LevelBadge, Chip, PhaseTag, PickCard, AltList |
| 7 | GlanceList | [GlanceList_spec.md](./src/components/GlanceList/GlanceList_spec.md) | PhaseTag |
| 8 | NotePanel | [NotePanel_spec.md](./src/components/NotePanel/NotePanel_spec.md) | |
| 9 | StepCards | [StepCards_spec.md](./src/components/StepCards/StepCards_spec.md) | phase dot from PhaseTag |
| 10 | SpellTable | [SpellTable_spec.md](./src/components/SpellTable/SpellTable_spec.md) | Chip |
| 11 | ComboCards | [ComboCards_spec.md](./src/components/ComboCards/ComboCards_spec.md) | |
| 12 | PageHero | [PageHero_spec.md](./src/components/PageHero/PageHero_spec.md) | |
| 13 | SideNav | [SideNav_spec.md](./src/components/SideNav/SideNav_spec.md) | phase dot from PhaseTag |

New components get a spec from [`component-template_spec.md`](./component-template_spec.md), saved as `<Name>_spec.md` in the component's folder, before any code.

### 5.1 Rules for every component

- Keep the props in the component spec exactly. Export the component and its props types by name from `src/index.ts`. Where a spec changes markup for accessibility, the props and the look stay the same.
- Every color, length and text style is a token. Component CSS has no raw values except `480px` in media queries (see the layout spec) and unitless numbers such as opacity.
- Accept `className` and merge it onto the root element with a small internal `cx()` helper.
- Server-component safe: no state, effects or browser APIs. None of the 13 components needs interaction.
- No inline `style` props.
- Semantic HTML first, ARIA only where HTML can't express it.
- Tappable elements are at least `space-12` (48px) in both directions. Focus rings: outline `stroke-strong` in `accent`, offset `space-1`.
- Phase is never conveyed by color alone.
- Shared classes live in `src/styles/base.css`: `.cp-row` (flex wrap, centered, gap `space-2`), `.cp-stack` (flex column, gap `space-4`), `.cp-meta` (`caption`, `ink-muted`), `.cp-label` (`label`, uppercase), `.cp-panel` (`surface`, `stroke-hairline` `line`, `radius-lg`, padding `space-5`, flex column, gap `space-2`) and `.cp-panel-title` (`heading-sm`, `accent-ink`). Everything else goes in the component's own CSS file.

Component tests use Vitest and Testing Library in jsdom, plus an axe check (`vitest-axe`) on every story's args. Add a `test` script to the package.

## 6. Storybook

### 6.1 Configuration

- `main.ts`: `stories: ["../src/docs/**/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"]`; addons `@storybook/addon-docs` and `@storybook/addon-a11y`; `docs: { defaultName: "Overview" }`.
- `preview.tsx`: import `../src/styles/tokens/typography/fonts.css` and `../src/styles/index.css`. Add a global `theme` toolbar item (Light, Dark). A decorator sets `data-theme` on the story root and on the docs container, so stories and MDX pages switch together. Turn the backgrounds addon off; the theme provides the ground. Sort the sidebar: Introduction, Foundations, Components, Patterns.
- `theme.ts` and `manager.ts`: brand the Storybook UI with `create()` from `storybook/theming`:
  - `brandTitle`: "Bag of Holding", set in Lora; no logo yet.
  - `colorPrimary` and `colorSecondary`: `accent`. `appBg`: `ground`. `appContentBg`: `surface`. `appBorderColor`: `line`. `textColor`: `ink`. `textMutedColor`: `ink-muted`. `barSelectedColor`: `accent`. `appBorderRadius`: 12.
  - `fontBase`: the body family. `fontCode`: the platform monospace stack.
  - A light and a dark theme. The manager picks one from the OS setting (`matchMedia`) at load; the toolbar switch controls the canvas.
  - Storybook's theming needs literal colors, so `theme.ts` writes the hex values out. `theme.test.ts` reads `color.css` and fails if any of them differs from the matching `--color-*` value.
- Docs theme: `parameters.docs.theme` uses the same theme, so MDX pages read in Lora headings and Public Sans body on `ground`.

### 6.2 Themed MDX pages

"Themed" means every MDX page renders in the Bag of Holding look (fonts, colors and spacing from tokens) and follows the light/dark toolbar. Write a few doc-only React blocks in `src/docs/blocks/` (not exported from the package):

- `DocPage`: wrapper that applies `ground`, the body font and `layout-max-width`.
- `DocHero`: a `PageHero` with `size="lg"` for each page title.
- `TokenTable`: takes a token file's raw text (imported with Vite's `?raw` suffix), parses it with the same helper the tests use, and lists every variable with its name, value and usage comment. Variants render a color swatch (light and dark side by side), a type specimen, a spacing bar or a radius box. Because the blocks read the CSS files themselves, the docs can't drift from the tokens.
- `DoDont`: two panels side by side for usage rules.

Pages:

| Page | Sidebar path | Content |
| --- | --- | --- |
| Introduction | Introduction | What the system is, the four principles (§1), how to install and import (`@dnd/design-system`, `@dnd/design-system/styles.css`), a link to CONSTITUTION Part II §4. |
| Voice | Foundations/Voice | The voice rules (§1) with example copy. |
| Color | Foundations/Color | As described in the color spec. |
| Typography | Foundations/Typography | As described in the typography spec. |
| Spacing and shape | Foundations/Spacing | As described in the spacing and shape specs. |
| Layout | Foundations/Layout | As described in the layout spec. |
| Iconography | Foundations/Iconography | The icon rules (§1), the chevron and the wind swirl. |
| Phase language | Patterns/Phases | Gather, hold, strike: what each means, their colors, and "never color alone". |
| Roadmap page | Patterns/Roadmap page | A composed page using every component, with the example content from the component specs, and a short note on how they fit together. |

Each component also gets an MDX page next to its story (`<Name>.mdx`) using `<Meta of={Stories} />`, `<Canvas>`, `<Controls>`, and the usage and content rules in its spec. Import `Meta`, `Canvas`, `Controls` and `Stories` from `@storybook/addon-docs/blocks`.

### 6.3 Stories

One `<Name>.stories.tsx` per component under `Components/<Name>`, in CSF3 with `satisfies Meta<typeof Component>`. Each component spec lists its stories and their example content. For example:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  args: { children: "5th-level spells" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
```

Tag stories `autodocs` only where no hand-written MDX page exists.

## 7. The `/design-system` route

Serve the Storybook static build from the Next.js app at `/design-system`.

- Add a `build-storybook` script to `@dnd/design-system`: `storybook build --output-dir ../../apps/web/public/design-system`. Storybook's static output uses relative URLs, so it works under a subpath.
- Add `apps/web/public/design-system/` to `.gitignore`.
- In `apps/web/next.config.ts`, add rewrites so `/design-system` and `/design-system/` serve `/design-system/index.html`.
- In `apps/web/package.json`, add `"prebuild": "pnpm --filter @dnd/design-system build-storybook"` so every production build carries the current Storybook.
- In development (`next dev`), redirect `/design-system` to the Storybook dev server (`process.env.STORYBOOK_URL`, default `http://localhost:6006`) so it's always live. Update the root `dev` script to also run Storybook.
- The web app imports `@dnd/design-system/styles.css` in its root layout and loads fonts with `next/font` (see the typography spec).
- Add a link to `/design-system` from the web app home page.
- Update the root README's structure table and getting-started section.

## 8. Content and the constitution

- Example content may use spell and feature names with their source meta (`XGtE · 5th · Druid`), as the mockup does. Don't paste rules text from non-SRD books; descriptions stay the mockup's own short paraphrases, which the component specs write out (Constitution Part I §4, Part II §3).
- Every pick shown in a story names its source and edition.
- If a docs page or story needs something the tokens and components don't cover, stop and ask Antoinette whether it belongs in the system or in the product (Part II §4). The doc-only blocks in §6.2 are the only exception, and they are never exported.

## 9. Acceptance criteria

- `pnpm install && pnpm typecheck && pnpm test` pass at the root.
- `pnpm storybook` opens a branded Storybook with Introduction first, then Foundations, Components and Patterns, and every page and story switches between light and dark from the toolbar.
- `pnpm --filter @dnd/web build && pnpm --filter @dnd/web start`, then `http://localhost:3000/design-system` loads the same Storybook, including deep links such as `/design-system/?path=/docs/foundations-color--docs`.
- The a11y addon reports no violations on any story in either theme.
- A test scans `src/components/**/*.css` and fails on any hex color, any `px` value outside a `@media` query, or any `font-size`, `line-height` or `font-family` not set from a token.
- The Roadmap page pattern matches the Ciaccona mockup at 1440px wide.

## 10. Out of scope

- Using the components in real app pages beyond the home page link.
- A logo, new components, or tokens beyond those in the token specs.
- Publishing the package to npm, Chromatic or visual regression testing.
- `prefers-color-scheme` handling in the app.

## 11. Decisions

1. `/design-system` serves the static Storybook build from the web app, not a Next.js page that re-implements docs.
2. "Themed pages" means MDX docs styled in the Bag of Holding theme with light/dark switching, not per-character themes.
3. Plain CSS with `cp-` classes, not CSS-in-JS or Tailwind.
4. Tokens are hand-written CSS custom properties, one file per group with its own spec. No JSON or generated files; docs and tests read the CSS.
5. Color tokens are prefixed `--color-*` so every token's group is clear from its name.
6. Layout widths and element sizes are tokens too (`--layout-*`, `--size-*`), so component CSS has no raw pixel values.
7. Component props stay as designed. Accessibility fixes change markup only (lists instead of divs, a valid ARIA table in SpellTable); any new prop is asked about first.
