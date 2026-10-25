import { expect, test } from "bun:test"

import type { Browser } from "playwright"

import { captureSheetImages, type SheetImageSource } from "./sheetImageCapture"

const createSheetSources = (count: number): SheetImageSource[] =>
  Array.from({ length: count }, (_, index) => ({
    name: `Sheet ${index}`,
    outputName: `Sheet_${index}`,
    url: `https://example.invalid/${index}`,
  }))

const createLocalSheetBrowser = (
  failure?: "context" | "navigation" | "empty",
) => {
  const captured: string[] = []
  const navigationViewports: { width: number; height: number }[] = []
  let createdPages = 0
  let closedContexts = 0
  let activeContexts = 0
  let maximumContexts = 0
  let contextRequests = 0

  const browser = {
    newContext: async () => {
      if (failure === "context" && contextRequests++ === 0) {
        throw new Error("Local sheet context failure")
      }
      activeContexts++
      maximumContexts = Math.max(maximumContexts, activeContexts)
      let viewport = { width: 1920, height: 1080 }
      let url = ""
      return {
        newPage: async () => {
          createdPages++
          return {
            setViewportSize: async (size: typeof viewport) => {
              viewport = size
            },
            goto: async (nextUrl: string) => {
              url = nextUrl
              navigationViewports.push(viewport)
              if (failure === "navigation" && url.endsWith("/0")) {
                throw new Error("Local sheet navigation failure")
              }
              await Bun.sleep(1)
            },
            locator: () => ({
              first: () => ({
                waitFor: async () => {},
                boundingBox: async () => ({
                  x: 0,
                  y: 0,
                  width: 2400,
                  height: 1600,
                }),
              }),
            }),
            screenshot: async () => {
              captured.push(url)
              return failure === "empty"
                ? Buffer.alloc(0)
                : Buffer.from("image")
            },
          }
        },
        close: async () => {
          closedContexts++
          activeContexts--
        },
      }
    },
  } as unknown as Browser

  return {
    browser,
    captured,
    navigationViewports,
    get createdPages() {
      return createdPages
    },
    get closedContexts() {
      return closedContexts
    },
    get maximumContexts() {
      return maximumContexts
    },
  }
}

test("reuses five pages and resets each viewport between sheets", async () => {
  const local = createLocalSheetBrowser()
  const sheets = createSheetSources(13)
  await captureSheetImages(local.browser, sheets, "/unused")

  expect(local.createdPages).toBe(5)
  expect(local.maximumContexts).toBe(5)
  expect(local.closedContexts).toBe(5)
  expect(local.captured.toSorted()).toEqual(
    sheets.map((sheet) => sheet.url).toSorted(),
  )
  expect(local.navigationViewports).toEqual(
    sheets.map(() => ({ width: 1920, height: 1080 })),
  )
})

test("does not create pages when no sheets need capture", async () => {
  const local = createLocalSheetBrowser()
  await captureSheetImages(local.browser, [], "/unused")
  expect(local.createdPages).toBe(0)
})

test("closes all contexts and stops scheduling after capture fails", async () => {
  const local = createLocalSheetBrowser("navigation")
  await expect(
    captureSheetImages(local.browser, createSheetSources(13), "/unused"),
  ).rejects.toThrow("Local sheet navigation failure")
  expect(local.closedContexts).toBe(local.createdPages)
  expect(local.navigationViewports.length).toBeLessThanOrEqual(5)
})

test("rejects empty image output and closes the context", async () => {
  const local = createLocalSheetBrowser("empty")
  await expect(
    captureSheetImages(local.browser, createSheetSources(1), "/unused"),
  ).rejects.toThrow("Google Sheet image output is empty")
  expect(local.closedContexts).toBe(1)
})

test("stops scheduling when a browser context cannot start", async () => {
  const local = createLocalSheetBrowser("context")
  await expect(
    captureSheetImages(local.browser, createSheetSources(13), "/unused"),
  ).rejects.toThrow("Local sheet context failure")
  expect(local.navigationViewports.length).toBe(0)
  expect(local.closedContexts).toBe(local.createdPages)
})
