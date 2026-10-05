# gsheets2img

This is loosely based on [gsheets2img](https://github.com/blead/gsheets2img), used under the MIT license. Now drastically modified and integrated as a monorepo package.

## Installation and Setup

1. Install PNPM 12.9.1
2. Run `pnpm install` from the monorepo root

## Usage

Run from the monorepo root:

- **Generate images from Google Sheets**: `pnpm run gsheets2img`

Or run directly in the package:

- `pnpm run browser`
- `pnpm run main`

## File Structure

- `main.ts`: Google Sheets to image conversion using Playwright
- `package.json`: Dependencies and scripts

## Processing Behavior

- Google Sheets processing uses hardcoded sheet IDs and outputs to `../../apps/web/src/assets/equip_misc/`
