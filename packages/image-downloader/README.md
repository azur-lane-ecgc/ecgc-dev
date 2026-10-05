# image-downloader

Downloads original ship icons that are missing from Samvaluation records with listed stats.

## Usage

Install the browser once:

```bash
bun --filter image-downloader browser
```

List missing icons:

```bash
bun run plan-ship-icons
```

Download missing icons:

```bash
bun run download-ship-icons
```

The downloader opens each wiki file page in a headed agent-browser window, clicks `Original file`, and captures that clicked response.
It waits at least 60 seconds between ships and stops on bot protection or rate limiting.
It writes icons to `apps/web/src/assets/ship_icons/`.
Download evidence stays under the ignored `.agents/evidence/image-downloader/` directory.
