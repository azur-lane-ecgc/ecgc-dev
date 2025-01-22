import type { ShipEHPProps } from "@data/ehp/types"
import jsonEHP from "@data/ehp/shipEHP.json"

const shipEHPData = jsonEHP as Record<string, ShipEHPProps[]>

export const superTankRole = (): Set<string> => {
  const tankSet = new Set<string>()

  for (const [shipName, statsArray] of Object.entries(shipEHPData)) {
    for (const stats of statsArray) {
      const totalEHP = parseFloat(stats.totalEHP.replace("%", ""))
      const std = parseFloat(stats.std.replace("%", ""))

      if (totalEHP - std >= 100) {
        tankSet.add(shipName)
        break
      }
    }
  }

  return tankSet
}
