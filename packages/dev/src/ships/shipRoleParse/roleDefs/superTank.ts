import type { ShipEHPProps } from "@/db/types"

export const superTankRole = (
  shipEHPData: Record<string, ShipEHPProps[]>,
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
  }

  return tankSet
}
