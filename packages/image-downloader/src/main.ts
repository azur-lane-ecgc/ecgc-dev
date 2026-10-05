import { findMissingShipIcons } from "./missingShipIcons"
import { downloadMissingShipIcons } from "./wikiIconDownloader"

const mode = process.argv.includes("--plan")
  ? "plan"
  : process.argv.includes("--download")
    ? "download"
    : "plan"

const inventory = await findMissingShipIcons()
if (mode === "plan") {
  console.log(JSON.stringify(inventory, null, 2))
  process.exit(0)
}

await downloadMissingShipIcons(inventory.missingShipIcons)
