import { readFile, writeFile } from "node:fs/promises"

import { pageInfo } from "../_pageInfo.js"

const outputFilePath =
  "../../apps/web/src/components/_common/Sidenav/TocContent.json"

const initializeJsonFile = async () => {
  await writeFile(outputFilePath, JSON.stringify([], null, 2) + "\n")
}

type Heading = {
  id: string
  content: string
  subheadings: Subheading[]
}

type Subheading = {
  id: string
  content: string
}

const extractHeadingText = (headingContent: string): string =>
  headingContent
    .replace(/\{"\s*"\}/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()

const extractHeadings = (content: string) => {
  const headings: Heading[] = []

  const h2Matches = [
    ...content.matchAll(
      /<h2[^>]*\sid="([^"]+)"[^>]*>((?:[^<]|(?!<\/h2>)[^>]*)*)<\/h2>/g,
    ),
  ].map((match) => ({
    index: match.index,
    values: [match[0], match[1], extractHeadingText(match[2] ?? "")],
  }))

  const h3Matches = [
    ...content.matchAll(
      /<h3[^>]*\sid="([^"]+)"[^>]*>((?:[^<]|(?!<\/h3>)[^>]*)*)<\/h3>/g,
    ),
  ].map((match) => ({
    index: match.index,
    values: [match[0], match[1], extractHeadingText(match[2] ?? "")],
  }))

  for (let i = 0; i < h2Matches.length; i++) {
    const h2Match = h2Matches[i]
    if (!h2Match) continue
    const h2Content = h2Match.values[2]

    if (h2Content === "Introduction") {
      continue
    }

    const h2: Heading = {
      id: h2Match.values[1] || "",
      content: h2Content || "",
      subheadings: [],
    }

    const nextH2Position =
      i < h2Matches.length - 1 ? h2Matches[i + 1]?.index : content.length

    const h3sForThisSection = h3Matches.filter((h3Match) => {
      if (!h2Match.index || !h3Match.index || !nextH2Position) return false
      return h3Match.index > h2Match.index && h3Match.index < nextH2Position
    })

    h2.subheadings = h3sForThisSection.map((h3Match) => ({
      id: h3Match.values[1] || "",
      content: h3Match.values[2] || "",
    }))

    headings.push(h2)
  }

  return headings
}

const processFiles = async () => {
  const tocData: { fileName: string; toc: Heading[] }[] = []

  for (const page of pageInfo) {
    try {
      const content = await readFile(page.path, "utf8")
      const fileHeadings = extractHeadings(content)

      tocData.push({
        fileName: page.name,
        toc: fileHeadings,
      })
    } catch (error) {
      console.error(`Error reading file ${page.name}:`, error)
    }
  }

  await writeFile(
    outputFilePath,
    JSON.stringify(
      tocData.sort((a, b) => a.fileName.localeCompare(b.fileName)),
      null,
      2,
    ) + "\n",
  )
  console.log(`Table of Contents saved to ${outputFilePath}`)
}

export const main = async (): Promise<void> => {
  await initializeJsonFile()
  await processFiles()
}
