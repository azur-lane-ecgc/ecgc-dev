# GSheets2Img Package Agent Guidelines

## Overview

TypeScript package for converting Google Sheets data to images. This tool generates visual representations of spreadsheet data for embedding in documentation and guides, particularly for complex tables that are better displayed as images. The script uses the published Google Sheets URL to directly screenshot individual sheets without downloading files.

## Dependencies

- **Runtime**: Bun (for execution and package management)
- **Language**: TypeScript with strict mode
- **Requirements**: Listed in `package.json` (includes playwright, googleapis)
- **External APIs**: Google Sheets API v4
- **System Dependencies**: Playwright for browser automation, Node.js for runtime

## Configuration

- **Google Sheets**: Uses service account credentials from `packages/credentials.json` for API access
- **Published URL**: Uses the published Google Sheets URL (`pubhtml`) to access sheet content
- **Permissions**: Google Sheets read access via API

## Usage Commands

- **Convert sheets to images**: `bun main.ts` (processes all configured sheets)
- **From root**: `bun run gsheets2img` (via package.json scripts)

## Key Files and Scripts

- `main.ts`: Entry point with sheet processing logic
- `package.json`: Dependencies and scripts

## Configuration in main.ts

- `sheetId`: The Google Sheets ID for API access (to get sheet list)
- `publishedId`: The published spreadsheet ID for accessing public HTML views
- `outputDir`: Directory where images are saved
- `includeSheets`: Optional whitelist of sheet names to process
- `excludeSheets`: List of sheet names to skip
- `concurrency`: Number of concurrent screenshot operations

## Workflow Details

1. Authenticate with Google Sheets API using service account credentials
2. Fetch list of all sheets in the spreadsheet (names and gids) via Google Sheets API
3. Filter sheets based on `includeSheets` and `excludeSheets` configuration
4. For each sheet, construct published URL: `https://docs.google.com/spreadsheets/d/e/{publishedId}/pubhtml#gid={gid}`
5. Use Playwright (Firefox) to navigate to each published sheet URL
6. Wait for page load and all images to render
7. Screenshot the table body (excluding row headers) as JPEG
8. Save images to `../frontend/public/images/equip_misc/`
9. Frontend documentation references these images for visual tables

**Key Benefits:**

- No file downloads or temporary directories needed
- Always uses latest published version of sheets
- Faster execution with less disk I/O
- Concurrent processing for multiple sheets

## Error Handling

- Validate API credentials and permissions before operations
- Check for network connectivity and API availability
- Log errors for individual sheet failures without stopping entire process
- Graceful error handling in screenshot function
- Exit with error code 1 on fatal errors

## Security Notes

- Service account credentials stored in `packages/credentials.json` (not committed to repo)
- Use HTTPS for all API and published URL access
- Published spreadsheet must be publicly accessible for screenshot functionality
- Rotate API keys periodically and monitor usage

## Development and Testing

- Test with sample sheets before production runs
- Verify image quality and readability after conversion
- Monitor API usage to avoid rate limits (minimal API calls - only for fetching sheet list)
- Update dependencies regularly for security patches
- Run `bun run check` for type checking
- Ensure Firefox browser is installed via Playwright postinstall hook

## Output Integration

- Images stored locally in `../frontend/public/images/equip_misc/`
- Frontend documentation embeds these images using local paths
- Supports JPEG format optimized for table readability

See root [AGENTS.md](../../AGENTS.md) for general project guidelines.
