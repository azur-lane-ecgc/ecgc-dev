#!/bin/bash

# Function to set up the Python environment for gsheets2imgur and imgur
setup_python_for_imgur() {
    echo "Setting up python environment for imgur tools..."
    if [ ! -d ".venv" ]; then
        echo "Creating virtual environment..."
        uv venv
    fi
    echo "Installing dependencies..."
    uv pip install -r dev/python/requirements.txt
    echo "Installing Playwright browser..."
    uv run playwright install firefox
    echo "Setup complete."
}

run_gsheets2img() {
    setup_python_for_imgur
    echo "Running gsheets2img..."
    uv run dev/python/automated_imgur_upload/gsheets2img.py
}

run_imgur() {
    setup_python_for_imgur
    echo "Running imgur..."
    uv run dev/python/automated_imgur_upload/imgur.py
}

# Main script logic
if [[ "$1" == "-g" ]]; then
    run_gsheets2img
    exit 0
elif [[ "$1" == "-i" ]]; then
    run_imgur
    exit 0
elif [[ "$1" == "-gi" ]] || [[ "$1" == "-ig" ]]; then
    run_gsheets2img
    run_imgur
    exit 0
fi

# Original runAllTools.sh logic if no flags are passed
echo "Running python tools..."

# Create venv if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Virtual environment not found. Creating one with 'uv venv'..."
    uv venv
fi

# Determine activation script path based on OS
ACTIVATE_SCRIPT=""
if [ "$(uname)" == "Darwin" ]; then
    ACTIVATE_SCRIPT=".venv/bin/activate"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    ACTIVATE_SCRIPT=".venv/bin/activate"
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ] || [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    ACTIVATE_SCRIPT=".venv/Scripts/activate"
fi

# Activate venv, run python, then deactivate
if [ -n "$ACTIVATE_SCRIPT" ] && [ -f "$ACTIVATE_SCRIPT" ]; then
    echo "Activating virtual environment..."
    source "$ACTIVATE_SCRIPT"
    python dev/python/main.py
    echo "Deactivating virtual environment."
    deactivate
else
    echo "Could not determine activation script for this OS. Falling back to 'uv run'."
    uv run dev/python/main.py
fi


echo -e "
Running typescript tools..."
bun run packages/dev/main.ts
