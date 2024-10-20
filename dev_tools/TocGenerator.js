import fs from "fs"
import path from "path"

// Input array of objects with {name, path} structure
import { inputFiles } from "./_inputFiles.js"

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

  // Regex for <h2> and <h3> that captures the 'id' attribute and the inner text, ignoring other attributes
  const h2Regex = /<h2[^>]*\sid="([^"]+)"[^>]*>([^<]+)<\/h2>/g
  const h3Regex = /<h3[^>]*\sid="([^"]+)"[^>]*>([^<]+)<\/h3>/g

  let matchH2

  while ((matchH2 = h2Regex.exec(content)) !== null) {
    const h2Content = matchH2[2].trim()

    // Skip <h2> if the content is exactly "Introduction"
    if (h2Content === "Introduction") {
      continue
    }

    const h2 = {
      id: matchH2[1], // Capture 'id' attribute
      content: h2Content, // Capture inner text of <h2>
      subheadings: [], // Initialize subheadings
    }

    // Reset h3 regex index for each h2
    h3Regex.lastIndex = h2Regex.lastIndex

    let matchH3
    while ((matchH3 = h3Regex.exec(content)) !== null) {
      // Ensure the <h3> belongs to the current <h2> (appears after it but before the next <h2>)
      if (matchH3.index > h2Regex.lastIndex) break

      h2.subheadings.push({
        id: matchH3[1], // Capture 'id' attribute
        content: matchH3[2].trim(), // Capture inner text of <h3>
      })
    }

    headings.push(h2)
  }

  return headings
}

// Function to process the files and extract TOC
const processFiles = async () => {
  const tocData = []

  for (const file of inputFiles) {
    try {
      const content = await fs.promises.readFile(file.path, "utf8")
      const fileHeadings = extractHeadings(content)

      tocData.push({
        fileName: file.name,
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
