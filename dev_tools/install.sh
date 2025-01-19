#!/bin/bash

cd dev_tools || { echo "dev_tools directory not found!"; exit 1; }

if [ ! -d "ENV" ]; then
    python -m venv ENV

    if [ "$(uname)" == "Darwin" ]; then
        source ENV/bin/activate
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        source ENV/bin/activate
    elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ] || [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
        source ENV/Scripts/activate
    else
        echo "Unsupported OS!"
        exit 1
    fi

    pip install -r requirements.txt
    playwright install firefox
fi

echo "Python Dev Tool Setup Complete."