# CLAUDE.md

Read [CONSTITUTION.md](./CONSTITUTION.md) before working in this repository. Part I governs any AI feature you build into the product; Part II governs how you work here as a contributor, including where code lives in this monorepo.

## Quick reference

- `apps/web`: Next.js app (`@dnd/web`)
- `apps/api`: Express API (`@dnd/api`); all AI model calls go here
- `packages/design-system`: Storybook design system (`@dnd/design-system`)

```sh
pnpm install      # install all workspaces
pnpm dev          # run the web app (localhost:3000) and the API (localhost:4000)
pnpm storybook    # run Storybook (localhost:6006)
pnpm typecheck    # type-check every workspace
pnpm test         # run every workspace's tests
pnpm build        # build every workspace
```

Run a command in one workspace with `pnpm --filter @dnd/<name> <script>`.
