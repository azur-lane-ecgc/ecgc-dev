/**
 * Represents an item in the page information.
 * @typedef {Object} PageInfoItem
 * @property {string} name - The name of the page.
 * @property {string} path - The path to the page content.
 * @property {string[]} [authors] - An optional array of authors for the page.
 * @property {string} [lastUpdated] - An optional string representing the last updated date.
 */

/**
 * Page Information
 * @type {PageInfoItem[]}
 */
export const pageInfo = [
  {
    name: "Changelog",
    path: "src/components/Changelog/Changelog2024Content.astro",
  },
  {
    name: "Changelog2023",
    path: "src/components/Changelog/Changelog2023Content.astro",
  },
]
