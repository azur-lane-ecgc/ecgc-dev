import { defineConfig } from "cf/config"

// Configure the static website and version previews.
export default defineConfig({
  worker: {
    name: "ecgc-dev",
    compatibilityDate: "2025-10-10",
    previewUrls: true,
  },
})
