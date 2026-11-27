import { fileURLToPath } from "node:url"

import { compressImages } from "./src/compressImages"

const buildOutputDirectory = fileURLToPath(
  new URL("../../apps/web/dist/", import.meta.url),
)

compressImages(buildOutputDirectory).catch((error) => {
  console.error("An error occurred while compressing images", error)
  process.exitCode = 1
})
