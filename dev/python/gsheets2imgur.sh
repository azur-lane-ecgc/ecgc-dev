#!/bin/bash

source dev/python/install.sh

run_gsheets2img() {
    uv run automated_imgur_upload/gsheets2img.py
}

run_imgur() {
    uv run automated_imgur_upload/imgur.py
}

if [[ "$1" == "-g" ]]; then
    run_gsheets2img
    exit 0
elif [[ "$1" == "-i" ]]; then
    run_imgur
    exit 0
else
    run_gsheets2img
    run_imgur
fi