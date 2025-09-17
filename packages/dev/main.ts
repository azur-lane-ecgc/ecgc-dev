import { main as replaceLinksMain } from "@/tools/replace_links/replaceLinks"
import { main as shipJsonGeneratorMain } from "@/tools/ship_data/ship_json_generator"
import { main as tocGeneratorMain } from "@/tools/toc_generator/TocGenerator"
import { main as azurLaneEventsMain } from "@/tools/events/azurLaneEvents"
import { main as aaMain } from "@/tools/aa_parsing/aa"
import { main as ehpMain } from "@/tools/ehp_parsing/ehp"
import { main as mainFleetRankingsMain } from "@/tools/end_game_al_rankings/mainfleetrankings"
import { main as vgFleetRankingsMain } from "@/tools/end_game_al_rankings/vgfleetrankings"
import { main as ssFleetRankingsMain } from "@/tools/end_game_al_rankings/ssfleetrankings"
import { main as changelogMain } from "@/tools/changelog/changelog"
import { main as gsheets2imgMain } from "@/tools/automated_imgur_upload/gsheets2img"
import { main as imgurMain } from "@/tools/automated_imgur_upload/imgur"

const runStandardTools = async () => {
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

  console.log("Running: aa_parsing/aa.ts")
  await aaMain()
  console.log()

  console.log("Running: ehp_parsing/ehp.ts")
  await ehpMain()
  console.log()

  console.log("Running: end_game_al_rankings/mainfleetrankings.ts")
  await mainFleetRankingsMain()
  console.log()

  console.log("Running: end_game_al_rankings/vgfleetrankings.ts")
  await vgFleetRankingsMain()
  console.log()

  console.log("Running: end_game_al_rankings/ssfleetrankings.ts")
  await ssFleetRankingsMain()
  console.log()

  console.log("Running: changelog/changelog.ts")
  await changelogMain()
  console.log()

  console.log("All standard typescript tools have been run successfully.")
}

const runGsheets2img = async () => {
  console.log("Running: automated_imgur_upload/gsheets2img.ts")
  await gsheets2imgMain()
  console.log()
}

const runImgur = async () => {
  console.log("Running: automated_imgur_upload/imgur.ts")
  await imgurMain()
  console.log()
}

const main = async () => {
  const args = process.argv.slice(2)

  if (args.length > 0) {
    if (args.includes("-g")) {
      await runGsheets2img()
    }
    if (args.includes("-i")) {
      await runImgur()
    }
    if (args.includes("-gi") || args.includes("-ig")) {
      await runGsheets2img()
      await runImgur()
    }
  } else {
    await runStandardTools()
  }
}

main().catch((err) => {
  console.error("An error occurred while running typescript tools:", err)
  process.exit(1)
})
