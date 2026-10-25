import { join } from "node:path"

import type { Browser, BrowserContext, Page } from "playwright"

const sheetCaptureConcurrency = 5
const sheetViewport = { width: 1920, height: 1080 }

/** Identifies a published sheet and its image output filename. */
export interface SheetImageSource {
  name: string
  url: string
  outputName: string
}

const captureSheetImage = async (
  page: Page,
  sheet: SheetImageSource,
  outputDirectory: string,
): Promise<void> => {
  console.log(`Processing: ${sheet.name}`)
  await page.setViewportSize(sheetViewport)
  await page.goto(sheet.url, { timeout: 60_000 })
  const tbody = page.locator("tbody").first()
  await tbody.waitFor({ state: "visible", timeout: 30_000 })
  const clip = await tbody.boundingBox()
  if (!clip) {
    throw new Error("Sheet table bounding box is unavailable", {
      cause: sheet.name,
    })
  }

  await page.setViewportSize({
    width: Math.max(sheetViewport.width, Math.floor(clip.width) + 100),
    height: Math.max(sheetViewport.height, Math.floor(clip.height) + 100),
  })
  const output = await page.screenshot({
    path: join(outputDirectory, sheet.outputName + ".jpeg"),
    clip,
  })
  if (output.length === 0) {
    throw new Error("Google Sheet image output is empty", { cause: sheet.name })
  }
}

/** Captures sheet images with at most five reusable browser pages. */
export const captureSheetImages = async (
  browser: Browser,
  sheets: SheetImageSource[],
  outputDirectory: string,
): Promise<void> => {
  const pendingSheets = sheets.values()
  let captureFailed = false

  const captureNextSheets = async () => {
    let context: BrowserContext | undefined
    try {
      context = await browser.newContext({
        viewport: sheetViewport,
        deviceScaleFactor: 2,
      })
      const page = await context.newPage()
      for (const sheet of pendingSheets) {
        if (captureFailed) break
        await captureSheetImage(page, sheet, outputDirectory)
      }
    } catch (error) {
      captureFailed = true
      throw error
    } finally {
      await context?.close()
    }
  }

  const results = await Promise.allSettled(
    Array.from(
      { length: Math.min(sheetCaptureConcurrency, sheets.length) },
      captureNextSheets,
    ),
  )
  const failure = results.find((result) => result.status === "rejected")
  if (failure) throw failure.reason
}
