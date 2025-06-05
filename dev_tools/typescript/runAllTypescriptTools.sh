files=(
    "replace_links/replaceLinks.ts"
    "ship_data/ship_json_generator.ts"
    "toc_generator/TocGenerator.ts"
)

for file in "${files[@]}"; do
    echo "Running: $file"
    bun run "$file"
    echo
done