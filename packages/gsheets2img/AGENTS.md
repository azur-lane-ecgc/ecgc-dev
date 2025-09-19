# GSheets2Img Package Agent Guidelines

## Overview

TypeScript package for converting Google Sheets data to images and uploading them to Imgur. This tool generates visual representations of spreadsheet data for embedding in documentation and guides, particularly for complex tables that are better displayed as images. Now integrated as a monorepo package with CLI flag support.

## Dependencies

- **Runtime**: Bun (for execution and package management)
- **Language**: TypeScript with strict mode
- **Requirements**: Listed in `package.json` (includes playwright, axios, adm-zip, etc.)
- **External APIs**: Google Sheets API v4, Imgur API v3
- **System Dependencies**: Playwright for browser automation, Node.js for runtime

## Configuration

- **Imgur API**: Requires `config/config.json` with client_id and client_secret (create from `config/config.json.example`)
- **Google Sheets**: Uses service account credentials from parent `packages/dev/credentials.json`
- **Permissions**: Google Sheets read access, Imgur upload permissions
- **Tokens**: OAuth tokens stored in `config/tokens.json` (auto-managed)

## Usage Commands

- **Convert sheets to images**: `bun main.ts -g` (processes all configured sheets)
- **Upload to Imgur**: `bun main.ts -i` (uploads generated images)
- **Combined workflow**: `bun main.ts -gi` (full pipeline)
- **From root**: `bun run gsheets2img`, `bun run imgur`, or `bun run gsheets2imgur` (via package.json scripts)

## Key Files and Scripts

- `main.ts`: Entry point with CLI flag parsing (-g, -i, -gi)
- `src/gsheets2img.ts`: Exports sheets as high-resolution PNG images using Playwright
- `src/imgur.ts`: Handles Imgur OAuth authentication and image uploads with metadata
- `config/config.json`: Imgur API credentials (never commit, use .gitignore)
- `config/tokens.json`: OAuth tokens (auto-generated, never commit)
- `config/image_info.json`: Mapping of sheet names to image metadata and URLs
- `package.json`: Dependencies and scripts

## Workflow Details

1. Authenticate with Google Sheets API using service account credentials
2. Download spreadsheet as ZIP and extract HTML files
3. Use Playwright to screenshot individual sheets as high-resolution PNG images
4. Process images for optimization and save to `../frontend/public/images/equip_misc/`
5. Authenticate with Imgur API using OAuth (refresh tokens automatically)
6. Upload images to Imgur with descriptive titles and album organization
7. Generate `config/image_info.json` with image URLs, dimensions, and metadata
8. Frontend documentation references these images for visual tables

## Error Handling

- Validate API credentials and permissions before operations
- Handle Imgur rate limiting (1000 uploads/hour for free tier)
- Implement retry logic for transient network failures
- Check for network connectivity and API availability
- Log detailed errors with timestamps and context for troubleshooting
- Graceful degradation if individual sheets fail to process
- Auto-refresh OAuth tokens when expired

## Security Notes

- Never commit `config/config.json` or `config/tokens.json` (excluded via `.gitignore`)
- Store Imgur client credentials securely with minimal scopes
- Use HTTPS for all API communications
- Validate all API responses for authenticity and integrity
- Rotate API keys periodically and monitor usage

## Development and Testing

- Test with sample sheets before production runs
- Verify image quality and readability after conversion
- Check Imgur upload success and URL accessibility
- Monitor API usage to avoid rate limits
- Update dependencies regularly for security patches
- Run `bun run lint` and `bun run check` for code quality

## Output Integration

- Images stored in Imgur albums for organization
- `config/image_info.json` provides mapping from sheet names to image URLs
- Frontend documentation embeds these images using the URLs
- Supports PNG format optimized for table readability

See root [AGENTS.md](../../AGENTS.md) for general project guidelines.
