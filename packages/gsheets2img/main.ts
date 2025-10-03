import fs from "fs"
import path from "path"
import { tmpdir } from "os"
import crypto from "crypto"
import unzipper from "unzipper"
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
  console.log("Starting download...")
  const tempDirName = path.join(tmpdir(), `gs2imgz-${crypto.randomUUID()}`)
  await fs.promises.mkdir(tempDirName, { recursive: true })
  const zipPath = path.join(tempDirName, `${sheetId}.zip`)
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=zip`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`)
  }
  const buffer = await response.arrayBuffer()
  await fs.promises.writeFile(zipPath, Buffer.from(buffer))
  console.log("Download completed.")
  return zipPath
}

const unzip = async (zipPath: string): Promise<string> => {
  console.log("Starting unzip...")
  const tempDirName = path.join(tmpdir(), `gs2imgx-${crypto.randomUUID()}`)
  await fs.promises.mkdir(tempDirName, { recursive: true })
  const directory = await unzipper.Open.file(zipPath)
  await directory.extract({ path: tempDirName })
  await fs.promises.rm(path.dirname(zipPath), { recursive: true, force: true })
  console.log("Unzip completed.")
  return tempDirName
}

const screenshot = async (
  htmlPath: string,
  pngPath: string,
  browser: any,
): Promise<void> => {
  console.log(`Processing ${path.basename(htmlPath)}...`)
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })
  console.log(`Page created for ${path.basename(htmlPath)}.`)
  await page.goto(`file://${htmlPath}`, { timeout: 0 })

  try {
    const rowHeader = await page.$(".row-header-wrapper")
    const { width: rowHeaderWidth } = await rowHeader.boundingBox()
    const tbody = await page.$("tbody")
    const boundingBox = await tbody.boundingBox()
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
  } catch (e) {
    console.error(e)
  } finally {
    await page.close()
  }

  console.log(`Uploaded ${path.parse(htmlPath).name}`)
}

const processSheets = async (
  sheetNames: string[],
  extractedDir: string,
  browser: any,
): Promise<void> => {
  console.log("Starting to process sheets...")
  for (const sheetName of sheetNames) {
    console.log(`Processing sheet: ${sheetName}`)
    const fileName = sheetName.replace(/ /g, "_") + ".jpeg"
    const htmlPath = path.join(extractedDir, `${sheetName}.html`)
    const pngPath = path.join(resolvedOutputDir, fileName)
    if (!fs.existsSync(htmlPath)) {
      console.log(`Skipping ${sheetName}: HTML file not found.`)
      continue
    }
    await screenshot(htmlPath, pngPath, browser)
  }
  console.log("Finished processing sheets.")
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

  console.log("Launching Firefox...")
  const browser = await firefox.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  })
  console.log("Firefox launched.")
  try {
    await processSheets(sheetNames, extractedDir, browser)
  } finally {
    await browser.close()
  }

  await fs.promises.rm(extractedDir, { recursive: true, force: true })
  console.log("Finished uploading images.")
}

main().catch(console.error)
