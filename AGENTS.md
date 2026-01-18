# ECGC Development Agent Guidelines

## Build Commands

**Root level:**

- `bun run devtools` - Run all data processing scripts
- `bun run build` - Build frontend for production
- `bun run lint` - Run oxlint with auto-fix
- `bun run format` - Format code with Prettier
- `bun run check` - Type check all packages
- `bun run dev` - Start dev server (http://localhost:4321)

**Package-specific:**

- Frontend: `bun --filter web build/check/dev`
- Dev: `bun --filter dev main/check`
- Compress: `bun --filter compress compress/check`
- GSheets2Img: `bun run gsheets2img` (from root)

## Project Structure

- `apps/web/` - Astro/React frontend. Static site for Azur Lane game data, ship databases, equipment guides, farming calculators. Consumes JSON data from dev package. Built for Cloudflare Workers.
- `packages/dev/` - Data processing pipeline. TypeScript scripts that fetch/transform game data from Google Sheets, calculate EHP/rankings, generate ship databases. Outputs JSON to apps/web/src/db/.
- `packages/gsheets2img/` - Converts Google Sheets to images. Uses Playwright to screenshot published sheets as JPEGs for documentation tables. Outputs to apps/web/public/images/equip_misc/.
- `packages/compress/` - Image compression utilities. Compresses built images in apps/web/dist/ using Sharp with optimized settings.
- `packages/AzurLaneData/` - Raw game data submodule. Git submodule containing official Azur Lane game data (ships.json, skills.json, etc.). Must be kept up-to-date.

## Critical

- Never commit credentials.json (Google Cloud service account key)
- Pre-commit hooks run: knip → oxlint → prettier

## Red flags in a React codebase

🚩 functions like <button onClick={handleClick}
or handleSubmit

- handleClick / handleSubmit doesn't explain what it does
- you lose colocation
- need new names for each callback

Inline callbacks can call multiple functions with good names

onClick={() => {
analytics.event('this-button')
openModal()

🚩 useMemo

React devs are terrified of renders and often overuseMemo

- memoize things that you pass as props to components that may have expensive children
- it's ok for leaf components to over-render

useMemo does not fix bugs, it just makes them happen less often

React Compiler will automatically handle memoization when enabled, making manual useMemo less necessary.

🚩 <div onClick

divs are not interactive elements and adding onClick requires implementing keyboard control, screen reader announcement, etc

This is almost never the right move, and anyone capable of doing it right (the new tweet button) isn't going to be swayed by this prompt anyways

🚩 preventDefault

This is javascript and only runs once javascript loads. if you click a link / submit a form before that, preventDefault will not run. It's a necessary tool for progressive enhancement, but this flag should make you look closer for unexpected behavior

🚩 fetch inside useEffect

React code requires fetch to be in useEffect, but most things should use TanstackQuery or other provider instead.

- the effect runs more often than you think
- attempts to hook into the fetch lifecycle are usually buggy

🚩 unecessary useEffects

[https://react.dev/learn/you-might-not-need-an-effect] Read this article. You might not need an effect, so don't use it if you don't need it.

🚩 a "hooks" directory

A context provider and its useContext hook belog together, not split up into components and hooks directories
Sorting your codebase by what each function looks like means small changes will span many directories.

<!--
Ignored rules:

🚩 css files

One CSS file for global styling (ex. when using shadcn/ui) is fine. If you need more CSS files, that's the red flag.

-->
