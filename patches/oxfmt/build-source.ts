import { spawnSync } from "node:child_process"
import { mkdirSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const upstreamRepository = "https://github.com/oxc-project/oxc.git"
const upstreamBaseCommit = "6e573f926e59235327193b095df6c976e90e1cac"
const patchRoot = import.meta.dirname
const sourcePatch = join(patchRoot, "source", "oxfmt-astro.patch")
const sourceRoot = join(tmpdir(), `ecgc-oxfmt-patch-${Date.now()}`)
const runTests = process.argv.includes("--test")

/** Build oxfmt JavaScript and native artifacts from the recorded source patch. */
export const buildPatchedOxfmtSource = (): void => {
  mkdirSync(sourceRoot, { recursive: true })

  try {
    run("git", ["clone", "--filter=blob:none", upstreamRepository, sourceRoot])
    run("git", ["fetch", "--depth=1", "origin", upstreamBaseCommit], sourceRoot)
    run("git", ["checkout", "--detach", "FETCH_HEAD"], sourceRoot)
    run("git", ["apply", sourcePatch], sourceRoot)
    run(
      "pnpm",
      ["install", "--filter", "oxfmt-app...", "--frozen-lockfile"],
      sourceRoot,
    )

    const appRoot = join(sourceRoot, "apps", "oxfmt")
    run("bun", ["run", "build-napi-release"], appRoot)
    run("bun", ["run", "build-js"], appRoot)

    if (runTests) {
      run(
        "bun",
        [
          "run",
          "test",
          "test/api/astro.test.ts",
          "test/cli/astro.test.ts",
          "test/lsp/astro/astro.test.ts",
        ],
        appRoot,
      )
    }

    console.log(`Built patched oxfmt source: ${appRoot}`)
    console.log(
      "Copy the required platform binding into patches/oxfmt/native/.",
    )
  } finally {
    rmSync(sourceRoot, { recursive: true, force: true })
  }
}

const run = (command: string, args: string[], cwd = patchRoot): void => {
  const result = spawnSync(command, args, { cwd, stdio: "inherit" })

  if (result.error) {
    throw new Error(`Failed to start ${command}: ${result.error.message}`)
  }

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`)
  }
}

if (import.meta.main) {
  buildPatchedOxfmtSource()
}
