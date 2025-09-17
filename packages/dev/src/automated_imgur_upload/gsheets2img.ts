import { chromium } from "playwright"
import path from "path"
import fs from "fs/promises"
import JSZip from "jszip"
import os from "os"

const sheetId = "1wWMIzaUKISAXMbOEnmsuuLkO9PesabpdTUWdosvHygM"
const outputDir = "public/images/equip_misc/"
const includeSheets: string[] = []
const excludeSheets = [
  "(WiP) SS RLD Chart",
  "Copy of BB Guns",
  "(WiP) OpSi Image Guide Pt4",
  "Ammo Modifiers Chart",
  "(WiP) Rikka Specific Guide",
]

const download = async (sheetId: string): Promise<string> => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "gs2imgz-"))
  const zipPath = path.join(tempDir, `${sheetId}.zip`)
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=zip`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`)
  }
  const buffer = await response.arrayBuffer()
  await Bun.write(zipPath, buffer)
  return zipPath
}

const unzip = async (zipPath: string): Promise<string> => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "gs2imgx-"))
  const zipData = await Bun.file(zipPath).arrayBuffer()
  const zip = await JSZip.loadAsync(zipData)

  const extractionPromises: Promise<void>[] = []

  zip.forEach((relativePath, zipEntry) => {
    const outputPath = path.join(tempDir, relativePath)

    if (zipEntry.dir) {
      extractionPromises.push(fs.mkdir(outputPath, { recursive: true }))
    } else {
      const dir = path.dirname(outputPath)
      const promise = fs.mkdir(dir, { recursive: true }).then(() => {
        return zipEntry.async("nodebuffer").then((content) => {
          return fs.writeFile(outputPath, content)
        })
      })
      extractionPromises.push(promise)
    }
  })

  await Promise.all(extractionPromises)
  await fs.rm(path.dirname(zipPath), { recursive: true, force: true })
  return tempDir
}

const screenshot = async (htmlPath: string, pngPath: string, browser: any) => {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })
  await page.goto(`file://${htmlPath}`, { timeout: 0 })

  const rowHeader = await page.querySelector(".row-header-wrapper")
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

  const tbody = await page.querySelector("tbody")
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
    width: Math.max(1920, Math.round(clipArea.width) + 100),
    height: Math.max(1080, Math.round(clipArea.height) + 100),
  })

  console.log(`Uploading ${path.basename(htmlPath, ".html")}`)
  await page.screenshot({ path: pngPath, clip: clipArea })
  await page.close()
}

const processSheets = async (
  sheetNames: string[],
  extractedDir: string,
  browser: any,
) => {
  for (const sheetName of sheetNames) {
    const fileName = sheetName.replace(/ /g, "_") + ".jpeg"
    const htmlPath = path.join(extractedDir, `${sheetName}.html`)
    const pngPath = path.join(outputDir, fileName)
    if (!(await Bun.file(htmlPath).exists())) {
      console.log(`Skipping ${sheetName}: HTML file not found.`)
      continue
    }
    await screenshot(htmlPath, pngPath, browser)
  }
}

export const main = async () => {
  await fs.mkdir(outputDir, { recursive: true })
  const zipPath = await download(sheetId)
  const extractedDir = await unzip(zipPath)
  const files = await fs.readdir(extractedDir)
  const sheetNames = files
    .filter((f) => f.endsWith(".html"))
    .map((f) => path.basename(f, ".html"))
    .filter(
      (stem) =>
        (includeSheets.length === 0 || includeSheets.includes(stem)) &&
        !excludeSheets.includes(stem),
    )

  console.log(`Found ${sheetNames.length} sheets to process.`)

  const browser = await chromium.launch()
  try {
    await processSheets(sheetNames, extractedDir, browser)
  } finally {
    await browser.close()
  }

  await fs.rm(extractedDir, { recursive: true, force: true })
  console.log("Finished uploading images.")
}
