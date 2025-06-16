// import { promises } from "fs"
// import fs from "fs"

// // Hardcoded file paths
// const inputFilePath = "dev_tools/samvaluation.html" // Input HTML file
// const outputFilePath =
//   "src/components/Samvaluations/ShipModal/utils/shipSamvaluationParse/data.json" // Output JSON file

// // Helper function to extract data from a table in HTML
// function extractDataFromTable(tableHtml, eventName, eventHref) {
//   const rows = tableHtml.match(/<tr>[\s\S]*?<\/tr>/g) || []
//   const ships = {}

//   rows.forEach((row, index) => {
//     // Skip the header row
//     if (index === 0) return

//     // Extract table cells
//     const cells = row.match(/<td>[\s\S]*?<\/td>/g) || []
//     if (cells.length !== 2) return

//     // Extract ship name
//     const shipMatch = cells[0].match(/<a[^>]*title="([^"]+)"/)
//     const shipName = shipMatch ? shipMatch[1] : "Unknown Ship"

//     // Extract evaluation (keep all HTML tags)
//     const evaluationRaw = cells[1]
//       .replace(/<td>/g, "")
//       .replace(/<\/td>/g, "")
//       .replace(/<p>/g, "")
//       .replace(/<\/p>/g, "")
//       .replace(/\s+/g, " ")
//       .trim()

//     // Add ship details to output
//     ships[shipName] = {
//       event: { name: eventName, href: eventHref },
//       evaluation: `${evaluationRaw}`,
//     }
//   })

//   return ships
// }

// // Helper function to extract event and table information
// function extractData(html) {
//   const output = {}
//   const eventBlocks =
//     html.match(/<h3[^>]*>[\s\S]*?<table[\s\S]*?<\/table>/g) || []

//   eventBlocks.forEach((block) => {
//     // Extract event name and href (from <a> tag inside <h3>)
//     const h3Match = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/g)
//     const eventMatch = h3Match[0].match(
//       /<a[^<]*href="(.*)"[^<]*>(.*)<\/a\n*\s*\n*\s*>/,
//     )
//     const eventName = eventMatch ? eventMatch[2] : "Unknown Event"
//     const eventHref = eventMatch ? eventMatch[1].replace(/\s/g, "_") : ""

//     // Extract the table HTML
//     const tableMatch = block.match(/<table[\s\S]*?<\/table>/)
//     if (!tableMatch) return

//     const tableHtml = tableMatch[0]
//     const ships = extractDataFromTable(tableHtml, eventName, eventHref)

//     Object.assign(output, ships)
//   })

//   return output
// }

// // /<h3[^>]*>\n*\s*<a[^<]*href="(.*)"[^<]*>(.*)<\/a\n*\s*\n*\s*>.*\n*.*<\/h3>/g

// // Main function to process the HTML file
// async function processHTML() {
//   try {
//     fs.writeFile(outputFilePath, "", (err) => {
//       if (err) {
//         console.error("Error clearing file:", err)
//       } else {
//         console.log("File cleared successfully.")
//       }
//     })
//     // Read the input file
//     const html = await promises.readFile(inputFilePath, "utf8")

//     // Extract the data
//     const extractedData = extractData(html)

//     // Write the output JSON file
//     await promises.writeFile(
//       outputFilePath,
//       JSON.stringify(extractedData, null, 2),
//       "utf8",
//     )
//     console.log(`Output written to ${outputFilePath}`)
//   } catch (err) {
//     console.error(`Error: ${err.message}`)
//   }
// }

// // Execute the script
// processHTML()
