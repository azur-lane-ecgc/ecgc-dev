#!/bin/bash

cd dev || { echo "dev directory not found!"; exit 1; }

if [ -d "ENV" ]; then
    rm -rf ENV
    echo "ENV folder deleted."
else
    echo "ENV folder not found, nothing to delete."
fi
