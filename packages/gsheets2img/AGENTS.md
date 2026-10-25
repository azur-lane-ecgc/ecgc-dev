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

- `main.ts` is the entrypoint.
- `src/sheetImageCapture.ts` captures images with at most five reusable browser pages.
- The package writes JPEG images to `apps/web/src/assets/equip_misc/`.
- Google API credentials come from `packages/credentials.json`.
