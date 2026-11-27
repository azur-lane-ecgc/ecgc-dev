// astro plugins
// import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
// vite plugins
import tailwindcss from "@tailwindcss/vite"
import metaTags from "astro-meta-tags"
// @ts-nocheck
import { defineConfig } from "astro/config"

// https://astro.build/config
// Configure the guide site build and preserve spaces between inline elements.
export default defineConfig({
  // adapter: cloudflare({imageService: 'compile'}),
  site: "https://azurlaneecgc.com",
  integrations: [
    react(),
    sitemap({
      // Omit the changelog alias because its canonical URL is the 2026 page.
      filter: (page) => page !== "https://azurlaneecgc.com/changelog/",
    }),
    metaTags(),
  ],
  base: "/",
  output: "static",
  compressHTML: true,
  trailingSlash: "ignore",
  image: {
    layout: "constrained",
  },
  vite: {
    json: {
      stringify: true,
    },
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["**/dist/**", "**/dev/**", "**/node_modules/**"],
      },
    },
  },
})
