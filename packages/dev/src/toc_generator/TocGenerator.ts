import { writeFile } from "node:fs/promises"

import type { GuidePageContent } from "../replace_links/replaceLinks"

const outputFilePath =
  "../../apps/web/src/components/_common/Sidenav/TocContent.json"

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

const extractGuideHeadings = (content: string): Heading[] => {
  const headings: Heading[] = []
  let section: Heading | undefined

  for (const match of content.matchAll(
    /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g,
  )) {
    const heading = {
      id: match[2]!,
      content: extractHeadingText(match[3]!),
    }
    if (match[1] === "2") {
      section = undefined
      if (heading.content !== "Introduction") {
        section = { ...heading, subheadings: [] }
        headings.push(section)
      }
    } else if (section) {
      section.subheadings.push(heading)
    }
  }

  return headings
}

/** Writes the table of contents from guide content without reading the files again. */
export const main = async (guidePages: GuidePageContent[]): Promise<void> => {
  const tocData = guidePages.map((page) => ({
    fileName: page.fileName,
    toc: extractGuideHeadings(page.content),
  }))

  await writeFile(
    outputFilePath,
    JSON.stringify(
      tocData.sort((a, b) => a.fileName.localeCompare(b.fileName)),
      null,
      2,
    ) + "\n",
  )
  console.log("Table of Contents saved to " + outputFilePath)
}
