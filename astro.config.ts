// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  site: "https://samheart564.github.io/test_ecgc_2/",
  integrations: [
    react(),
    sitemap(),
    (await import("@playform/compress")).default({
      CSS: false,
      HTML: false,
      JavaScript: false,
      Exclude: [(File: string) => File.includes("SiteIcon")],
    }),
  ],
  build: { format: "file" },
  base: "/test_ecgc_2/",
  output: "static",
  trailingSlash: "never",
  devToolbar: { enabled: false },
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
  },
})
