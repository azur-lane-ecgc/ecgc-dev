import type {
  VanguardFleetRankingProps,
  MainFleetRankingProps,
  SSFleetRankingProps,
} from "@db/types"

import { isDecentMainFleet, isDecentVG, isDecentSSFleet } from "../decentShips"

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

export const offensiveSupport = (): Set<string> => {
  const offensiveSupport = new Set<string>()

  for (const shipName of new Set([
    ...Object.keys(VGFleetRankingData),
    ...Object.keys(MainFleetRankingData),
    ...Object.keys(SSFleetRankingData),
  ])) {
    const vgRankings = VGFleetRankingData[shipName]
    if (vgRankings && isDecentVG(shipName)) {
      for (const ranking of vgRankings) {
        if (ranking.offensivebuff) {
          offensiveSupport.add(shipName)
          break
        }
      }
    }

    const mainRankings = MainFleetRankingData[shipName]
    if (mainRankings && isDecentMainFleet(shipName)) {
      for (const ranking of mainRankings) {
        if (ranking.offensivebuff) {
          offensiveSupport.add(shipName)
          break
        }
      }
    }

    const ssRankings = SSFleetRankingData[shipName]
    if (SSFleetRankingData[shipName] && isDecentSSFleet(shipName)) {
      for (const ranking of ssRankings) {
        if (ranking.offensivebuff) {
          offensiveSupport.add(shipName)
          break
        }
      }
    }
  }

  return offensiveSupport
}

export const defensiveSupport = (): Set<string> => {
  const defensiveSupport = new Set<string>()

  for (const shipName of new Set([
    ...Object.keys(VGFleetRankingData),
    ...Object.keys(MainFleetRankingData),
  ])) {
    const vgRankings = VGFleetRankingData[shipName]
    if (vgRankings && isDecentVG(shipName)) {
      for (const ranking of vgRankings) {
        if (ranking.defensivebuff) {
          defensiveSupport.add(shipName)
          break
        }
      }
    }

    const mainRankings = MainFleetRankingData[shipName]
    if (mainRankings && isDecentMainFleet(shipName)) {
      for (const ranking of mainRankings) {
        if (ranking.othermain || ranking.vgsurvival) {
          defensiveSupport.add(shipName)
          break
        }
      }
    }
  }

  return defensiveSupport
}
