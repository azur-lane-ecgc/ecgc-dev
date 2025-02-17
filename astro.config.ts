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
      Exclude: [
        (File: string) =>
          File.includes("SiteIcon"),
      ],
    }),
  ],
  base: "/test_ecgc_2/",
  output: "static",
  trailingSlash: "never",
  devToolbar: { enabled: false },
  vite: {
    json: {
      stringify: true,
    },
    plugins: [
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
