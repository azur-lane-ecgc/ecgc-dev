#!/bin/bash

source dev_tools/install.sh

uv run gsheets2img/gsheets2img.py

echo "Finished."