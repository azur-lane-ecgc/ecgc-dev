# Dev Package Agent Guidelines

## Overview

This package contains TypeScript development scripts and tools for processing Azur Lane game data from Google Sheets, generating changelogs, parsing ship stats, and managing various data transformation operations. It serves as the data pipeline for the ECGC project, converting raw game data into structured JSON for the frontend.

## Build & Run Commands

- **Run all dev tools**: `bun run devtools` (executes all data processing scripts sequentially)
- **Type checking**: `bun run build` (from repo root, includes this package via TypeScript)
- **Individual scripts**: Run via `bun run <script-name>` from repo root (e.g., `bun run aa-parsing`)
- **Clean build**: `bun run clean` (removes generated files)

## Key Scripts and Directories

- `aa_parsing/`: Parses anti-air mechanics and generates ship AA data (`shipAA.json`)
- `changelog/`: Processes version changelogs and formats for frontend display
- `compress/`: Compression utilities for build optimization
- `ehp_parsing/`: Calculates effective HP values for ships and generates EHP data
- `end_game_al_rankings/`: Computes fleet rankings for end-game content (main fleet, SS fleet)
- `events/`: Processes Azur Lane event data and schedules
- `replace_links/`: Updates and validates internal/external links in documentation
- `samvaluation/`: Processes SAM (Strategic Asset Management) valuation data
- `ship_data/`: Generates comprehensive ship database from raw data
- `ships/`: Specialized ship parsers (faction classification, role assignment, augment parsing, etc.)
- `toc_generator/`: Generates table of contents for documentation pages

## Configuration

- **Credentials**: Requires `credentials.json` (Google Cloud service account key from `credentials.json.example`)
- **Environment**: TypeScript strict mode with ES modules, path aliases (`@/tools/*` → `src/*`)
- **Dependencies**: Managed via root `bun.lock`, includes Google APIs client libraries
- **Output**: Processed data written to `packages/AzurLaneData/data/` and `packages/frontend/src/db/`

## Data Processing Workflow

1. Configure `credentials.json` with Google Cloud service account credentials
2. Run `bun run devtools` to execute all scripts in dependency order
3. Scripts fetch data from Google Sheets, process/transform it, and output JSON files
4. Frontend package imports the generated data for display
5. Run `bun run build` to ensure all scripts compile without errors

## Key Data Outputs

- Ship databases, equipment data, skill information
- EHP calculations, fleet rankings, farming data
- Changelog entries, event schedules, guide content
- Image assets and documentation metadata

## Error Handling

- Validate Google Cloud credentials and API access before operations
- Handle network timeouts and API rate limits gracefully
- Log errors with context and stack traces for debugging
- Check for null/undefined data and malformed inputs before processing
- Implement retry logic for transient failures

## Security Notes

- Never commit `credentials.json` (excluded via `.gitignore`)
- Store service account keys securely with minimal required permissions
- Validate all external data sources for integrity
- Use HTTPS for all API endpoints and data transfers
- Sanitize inputs to prevent injection attacks

## Development Tips

- Test individual scripts with `bun run <script>` before running full pipeline
- Check generated data in `packages/AzurLaneData/data/` for correctness
- Use `console.log` for debugging, remove before committing
- Follow TypeScript strict typing for all data structures

See root [AGENTS.md](../../AGENTS.md) for general coding standards and build commands.
