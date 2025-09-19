import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"

const priorityOrder: Record<string, number> = {
  SS: 5,
  S: 4,
  A: 3,
  B: 2,
  C: 1,
  D: 0,
  default: 0,
}

const sanitizeString = (str: string | null | undefined): string | null => {
  if (!str) return null
  return str.replace(/[^a-zA-Z]/g, "")
}

/* Decent helpers (≥ 1) */

export const isDecentVG = (
  shipName: string,
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
): boolean => {
  const rankings = VGFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 1) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] !== undefined && priorityOrder[s] >= 1)
          return true
      }
    }
  }
  return false
}

export const isDecentMainFleet = (
  shipName: string,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
): boolean => {
  const rankings = MainFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 1) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] !== undefined && priorityOrder[s] >= 1)
          return true
      }
    }
  }
  return false
}

export const isDecentSSFleet = (
  shipName: string,
  SSFleetRankingData: Record<string, SSFleetRankingProps[]>,
): boolean => {
  const rankings = SSFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 1) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] !== undefined && priorityOrder[s] >= 1)
          return true
      }
    }
  }
  return false
}

/* Good helpers (≥ 3) */

export const isGoodVGFleet = (
  shipName: string,
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
): boolean => {
  const rankings = VGFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 3) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] !== undefined && priorityOrder[s] >= 3)
          return true
      }
    }
  }
  return false
}

export const isGoodMainFleet = (
  shipName: string,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
): boolean => {
  const rankings = MainFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 3) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] !== undefined && priorityOrder[s] >= 3)
          return true
      }
    }
  }
  return false
}

export const isGoodSSFleet = (
  shipName: string,
  SSFleetRankingData: Record<string, SSFleetRankingProps[]>,
): boolean => {
  const rankings = SSFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 3) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] !== undefined && priorityOrder[s] >= 3)
          return true
      }
    }
  }
  return false
}
