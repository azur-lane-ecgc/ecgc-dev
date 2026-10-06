# Image downloader package guidelines

## Commands

List missing ship icons:

```bash
bun run plan-ship-icons
```

Download missing original ship icons:

```bash
bun run download-ship-icons
```

Run the package check:

```bash
bun --filter image-downloader check
```

## Structure

- `main.ts` is the entrypoint.
- `src/missingShipIcons.ts` derives required icons from ship records with listed stats.
- `src/wikiIconDownloader.ts` downloads originals through headed agent-browser.
- Download evidence stays under the ignored `.agents/evidence/image-downloader/` directory.

## Safety

The downloader waits at least 60 seconds between ships.
It stops on bot protection, access denial, or rate limiting.
It accepts only a clicked original PNG response from `azurlane.netojuu.com`.
