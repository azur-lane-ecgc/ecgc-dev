import type { VanguardFleetRankingProps } from "@/db/types"

import { isDecentVG } from "../decentShips"

export const aswRole = (
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
): Set<string> => {
  const aswSet = new Set<string>()

  for (const shipName of Object.keys(VGFleetRankingData)) {
    const vgRankings = VGFleetRankingData[shipName]

    if (vgRankings && isDecentVG(shipName, VGFleetRankingData)) {
      for (const ranking of vgRankings) {
        if (ranking.asw) {
          aswSet.add(shipName)
          break
        }
      }
    }
  }

  return aswSet
}
