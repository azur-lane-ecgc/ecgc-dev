import { createWriteStream } from "node:fs"
import { mkdir, mkdtemp, readdir, rm } from "node:fs/promises"
import { basename, dirname, extname, join } from "node:path"
import { tmpdir } from "node:os"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import yauzl from "yauzl-promise"
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

const download = async (sheetID: string) => {
  const dir = await mkdtemp(join(tmpdir(), "gs2imgz-"))
  const zipPath = join(dir, sheetID + ".zip")
  const controller = new AbortController()
  setTimeout(() => controller.abort(), 600000)
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${sheetID}/export?format=zip`,
    { signal: controller.signal, verbose: true },
  )
  if (!res.body) throw new Error("No response body")
  await pipeline(Readable.fromWeb(res.body as any), createWriteStream(zipPath))
  return zipPath
}

const unzip = async (zipPath: string) => {
  const extractedDir = await mkdtemp(join(tmpdir(), "gs2imgx-"))
  const zip = await yauzl.open(zipPath)

  try {
    for await (const entry of zip) {
      const targetPath = join(extractedDir, entry.filename)
      if (entry.filename.endsWith("/")) {
        // directory
        await mkdir(targetPath, { recursive: true })
      } else {
        // file
        const readStream = await entry.openReadStream()
        await mkdir(dirname(targetPath), { recursive: true })
        await pipeline(readStream, createWriteStream(targetPath))
      }
    }
  } finally {
    await zip.close()
  }

  await rm(dirname(zipPath), { force: true, recursive: true })
  return extractedDir
}

const screenshot = async (
  htmlPath: string,
  pngPath: string,
  browser: Browser,
) => {
  const page = await browser.newPage({
    viewport: { width: 10000, height: 10000 },
    deviceScaleFactor: 1,
  })

  // Set a longer timeout for navigation
  await page.goto("file://" + htmlPath, {
    timeout: 0,
    waitUntil: "networkidle",
  })

  try {
    // Wait for the table body to be present
    await page.waitForSelector("tbody", { timeout: 10000 })

    // Wait for all images to load
    await page.waitForLoadState("load")

    // Wait for images with proper error handling
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        const images = Array.from(document.images)
        if (images.length === 0) {
          resolve()
          return
        }

        let loadedCount = 0
        const totalImages = images.length

        const checkComplete = () => {
          loadedCount++
          if (loadedCount === totalImages) {
            resolve()
          }
        }

        images.forEach((img) => {
          if (img.complete) {
            checkComplete()
          } else {
            img.addEventListener("load", checkComplete, { once: true })
            img.addEventListener("error", checkComplete, { once: true })
            // Force reload if src is set but not loading
            if (img.src && !img.complete) {
              const src = img.src
              img.src = ""
              img.src = src
            }
          }
        })

        // Timeout after 30 seconds
        setTimeout(() => resolve(), 30000)
      })
    })

    // Additional wait to ensure all content is fully rendered
    await page.waitForTimeout(3000)

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

    // Set viewport to accommodate full content
    await page.setViewportSize({
      width: Math.max(10000, Math.floor(clipArea.x + clipArea.width) + 100),
      height: Math.max(10000, Math.floor(clipArea.y + clipArea.height) + 100),
    })

    // Wait a bit more after viewport change
    await page.waitForTimeout(1000)

    await page.screenshot({ path: pngPath, clip: clipArea, fullPage: false })
  } catch (e) {
    console.error(e)
  } finally {
    await page.close()
  }
}

download(sheetId)
  .then(unzip)
  .then(async (extractedDir) => {
    await mkdir(outputDir, { recursive: true })

    const files = await readdir(extractedDir)
    const sheets = files
      .filter((x) => extname(x) == ".html")
      .map((x) => basename(x).slice(0, -5))
      .filter(
        (name) =>
          (!Array.isArray(includeSheets) ||
            !includeSheets.length ||
            includeSheets.includes(name)) &&
          (!Array.isArray(excludeSheets) || !excludeSheets.includes(name)),
      )
      .map((name) => ({
        original: name + ".html",
        modified: name.replace(/ /g, "_"),
      }))
    const browser = await firefox.launch()
    const promises = new Set<Promise<void>>()

    for (const { original, modified } of sheets) {
      const promise = screenshot(
        join(extractedDir, original),
        join(outputDir, modified + ".jpeg"),
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
    await rm(extractedDir, { force: true, recursive: true })
  })
