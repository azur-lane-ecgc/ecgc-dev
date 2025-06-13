import type { AstroComponentFactory } from "astro/runtime/server/index.js"

import Changelog2023Content from "./Changelog2023Content.astro"
import Changelog2024Content from "./Changelog2024Content.astro"
import Changelog2025Content from "./Changelog2025Content.astro"

export const YEARS = [2023, 2024, 2025]
export type Year = (typeof YEARS)[number]
export const LATEST_YEAR = YEARS[YEARS.length - 1]

/**
 * Mapping from year → Astro component for that year’s changelog.
 */
export const CONTENT_BY_YEAR: Record<Year, AstroComponentFactory> = {
  2023: Changelog2023Content,
  2024: Changelog2024Content,
  2025: Changelog2025Content,
}
