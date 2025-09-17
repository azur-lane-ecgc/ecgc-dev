import { main as replaceLinksMain } from "./src/replace_links/replaceLinks.ts"
import { main as shipJsonGeneratorMain } from "./src/ship_data/ship_json_generator.ts"
import { main as tocGeneratorMain } from "./src/toc_generator/TocGenerator.ts"
import { main as azurLaneEventsMain } from "./src/events/azurLaneEvents.ts"

const runAll = async () => {
  console.log("Running: replace_links/replaceLinks.ts")
  await replaceLinksMain()
  console.log()

  console.log("Running: ship_data/ship_json_generator.ts")
  await shipJsonGeneratorMain()
  console.log()

  console.log("Running: toc_generator/TocGenerator.ts")
  await tocGeneratorMain()
  console.log()

  console.log("Running: events/azurLaneEvents.ts")
  await azurLaneEventsMain()
  console.log()

  console.log("All typescript tools have been run successfully.")
}

runAll().catch((err) => {
  console.error("An error occurred while running typescript tools:", err)
  process.exit(1)
})
