import type { MainFleetRankingProps } from "@/db/types"

export const flagshipPref = (
  shipName: string,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
): boolean => {
  const mainFleetRankings = MainFleetRankingData[shipName]

  if (mainFleetRankings) {
    for (const ranking of mainFleetRankings) {
      if (ranking.flagreq) {
        return true
      }
    }
  }

  return false
}
