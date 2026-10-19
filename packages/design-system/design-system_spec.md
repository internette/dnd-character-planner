# Design system build spec: Character Planner

Status: draft 2, 2026-10-19. This is the root spec; each component has its own `<Name>_spec.md` in its folder under [`src/components/`](./src/components/). Audience: an AI coding agent working in `internette/dnd-character-planner`.

Build the Character Planner design system as real code in `packages/design-system`, document it in Storybook with themed MDX pages, and publish that Storybook at the `/design-system` route of the web app.

Read `CONSTITUTION.md` before starting. Part II applies to all of this work; §4 ("Build on the design system") is the reason this package exists.

---

## 1. Inputs

The design already exists. Port it; do not redesign it.

| Input | Where | What it is |
| --- | --- | --- |
| Tokens | `/mnt/project-files/design/design-system/tokens.json` | Source of truth for color (light and dark), type, spacing, radius and stroke. |
| Brand book | `/mnt/project-files/design/design-system/README.md` | Principles, voice, color roles, type scale, layout, iconography. |
| Component CSS | `/mnt/project-files/design/design-system/components/bundle.css` | Reference styling for every component (`cp-` classes). |
| Component JS | `/mnt/project-files/design/design-system/components/bundle.js` | Reference React implementations on `window.Planner`. |
| Component types | `/mnt/project-files/design/design-system/components/index.d.ts` | The public props for all 13 components. Keep these APIs. |
| Component notes | `/mnt/project-files/design/design-system/components/<Name>/README.md` | Usage rules per component. |
| Component previews | `/mnt/project-files/design/design-system/components/<Name>/preview.html` | Example content per component; use as story args. |
| Mockup | `/mnt/project-files/design/ciaccona-lore-bard/Main.dc.html` | The full Ciaccona Lore Bard roadmap page built from the system. |

Copy `tokens.json` into the package (see §4). The other inputs are references and do not get committed as-is.

## 2. Repository context

