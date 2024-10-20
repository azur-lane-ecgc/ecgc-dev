import fs from "fs"

import { inputFiles } from "./_inputFiles.js"

// Function to replace the specific link format
const replaceWikiLinks = (content) => {
  // Match the link structure, preserving newlines and spaces
  const regex =
    /<a\s*\n\s*rel="noopener noreferrer"\s*\n\s*target="_blank"\s*\n\s*href="https:\/\/azurlane\.koumakan\.jp\/wiki\/([^"]+)"\s*\n\s*title="([^"]+)"\s*>\s*([^<]+)\s*<\/a\s*\n\s*>/g

  // Replace the link format with the WikiLink component
  return content.replace(regex, (match, hrefTitle, title, linkContent) => {
    return `<WikiLink page="${hrefTitle.replace(/_/g, " ")}">${linkContent.trim()}</WikiLink>`
  })
}

// Main function to process the file
const processFile = async (inputFilePath, outputFilePath) => {
  try {
    // Read the file content
    const data = await fs.promises.readFile(inputFilePath, "utf8")

    // Replace the links using the hardcoded format
    const updatedContent = replaceWikiLinks(data)

    // Write the updated content back to the output file
    await fs.promises.writeFile(outputFilePath, updatedContent, "utf8")
    console.log(`Successfully updated file: ${outputFilePath}`)
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

export const replaceLinks = () => {
  for (const file of inputFiles) {
    const inputFilePath = file.path
    const outputFilePath = file.path

    processFile(inputFilePath, outputFilePath)
  }
}

replaceLinks()
