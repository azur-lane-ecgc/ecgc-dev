import type { ShipEHPProps } from "@/db/types"
import type { VanguardFleetRankingProps } from "@/db/types"

export const tankRole = (
  shipEHPData: Record<string, ShipEHPProps[]>,
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
): Set<string> => {
  const tankSet = new Set<string>()

  for (const [shipName, statsArray] of Object.entries(shipEHPData)) {
    for (const stats of statsArray) {
      const totalEHP = parseFloat(stats.totalEHP.replace("%", ""))
      const std = parseFloat(stats.std.replace("%", ""))

      if (totalEHP - std >= 75) {
        tankSet.add(shipName)
        break
      }
    }

    const rankings = VGFleetRankingData[shipName]
    if (!!rankings) {
      for (const ranking of rankings) {
        if (ranking.selfsurvival && ranking.selfsurvival >= 3) {
          tankSet.add(shipName)
          break
        }
      }
    }
  }

  return tankSet
}
