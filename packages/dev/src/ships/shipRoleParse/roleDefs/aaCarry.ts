import type {
  VanguardFleetRankingProps,
  MainFleetRankingProps,
} from "@/db/types"
import type { ShipAAProps } from "@/tools/aa_parsing/types"

import { isDecentMainFleet, isDecentVG } from "../decentShips"

export const aaCarryRole = (
  shipAAData: Record<string, ShipAAProps[]>,
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
): Set<string> => {
  const aaSet = new Set<string>()

  for (const shipName of Object.keys(shipAAData)) {
    const shipAAStats = shipAAData[shipName]
    if (shipAAStats) {
      for (const stats of shipAAStats) {
        const percentSD = parseFloat(stats.percentSD.replace("%", ""))
        if (percentSD >= 69) {
          aaSet.add(shipName)
          break
        }
      }
    }

    const vgRankings = VGFleetRankingData[shipName]
    if (vgRankings && isDecentVG(shipName, VGFleetRankingData)) {
      for (const ranking of vgRankings) {
        if (ranking.aa && ranking.aa >= 3) {
          aaSet.add(shipName)
          break
        }
      }
    }

    const mainRankings = MainFleetRankingData[shipName]
    if (mainRankings && isDecentMainFleet(shipName, MainFleetRankingData)) {
      for (const ranking of mainRankings) {
        if (ranking.aa && ranking.aa >= 2) {
          aaSet.add(shipName)
          break
        }
      }
    }
  }

  return aaSet
}
