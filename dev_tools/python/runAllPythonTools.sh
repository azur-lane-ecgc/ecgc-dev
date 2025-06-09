#!/bin/bash

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
    sleep 0.25
done

deactivate

# bun run smol_format