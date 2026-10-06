# Astro formatting

This fork formats complete `.astro` files through the existing oxfmt CLI, API, and language server.
Astro support is enabled by the `.astro` extension.
You do not add a plugin setting.

The formatter uses `prettier-plugin-astro` 1.1.0 with Prettier 3.9.9.
It retains the original parser and printer for frontmatter, templates, expressions, scripts, and styles.
Astro formatting uses the original JavaScript printer.
Astro frontmatter imports use the original TypeScript organizer when `sortImports` is enabled.
JSDoc formatting remains unavailable inside Astro files.
The bundled Tailwind class sorter does not support this Astro parser.
The Astro parser uses the native `@astrojs/compiler-rs` package.
The npm package includes that dependency.

## Build the fork

Use Node.js 22.12 or later and the Rust version in `rust-toolchain.toml`.
Install dependencies with pnpm because this repository uses pnpm workspace catalogs and its lockfile.

```sh
cd oxfmt-astro
pnpm install --filter oxfmt-app... --frozen-lockfile
cd apps/oxfmt
bun run build-napi-release
bun run build-js
```

## Format Astro files

Run the built CLI from your Astro project directory.
Replace the executable path with the path to your fork.

```sh
bun run /path/to/oxfmt-astro/apps/oxfmt/dist/cli.js --write src
bun run /path/to/oxfmt-astro/apps/oxfmt/dist/cli.js --check src
```

Your `.oxfmtrc.json`, overrides, `.editorconfig`, and ignore files apply through the existing oxfmt configuration resolver.
Astro code fences in Markdown also use the Astro formatter.
The standalone Rust-only CLI does not include the Astro printer.

## Set Astro options

Oxfmt keeps its 100-column default.
If you need Prettier's 80-column default, set `printWidth` to 80.

```json
{
  "printWidth": 80,
  "astroAllowShorthand": true,
  "astroSkipFrontmatter": false,
  "astroCompressHTML": "jsx"
}
```

The Astro options match the original plugin:

- `astroAllowShorthand` selects shorthand or explicit matching attributes. Omit it to retain the input form.
- `astroSkipFrontmatter` preserves frontmatter text when set to `true`.
- `astroCompressHTML` selects `"jsx"`, `"html"`, or `"none"`. Boolean values select `"html"` or `"none"`.

Core options such as `semi`, `singleQuote`, `tabWidth`, and `htmlWhitespaceSensitivity` also apply.
The original `prettier-ignore` comments retain their behavior.
Extra custom Prettier plugins are outside oxfmt's configuration interface.

## Check formatting behavior

The Astro API tests include 110 fixtures from the original plugin.
They compare output and check that a second formatting pass leaves the output unchanged.
Additional tests cover invalid syntax, Unicode, line endings, stdin, file discovery, ignores, overrides, and editor documents.

```sh
cd apps/oxfmt
bun run test test/api/astro.test.ts test/cli/astro.test.ts test/lsp/astro/astro.test.ts
```
