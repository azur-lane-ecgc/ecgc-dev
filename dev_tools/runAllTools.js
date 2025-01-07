import fs from "fs/promises"
import path from "path"
import { promisify } from "util"
import { exec as execCallback } from "child_process"

const exec = promisify(execCallback)
const scriptsDirectory = "./dev_tools"
const excludedDirectories = ["gsheets2img"]
const excludedFiles = [
  /_pageInfo.js/,
  /runAllTools.js/,
  /index.js/,
  /samvaluationparser.js/,
  /imgur.py/,
]

const readAllFiles = async (dir) => {
  let files = []
  const dirents = await fs.readdir(dir, { withFileTypes: true })

  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)

    // Skip excluded directories
    if (dirent.isDirectory() && excludedDirectories.includes(dirent.name)) {
      continue
    }

    if (dirent.isDirectory()) {
      files = [...files, ...(await readAllFiles(res))]
    } else {
      const relativePath = path.relative(scriptsDirectory, res)
      files.push(relativePath)
    }
  }

  return files
}

const runScript = async (fileName) => {
  try {
    const { stdout, stderr } = fileName.endsWith(".py")
      ? await exec(`python3 ${path.join(scriptsDirectory, fileName)}`)
      : fileName.endsWith(".js")
        ? await exec(`node ${path.join(scriptsDirectory, fileName)}`)
        : ""

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
    const files = await readAllFiles(scriptsDirectory)

    // Skip excluded files
    const scriptFiles = files.filter(
      (file) =>
        (file.endsWith(".js") || file.endsWith(".py")) &&
        !excludedFiles.some((regex) => regex.test(file)),
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
    console.log(scriptFiles)
  } catch (error) {
    console.error("Error processing scripts:", error)
    process.exit(1)
  }
}

runAllScripts().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
