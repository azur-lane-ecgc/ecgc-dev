import { copyFileSync, chmodSync, existsSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"

const nativeBindings = {
  "darwin-arm64": "native/darwin-arm64/oxfmt.darwin-arm64.node",
  "linux-x64-gnu": "native/linux-x64-gnu/oxfmt.linux-x64-gnu.node",
} as const

type NativePlatform = keyof typeof nativeBindings

/** Copy the matching patched oxfmt native binding into the installed package. */
export const installPatchedOxfmtNativeBinding = (): void => {
  const platform = getNativePlatform()
  const relativeBinding = nativeBindings[platform]
  const patchRoot = import.meta.dirname
  const sourceBinding = join(patchRoot, relativeBinding)
  const packageRoot = dirname(resolveOxfmtPackagePath())
  const destinationBinding = join(
    packageRoot,
    "dist",
    relativeBinding.split("/").at(-1) ?? "",
  )

  if (!existsSync(sourceBinding)) {
    throw new Error(
      `Patched oxfmt native binding is unavailable for ${platform}. Run patches/oxfmt/build-source.ts to build it.`,
    )
  }

  copyFileSync(sourceBinding, destinationBinding)
  chmodSync(destinationBinding, 0o755)
}

const getNativePlatform = (): NativePlatform => {
  if (process.platform === "darwin" && process.arch === "arm64") {
    return "darwin-arm64"
  }

  if (process.platform === "linux" && process.arch === "x64" && !isMusl()) {
    return "linux-x64-gnu"
  }

  throw new Error(
    `Patched oxfmt does not ship a native binding for ${process.platform}-${process.arch}.`,
  )
}

const isMusl = (): boolean => {
  const report = process.report?.getReport?.()
  const sharedObjects = report?.header?.sharedObjects ?? []
  return sharedObjects.some((sharedObject: string) =>
    sharedObject.includes("musl"),
  )
}

const resolveOxfmtPackagePath = (): string => {
  const require = createRequire(import.meta.url)
  return require.resolve("oxfmt/package.json")
}

if (import.meta.main) {
  installPatchedOxfmtNativeBinding()
}
