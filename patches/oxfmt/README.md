# Patched oxfmt

ECGC installs stock `oxfmt@0.72.0` from Bun. This folder adds one text package patch for complete Astro CLI formatting.

## Structure

- `oxfmt@0.72.0.patch` changes only JavaScript entry files and adds the Astro formatter.
- The root optional dependencies install the official `@oxfmt/binding-*` package for the current platform.
- No custom native binary or Rust build is required.

## Behavior

The patch intercepts `.astro` targets before the stock native CLI:

- It formats complete Astro templates, frontmatter, expressions, scripts, and styles.
- It uses stock oxfmt import sorting for Astro frontmatter.
- It supports `--write`, `--check`, `--list-different`, and `--stdin-filepath`.
- It supports file paths, directories, glob patterns, and negated glob exclusions.
- It combines Astro and non-Astro exit codes.
- The oxfmt JavaScript API also accepts `.astro` file names.

The stock native CLI handles all non-Astro files. The official native binding handles both stock formatting and Astro frontmatter.

## Configuration

The patch reads the same root configuration file as oxfmt:

- `.oxfmtrc.json`
- `.oxfmtrc.jsonc`
- `oxfmt.config.ts`
- `oxfmt.config.mts`
- `oxfmt.config.js`
- `oxfmt.config.mjs`
- `oxfmt.config.cjs`

JSON and JSONC files receive full support. JavaScript and TypeScript configuration files must export a plain object as their default export.

Astro options match the original Astro formatter:

- `astroAllowShorthand`
- `astroSkipFrontmatter`
- `astroCompressHTML`

## Limits

- The language server still uses stock oxfmt and does not format Astro.
- Tailwind class sorting does not change Astro classes; this matches the tested upstream Tailwind Astro transform.
- The patch targets oxfmt `0.72.0`.
