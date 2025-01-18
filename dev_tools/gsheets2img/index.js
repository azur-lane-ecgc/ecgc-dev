import { createWriteStream } from "node:fs"
import { mkdir, mkdtemp, readdir, rm } from "node:fs/promises"
import { basename, dirname, extname, join, normalize } from "node:path"
import { tmpdir } from "node:os"
import { Readable } from "node:stream"
import { finished } from "node:stream/promises"
import config from "config"
import decompress from "decompress"
import { firefox } from "playwright"

async function download(sheetID) {
  const dir = await mkdtemp(join(tmpdir(), "gs2imgz-"))
  const zipPath = join(dir, sheetID + ".zip")
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${sheetID}/export?format=zip`,
  )
  await finished(Readable.fromWeb(res.body).pipe(createWriteStream(zipPath)))

  console.log("download done")
  return zipPath
}

async function unzip(zipPath) {
  const extractedDir = await mkdtemp(join(tmpdir(), "gs2imgx-"))
  await decompress(zipPath, extractedDir)
  await rm(dirname(zipPath), { force: true, recursive: true })

  console.log("unzip done")
  return extractedDir
}

async function screenshot(htmlPath, pngPath, browser) {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })
  await page.goto("file://" + htmlPath, { timeout: 0 })

  const rowHeader = await page.$(".row-header-wrapper")
  const { width: rowHeaderWidth } = await rowHeader.boundingBox()
  const tbody = await page.$("tbody")
  const boundingBox = await tbody.boundingBox()
  await page.setViewportSize({
    width: Math.ceil(boundingBox.width) + 10,
    height: Math.ceil(boundingBox.height) + 10,
  })

  boundingBox.x += rowHeaderWidth + 1
  boundingBox.width -= rowHeaderWidth + 1
  await page.screenshot({ path: pngPath, clip: boundingBox })
  await page.close()
}

async function main() {
  try {
    const extractedDir = await unzip(
      await download(config.get("gsheets2img.sheetID")),
    )
    const outputDir = normalize(config.get("gsheets2img.outputDir"))
    await mkdir(outputDir, { recursive: true })

    const files = await readdir(extractedDir)
    const includeSheets = config.get("gsheets2img.includeSheets")
    const excludeSheets = config.get("gsheets2img.excludeSheets")
    const sheetNames = files
      .filter((x) => extname(x) == ".html")
      .map((x) => basename(x).slice(0, -5))
      .filter(
        (x) =>
          (!Array.isArray(includeSheets) ||
            !includeSheets.length ||
            includeSheets.includes(x)) &&
          (!Array.isArray(excludeSheets) || !excludeSheets.includes(x)),
      )

    console.log("so far so good")
    const browser = await firefox.launch()
    console.log("playwright working")

    const promises = []

    for (const sheetName of sheetNames) {
      const fileName = sheetName.replace(/\s+/g, "_") + ".jpeg"
      console.log("Uploading", fileName)

      const promise = screenshot(
        join(extractedDir, sheetName + ".html"),
        join(outputDir, fileName),
        browser,
      ).then(() => promises.splice(promises.indexOf(promise), 1))
      promises.push(promise)

      if (promises.length >= config.get("gsheets2img.concurrency")) {
        await Promise.race(promises)
      }
    }

    await Promise.all(promises)
    await browser.close()
    await rm(extractedDir, { force: true, recursive: true })
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

main().catch(console.error)
