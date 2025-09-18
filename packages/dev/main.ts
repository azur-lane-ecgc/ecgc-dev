import { main as ehpMain } from "@/tools/ehp_parsing/ehp"
import { main as aaMain } from "@/tools/aa_parsing/aa_parsing"
import { main as mainFleetMain } from "@/tools/end_game_al_rankings/mainfleetrankings"
import { main as vgFleetMain } from "@/tools/end_game_al_rankings/vgfleetrankings"
import { main as ssFleetMain } from "@/tools/end_game_al_rankings/ssfleetrankings"
import { main as eventsMain } from "@/tools/events/azurLaneEvents"
import { main as replaceLinksMain } from "@/tools/replace_links/replaceLinks"
import { main as tocMain } from "@/tools/toc_generator/TocGenerator"
import { main as changelogMain } from "@/tools/changelog/changelog"
import { main as shipDataMain } from "@/tools/ship_data/ship_json_generator"

const main = async () => {
  console.log("Running ehp.ts")
  const ehpData = await ehpMain()
  console.log()

  console.log("Running aa_parsing.ts")
  const aaData = await aaMain()
  console.log()

  console.log("Running mainfleetrankings.ts")
  const mainFleetData = await mainFleetMain()
  console.log()

  console.log("Running vgfleetrankings.ts")
  const vgFleetData = await vgFleetMain()
  console.log()

  console.log("Running ssfleetrankings.ts")
  const ssFleetData = await ssFleetMain()
  console.log()

  console.log("Running azurLaneEvents.ts")
  await eventsMain()
  console.log()

  console.log("Running replaceLinks.ts")
  await replaceLinksMain()
  console.log()

  console.log("Running TocGenerator.ts")
  await tocMain()
  console.log()

  console.log("Running changelog.ts")
  await changelogMain()
  console.log()

  console.log("Running ship_json_generator.ts")
  await shipDataMain(ehpData, aaData, mainFleetData, vgFleetData, ssFleetData)
  console.log()

  console.log("All standard TypeScript tools have been run successfully.")
}

main().catch((err) => {
  console.error("An error occurred while running TypeScript tools:", err)
  process.exit(1)
})