The repo is a pnpm workspace (set up on branch `claude/repo-setup-ot8op7`, PR #2; build on top of it once merged).

| Path | Package | Notes |
| --- | --- | --- |
| `apps/web` | `@dnd/web` | Next.js 16, React 19, App Router under `src/app`. Already has `transpilePackages: ["@dnd/design-system"]`. |
| `apps/api` | `@dnd/api` | Express. Not touched by this work. |
| `packages/design-system` | `@dnd/design-system` | Storybook 10 with `@storybook/react-vite`, TypeScript, ESM. Exports from `src/index.ts`. |

Root scripts: `pnpm storybook`, `pnpm build`, `pnpm typecheck`, `pnpm test`. Node 22+, pnpm 10.

## 3. Deliverables

1. Design tokens as CSS custom properties and TypeScript constants, generated from `tokens.json`, with light and dark themes.
2. The 13 components ported to typed React components with CSS, exported from `@dnd/design-system`, each built to its own spec (§6).
3. Storybook configured with a Character Planner brand theme, a light/dark toolbar switch, and MDX documentation pages.
4. A story file per component.
5. The Storybook static build served by the web app at `/design-system`.
6. Tests for the token pipeline and components.

## 4. Package layout

```
packages/design-system/
  design-system_spec.md   # this root spec
  component-template_spec.md
  .storybook/
    main.ts            # stories + MDX globs, addons, staticDirs
    manager.ts         # applies the brand theme to the Storybook UI
    preview.tsx        # global CSS, theme decorator, docs theme
    theme.ts           # storybook/theming create() for light and dark
  scripts/
    build-tokens.ts    # tokens.json -> src/tokens/tokens.css + tokens.ts
  src/
    tokens/
      tokens.json      # copied from the design folder; the source of truth
      tokens.css       # generated, committed
      tokens.ts        # generated, committed
    styles/
      fonts.css        # Lora + Public Sans
      base.css         # .cp-row, .cp-stack, .cp-meta, .cp-label, resets scoped to cp-
    components/
      <Name>/
        <Name>_spec.md # the component spec (already written)
        <Name>.tsx
        <Name>.css
        <Name>.stories.tsx
        <Name>.mdx
        <Name>.test.tsx
        index.ts
    docs/              # MDX pages, see §7
      Introduction.mdx
      ...
    index.ts           # public exports
    styles.css         # imports fonts, tokens, base and every component CSS
```

Exports from `package.json`:

```json
"exports": {
  ".": "./src/index.ts",
  "./styles.css": "./src/styles.css",
  "./tokens.json": "./src/tokens/tokens.json"
}
```

Use plain CSS files with the existing `cp-` class names, not CSS-in-JS. This keeps the components server-renderable in Next.js App Router and matches the reference CSS one to one.

## 5. Tokens

`scripts/build-tokens.ts` reads `tokens.json` and writes:

- `tokens.css`: every color as `--<name>` on `:root` (light values) and again under `[data-theme="dark"]` (dark values). Type families as `--font-display` and `--font-body`. Spacing, radius and stroke as `--space-*`, `--radius-*`, `--stroke-*`. Type styles as `--type-<style>-size`, `--type-<style>-line`, `--type-<style>-weight`.
- `tokens.ts`: the same values as typed constants (`colors`, `space`, `radius`, `stroke`, `typeStyles`) for the MDX pages and tests.

Add a `tokens` script to the package and run it from `build` and `storybook` so generated files never drift. Commit the generated files.

Theme switching is an attribute on any ancestor: `data-theme="light" | "dark"`. Light is the default with no attribute. Do not add `prefers-color-scheme` in this pass; the app decides the theme.

Tests (`tokens.test.ts`):

- Every `space-*`, `radius-*` (except `radius-full`), `fontSize` and `lineHeight` value is a multiple of 4px. Strokes are exempt.
- Every color token has both a light and a dark value.
- Each text/background pair named in the brand book passes 4.5:1 contrast in both themes: `ink`, `ink-body`, `ink-muted` on `ground`, `surface`, `surface-sunken`; `on-forest` and `on-forest-muted` on `forest`; `accent-ink` on `accent-tint` and `surface`; `gold` on `gold-tint`; `gather`/`hold`/`strike`/`arcane` on their `-tint`. Write a small WCAG luminance helper; no dependency needed.

## 6. Components

Each component has its own spec at `src/components/<Name>/<Name>_spec.md`, in the same folder as its code. Build them in this order, since later ones compose earlier ones:

| Order | Component | Spec | Composes |
| --- | --- | --- | --- |
| 1 | PhaseTag | [PhaseTag/PhaseTag_spec.md](./src/components/PhaseTag/PhaseTag_spec.md) | |
| 2 | Chip | [Chip/Chip_spec.md](./src/components/Chip/Chip_spec.md) | |
| 3 | LevelBadge | [LevelBadge/LevelBadge_spec.md](./src/components/LevelBadge/LevelBadge_spec.md) | |
| 4 | PickCard | [PickCard/PickCard_spec.md](./src/components/PickCard/PickCard_spec.md) | |
| 5 | AltList | [AltList/AltList_spec.md](./src/components/AltList/AltList_spec.md) | |
| 6 | LevelCard | [LevelCard/LevelCard_spec.md](./src/components/LevelCard/LevelCard_spec.md) | LevelBadge, Chip, PhaseTag, PickCard, AltList |
| 7 | GlanceList | [GlanceList/GlanceList_spec.md](./src/components/GlanceList/GlanceList_spec.md) | PhaseTag |
| 8 | NotePanel | [NotePanel/NotePanel_spec.md](./src/components/NotePanel/NotePanel_spec.md) | |
| 9 | StepCards | [StepCards/StepCards_spec.md](./src/components/StepCards/StepCards_spec.md) | phase dot from PhaseTag |
| 10 | SpellTable | [SpellTable/SpellTable_spec.md](./src/components/SpellTable/SpellTable_spec.md) | Chip |
| 11 | ComboCards | [ComboCards/ComboCards_spec.md](./src/components/ComboCards/ComboCards_spec.md) | |
| 12 | PageHero | [PageHero/PageHero_spec.md](./src/components/PageHero/PageHero_spec.md) | |
| 13 | SideNav | [SideNav/SideNav_spec.md](./src/components/SideNav/SideNav_spec.md) | phase dot from PhaseTag |

Each component spec covers purpose, API, markup and accessibility, styling by token, stories with example content, its MDX page, tests, acceptance criteria and open questions. New components get a spec from [`component-template_spec.md`](./component-template_spec.md), saved as `<Name>_spec.md` in the component's folder, before any code.

### 6.1 Shared rules for every component

- Keep the props in the reference `index.d.ts` (repeated in each component spec). Replace the `window.Planner` global with named ESM exports and export every props type. Where a component spec changes markup for accessibility, the props and the look stay the same.
- Spacing, radii, colors and type come from tokens. Raw pixel values are allowed only for 1px/2px strokes and for the few layout widths named in a component spec (such as `minmax(208px, 1fr)`), and those must be multiples of 4.
- Accept `className` and merge it onto the root element with a small internal `cx()` helper.
- Server-component safe: no state, effects or browser APIs. None of the 13 components needs interaction.
- No inline `style` props; the reference uses two, and the component specs replace them with classes.
- Semantic HTML first, ARIA only where HTML can't express it.
- Tappable elements are at least `space-11` (44px). Focus rings: outline `stroke-strong` in `accent`, offset `space-1`.
- Phase is never conveyed by color alone.
- No emoji. Icons are inline 16px stroke SVG with `currentColor`, `aria-hidden="true"`.
- Shared CSS (`.cp-row`, `.cp-stack`, `.cp-meta`, `.cp-label`, `.cp-panel`, `.cp-panel-title`) lives in `src/styles/base.css`; everything else in the component's own CSS file.

Component tests use Vitest + Testing Library in jsdom, plus an axe check (`vitest-axe`) on every story's args. Add a `test` script to the package.

The placeholder `Button` from the repo setup has been removed; it had no spec.

## 7. Storybook

### 7.1 Configuration

- `main.ts`: `stories: ["../src/docs/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"]`, addons `@storybook/addon-docs` and `@storybook/addon-a11y`. Set `docs: { defaultName: "Overview" }`.
- `preview.tsx`: import `../src/styles.css`. Add a global `theme` toolbar item (Light, Dark). A decorator sets `data-theme` on the story root and on the docs container so stories and MDX pages switch together. Set `backgrounds` off; the theme provides the ground. Sort stories so Docs come first: Introduction, Foundations, Components, Patterns.
- `theme.ts` + `manager.ts`: brand the Storybook UI with `create()` from `storybook/theming`:
  - `brandTitle`: "Character Planner", set in Lora; no logo yet.
  - `colorPrimary` and `colorSecondary`: `accent`. `appBg`: `ground`. `appContentBg`: `surface`. `appBorderColor`: `line`. `textColor`: `ink`. `textMutedColor`: `ink-muted`. `barSelectedColor`: `accent`. `appBorderRadius`: 12.
  - `fontBase`: the body family. `fontCode`: the platform monospace stack.
  - Build a light and a dark variant from the token values in `tokens.ts`. The manager follows the OS setting via `matchMedia` at load; the toolbar switch controls the canvas.
- Docs theme: `parameters.docs.theme` uses the same theme, so MDX pages read in Lora headings and Public Sans body on `ground`.

### 7.2 Themed MDX pages

"Themed" means every MDX page renders in the Character Planner look (fonts, colors, spacing from tokens) and follows the light/dark toolbar. Write a small set of doc-only React blocks in `src/docs/blocks/` (not exported from the package) and use them in the MDX:

- `DocPage`: wrapper that applies `ground`, the body font and a 1280px max width.
- `DocHero`: a `PageHero` with `size="lg"` for each page title.
- `TokenSwatch`, `TypeSpecimen`, `SpaceScale`, `RadiusScale`: render live from `tokens.ts`, showing name, value, light and dark, and usage text.
- `DoDont`: two panels side by side for usage rules.

Pages:

| Page | Path in sidebar | Content |
| --- | --- | --- |
| Introduction | Introduction | What the system is, the four principles, how to install and import (`@dnd/design-system`, `@dnd/design-system/styles.css`), link to CONSTITUTION Part II §4. |
| Voice | Foundations/Voice | Voice rules from the brand book with example copy. |
| Color | Foundations/Color | Every color token grouped by role (ground and surfaces, brand, recommendation, phases, table-dependent), with light and dark swatches, usage and passing contrast pairs. |
| Typography | Foundations/Typography | Both families and every type style as a live specimen with size/line. |
| Spacing and shape | Foundations/Spacing | Space scale, radius scale, strokes, and the 4px rule with the stroke exception. |
| Layout | Foundations/Layout | 1280px container, 32px gutter, 256 to 320px SideNav, one column on phones. |
| Iconography | Foundations/Iconography | Icon rules; the chevron and the wind swirl. |
| Phase language | Patterns/Phases | Gather, hold, strike: meaning, colors, and "never color alone". |
| Roadmap page | Patterns/Roadmap page | A composed page built from the mockup: PageHero, SideNav, GlanceList, LevelCards, NotePanel, StepCards, SpellTable, ComboCards, with a short note on how they fit. |

Each component also gets an MDX docs page next to its story (`<Name>.mdx`) using `<Meta of={Stories} />`, `<Canvas>`, `<Controls>`, and the usage and content rules listed in its component spec.

Use `@storybook/addon-docs/blocks` for `Meta`, `Canvas`, `Controls`, `Stories`.

### 7.3 Stories

One `<Name>.stories.tsx` per component under `Components/<Name>`, using CSF3 with `satisfies Meta<typeof Component>`. For example:

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

Default args come from the component's `preview.html`. Add stories for each variant (every `PhaseTag` phase and size, every `Chip` tone, one-pick and two-pick `LevelCard`, `PageHero` with and without swirl). Tag stories `autodocs` only where no hand-written MDX page exists.

## 8. The `/design-system` route

Serve the Storybook static build from the Next.js app at `/design-system`.

- Add a `build-storybook` script to `@dnd/design-system`: `storybook build --output-dir ../../apps/web/public/design-system`. Storybook's static output uses relative URLs, so it works under a subpath.
- Add `apps/web/public/design-system/` to `.gitignore`.
- In `apps/web/next.config.ts`, add rewrites so `/design-system` and `/design-system/` serve `/design-system/index.html`.
- In `apps/web/package.json`, add `"prebuild": "pnpm --filter @dnd/design-system build-storybook"` so every production build of the web app carries the current Storybook.
- In development (`next dev`), redirect `/design-system` to the Storybook dev server (`process.env.STORYBOOK_URL`, default `http://localhost:6006`) instead of serving the static copy, so it is always live. Update the root `dev` script to also run Storybook.
- Add a link to `/design-system` from the web app home page.
- Update the root README's structure table and getting-started section.

## 9. Fonts

Load Lora (500, 600, 700, italic 400) and Public Sans (400, 500, 600, 700) from Google Fonts in `fonts.css`, as the reference CSS does. In the web app, prefer `next/font/google` and set `--font-display` and `--font-body` from it, so the app does not double-load fonts. Both are OFL-licensed.

## 10. Content and the constitution

- Story and MDX example content may use spell and feature names with their source meta (`XGtE · 5th · Druid`), as the mockup does. Do not paste rules text from non-SRD books; descriptions stay in the mockup's own short paraphrases. (Constitution Part II §3, Part I §4.)
- Every pick shown in a story names its source and edition.
- Example content for stories is written out in each component spec, taken from the mockup.
- If a doc page or story needs something the 13 components don't cover, stop and ask Antoinette whether it belongs in the system or in the product (Part II §4). The doc-only blocks in §7.2 are the only exception, and they must not be exported.

## 11. Acceptance criteria

- `pnpm install && pnpm typecheck && pnpm test` pass at the root.
- `pnpm storybook` opens a branded Storybook with Introduction first, Foundations, Components and Patterns in the sidebar, and every page and story switches between light and dark from the toolbar.
- `pnpm --filter @dnd/web build && pnpm --filter @dnd/web start`, then `http://localhost:3000/design-system` loads the same Storybook, including deep links such as `/design-system/?path=/docs/foundations-color--docs`.
- The a11y addon reports no violations on any story in either theme.
- Every pixel value in component CSS is a 1px/2px stroke or a multiple of 4 (add a test that scans `src/components/**/*.css`).
- The Roadmap page pattern matches the Ciaccona mockup at 1440px wide, side by side.

## 12. Out of scope

- Using the components in real app pages beyond the home page link.
- A logo, new components or new tokens.
- Publishing the package to npm, Chromatic or visual regression testing.
- `prefers-color-scheme` handling in the app.

## 13. Decisions taken in this draft

These are defaults chosen for the first draft; change them here before building if they're wrong.

1. `/design-system` serves the static Storybook build from the web app, not a Next.js page that re-implements docs.
2. "Themed pages" means MDX docs styled in the Character Planner theme with light/dark switching, not per-character themes.
3. Plain CSS with `cp-` classes, not CSS-in-JS or Tailwind.
4. `tokens.json` lives in the package and generates both CSS and TS.
5. Component props stay as designed. Accessibility fixes change markup only (lists instead of divs, a valid ARIA table in SpellTable); any new prop is asked about first.
