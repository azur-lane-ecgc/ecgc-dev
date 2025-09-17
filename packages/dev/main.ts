import { $ } from "bun"

const toolFiles = [
  "src/ehp_parsing/ehp.ts",
  "src/aa_parsing/aa_parsing.ts",
  "src/end_game_al_rankings/mainfleetrankings.ts",
  "src/end_game_al_rankings/vgfleetrankings.ts",
  "src/end_game_al_rankings/ssfleetrankings.ts",
  "src/events/azurLaneEvents.ts",
  "src/replace_links/replaceLinks.ts",
  "src/toc_generator/TocGenerator.ts",
  "src/changelog/changelog.ts",
  "src/ship_data/ship_json_generator.ts",
]

const runStandardTools = async () => {
  for (const file of toolFiles) {
    console.log(`Running: ${file}`)
    await $`bun run ${file}`
    console.log()
  }
  console.log("All standard TypeScript tools have been run successfully.")
}

const main = async () => {
  await runStandardTools()
  return
}

main().catch((err) => {
  console.error("An error occurred while running TypeScript tools:", err)
  process.exit(1)
})
