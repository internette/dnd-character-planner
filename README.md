# D&D Character Planner

Plan a D&D character level by level.

## Structure

This is a [pnpm](https://pnpm.io) workspace monorepo.

| Path | Package | Description |
| --- | --- | --- |
| `apps/web` | `@dnd/web` | React app built with Next.js |
| `apps/api` | `@dnd/api` | Express API |
| `packages/design-system` | `@dnd/design-system` | Character Planner design system: tokens, React components and Storybook docs, served by the web app at `/design-system` |

## Getting started

Requires Node.js 22+ and pnpm 10 (run `corepack enable` to use the version pinned in `package.json`).

```sh
pnpm install
pnpm dev          # web on http://localhost:3000, API on http://localhost:4000, Storybook on http://localhost:6006
pnpm storybook    # Storybook on its own
```

The design system's docs live at http://localhost:3000/design-system. In development that redirects to the Storybook dev server (set `STORYBOOK_URL` if it isn't on port 6006). A production build of the web app (`pnpm --filter @dnd/web build`) builds Storybook first and serves the static copy from `apps/web/public/design-system/`.

Other root scripts: `pnpm typecheck`, `pnpm test`, `pnpm build`.

## Contributing

Read [CONSTITUTION.md](./CONSTITUTION.md) first. It sets the rules for AI features in the product and for AI agents working in this repository.
