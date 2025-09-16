import type { Options } from "prettier"

const config: Options = {
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  plugins: [
    "@prettier/plugin-oxc",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-imports",
    "prettier-plugin-astro-organize-imports",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  useTabs: false,
  tabWidth: 2,
  endOfLine: "lf",
  tailwindStylesheet: "styles/global.css",
  tailwindConfig: "./tailwind.config.ts",
}

export default config
