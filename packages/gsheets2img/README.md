# gsheets2img

This is a TypeScript conversion of [gsheets2img](https://github.com/blead/gsheets2img), used under the MIT license. Now integrated as a monorepo package with CLI flag support.

## Installation and Setup

1. Ensure Bun is installed
2. Run `bun install` from the monorepo root
3. Configure API credentials as described below

## Usage

Run from the monorepo root:

- **Generate images from Google Sheets**: `bun run gsheets2img`
- **Upload images to Imgur**: `bun run imgur`
- **Combined workflow**: `bun run gsheets2imgur`

Or run directly in the package:

- `bun main.ts -g` (Google Sheets to images)
- `bun main.ts -i` (Imgur upload)
- `bun main.ts -gi` (both)

## Configuration

The application uses configuration files in the `config/` directory.

### config/config.json

Imgur API configuration file containing:

- `client_id`: (String) Imgur OAuth client ID for API access
- `client_secret`: (String) Imgur OAuth client secret for API authentication
- `image_order`: (Array) Ordered list of image keys that defines the upload sequence. Only images listed here will be uploaded, in the specified order.

### config/tokens.json

OAuth token storage (auto-generated) containing:

- `access_token`: (String) Current Imgur OAuth access token
- `expires_in`: (Number) Token expiration time in seconds
- `token_type`: (String) Token type (typically "bearer")
- `scope`: OAuth scope permissions
- `refresh_token`: (String) Refresh token for obtaining new access tokens
- `account_id`: (Number) Associated Imgur account ID
- `account_username`: (String) Associated Imgur account username
- `expires_at`: (String) Token expiration timestamp

### config/image_info.json

Image metadata registry containing entries for each image:

- `path`: (String) Relative file system path to the image file
- `title`: (String) Human-readable title for the image
- `description`: (String) Optional description

## File Structure

- `main.ts`: CLI entry point with flag parsing
- `src/gsheets2img.ts`: Google Sheets to image conversion using Playwright
- `src/imgur.ts`: Imgur authentication and upload handling
- `config/`: Configuration and token files
- `package.json`: Dependencies and scripts

## Processing Behavior

- Google Sheets processing uses hardcoded sheet IDs and outputs to `../frontend/public/images/equip_misc/`
- Only images listed in `config/config.json`'s `image_order` array will be uploaded
- Images are uploaded in the exact order specified in the `image_order` array
- OAuth tokens are automatically refreshed as needed using the refresh token
- Images are uploaded to a specific Imgur album for organization
