import type { MainFleetRankingProps } from "@/db/types"

const strictHulls: string[] = ["BB", "BC", "BBV", "BM"]

export const flagshipReq = (
  shipName: string,
  hullType: string,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
): boolean => {
  const mainFleetRankings = MainFleetRankingData[shipName]

  if (mainFleetRankings) {
    for (const ranking of mainFleetRankings) {
      if (
        ranking.flagreq &&
        (ranking.flagreq < -2 ||
          (ranking.flagreq < -1 && strictHulls.includes(hullType)))
      ) {
        return true
      }
    }
  }

  return false
}
