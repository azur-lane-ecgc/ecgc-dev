import { mkdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

import { google } from "googleapis"
import { firefox } from "playwright"

import { captureSheetImages } from "./src/sheetImageCapture"

// Hardcoded constants
const sheetId = "1wWMIzaUKISAXMbOEnmsuuLkO9PesabpdTUWdosvHygM"
const publishedId =
  "2PACX-1vRbKeR7WCSeg1FUx_jQ0e972FtA9tvgW8jHaiLQCPGtJEokVrSGBEZznr2qptelhxF-TXHh86yYQEUa"
const outputDir = fileURLToPath(
  new URL("../../apps/web/src/assets/equip_misc/", import.meta.url),
)
const includeSheets: string[] = []
const excludeSheets = [
  "(WiP) SS RLD Chart",
  "(WiP) OpSi Image Guide Pt4",
  "Ammo Modifiers Chart",
  "(WiP) Rikka Specific Guide",
]

interface SheetInfo {
  name: string
  gid: string
}

const getAuthClient = async () => {
  const credentialsPath = join(
    fileURLToPath(new URL("..", import.meta.url)),
    "credentials.json",
  )
  const credentials = JSON.parse(await readFile(credentialsPath, "utf-8"))

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })
}

const getSheets = async (sheetID: string): Promise<SheetInfo[]> => {
  const auth = await getAuthClient()
  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.get({
    spreadsheetId: sheetID,
    fields: "sheets(properties(title,sheetId))",
  })

  if (!response.data.sheets) {
    throw new Error("No sheets found in spreadsheet")
  }

  return response.data.sheets
    .filter(
      (sheet) =>
        sheet.properties?.title && sheet.properties?.sheetId !== undefined,
    )
    .map((sheet) => ({
      name: sheet.properties!.title!,
      gid: String(sheet.properties!.sheetId!),
    }))
}

console.log(`Starting Google Sheets to Image conversion...`)
console.log(`Fetching sheet list...\n`)

getSheets(sheetId)
  .then(async (allSheets) => {
    await mkdir(outputDir, { recursive: true })

    const sheets = allSheets
      .filter(
        (sheet) =>
          (!Array.isArray(includeSheets) ||
            !includeSheets.length ||
            includeSheets.includes(sheet.name)) &&
          (!Array.isArray(excludeSheets) ||
            !excludeSheets.includes(sheet.name)),
      )
      .map((sheet) => ({
        name: sheet.name,
        gid: sheet.gid,
        url: `https://docs.google.com/spreadsheets/u/0/d/e/${publishedId}/pubhtml/sheet?headers=false&gid=${sheet.gid}`,
        outputName: sheet.name.replace(/[ /]/g, "_"),
      }))

    const outputPaths = sheets.map((sheet) =>
      join(outputDir, sheet.outputName + ".jpeg"),
    )
    if (new Set(outputPaths).size !== outputPaths.length) {
      throw new Error("Duplicate Google Sheet image output filename")
    }

    console.log(`Found ${sheets.length} sheets to process\n`)

    if (sheets.length === 0) return

    const browser = await firefox.launch()
    try {
      await captureSheetImages(browser, sheets, outputDir)
    } finally {
      await browser.close()
    }

    console.log(`\nAll done! Images saved to: ${outputDir}`)
  })
  .catch((error) => {
    console.error(`\nError: ${error.message}`)
    process.exit(1)
  })
