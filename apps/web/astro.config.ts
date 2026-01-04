// @ts-nocheck
import { defineConfig } from "astro/config"

// astro plugins
// import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import metaTags from "astro-meta-tags"

// vite plugins
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  // adapter: cloudflare({imageService: 'compile'}),
  site: "https://azurlaneecgc.com",
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        item.url = item.url.replace(/\/$/, "")
        return item
      },
    }),
    metaTags(),
  ],
  base: "/",
  output: "static",
  trailingSlash: "ignore",
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
