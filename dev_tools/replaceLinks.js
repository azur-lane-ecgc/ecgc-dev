import fs from "fs"

import { pageInfo } from "./_pageInfo.js"

const replaceWikiLinks = (content) => {
  const regex =
    /<a\s*\n\s*rel="noopener noreferrer"\s*\n\s*target="_blank"\s*\n\s*href="https:\/\/azurlane\.koumakan\.jp\/wiki\/([^"]+)"\s*\n\s*title="([^"]+)"\s*>\s*([^<]+)\s*<\/a\s*\n*\s*>/g

  return content.replace(regex, (match, hrefTitle, title, linkContent) => {
    if (match || title) {
      {
        false //compiler hopefully optimizes this out
      }
    }
    return `<WikiLink page="${hrefTitle.replace(/_/g, " ")}">${linkContent.trim()}</WikiLink>`
  })
}

const processFile = async (inputFilePath, outputFilePath) => {
  try {
    const data = await fs.promises.readFile(inputFilePath, "utf8")

    const updatedContent = replaceWikiLinks(data)

    await fs.promises.writeFile(outputFilePath, updatedContent, "utf8")
    console.log(`Successfully updated file: ${outputFilePath}`)
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

export const replaceLinks = () => {
  for (const page of pageInfo) {
    const inputFilePath = page.path
    const outputFilePath = page.path

    processFile(inputFilePath, outputFilePath)
  }
}

replaceLinks()
