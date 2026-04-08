import type { ShipEHPProps } from "@/db/types"

export const tankRole = (
  shipEHPData: Record<string, ShipEHPProps[]>,
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
  }

  return tankSet
}
