import fs from "fs/promises"
import path from "path"
import { promisify } from "util"
import { exec as execCallback } from "child_process"

// Convert exec to promise-based version
const exec = promisify(execCallback)

// Directory where your script files are located
const scriptsDirectory = "./dev_tools"

// User-specified array of files to exclude
const excludedFiles = ["_inputFiles.js", "runAllTools.js"]

// Helper function to run a script
const runScript = async (fileName) => {
  try {
    const { stdout, stderr } = await exec(
      `node ${path.join(scriptsDirectory, fileName)}`,
    )

    if (stderr) {
      console.error(`Stderr from ${fileName}:`, stderr)
    }

    console.log(stdout)
  } catch (error) {
    console.error(`Error running script ${fileName}:`, error)
    throw error
  }
}

// Main function to find and run scripts
const runAllScripts = async () => {
  try {
    // Read the files in the "dev_tools" directory
    const files = await fs.readdir(scriptsDirectory)

    // Filter out excluded files and non-JS files
    const scriptFiles = files.filter(
      (file) => file.endsWith(".js") && !excludedFiles.includes(file),
    )

    console.log(`Found ${scriptFiles.length} scripts to run:`, scriptFiles)
    console.log()

    // Run scripts sequentially
    for (const scriptFile of scriptFiles) {
      try {
        console.log(`Starting ${scriptFile}...`)
        await runScript(scriptFile)
        console.log(`Completed ${scriptFile}\n`)
      } catch (error) {
        console.error(`Failed to run ${scriptFile}`)
        // Continue with next script even if one fails
      }
    }

    console.log("All devtools completed.")
  } catch (error) {
    console.error("Error processing scripts:", error)
    process.exit(1)
  }
}

// Run the script
runAllScripts().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
