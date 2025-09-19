import type {
  VanguardFleetRankingProps,
  MainFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"

import { isDecentMainFleet, isDecentVG, isDecentSSFleet } from "../decentShips"

export const offensiveSupport = (
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
  SSFleetRankingData: Record<string, SSFleetRankingProps[]>,
): Set<string> => {
  const offensiveSupport = new Set<string>()

  for (const shipName of new Set([
    ...Object.keys(VGFleetRankingData),
    ...Object.keys(MainFleetRankingData),
    ...Object.keys(SSFleetRankingData),
  ])) {
    const vgRankings = VGFleetRankingData[shipName]
    if (vgRankings && isDecentVG(shipName, VGFleetRankingData)) {
      for (const ranking of vgRankings) {
        if (ranking.offensivebuff) {
          offensiveSupport.add(shipName)
          break
        }
      }
    }

    const mainRankings = MainFleetRankingData[shipName]
    if (mainRankings && isDecentMainFleet(shipName, MainFleetRankingData)) {
      for (const ranking of mainRankings) {
        if (ranking.offensivebuff) {
          offensiveSupport.add(shipName)
          break
        }
      }
    }

    const ssRankings = SSFleetRankingData[shipName]
    if (ssRankings && isDecentSSFleet(shipName, SSFleetRankingData)) {
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

export const defensiveSupport = (
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
): Set<string> => {
  const defensiveSupport = new Set<string>()

  for (const shipName of new Set([
    ...Object.keys(VGFleetRankingData),
    ...Object.keys(MainFleetRankingData),
  ])) {
    const vgRankings = VGFleetRankingData[shipName]
    if (vgRankings && isDecentVG(shipName, VGFleetRankingData)) {
      for (const ranking of vgRankings) {
        if (ranking.defensivebuff) {
          defensiveSupport.add(shipName)
          break
        }
      }
    }

    const mainRankings = MainFleetRankingData[shipName]
    if (mainRankings && isDecentMainFleet(shipName, MainFleetRankingData)) {
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
