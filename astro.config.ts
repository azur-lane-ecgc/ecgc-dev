// @ts-nocheck
import { defineConfig } from "astro/config"

import cloudflare from "@astrojs/cloudflare"
import metaTags from "astro-meta-tags"

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  // adapter: cloudflare({imageService: 'compile'}),
  // site: "https://samheart564.github.io/ecgc-dev/",
  site: "https://azurlaneecgc.com",
  integrations: [
    react(),
    sitemap(),
    metaTags(),
    // (await import("@playform/compress")).default({
    //   CSS: false,
    //   HTML: false,
    //   JavaScript: false,
    //   Exclude: [
    //     (File: string) =>
    //       File.includes("SiteIcon"),
    //   ],
    // }),
  ],
  // base: "/ecgc-dev/",
  base: "/",
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
