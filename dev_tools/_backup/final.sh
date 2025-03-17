#!/bin/bash

cd dev_tools || { echo "dev_tools directory not found!"; exit 1; }

if [ -d "ENV" ]; then
    rm -rf ENV
    echo "ENV folder deleted."
else
    echo "ENV folder not found, nothing to delete."
fi
