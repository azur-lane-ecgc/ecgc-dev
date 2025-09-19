import { main as gsheetsMain } from "./src/gsheets2img"
import { imgur as imgurMain } from "./src/imgur"

async function main() {
  const args = process.argv.slice(2)
  const runGsheets = args.includes("-g") || args.includes("-gi")
  const runImgur = args.includes("-i") || args.includes("-gi")

  if (!runGsheets && !runImgur) {
    console.log("Usage: bun main.ts [-g] [-i] [-gi]")
    process.exit(1)
  }

  if (runGsheets) {
    console.log("Running gsheets2img...")
    await gsheetsMain()
  }

  if (runImgur) {
    console.log("Running imgur...")
    await imgurMain()
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}
