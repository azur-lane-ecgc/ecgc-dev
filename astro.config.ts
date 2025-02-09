// @ts-check
import { defineConfig } from "astro/config"

import netlify from "@astrojs/netlify"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"


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
  output: "server",
  trailingSlash: "ignore",
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

  adapter: netlify(),
})
