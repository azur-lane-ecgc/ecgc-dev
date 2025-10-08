# gsheets2img

A Node.js utility that converts Google Sheets documents into high-resolution images by taking automated screenshots of individual sheets. This tool downloads a Google Sheets document as HTML, extracts each sheet, and captures clean screenshots of the table content using Playwright.

## Features

- Downloads Google Sheets documents as ZIP archives
- Extracts and processes individual sheet HTML files
- Takes high-resolution screenshots of table content (excluding row headers)
- Configurable sheet inclusion/exclusion filters
- Concurrent processing with configurable concurrency limits
- Automatic cleanup of temporary files

## Installation

This package is part of the ECGC monorepo. Install dependencies from the root:

```bash
bun install
```

The package includes a postinstall script that automatically installs Playwright's Firefox browser.

## Usage

Run the main script:

```bash
bun run main
```

Or directly:

```bash
node index.js
```

## Configuration

The tool is configured via constants at the top of `index.js`:

- `SHEET_ID`: Google Sheets document ID to process
- `OUTPUT_DIR`: Directory to save generated images (default: "output/")
- `INCLUDE_SHEETS`: Array of sheet names to include (empty array includes all)
- `EXCLUDE_SHEETS`: Array of sheet names to exclude from processing
- `CONCURRENCY`: Maximum number of concurrent screenshot operations (default: 5)

## Output

Generates JPG images in the output directory, one per sheet, with filenames matching the sheet names.

## Dependencies

- `playwright`: For browser automation and screenshot capture
- `yauzl-promise`: For ZIP file extraction

## Requirements

- Node.js with ES modules support
- Firefox browser (automatically installed via postinstall script)
- Internet connection for downloading Google Sheets data

## License

MIT License - This is a fork of [gsheets2img](https://github.com/blead/gsheets2img)
