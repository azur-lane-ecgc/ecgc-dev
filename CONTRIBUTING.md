# Contributing to ECGC-Dev

First off, thank you for considering contributing to this project! Any and all help is greatly appreciated.

This is a monorepo, which means that it contains multiple packages in the `packages` directory. Each package has its own `package.json` file and can be managed independently.

## Project Layout

The project is a monorepo with the following structure:

- `packages/AzurLaneData`: A [submodule](https://github.com/MrLar/AzurLaneData) containing data for the game Azur Lane.
- `packages/dev`: Contains development scripts and tools for the project.
- `packages/frontend`: The frontend of the project, built with Astro.
- `packages/gsheets2img`: A collection of python scripts to convert google sheets to images and upload them to imgur.
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

    There are two configuration files that you need to create:
    - `packages/dev/credentials.json`: This file contains the credentials for the Google Cloud service account used by the development scripts. You can create a service account in the [Google Cloud Console](https://console.cloud.google.com/) and download the credentials as a JSON file. An example of what this file should look like is provided in `packages/dev/credentials.json.example`.
    - `packages/gsheets2img/config.json`: This file contains the client ID and secret for the Imgur API, which is used to upload images. You can create an Imgur application [here](https://api.imgur.com/oauth2/addclient) to get your client ID and secret. An example of what this file should look like is provided in `packages/gsheets2img/config.json.example`.

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

- `prepare`: Installs lefthook, a git hooks manager.
- `update`: Updates all dependencies.
- `rebuild`: Removes all `node_modules` and other build artifacts and reinstalls dependencies.
- `reset`: Rebuilds the project and runs the devtools script.
- `submodule`: Updates the git submodules.
- `gsheets2img`: Converts google sheets to images.
- `imgur`: Uploads images to imgur.
- `gsheets2imgur`: Converts google sheets to images and uploads them to imgur.
- `compress`: Compresses the build output.
- `smol-format`: Formats the code with prettier.
- `format`: Formats the code with prettier.
- `lint`: Lints the code with oxlint.
- `devtools`: Runs the devtools script.
- `build`: Builds the frontend.
- `compress-build`: Builds the frontend and compresses the output.
- `dev`: Starts the development server.
- `cf-dev`: Starts the development server with wrangler.
- `start`: Starts the production server.
