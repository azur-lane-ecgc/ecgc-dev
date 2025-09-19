import type { ShipEHPProps } from "@/db/types"
import type { VanguardFleetRankingProps } from "@/db/types"

export const superTankRole = (
  shipEHPData: Record<string, ShipEHPProps[]>,
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
): Set<string> => {
  const tankSet = new Set<string>()

  for (const shipName of Object.keys(shipEHPData)) {
    const statsArray = shipEHPData[shipName]
    if (statsArray) {
      for (const stats of statsArray) {
        const totalEHP = parseFloat(stats.totalEHP.replace("%", ""))
        const std = parseFloat(stats.std.replace("%", ""))

        if (totalEHP - std >= 100) {
          tankSet.add(shipName)
          break
        }
      }
    }

    const rankings = VGFleetRankingData[shipName]
    if (rankings) {
      for (const ranking of rankings) {
        if (ranking.selfsurvival && ranking.selfsurvival >= 5) {
          tankSet.add(shipName)
          break
        }
      }
    }
  }

  return tankSet
}
