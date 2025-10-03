import { createWriteStream } from "node:fs"
import { mkdir, mkdtemp, rm } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { google } from "googleapis"
import { firefox, Browser } from "playwright"

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
const concurrency = 5

const auth = new google.auth.GoogleAuth({
  keyFile: join(import.meta.dir, "../dev/credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
})
const sheetsAPI = google.sheets({ version: "v4", auth })

const getSheets = async (sheetID: string) => {
  const res = await sheetsAPI.spreadsheets.get({ spreadsheetId: sheetID })
  if (!res.data.sheets) return []
  return res.data.sheets
    .filter(
      (s) =>
        s.properties &&
        s.properties.title &&
        s.properties.sheetId !== undefined,
    )
    .map((s) => ({
      name: s.properties!.title!,
      gid: s.properties!.sheetId!,
    }))
}

const downloadSheet = async (sheetID: string, gid: number, name: string) => {
  const dir = await mkdtemp(join(tmpdir(), "gs2img-"))
  const htmlPath = join(dir, name.replace(/ /g, "_") + ".html")
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minutes
  try {
    const res = await fetch(
      `https://docs.google.com/spreadsheets/d/${sheetID}/export?format=html&gid=${gid}`,
      { signal: controller.signal },
    )
    clearTimeout(timeoutId)
    if (!res.ok) {
      throw new Error(
        `Failed to download ${name}: ${res.status} ${res.statusText}`,
      )
    }
    if (!res.body) throw new Error("No response body")
    await pipeline(
      Readable.fromWeb(res.body as any),
      createWriteStream(htmlPath),
    )
    return { htmlPath, dir }
  } catch (e) {
    clearTimeout(timeoutId)
    throw e
  }
}

const screenshot = async (
  htmlPath: string,
  pngPath: string,
  browser: Browser,
) => {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  })
  await page.goto("file://" + htmlPath, { timeout: 0 })

  try {
    const rowHeader = await page.$(".row-header-wrapper")
    if (!rowHeader) return
    const rowHeaderBox = await rowHeader.boundingBox()
    if (!rowHeaderBox) return
    const { width: rowHeaderWidth } = rowHeaderBox
    const tbody = await page.$("tbody")
    if (!tbody) return
    const boundingBox = await tbody.boundingBox()
    if (!boundingBox) return
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

    await page.screenshot({ path: pngPath, clip: clipArea })
  } catch (e) {
    console.error(e)
  } finally {
    await page.close()
  }
}

getSheets(sheetId).then(async (sheetList) => {
  await mkdir(outputDir, { recursive: true })

  const filteredSheets = sheetList
    .filter((s) => !excludeSheets.includes(s.name))
    .map((s) => ({ ...s, name: s.name.replace(/ /g, "_") }))

  const downloaded = []
  for (const sheet of filteredSheets) {
    try {
      const { htmlPath, dir } = await downloadSheet(
        sheetId,
        sheet.gid,
        sheet.name,
      )
      downloaded.push({ name: sheet.name, htmlPath, dir })
    } catch (e) {
      console.error(`Skipping ${sheet.name}`)
    }
  }

  const browser = await firefox.launch()
  const promises = new Set<Promise<void>>()

  for (const { name, htmlPath, dir } of downloaded) {
    const promise = screenshot(
      htmlPath,
      join(outputDir, name + ".jpeg"),
      browser,
    ).then(() => {
      promises.delete(promise)
      rm(dir, { force: true, recursive: true })
    })
    promises.add(promise)

    if (promises.size >= concurrency) {
      await Promise.race(promises)
    }
  }

  await Promise.all(promises)
  await browser.close()
})
