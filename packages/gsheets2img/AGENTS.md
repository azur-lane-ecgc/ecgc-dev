# GSheets2Img Package Agent Guidelines

## Overview

Python package for converting Google Sheets data to images and uploading them to Imgur. This tool generates visual representations of spreadsheet data for embedding in documentation and guides, particularly for complex tables that are better displayed as images.

## Dependencies

- **Python Version**: 3.8+ required
- **Requirements**: Listed in `requirements.txt` (includes gspread, Pillow, requests, etc.)
- **External APIs**: Google Sheets API v4, Imgur API v3
- **System Dependencies**: Image processing (Pillow), HTTP client (requests)

## Configuration

- **Imgur API**: Requires `config.json` with client_id and client_secret (create from `config.json.example`)
- **Google Sheets**: Uses service account credentials from parent `packages/dev/credentials.json`
- **Permissions**: Google Sheets read access, Imgur upload permissions

## Usage Commands

- **Convert sheets to images**: `python gsheets2img.py` (processes all configured sheets)
- **Upload to Imgur**: `python imgur.py` (uploads generated images)
- **Combined workflow**: `./gsheets2img.sh` (full pipeline) or `python -m gsheets2img`
- **From root**: `bun run gsheets2img` or `bun run imgur` (via package.json scripts)

## Key Files and Scripts

- `gsheets2img.py`: Main script that authenticates with Google Sheets and exports sheets as PNG images
- `imgur.py`: Handles Imgur authentication and image uploads with metadata
- `gsheets2img.sh`: Bash wrapper script for the full workflow
- `image_info.json`: Output file containing uploaded image URLs and metadata
- `config.json`: Imgur API credentials (never commit, use .gitignore)
- `requirements.txt`: Python dependencies with pinned versions

## Workflow Details

1. Authenticate with Google Sheets API using service account credentials
2. Query specified spreadsheets and export individual sheets as high-resolution PNG images
3. Process images for optimization (compression, format conversion if needed)
4. Authenticate with Imgur API using OAuth credentials
5. Upload images to Imgur with descriptive titles and album organization
6. Generate `image_info.json` with image URLs, dimensions, and metadata
7. Frontend documentation references these images for visual tables

## Error Handling

- Validate API credentials and permissions before operations
- Handle Imgur rate limiting (1000 uploads/hour for free tier)
- Implement retry logic for transient network failures
- Check for network connectivity and API availability
- Log detailed errors with timestamps and context for troubleshooting
- Graceful degradation if individual sheets fail to process

## Security Notes

- Never commit `config.json` (excluded via `.gitignore`)
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

## Output Integration

- Images stored in Imgur albums for organization
- `image_info.json` provides mapping from sheet names to image URLs
- Frontend documentation embeds these images using the URLs
- Supports multiple formats (PNG for tables, potentially others for charts)

See root [AGENTS.md](../../AGENTS.md) for general project guidelines.