import type {
  VanguardFleetRankingProps,
  MainFleetRankingProps,
} from "@db/types"
import type { ShipAAProps } from "@tools/python/aa_parsing/types"

import { isDecentMainFleet, isDecentVG } from "../decentShips"

const shipAAData = (await import("@tools/python/aa_parsing/shipAA.json").then(
  (module) => module.default,
)) as Record<string, ShipAAProps[]>

const VGFleetRankingData: Record<string, VanguardFleetRankingProps[]> =
  (await import("@db/rankings/vgFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, VanguardFleetRankingProps[]>

const MainFleetRankingData: Record<string, MainFleetRankingProps[]> =
  (await import("@db/rankings/mainFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, MainFleetRankingProps[]>

export const aaRole = (): Set<string> => {
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
    if (vgRankings && isDecentVG(shipName)) {
      for (const ranking of vgRankings) {
        if (ranking.aa && ranking.aa > 0) {
          aaSet.add(shipName)
          break
        }
      }
    }

    const mainRankings = MainFleetRankingData[shipName]
    if (mainRankings && isDecentMainFleet(shipName)) {
      for (const ranking of mainRankings) {
        if (ranking.aa && ranking.aa > 0) {
          aaSet.add(shipName)
          break
        }
      }
    }
  }

  return aaSet
}
