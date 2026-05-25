# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server + Velite watcher in parallel (port 3000)
pnpm build            # Build for production (runs validate first: velite + prettier + tsc)
pnpm serve            # Preview production build

pnpm test             # Run Vitest tests
pnpm storybook        # Start Storybook on port 6006

pnpm lint             # ESLint
pnpm check-types      # TypeScript type check (no emit)
pnpm prettier:write   # Format all files

pnpm velite:build     # Build content once (required before build)
pnpm velite:watch     # Watch content changes (runs alongside vite:dev)

pnpm deploy           # Deploy to Cloudflare Workers via wrangler
pnpm supabase:types   # Regenerate Supabase TypeScript types from local schema
```

To add shadcn components:
```bash
pnpx shadcn@latest add <component>
```

## Architecture

### Framework & Routing

TanStack Start (React SSR) with file-based routing. Routes live in `src/routes/` and `routeTree.gen.ts` is **auto-generated** by the TanStack Router Vite plugin — never edit it manually. Each route exports a `Route` constant created with `createFileRoute`.

API routes (in `src/routes/api/`) use the `server.handlers` pattern from TanStack Start rather than a separate server framework:

```ts
export const Route = createFileRoute('/api/posts/$slug/claps')({
  server: { handlers: { GET: ..., PATCH: ... } }
});
```

### Content Pipeline

Blog posts live in `posts/<order>.<slug>/post.md(x)`. Velite processes them and outputs to `.velite/` — this compiled output is what the app imports via the `~local-content` alias. **Velite must be built before the app can start** (`pnpm velite:build` or `pnpm velite:watch`).

Post slugs are derived from the directory name: `01.smart-dehumidifier-iot` → slug `smart-dehumidifier-iot`.

### Path Aliases

- `~/` → `./src/`
- `~local-content` → `./.velite` (Velite-compiled posts)

### Data Flow: Post Claps

This feature illustrates the full stack pattern:

1. `src/routes/api/posts.$slug.claps.ts` — API route backed by Supabase, requires `X-POSTHOG-SESSION-ID` header
2. `src/lib/post-claps.ts` — React Query hooks with optimistic updates + debounced mutation
3. `src/components/claps-button/` — UI split into `claps-button-ui.tsx` (pure presentational) and `claps-button.tsx` (connects hooks to UI)

PostHog session ID is used as the per-session identity for claps (not auth-based).

### Deployment

Targets Cloudflare Workers. `wrangler.jsonc` configures the worker. The `@cloudflare/vite-plugin` wraps the SSR build.

### Supabase

Server-only client in `src/lib/supabase.server/`. Types generated from local Supabase schema via `pnpm supabase:types`. Never import from `supabase.server` in client-only code.

### Styling

Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin, not `tailwind.config.js`). shadcn/ui components in `src/components/ui/`. `components.json` holds shadcn config.

### Pre-push Hook

`pnpm validate` runs automatically before push: `velite:build` → `prettier:check` → `check-types`. Fix failures before pushing.
