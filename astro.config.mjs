// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: "https://samheart564.github.io/test_ecgc_2/",
  integrations: [tailwind(), react()],
  base: "/test_ecgc_2/",
  output: "static",
  trailingSlash: "ignore",
})
