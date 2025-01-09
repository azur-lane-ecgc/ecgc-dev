// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://samheart564.github.io/test_ecgc_2/",
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    (await import("@playform/compress")).default({
      CSS: false,
      HTML: false,
      JavaScript: false,
    }),
  ],
  base: "/test_ecgc_2/",
  output: "static",
  trailingSlash: "ignore",
  devToolbar: { enabled: false },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("AzurLaneData")) {
              return "azur-lane-data"
            }
            if (id.includes("node_modules")) {
              return "vendor"
            }
          },
        },
      },
    },
    json: {
      stringify: true,
    },
  },
})
