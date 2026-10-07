import { compressImages } from "./src/compressImages"

compressImages().catch((error) => {
  console.error("An error occurred while compressing images", error)
  process.exitCode = 1
})
