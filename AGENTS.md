# AGENTS.md

## What This Project Is

A **shadcn/ui registry** that publishes Shopify e-commerce UI blocks.
Also a **static Next.js 16 site** (App Router, `output: "export"`) that catalogs and previews those blocks.

## Tech Stack

- **Runtime**: Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4
- **Package manager**: Bun (`bun install`, `bun run <script>`)
- **Lint/format**: Biome (double quotes, semicolons as-needed, 2-space indent)
- **Codegen**: GraphQL Codegen with Shopify preset (`bun run codegen`)
- **No test framework** — quality gates are Biome + `bun run lint:registry` + tsc

## Key Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Dev server (Turbopack) |
| `bun run build` | Static export to `out/` |
| `bun run lint` | Biome check |
| `bun run lint:fix` | Biome auto-fix |
| `bun run codegen` | Regenerate `generated/` from `*.fragment.ts` |
| `bun run lint:registry` | Validate `registry.json` (Shopify meta, deps, fragments) |
| `bun run registry:build` | `shadcn build` + inject Shopify meta into `public/r/` |

## Directory Layout

```
app/                  Next.js App Router (layout, pages, globals.css)
components/           Site UI (app-shell, sidebar, registry-*) + ui/ (shadcn primitives)
lib/                  registry-catalog, registry-core/ (Shopify taxonomy constants), utils
registry/new-york/    Source blocks: product-card, product-detail, product-grid, cart-summary
  <block>/            <block>.tsx, <block>.fragment.ts, fixtures/, <block>.demo.tsx
scripts/              add.ts, lint-registry.ts, patch-codegen.ts, post-build.ts
generated/            GraphQL Codegen output (storefront.types.ts, storefront.generated.ts)
schema/               storefront.schema.json
public/r/             Built registry JSON (consumed by `shadcn add`)
registry.json         Registry manifest (block definitions + Shopify metadata)
components.json       shadcn CLI config (New York style, RSC, Tailwind v4)
```

## Registry Architecture

### registry.json

Central manifest. Each item is `registry:block` with:
- Standard shadcn fields: `name`, `files[]`, `registryDependencies`, `dependencies`
- Custom `shopify` metadata: `objects`, `view`, `actions`, `granularity`, `surface`, `api`

### Block Structure

Each block under `registry/new-york/<name>/` has:
- `<name>.tsx` — the component (`FC<{...Fragment}>`)
- `<name>.fragment.ts` — GraphQL fragment with `#graphql` tag and `as const`
- `fixtures/` — mock data for previews
- `<name>.demo.tsx` — must export `scenarios`

### Granularity Hierarchy

`primitive` → `model-view` → `template`

Dependency direction is enforced: primitives depend on nothing, model-view only on primitives, templates on anything. Validated by `lint-registry.ts`.

### Build Pipeline

`shadcn build` → `post-build.ts` injects `shopify` metadata into each `public/r/<name>.json` and generates `index.json` + `search-index.json`.

## Coding Conventions

- Imports use `@/` path alias (maps to repo root)
- Functional, expression-oriented style preferred
- Fragment files: use `export const FRAGMENT_NAME = /* GraphQL */ \`...\` as const` with `#graphql` tag
- UI copy is in Japanese; code and docs in English
- Biome handles formatting — do not add Prettier
