import { mkdir, rename } from "node:fs/promises"
import { fileURLToPath } from "node:url"

import {
  shipIconOutputDirectory,
  type MissingShipIcon,
} from "./missingShipIcons"

interface BrowserResult {
  success: boolean
  data?: any
  error?: string | null
}

interface DownloadMetadata {
  id: number
  ship: string
  icon: string
  sourceFilePage: string
  originalUrl: string
  statusCode: number
  mimeType: string
  bytes: number
  contentLength: number
  etag: string | null
  lastModified: string | null
  width: number
  height: number
  capturedResponses: number
  downloadedAt: string
}

const monorepoRoot = new URL("../../../", import.meta.url)
const evidenceRoot = new URL(".agents/evidence/image-downloader/", monorepoRoot)
const destinationRoot = new URL(shipIconOutputDirectory, monorepoRoot)
const browserSession = "ecgc-wiki-icons"
const minimumDelayMs = 60_000

const browser = async (args: string[], headed = false): Promise<any> => {
  const proc = Bun.spawn(
    [
      "bunx",
      "--package",
      "agent-browser@0.38.2",
      "agent-browser",
      ...(headed ? ["--headed"] : []),
      "--session",
      browserSession,
      ...args,
      "--json",
    ],
    { stdout: "pipe", stderr: "pipe" },
  )
  const stdout = await new Response(proc.stdout).text()
  const stderr = await new Response(proc.stderr).text()
  if ((await proc.exited) !== 0) {
    throw new Error(`agent-browser ${args.join(" ")}: ${stderr || stdout}`)
  }

  const result = JSON.parse(stdout) as BrowserResult
  if (!result.success) {
    throw new Error(
      `agent-browser ${args.join(" ")}: ${JSON.stringify(result)}`,
    )
  }
  return result.data
}

