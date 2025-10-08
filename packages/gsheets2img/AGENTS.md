# GSheets2Img Package Agent Guidelines

## Overview

This package provides a Node.js utility for converting Google Sheets documents into high-resolution images. It downloads sheets as HTML, extracts individual sheet files, and uses Playwright to capture clean screenshots of table content, excluding row headers. The tool is designed for automated processing of spreadsheet data into visual formats for documentation or presentation purposes.

## Build & Run Commands

- **Run main script**: `bun run main` or `node index.js`
- **Postinstall setup**: `npm exec playwright install firefox` (runs automatically)

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Browser Automation**: Playwright with Firefox for screenshot capture
- **ZIP Processing**: yauzl-promise for archive extraction
- **File Operations**: Node.js fs/promises for async file handling

## Key Functions

- `download(sheetID)`: Downloads Google Sheets document as ZIP archive
- `unzip(zipPath)`: Extracts ZIP contents to temporary directory
- `screenshot(htmlPath, pngPath, browser)`: Captures table screenshot excluding row headers

## Configuration

- **Sheet ID**: Hardcoded `SHEET_ID` constant for target Google Sheets document
- **Output Directory**: Configurable `OUTPUT_DIR` (default: "output/")
- **Sheet Filtering**: `INCLUDE_SHEETS` and `EXCLUDE_SHEETS` arrays for selective processing
- **Concurrency**: `CONCURRENCY` limit for parallel screenshot operations (default: 5)

## Processing Workflow

1. Download Google Sheets document as ZIP using export API
2. Extract ZIP to temporary directory containing HTML files
3. Filter sheets based on include/exclude configuration
4. Launch Firefox browser instance via Playwright
5. Process sheets concurrently, taking screenshots of table content
6. Save JPG images to output directory
7. Clean up temporary files and close browser

## Screenshot Details

- **Viewport**: 1920x1080 with 2x device scale factor for high resolution
- **Clipping**: Automatically detects and excludes row headers from screenshots
- **Format**: JPG output with table content only
- **Dynamic Sizing**: Adjusts viewport to accommodate full table dimensions

## Error Handling

- Network timeouts handled via fetch API
- Browser launch failures logged with error context
- Screenshot failures caught and logged without stopping processing
- Automatic cleanup of temporary directories on completion or error
- Graceful handling of malformed HTML or missing table elements

## Security Notes

- No authentication required (uses public Google Sheets export API)
- Temporary files created in system temp directory with random names
- No sensitive data processing or external API keys required
- All operations are read-only and local file system operations

## Development Tips

- Modify `SHEET_ID` constant to target different Google Sheets documents
- Adjust `EXCLUDE_SHEETS` array to skip work-in-progress or irrelevant sheets
- Increase `CONCURRENCY` for faster processing on powerful machines
- Use `console.error` for debugging screenshot issues
- Test with small sheet sets before processing large documents

## Dependencies Management

- Playwright Firefox automatically installed via postinstall script
- Dependencies managed via root monorepo `bun.lock`
- No additional system dependencies required beyond Node.js

See root [AGENTS.md](../../AGENTS.md) for general coding standards and build commands.
