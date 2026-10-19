# D&D Character Planner

Plan a D&D character level by level.

## Structure

This is a [pnpm](https://pnpm.io) workspace monorepo.

| Path | Package | Description |
| --- | --- | --- |
| `apps/web` | `@dnd/web` | React app built with Next.js |
| `apps/api` | `@dnd/api` | Express API |
| `packages/design-system` | `@dnd/design-system` | React component library documented in Storybook |

## Getting started

Requires Node.js 22+ and pnpm 10 (run `corepack enable` to use the version pinned in `package.json`).

```sh
pnpm install
pnpm dev          # web on http://localhost:3000, API on http://localhost:4000
pnpm storybook    # Storybook on http://localhost:6006
```

Other root scripts: `pnpm typecheck`, `pnpm test`, `pnpm build`.

## Contributing

Read [CONSTITUTION.md](./CONSTITUTION.md) first. It sets the rules for AI features in the product and for AI agents working in this repository.
