# GSheets2Img package guidelines

## Commands

Generate guide images from the repository root:

```bash
bun run gsheets2img
```

Run the package check:

```bash
bun --filter gsheets2img check
```

## Structure

- `main.ts` is the single-file entrypoint.
- The package writes JPEG images to `apps/web/src/assets/equip_misc/`.
- Google API credentials come from `packages/credentials.json`.
