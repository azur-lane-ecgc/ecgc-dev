import type { ShipEHPProps } from "@data/ehp/types"
import type { VanguardFleetRankingProps } from "@data/rankings/types"

const shipEHPData = (await import("@data/ehp/shipEHP.json").then(
  (module) => module.default,
)) as Record<string, ShipEHPProps[]>

const VGFleetRankingData: Record<string, VanguardFleetRankingProps[]> =
  (await import("@data/rankings/vgFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, VanguardFleetRankingProps[]>

export const superTankRole = (): Set<string> => {
  const tankSet = new Set<string>()

  for (const shipName of Object.keys(shipEHPData)) {
    const statsArray = shipEHPData[shipName]
    for (const stats of statsArray) {
      const totalEHP = parseFloat(stats.totalEHP.replace("%", ""))
      const std = parseFloat(stats.std.replace("%", ""))

      if (totalEHP - std >= 100) {
        tankSet.add(shipName)
        break
      }
    }

    const rankings = VGFleetRankingData[shipName]
    if (!!rankings) {
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
