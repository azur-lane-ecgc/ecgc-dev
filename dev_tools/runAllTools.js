import fs from "fs/promises"
import path from "path"
import { promisify } from "util"
import { exec as execCallback } from "child_process"

const exec = promisify(execCallback)
const scriptsDirectory = "./dev_tools"
const excludedFiles = ["_pageInfo.js", "runAllTools.js", "index.js", "imgur.py"]

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

const runAllScripts = async () => {
  try {
    const files = await fs.readdir(scriptsDirectory)

    const scriptFiles = files.filter(
      (file) => file.endsWith(".js") && !excludedFiles.includes(file),
    )

    console.log(`Found ${scriptFiles.length} scripts to run:`, scriptFiles)
    console.log()

    for (const scriptFile of scriptFiles) {
      try {
        console.log(`Starting ${scriptFile}...`)
        await runScript(scriptFile)
        console.log(`Completed ${scriptFile}\n`)
      } catch (error) {
        console.error(`Failed to run ${scriptFile}`)
      }
    }

    console.log("All devtools completed.")
  } catch (error) {
    console.error("Error processing scripts:", error)
    process.exit(1)
  }
}

runAllScripts().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
