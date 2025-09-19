import fs from "fs"
import path from "path"
import os from "os"
import crypto from "crypto"
import AdmZip from "adm-zip"
import { firefox } from "playwright"

// Hardcoded constants
const sheetId = "1wWMIzaUKISAXMbOEnmsuuLkO9PesabpdTUWdosvHygM"
const outputDir = "../frontend/public/images/equip_misc/"
const includeSheets: string[] = []
const excludeSheets = [
  "(WiP) SS RLD Chart",
  "Copy of BB Guns",
  "(WiP) OpSi Image Guide Pt4",
  "Ammo Modifiers Chart",
  "(WiP) Rikka Specific Guide",
]
const resolvedOutputDir = path.resolve(outputDir)

const download = async (sheetId: string): Promise<string> => {
  const tempDirName = path.join(os.tmpdir(), `gs2imgz-${crypto.randomUUID()}`)
  await fs.promises.mkdir(tempDirName, { recursive: true })
  const zipPath = path.join(tempDirName, `${sheetId}.zip`)
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=zip`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`)
  }
  const buffer = await response.arrayBuffer()
  await Bun.write(zipPath, Buffer.from(buffer))
  return zipPath
}

const unzip = async (zipPath: string): Promise<string> => {
  const tempDirName = path.join(os.tmpdir(), `gs2imgx-${crypto.randomUUID()}`)
  await fs.promises.mkdir(tempDirName, { recursive: true })
  const zip = new AdmZip(zipPath)
  zip.extractAllTo(tempDirName, true)
  await fs.promises.rm(path.dirname(zipPath), { recursive: true, force: true })
  return tempDirName
}

const screenshot = async (
  htmlPath: string,
  pngPath: string,
  browser: any,
): Promise<void> => {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })
  await page.goto(`file://${htmlPath}`, { timeout: 0 })

  const rowHeader = await page.$(".row-header-wrapper")
  if (!rowHeader) {
    console.log(
      `Skipping ${path.basename(htmlPath)}: row-header-wrapper not found.`,
    )
    await page.close()
    return
  }

  const rowHeaderBox = await rowHeader.boundingBox()
  if (!rowHeaderBox) {
    console.log(`Skipping ${path.basename(htmlPath)}: bounding box not found.`)
    await page.close()
    return
  }

  const tbody = await page.$("tbody")
  if (!tbody) {
    console.log(`Skipping ${path.basename(htmlPath)}: tbody not found.`)
    await page.close()
    return
  }

  const boundingBox = await tbody.boundingBox()
  if (!boundingBox) {
    console.log(`Skipping ${path.basename(htmlPath)}: bounding box not found.`)
    await page.close()
    return
  }

  const rowHeaderWidth = rowHeaderBox.width

  const clipArea = {
    x: boundingBox.x + rowHeaderWidth + 1,
    y: boundingBox.y,
    width: boundingBox.width - rowHeaderWidth - 1,
    height: boundingBox.height,
  }

  await page.setViewportSize({
    width: Math.max(1920, Math.floor(clipArea.width) + 100),
    height: Math.max(1080, Math.floor(clipArea.height) + 100),
  })

  console.log(`Uploading ${path.parse(htmlPath).name}`)
  await page.screenshot({ path: pngPath, clip: clipArea })
  await page.close()
}

const processSheets = async (
  sheetNames: string[],
  extractedDir: string,
  browser: any,
): Promise<void> => {
  for (const sheetName of sheetNames) {
    const fileName = sheetName.replace(/ /g, "_") + ".jpeg"
    const htmlPath = path.join(extractedDir, `${sheetName}.html`)
    const pngPath = path.join(resolvedOutputDir, fileName)
    if (!(await Bun.file(htmlPath).exists())) {
      console.log(`Skipping ${sheetName}: HTML file not found.`)
      continue
    }
    await screenshot(htmlPath, pngPath, browser)
  }
}

export const main = async (): Promise<void> => {
  await fs.promises.mkdir(resolvedOutputDir, { recursive: true })
  const zipPath = await download(sheetId)
  const extractedDir = await unzip(zipPath)
  const files = (await fs.promises.readdir(extractedDir))
    .filter((f) => f.endsWith(".html"))
    .map((f) => path.join(extractedDir, f))
  const sheetNames = files
    .map((f) => path.parse(f).name)
    .filter(
      (name) =>
        (!includeSheets.length || includeSheets.includes(name)) &&
        !excludeSheets.includes(name),
    )

  console.log(`Found ${sheetNames.length} sheets to process.`)

  const browser = await firefox.launch()
  try {
    await processSheets(sheetNames, extractedDir, browser)
  } finally {
    await browser.close()
  }

  await fs.promises.rm(extractedDir, { recursive: true, force: true })
  console.log("Finished uploading images.")
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}
