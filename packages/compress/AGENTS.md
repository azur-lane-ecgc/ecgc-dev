# Compress package guidelines

## Commands

Run compression from the repository root:

```bash
bun run compress
```

Run the package checks:

```bash
bun --filter compress check
```

## Structure

- `main.ts` is the entrypoint.
- `src/compressImages.ts` contains image compression logic.
- The package reads images from `apps/web/dist/`.
