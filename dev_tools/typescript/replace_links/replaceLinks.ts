import fs from "fs"

import { pageInfo } from "../_pageInfo"

const hardCodedPaths = ["src/components/Equipment/AugmentModules.astro"]

const replaceWikiLinks = (content: string): string => {
  const regex =
    /<a\s*\n*\s*rel="noopener noreferrer"\s*\n*\s*target="_blank"\s*\n*\s*href="https:\/\/azurlane\.koumakan\.jp\/wiki\/([^"]+)"\s*\n*\s*title="([^"]+)"\s*>\s*([^<]+)\s*<\/a\s*\n*\s*>/g

  return content.replace(regex, (match, hrefTitle, title, linkContent) => {
    if (match) {
      {
        false //compiler hopefully optimizes this out
      }
    }
    return `<WikiLink page="${hrefTitle.replace(/_/g, " ")}" title="${title.trim()}">${linkContent.trim()}</WikiLink>`
  })
}

const replaceWikiLinksTwo = (content: string): string => {
  const regex2 =
    /<a\s*\n*\s*rel="noopener noreferrer"\s*\n*\s*target="_blank"\s*\n*\s*href="https:\/\/azurlane\.koumakan\.jp\/wiki\/([^"]+)"\s*\n*\s*>\s*([^<]+)\s*<\/a\s*\n*\s*>/g
  return content.replace(regex2, (match, hrefTitle, linkContent) => {
    if (match) {
      {
        false //compiler hopefully optimizes this out
      }
    }
    return `<WikiLink page="${hrefTitle.replace(/_/g, " ")}">${linkContent.trim()}</WikiLink>`
  })
}

const processFile = async (inputFilePath: string, outputFilePath: string) => {
  try {
    const data = await fs.promises.readFile(inputFilePath, "utf8")

    let updatedContent = replaceWikiLinks(data)
    updatedContent = replaceWikiLinksTwo(updatedContent)

    await fs.promises.writeFile(outputFilePath, updatedContent, "utf8")
    console.log(`Successfully updated file: ${outputFilePath}`)
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

export const replaceLinks = () => {
  for (const page of pageInfo) {
    processFile(`../../${page.path}`, `../../${page.path}`)
  }

  for (const path of hardCodedPaths) {
    processFile(`../../${path}`, `../../${path}`)
  }
}

replaceLinks()
