import fs from "fs"
import path from "path"

// Input array of objects with {name, path} structure
import { pageInfo } from "../src/components/_common/PageInfo/pageInfo.js"

// Path to the output JSON file
const outputFilePath = path.join(
  process.cwd(),
  "src/components/_common/Sidenav/TocContent.json",
)

// Function to clear or create a fresh JSON file at the start
const initializeJsonFile = async () => {
  await fs.promises.writeFile(
    outputFilePath,
    JSON.stringify([], null, 2),
    "utf8",
  )
}

// Function to extract <h2> and <h3> tags from an HTML file content
const extractHeadings = (content) => {
  const headings = []

  // Find all h2 and h3 matches first
  const h2Matches = [
    ...content.matchAll(/<h2[^>]*\sid="([^"]+)"[^>]*>([^<]+)<\/h2>/g),
  ]
  const h3Matches = [
    ...content.matchAll(/<h3[^>]*\sid="([^"]+)"[^>]*>([^<]+)<\/h3>/g),
  ]

  // Process each h2 heading
  for (let i = 0; i < h2Matches.length; i++) {
    const h2Match = h2Matches[i]
    const h2Content = h2Match[2].trim()

    // Skip if content is "Introduction"
    if (h2Content === "Introduction") {
      continue
    }

    const h2 = {
      id: h2Match[1],
      content: h2Content,
      subheadings: [],
    }

    // Find the next h2's position (or end of content if this is the last h2)
    const nextH2Position =
      i < h2Matches.length - 1 ? h2Matches[i + 1].index : content.length

    // Get all h3s between current h2 and next h2
    const h3sForThisSection = h3Matches.filter((h3Match) => {
      return h3Match.index > h2Match.index && h3Match.index < nextH2Position
    })

    // Add all matching h3s to the subheadings
    h2.subheadings = h3sForThisSection.map((h3Match) => ({
      id: h3Match[1],
      content: h3Match[2].trim(),
    }))

    headings.push(h2)
  }

  return headings
}

// Function to process the files and extract TOC
const processFiles = async () => {
  const tocData = []

  for (const page of pageInfo) {
    try {
      const content = await fs.promises.readFile(page.path, "utf8")
      const fileHeadings = extractHeadings(content)

      tocData.push({
        fileName: page.name,
        toc: fileHeadings,
      })
    } catch (error) {
      console.error(`Error reading file ${file.name}:`, error)
    }
  }

  // Write the extracted TOC data to the JSON file
  await fs.promises.writeFile(
    outputFilePath,
    JSON.stringify(tocData, null, 2),
    "utf8",
  )
  console.log(`Table of Contents saved to ${outputFilePath}`)
}

export const ToCGenerator = async () => {
  await initializeJsonFile()
  await processFiles()
}

ToCGenerator()
