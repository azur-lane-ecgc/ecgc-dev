import fs from "fs/promises"
import path from "path"
import { promisify } from "util"
import { exec as execCallback } from "child_process"

const exec = promisify(execCallback)
const scriptsDirectory = "./dev_tools"
const excludedDirectories = ["_backup", "gsheets2img"]
const excludedFiles = [
  /_pageInfo\.ts/,
  /runAllTools\.ts/,
  /samvaluationparser\.ts/,
  /imgur\.py/,
  /\\rankings\.py/,
  /\\_backup/,
  /ships\\/,
  /ENV/,
]

const readAllFiles = async (dir: string): Promise<string[]> => {
  let files: string[] = []
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

const runScript = async (fileName: string): Promise<void> => {
  try {
    const pythonPath = path.join(scriptsDirectory, "ENV", "bin", "python")
    const pythonExecutable =
      process.platform === "win32"
        ? path.join(scriptsDirectory, "ENV", "Scripts", "python.exe")
        : pythonPath

    const { stdout, stderr }: { stdout: string; stderr: string } =
      fileName.endsWith(".py")
        ? await exec(
            `${pythonExecutable} ${path.join(scriptsDirectory, fileName)}`,
          )
        : fileName.endsWith(".ts")
          ? await exec(`bun run ${path.join(scriptsDirectory, fileName)}`)
          : { stdout: "", stderr: "" }

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
    await exec(`bash ${path.join(scriptsDirectory, "install.sh")}`)

    const files = await readAllFiles(scriptsDirectory)

    // Skip excluded files
    const scriptFiles = files.filter(
      (file) =>
        (file.endsWith(".ts") || file.endsWith(".py")) &&
        !excludedFiles.some((regex) => regex.test(file)),
    )

    console.log(`Found ${scriptFiles.length} scripts to run:\n`, scriptFiles)
    console.log()

    for (const scriptFile of scriptFiles) {
      try {
        console.log(`\x1b[36mStarting ${scriptFile}...\x1b[0m`)
        await runScript(scriptFile)
        console.log(`\x1b[32mCompleted ${scriptFile}\x1b[0m\n`)
      } catch (error) {
        console.error(`\x1b[31mFailed to run ${scriptFile}\x1b[0m`)
      }
    }

    await exec(`bash ${path.join(scriptsDirectory, "final.sh")}`)

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
