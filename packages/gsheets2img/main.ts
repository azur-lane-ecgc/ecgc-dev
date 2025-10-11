import { mkdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { google } from "googleapis"
import { firefox } from "playwright"
import type { Browser } from "playwright"

// Hardcoded constants
const sheetId = "1wWMIzaUKISAXMbOEnmsuuLkO9PesabpdTUWdosvHygM"
const publishedId =
  "2PACX-1vRbKeR7WCSeg1FUx_jQ0e972FtA9tvgW8jHaiLQCPGtJEokVrSGBEZznr2qptelhxF-TXHh86yYQEUa"
const outputDir = "../frontend/public/images/equip_misc/"
const includeSheets: string[] = []
const excludeSheets = [
  "(WiP) SS RLD Chart",
  "Copy of BB Guns",
  "(WiP) OpSi Image Guide Pt4",
  "Ammo Modifiers Chart",
  "(WiP) Rikka Specific Guide",
]
const concurrency = 5

interface SheetInfo {
  name: string
  gid: string
}

const getAuthClient = async () => {
  const credentialsPath = join(import.meta.dir, "..", "credentials.json")
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

const screenshot = async (
  sheetUrl: string,
  sheetName: string,
  pngPath: string,
  browser: Browser,
) => {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })

  console.log(`Processing: ${sheetName}`)

  try {
    await page.goto(sheetUrl, { timeout: 0 })

    // Wait for the table body to ensure content is loaded
    await page.waitForSelector("tbody", { timeout: 30000 })

    // Get the table body that holds the actual sheet data
    const tbody = await page.$("tbody")
    if (!tbody) {
      throw new Error("Table body element not found on the page")
    }
    const boundingBox = await tbody.boundingBox()
    if (!boundingBox) {
      throw new Error(
        "Bounding box could not be obtained for the table body element",
      )
    }

    // Simple clip area - just use the tbody as-is
    const clipArea = {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height,
    }

    await page.setViewportSize({
      width: Math.max(1920, Math.floor(clipArea.width) + 100),
      height: Math.max(1080, Math.floor(clipArea.height) + 100),
    })

    await page.screenshot({ path: pngPath, clip: clipArea })
  } catch (e) {
    console.error(e)
  } finally {
    await page.close()
  }
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

    console.log(`Found ${sheets.length} sheets to process\n`)

    const browser = await firefox.launch()
    const promises = new Set<Promise<void>>()

    for (const { url, name, outputName } of sheets) {
      const promise = screenshot(
        url,
        name,
        join(outputDir, outputName + ".jpeg"),
        browser,
      ).then(() => {
        promises.delete(promise)
      })
      promises.add(promise)

      if (promises.size >= concurrency) {
        await Promise.race(promises)
      }
    }

    await Promise.all(promises)
    await browser.close()

    console.log(`\nAll done! Images saved to: ${outputDir}`)
  })
  .catch((error) => {
    console.error(`\nError: ${error.message}`)
    process.exit(1)
  })
