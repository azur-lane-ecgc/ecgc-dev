#!/bin/bash

source dev_tools/python/install.sh

files=(
    "aa_parsing/aa.py"
    "ehp_parsing/ehp.py"
    "end_game_al_rankings/mainfleetrankings.py"
    "end_game_al_rankings/vgfleetrankings.py"
    "end_game_al_rankings/ssfleetrankings.py"
    "changelog/changelog.py"
)

for file in "${files[@]}"; do
    echo "Running: $file"
    uv run "$file"
    echo
done

# bun run smol_format