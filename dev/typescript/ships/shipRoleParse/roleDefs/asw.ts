import type { VanguardFleetRankingProps } from "@db/types"

import { isDecentVG } from "../decentShips"

const VGFleetRankingData: Record<string, VanguardFleetRankingProps[]> =
  (await import("@db/rankings/vgFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, VanguardFleetRankingProps[]>

export const aswRole = (): Set<string> => {
  const aswSet = new Set<string>()

  for (const shipName of Object.keys(VGFleetRankingData)) {
    const vgRankings = VGFleetRankingData[shipName]

    if (vgRankings && isDecentVG(shipName)) {
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
