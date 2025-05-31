import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "@db/types"

const VGFleetRankingData: Record<string, VanguardFleetRankingProps[]> =
  (await import("@db/rankings/vgFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, VanguardFleetRankingProps[]>

const MainFleetRankingData: Record<string, MainFleetRankingProps[]> =
  (await import("@db/rankings/mainFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, MainFleetRankingProps[]>

const SSFleetRankingData: Record<string, SSFleetRankingProps[]> = (await import(
  "@db/rankings/ssFleetRankings.json"
).then((module) => module.default)) as Record<string, SSFleetRankingProps[]>

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

export const isDecentVG = (shipName: string): boolean => {
  const rankings = VGFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 1) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] >= 1) return true
      }
    }
  }
  return false
}

export const isDecentMainFleet = (shipName: string): boolean => {
  const rankings = MainFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 1) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] >= 1) return true
      }
    }
  }
  return false
}

export const isDecentSSFleet = (shipName: string): boolean => {
  const rankings = SSFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 1) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] >= 1) return true
      }
    }
  }
  return false
}

/* Good helpers (≥ 3) */

export const isGoodVGFleet = (shipName: string): boolean => {
  const rankings = VGFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 3) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] >= 3) return true
      }
    }
  }
  return false
}

export const isGoodMainFleet = (shipName: string): boolean => {
  const rankings = MainFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 3) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] >= 3) return true
      }
    }
  }
  return false
}

export const isGoodSSFleet = (shipName: string): boolean => {
  const rankings = SSFleetRankingData[shipName]
  if (!rankings) return false

  for (const ranking of rankings) {
    for (const [, value] of Object.entries(ranking)) {
      if (typeof value === "number" && value - 1 >= 3) return true
      if (typeof value === "string") {
        const s = sanitizeString(value)
        if (s && priorityOrder[s] >= 3) return true
      }
    }
  }
  return false
}
