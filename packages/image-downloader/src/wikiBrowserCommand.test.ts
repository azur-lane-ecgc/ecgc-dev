import { expect, spyOn, test } from "bun:test"

import { runWikiBrowserCommand } from "./wikiBrowserCommand"

const spawnProcess = Bun.spawn

test("reads stderr while the wiki browser process waits to write stdout", async () => {
  const child = spawnProcess(
    [
      process.execPath,
      "--eval",
      'await Bun.write(Bun.stderr, "x".repeat(2 * 1024 * 1024)); console.log(JSON.stringify({ success: true, data: { title: "Local test" } }))',
    ],
    { stdout: "pipe", stderr: "pipe" },
  )
  const spawn = spyOn(Bun, "spawn").mockReturnValue(child)
  try {
    expect(await runWikiBrowserCommand(["get", "title"])).toEqual({
      title: "Local test",
    })
    expect(spawn).toHaveBeenCalledTimes(1)
  } finally {
    child.kill()
    spawn.mockRestore()
  }
}, 5000)

test("reports a failed local browser process", async () => {
  const child = spawnProcess(
    [
      process.execPath,
      "--eval",
      'console.error("Local browser failure"); process.exit(7)',
    ],
    { stdout: "pipe", stderr: "pipe" },
  )
  const spawn = spyOn(Bun, "spawn").mockReturnValue(child)
  try {
    await expect(runWikiBrowserCommand(["get", "title"])).rejects.toThrow(
      "Local browser failure",
    )
  } finally {
    child.kill()
    spawn.mockRestore()
  }
})

test("reports an unsuccessful wiki browser response", async () => {
  const child = spawnProcess(
    [
      process.execPath,
      "--eval",
      'console.log(JSON.stringify({ success: false, error: "Local response failure" }))',
    ],
    { stdout: "pipe", stderr: "pipe" },
  )
  const spawn = spyOn(Bun, "spawn").mockReturnValue(child)
  try {
    await expect(runWikiBrowserCommand(["get", "title"])).rejects.toThrow(
      "Local response failure",
    )
  } finally {
    child.kill()
    spawn.mockRestore()
  }
})
