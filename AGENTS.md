# ECGC Development Agent Guidelines

## Build Commands

**Root level:**

- `bun run devtools` - Run all data processing scripts (dev package)
- `bun run build` - Build frontend for production
- `bun run lint` - Run oxlint with auto-fix (enforced by pre-commit)
- `bun run format` - Format code with Prettier (enforced by pre-commit)
- `bun run check` - Type check all packages
- `bun run dev` - Start development server (http://localhost:4321)

**Package-specific:**

- Frontend: `bun --filter frontend build/check/dev`
- Dev: `bun --filter dev main/compress/check`

## Code Style

**Formatting:**

- No semicolons, double quotes, trailing commas
- 2-space tabs, LF line endings
- Prettier with import organization (auto-runs on commit)

**TypeScript:**

- Strict mode enabled, no implicit any
- Interfaces for all props/objects
- Arrow functions preferred
- Path aliases: `@/packages/*`, `@/tools/*`

**React/Astro:**

- Functional components with TypeScript
- `React.FC` for components, strong typing
- React hooks (useState, useEffect, etc.)
- `.astro` for static, `.tsx` for interactive

**Error Handling:**

- Validate inputs before processing
- Handle null/undefined data
- Graceful error boundaries in React
- Log with context for debugging

**Data Processing:**

- Never commit credentials.json
- Use Maps/Sets for large datasets
- Implement lazy loading where appropriate
- Cache static data in memory

## Project Structure

- `packages/frontend/` - Astro/React frontend
- `packages/dev/` - Data processing scripts
- `packages/gsheets2img/` - Image processing
- `packages/AzurLaneData/` - Raw game data (submodule)

## Quality Gates

Pre-commit hooks run automatically: knip → oxlint → prettier
All must pass before commits are allowed.
