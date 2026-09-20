<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Base44 dev environment

- **Stack**: TanStack Start (SSR) + Vite + React 19 + Tailwind 4, managed with bun (bun.lock).
- **Run**: `docker compose -f docker-compose.base44.yml up -d` — uses `oven/bun:1.2`, bind-mounts source, runs `bun install --frozen-lockfile && bun run dev -- --port 3000 --host 0.0.0.0`.
- **No database or external API keys needed** — this is a frontend-only marketing site.
- **Vite config** comes from `@lovable.dev/vite-tanstack-config` which bundles TanStack Start, React, Tailwind, and sandbox detection plugins. Do not add those plugins manually.
- **Verify**: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` should return 200.
