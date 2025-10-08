# gsheets2img

This is a simple script written for a rather specific purpose so it may not have much flexibility nor was it thoroughly tested.  
It exports a Google Sheets spreadsheet into HTML files (using Google's `/export` endpoint), then captures screenshots of each individual sheet with [Playwright](https://playwright.dev).

## Installation

1. Clone this repository
2. `npm install`

## Usage

`npm start`

## Configuration

[node-config](https://github.com/node-config/node-config) is used to provide hierarchical configurations.
On top of configuration files, [`NODE_CONFIG`](https://github.com/node-config/node-config/wiki/Environment-Variables#node_config) can also be used to supply configuration through environment variables.

An example local configuration file `config/local.json.example` has been provided:

```json
{
  "gsheets2img": {
    "sheetID": "aBC-123_xYz",
    "outputDir": "/path/to/output/dir",
    "includeSheets": ["Sheet1", "Sheet3", "My Sheet", "Copy of My Sheet", "All sheets are included if includeSheets is empty"],
    "excludeSheets": ["Sheet3", "Copy of My Sheet", "If an included sheet is in excludeSheets, it becomes excluded"],
    "concurrency": 2
  }
}
```

* `gsheets2img.sheetID`: (String) Target spreadsheet ID. (can be found in the URL: `https://docs.google.com/spreadsheets/d/<spreadsheetId>/edit#gid=0`)
* `gsheets2img.outputDir`: (String) Directory to save images to. (default: `"./output"`)
* `gsheets2img.includeSheets`: (Array) Sheet names to include. All sheets are included if empty. (default: `[]`)
* `gsheets2img.excludeSheets`: (Array) Sheet names to exclude. If an included sheet is in the array, it becomes excluded. (default: `[]`)
  * To clarify, if a sheet is in both arrays (like `Sheet3` and `Copy of My Sheet` in the example above), it is completely ignored.
* `gsheets2img.concurrency`: (Number) Number of sheets to process at the same time. (default: `5`)
