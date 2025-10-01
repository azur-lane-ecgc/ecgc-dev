# Contributing to ECGC-Dev

First off, thank you for considering contributing to this project! Any and all help is greatly appreciated.

This is a monorepo, which means that it contains multiple packages in the `packages` directory. Each package has its own `package.json` file and can be managed independently.

> **Note**: For detailed development guidelines including build commands, code style, and quality assurance practices, see [AGENTS.md](./AGENTS.md).

## Project Layout

The project is a monorepo with the following structure:

- `packages/AzurLaneData`: A [submodule](https://github.com/MrLar/AzurLaneData) containing data for the game Azur Lane.
- `packages/dev`: Contains development scripts and tools for the project.
- `packages/frontend`: The frontend of the project, built with Astro.
- `packages/gsheets2img`: A TypeScript script to convert google sheets to images.
- `CONTRIBUTING.md`: This file.
- `README.md`: The main README file for the project.

## Local Setup

1.  **Clone the repository:**

    ```bash
    git clone --recurse-submodules https://github.com/your-username/ecgc-dev.git
    cd ecgc-dev
    ```

2.  **Install dependencies:**

    This project uses `bun` for package management.

    ```bash
    bun install
    ```

3.  **Configure environment:**

    There is one configuration file that you need to create:
    - `packages/dev/credentials.json`: This file contains the credentials for the Google Cloud service account used by the development scripts. You can create a service account in the [Google Cloud Console](https://console.cloud.google.com/) and download the credentials as a JSON file. An example of what this file should look like is provided in `packages/dev/credentials.json.example`.

4.  **Run the development server:**

    ```bash
    bun run dev
    ```

    This will start the Astro development server at `http://localhost:4321`.

## How to Contribute

1.  **Fork the repository:**

    Click the "Fork" button at the top right of the repository page.

2.  **Create a new branch:**

    ```bash
    git checkout -b my-new-feature
    ```

3.  **Make your changes:**

    Make your changes to the code and commit them.

4.  **Push your changes:**

    ```bash
    git push origin my-new-feature
    ```

5.  **Create a pull request:**

    Go to the repository on GitHub and click the "New pull request" button.

## Scripts

The `package.json` file contains a number of scripts for common tasks:

### Development & Build

- `dev`: Starts the Astro development server at `http://localhost:4321`
- `build`: Builds the frontend with type checking
- `compress-build`: Builds the frontend and compresses the output
- `cf-dev`: Starts the development server with Cloudflare Wrangler
- `start`: Starts the production server

### Code Quality

- `lint`: Lints the code with oxlint
- `format`: Formats the code with prettier (includes astro, tailwindcss, and import organization)
- `smol-format`: Formats specific file types with prettier

### Maintenance

- `prepare`: Installs lefthook git hooks manager
- `update`: Updates all dependencies
- `rebuild`: Removes all `node_modules` and build artifacts, then reinstalls
- `reset`: Full rebuild and runs devtools
- `submodule`: Updates git submodules

### Data Processing

- `devtools`: Runs all development data processing scripts
- `compress`: Compresses build output
- `gsheets2img`: Converts Google Sheets to images

## Development Practices

### Code Style

- Follow the formatting rules defined in `.prettierrc.json`
- Use path aliases (`@/components/*`, `@/utils/*`, etc.) for imports
- Prefer async/await over promises
- Use TypeScript strict mode with proper type definitions
- Keep components and utilities organized by feature/domain

### Quality Assurance

- Pre-commit hooks automatically format staged files
- Run `bun run lint` before committing
- Type checking is performed during build via `astro check`
- Test UI components manually during development

### Workflow

1. Make changes following the established patterns
2. Run `bun run format` to ensure consistent styling
3. Test changes in development server (`bun run dev`)
4. Commit with descriptive messages
5. Create pull request for review

For detailed coding standards and additional development guidelines, refer to [AGENTS.md](./AGENTS.md).
