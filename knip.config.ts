import type { KnipConfig } from "knip"

const config: KnipConfig = {
  astro: {
    config: ["astro.config.{js,cjs,mjs,ts,mts}"],
    entry: [
      "src/content/config.ts",
      "src/content.config.ts",
      "src/pages/**/*.{astro,mdx,js,ts}",
      "!src/pages/**/_*",
      "!src/pages/**/_*/**",
      "src/content/**/*.mdx",
      "src/middleware.{js,ts}",
      "src/actions/index.{js,ts}",
    ],
    project: ["src/**/*", "dev/typescript/**/*"],
  },
  ignore: ["packages/AzurLaneData/**", "dev/**"],
}

export default config
