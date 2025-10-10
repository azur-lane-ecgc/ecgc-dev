# gsheets2img

This is loosely based on [gsheets2img](https://github.com/blead/gsheets2img), used under the MIT license. Now drastically modified and integrated as a monorepo package.

## Installation and Setup

1. Ensure Bun is installed
2. Run `bun install` from the monorepo root

## Usage

Run from the monorepo root:

- **Generate images from Google Sheets**: `bun run gsheets2img`

Or run directly in the package:

- `bun main.ts`

## File Structure

- `main.ts`: Google Sheets to image conversion using Playwright
- `package.json`: Dependencies and scripts

## Processing Behavior

- Google Sheets processing uses hardcoded sheet IDs and outputs to `../frontend/public/images/equip_misc/`