const readPngDimensions = (bytes: Uint8Array) => {
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  if (
    bytes.length < 24 ||
    !pngSignature.every((byte, index) => bytes[index] === byte)
  ) {
    throw new Error("Wiki response is not a PNG file")
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  return { width: view.getUint32(16), height: view.getUint32(20) }
}

const waitForFileTitle = async (expectedTitle: string) => {
  for (let attempt = 0; attempt < 10; attempt++) {
    const title = String((await browser(["get", "title"])).title ?? "")
    if (/Oh noes|Access Denied|Too Many Requests|HTTP 429/i.test(title)) {
      throw new Error(`Wiki protection or rate limit detected: ${title}`)
    }
    if (title.includes(expectedTitle)) return
    await Bun.sleep(2000)
  }
  throw new Error(`Wiki file page did not open: ${expectedTitle}`)
}

const extractOriginalPng = async (harPath: URL, target: MissingShipIcon) => {
  const har = await Bun.file(harPath).json()
  const originalPngEntries = har.log.entries.filter((entry: any) => {
    const requestUrl = new URL(entry.request.url)
    return (
      entry.response.status === 200 &&
      entry.response.content.mimeType === "image/png" &&
      requestUrl.hostname === "azurlane.netojuu.com" &&
      requestUrl.pathname.startsWith("/images/")
    )
  })
  if (originalPngEntries.length !== 1) {
    throw new Error(
      `Expected one original PNG response for ${target.iconFile}, found ${originalPngEntries.length}`,
    )
  }

  const entry = originalPngEntries[0]
  const content = entry.response.content
  if (content.encoding !== "base64") {
    throw new Error(`Original response is not base64 for ${target.iconFile}`)
  }

  const bytes = new Uint8Array(Buffer.from(content.text, "base64"))
  const headers = new Map(
    (entry.response.headers as Array<{ name: string; value: string }>).map(
      (header) => [header.name.toLowerCase(), header.value],
    ),
  )
  const contentLength = Number(headers.get("content-length"))
  if (!Number.isFinite(contentLength) || bytes.length !== contentLength) {
    throw new Error(`Original byte count mismatch for ${target.iconFile}`)
  }
  const dimensions = readPngDimensions(bytes)
  if (dimensions.width === 0 || dimensions.height === 0) {
    throw new Error(`Invalid PNG dimensions for ${target.iconFile}`)
  }

  return {
    bytes,
    metadata: {
      id: target.id,
      ship: target.ship,
      icon: target.iconFile,
      sourceFilePage: `https://azurlane.koumakan.jp/wiki/File:${encodeURIComponent(target.iconFile)}`,
      originalUrl: entry.request.url,
      statusCode: entry.response.status,
      mimeType: entry.response.content.mimeType,
      bytes: bytes.length,
      contentLength,
      etag: headers.get("etag") ?? null,
      lastModified: headers.get("last-modified") ?? null,
      width: dimensions.width,
      height: dimensions.height,
      capturedResponses: 0,
      downloadedAt: new Date().toISOString(),
    } satisfies DownloadMetadata,
  }
}

/** Downloads missing original ship icons slowly through agent-browser. */
export const downloadMissingShipIcons = async (
  targets: MissingShipIcon[],
): Promise<void> => {
  await mkdir(new URL("har", evidenceRoot), { recursive: true })
  await mkdir(new URL("metadata", evidenceRoot), { recursive: true })
  await mkdir(destinationRoot, { recursive: true })

  const progressPath = new URL("download-progress.json", evidenceRoot)
  const progress = await Bun.file(progressPath)
    .json()
    .catch(() => ({ completed: [] as string[] }))
  const completed = new Set<string>(progress.completed)

  console.log(
    JSON.stringify({
      event: "download-start",
      pendingCount: targets.length,
      delaySeconds: minimumDelayMs / 1000,
    }),
  )

  for (const target of targets) {
    const destinationPath = new URL(target.iconFile, destinationRoot)
    if (await Bun.file(destinationPath).exists()) {
      completed.add(target.iconFile)
      continue
    }

    console.log(
      JSON.stringify({
        event: "delay-start",
        seconds: minimumDelayMs / 1000,
        next: target.iconFile,
      }),
    )
    await Bun.sleep(minimumDelayMs)

    const filePage = `https://azurlane.koumakan.jp/wiki/File:${encodeURIComponent(target.iconFile)}`
    await browser(["open", filePage], true)
    await browser(["wait", "--load", "domcontentloaded"])
    await Bun.sleep(5000)
    await waitForFileTitle(target.iconFile)

    const harPath = new URL(`har/${target.iconFile}.har`, evidenceRoot)
    await browser(["network", "har", "start", "--content", "all"])
    let harData: any
    try {
      await browser(["find", "text", "Original file", "click"])
      await browser(["wait", "--load", "domcontentloaded"])
      await Bun.sleep(3000)
    } finally {
      harData = await browser([
        "network",
        "har",
        "stop",
        fileURLToPath(harPath),
      ])
    }

    const { bytes, metadata } = await extractOriginalPng(harPath, target)
    metadata.capturedResponses = harData.requestCount
    const temporaryPath = new URL(
      `${target.iconFile}.download`,
      destinationRoot,
    )
    await Bun.write(temporaryPath, bytes)
    await rename(temporaryPath, destinationPath)
    await Bun.write(
      new URL(`metadata/${target.iconFile}.json`, evidenceRoot),
      JSON.stringify(metadata, null, 2) + "\n",
    )
    completed.add(target.iconFile)
    progress.completed = [...completed]
    progress.updatedAt = new Date().toISOString()
    await Bun.write(progressPath, JSON.stringify(progress, null, 2) + "\n")
    console.log(JSON.stringify({ event: "icon-complete", ...metadata }))
  }

  progress.completed = [...completed]
  progress.finishedAt = new Date().toISOString()
  await Bun.write(progressPath, JSON.stringify(progress, null, 2) + "\n")
  console.log(
    JSON.stringify({
      event: "download-complete",
      completedCount: completed.size,
    }),
  )
}
