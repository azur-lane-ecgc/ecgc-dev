# Patched oxfmt

ECGC installs stock `oxfmt@0.72.0` from Bun. This folder adds complete Astro formatting.

## Files

- `oxfmt@0.72.0.patch` is the Bun package patch.
- `source/oxfmt-astro.patch` contains the maintainable Rust, TypeScript, packaging, and test changes.
- `native/` contains patched native bindings that Bun's text patch cannot represent.
- `install-native.ts` copies the binding for the current platform.
- `build-source.ts` rebuilds the source patch artifacts.

## Why two patches exist

Bun package patches are unified text patches. Its implementation does not support Git binary patches.
Oxfmt's Astro routing and option conversion live in its native Rust binding.
The JavaScript patch therefore works with the matching native binding stored in this folder.

## Rebuild

Build the current platform:

```sh
bun patches/oxfmt/build-source.ts
```

Run the Astro tests during the build:

```sh
bun patches/oxfmt/build-source.ts --test
```

The build requires Git, Rust, pnpm, and Bun.
For Linux x64 on macOS, use `napi build` with `--target x86_64-unknown-linux-gnu --cross-compile`.

## Current native platforms

- macOS ARM64
- Linux x64 GNU

Other platforms must build a matching binding before running oxfmt.
