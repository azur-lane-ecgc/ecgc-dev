# GSheets2Img Package Agent Guidelines

## Overview

TypeScript package for converting Google Sheets data to images. This tool generates visual representations of spreadsheet data for embedding in documentation and guides, particularly for complex tables that are better displayed as images. Now integrated as a monorepo package with CLI flag support.

## Dependencies

- **Runtime**: Bun (for execution and package management)
- **Language**: TypeScript with strict mode
- **Requirements**: Listed in `package.json` (includes playwright, adm-zip, etc.)
- **External APIs**: Google Sheets API v4
- **System Dependencies**: Playwright for browser automation, Node.js for runtime

## Configuration

- **Google Sheets**: Uses service account credentials from parent `packages/dev/credentials.json`
- **Permissions**: Google Sheets read access

## Usage Commands

- **Convert sheets to images**: `bun main.ts` (processes all configured sheets)
- **From root**: `bun run gsheets2img` (via package.json scripts)

## Key Files and Scripts

- `main.ts`: Entry point with CLI flag parsing and sheet processing logic
- `package.json`: Dependencies and scripts

## Workflow Details

1. Authenticate with Google Sheets API using service account credentials
2. Download spreadsheet as ZIP and extract HTML files
3. Use Playwright to screenshot individual sheets as high-resolution PNG images
4. Process images for optimization and save to `../frontend/public/images/equip_misc/`
5. Frontend documentation references these images for visual tables

## Error Handling

- Validate API credentials and permissions before operations
- Implement retry logic for transient network failures
- Check for network connectivity and API availability
- Log detailed errors with timestamps and context for troubleshooting
- Graceful degradation if individual sheets fail to process

## Security Notes

- Use HTTPS for all API communications
- Validate all API responses for authenticity and integrity
- Rotate API keys periodically and monitor usage

## Development and Testing

- Test with sample sheets before production runs
- Verify image quality and readability after conversion
- Monitor API usage to avoid rate limits
- Update dependencies regularly for security patches
- Run `bun run lint` and `bun run check` for code quality

## Output Integration

- Images stored locally in `../frontend/public/images/equip_misc/`
- Frontend documentation embeds these images using local paths
- Supports JPEG format optimized for table readability

See root [AGENTS.md](../../AGENTS.md) for general project guidelines.
