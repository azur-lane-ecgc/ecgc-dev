#!/bin/bash

# Function to set up the Python environment for gsheets2imgur and imgur
setup_python_for_imgur() {
    echo "Setting up python environment for imgur tools..."
    if [ ! -d ".venv" ]; then
        echo "Creating virtual environment..."
        uv venv
    fi
    echo "Installing dependencies..."
    uv pip install -r packages/gsheets2img/requirements.txt
    echo "Installing Playwright browser..."
    uv run playwright install firefox
    echo "Setup complete."
}

run_gsheets2img() {
    setup_python_for_imgur
    echo "Running gsheets2img..."
    uv run packages/gsheets2img/gsheets2img.py
}

run_imgur() {
    setup_python_for_imgur
    echo "Running imgur..."
    uv run packages/gsheets2img/imgur.py
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

