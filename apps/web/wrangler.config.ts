import { defineWranglerConfig } from "wrangler/experimental-config"

// Select the built website assets for the static Worker.
export default defineWranglerConfig({
  assetsDirectory: "./dist",
})
