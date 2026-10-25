import { readFile, writeFile } from "node:fs/promises"

import { pageInfo } from "../_pageInfo"

const hardCodedPaths = [
  "../../apps/web/src/components/Equipment/AugmentModules.astro",
]

/** Contains guide page content after wiki link replacement. */
export interface GuidePageContent {
  fileName: string
  content: string
}

const replaceWikiLinks = (content: string): string => {
  const regex =
    /<a\s*\n*\s*rel="noopener noreferrer"\s*\n*\s*target="_blank"\s*\n*\s*href="https:\/\/azurlane\.koumakan\.jp\/wiki\/([^"]+)"\s*\n*\s*title="([^"]+)"\s*>\s*([^<]+)\s*<\/a\s*\n*\s*>/g

  return content.replace(regex, (_match, hrefTitle, title, linkContent) => {
    return `<WikiLink page="${hrefTitle.replace(/_/g, " ")}" title="${title.trim()}">${linkContent.trim()}</WikiLink>`
  })
}

const replaceWikiLinksTwo = (content: string): string => {
  const regex2 =
    /<a\s*\n*\s*rel="noopener noreferrer"\s*\n*\s*target="_blank"\s*\n*\s*href="https:\/\/azurlane\.koumakan\.jp\/wiki\/([^"]+)"\s*\n*\s*>\s*([^<]+)\s*<\/a\s*\n*\s*>/g
  return content.replace(regex2, (_match, hrefTitle, linkContent) => {
    return `<WikiLink page="${hrefTitle.replace(/_/g, " ")}">${linkContent.trim()}</WikiLink>`
  })
}

const updateGuideFile = async (filePath: string): Promise<string> => {
  const data = await readFile(filePath, "utf8")

  let updatedContent = replaceWikiLinks(data)
  updatedContent = replaceWikiLinksTwo(updatedContent)

  if (updatedContent !== data) {
    await writeFile(filePath, updatedContent)
    console.log(`Updated wiki links: ${filePath}`)
  }
  return updatedContent
}

/** Updates guide wiki links and returns content for table of contents generation. */
export const main = async (): Promise<GuidePageContent[]> => {
  const [guidePages] = await Promise.all([
    Promise.all(
      pageInfo.map(async (page) => ({
        fileName: page.name,
        content: await updateGuideFile(page.path),
      })),
    ),
    Promise.all(hardCodedPaths.map(updateGuideFile)),
  ])
  return guidePages
}
