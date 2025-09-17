import { $ } from "bun"

const toolFiles = [
  "packages/dev/src/ehp_parsing/ehp.ts",
  "packages/dev/src/aa_parsing/aa_parsing.ts",
  "packages/dev/src/end_game_al_rankings/mainfleetrankings.ts",
  "packages/dev/src/end_game_al_rankings/vgfleetrankings.ts",
  "packages/dev/src/end_game_al_rankings/ssfleetrankings.ts",
  "packages/dev/src/events/azurLaneEvents.ts",
  "packages/dev/src/replace_links/replaceLinks.ts",
  "packages/dev/src/toc_generator/TocGenerator.ts",
  "packages/dev/src/changelog/changelog.ts",
  "packages/dev/src/ship_data/ship_json_generator.ts",
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
