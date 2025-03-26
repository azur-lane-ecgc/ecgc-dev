// @ts-nocheck
import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"

import metaTags from "astro-meta-tags"

// https://astro.build/config
export default defineConfig({
  site: "https://samheart564.github.io/test_ecgc_2/",
  integrations: [
    react(),
    sitemap(),
    metaTags(),
    (await import("@playform/compress")).default({
      CSS: false,
      HTML: false,
      JavaScript: false,
      Exclude: [(File: string) => File.includes("SiteIcon")],
    }),
  ],
  base: "/test_ecgc_2/",
  output: "static",
  trailingSlash: "ignore",
  vite: {
    json: {
      stringify: true,
    },
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: [
            [
              "babel-plugin-react-compiler",
              {
                sources: (filename: string) => {
                  return filename.endsWith(".tsx")
                },
              },
            ],
          ],
        },
      }),
    ],
    server: {
      watch: {
        ignored: ["**/dist/**", "**/dev_tools/**", "**/node_modules/**"],
      },
    },
  },
})
