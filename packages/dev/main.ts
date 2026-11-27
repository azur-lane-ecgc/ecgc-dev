import { main as aaMain } from "@/tools/aa_parsing/aa_parsing"
import { main as changelogMain } from "@/tools/changelog/changelog"
import { main as ehpMain } from "@/tools/ehp_parsing/ehp"
import { main as mainFleetMain } from "@/tools/end_game_al_rankings/mainfleetrankings"
import { main as ssFleetMain } from "@/tools/end_game_al_rankings/ssfleetrankings"
import { main as vgFleetMain } from "@/tools/end_game_al_rankings/vgfleetrankings"
import { main as eventsMain } from "@/tools/events/azurLaneEvents"
import { main as replaceLinksMain } from "@/tools/replace_links/replaceLinks"
import { main as shipDataMain } from "@/tools/ship_data/ship_json_generator"
import { main as tocMain } from "@/tools/toc_generator/TocGenerator"

const updateShipDatabase = async () => {
  const [ehpData, aaData, mainFleetData, vgFleetData, ssFleetData] =
    await Promise.all([
      ehpMain(),
      aaMain(),
      mainFleetMain(),
      vgFleetMain(),
      ssFleetMain(),
    ])

  await shipDataMain(ehpData, aaData, mainFleetData, vgFleetData, ssFleetData)
}

const main = async () => {
  await Promise.all([
    updateShipDatabase(),
    eventsMain(),
    replaceLinksMain().then(tocMain),
    changelogMain(),
  ])

  console.log("All standard TypeScript tools have been run successfully.")
}

main().catch((err) => {
  console.error("An error occurred while running TypeScript tools:", err)
  process.exitCode = 1
})
