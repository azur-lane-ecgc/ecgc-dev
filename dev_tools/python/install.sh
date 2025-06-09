#!/bin/bash

cd dev_tools/python || { echo "dev_tools directory not found!"; exit 1; }

if [ ! -d ".venv" ]; then
    uv venv
fi

if [ "$(uname)" == "Darwin" ]; then
    source .venv/bin/activate
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    source .venv/bin/activate
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ] || [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    source .venv/Scripts/activate
else
    echo "Unsupported OS!"
    exit 1
fi

uv pip install -r requirements.txt
playwright install firefox

echo -e "Python Dev Tool Setup Complete.\n"