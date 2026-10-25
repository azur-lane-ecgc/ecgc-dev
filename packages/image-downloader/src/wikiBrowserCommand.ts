interface BrowserResult {
  success: boolean
  data?: any
  error?: string | null
}

const browserSession = "ecgc-wiki-icons"

/** Runs a wiki browser command while reading both process output streams. */
export const runWikiBrowserCommand = async (
  args: string[],
  headed = false,
): Promise<any> => {
  const proc = Bun.spawn(
    [
      "bunx",
      "--package",
      "agent-browser@0.38.2",
      "agent-browser",
      ...(headed ? ["--headed"] : []),
      "--session",
      browserSession,
      ...args,
      "--json",
    ],
    { stdout: "pipe", stderr: "pipe" },
  )
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  if (exitCode !== 0) {
    throw new Error(`agent-browser ${args.join(" ")}: ${stderr || stdout}`)
  }

  const result = JSON.parse(stdout) as BrowserResult
  if (!result.success) {
    throw new Error(
      `agent-browser ${args.join(" ")}: ${JSON.stringify(result)}`,
    )
  }
  return result.data
}
