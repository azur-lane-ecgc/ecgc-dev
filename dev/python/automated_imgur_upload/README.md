# gsheets2img

This is a python converted version of [gsheets2img](https://github.com/blead/gsheets2img), used under the MIT license.

## Configuration

The application uses three configuration files for `imgur.py` only. `gsheets2img.py` has hardcoded constants within it directly.

### config.json

Main configuration file containing:

- `client_id`: (String) Google OAuth client ID for API access
- `client_secret`: (String) Google OAuth client secret for API authentication
- `image_order`: (Array) Ordered list of sheet names that defines the processing sequence. Only sheets listed here will be processed, in the specified order.

### tokens.json

OAuth token storage containing:

- `access_token`: (String) Current OAuth access token
- `expires_in`: (Number) Token expiration time in seconds
- `token_type`: (String) Token type (typically "bearer")
- `scope`: OAuth scope permissions
- `refresh_token`: (String) Refresh token for obtaining new access tokens
- `account_id`: (Number) Associated account ID
- `account_username`: (String) Associated account username
- `expires_at`: (String) Token expiration timestamp

### image_info.json

Image metadata registry containing entries for each processed sheet:

- `type`: (String) Content type (typically "image")
- `title`: (String) Human-readable title for the sheet
- `description`: (String) Optional description
- `path`: (String) File system path where the generated image is stored

## Processing Behavior

- Only sheets listed in `config.json`'s `image_order` array will be processed
- Sheets are processed in the exact order specified in the `image_order` array
- Generated images are saved to the paths specified in `image_info.json`
- OAuth tokens are automatically refreshed as needed using the refresh token
