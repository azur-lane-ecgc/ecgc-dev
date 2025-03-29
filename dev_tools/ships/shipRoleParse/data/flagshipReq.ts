import type { MainFleetRankingProps } from "@db/types"

const MainFleetRankingData: Record<string, MainFleetRankingProps[]> =
  (await import("@db/rankings/mainFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, MainFleetRankingProps[]>

const strictHulls: string[] = ["BB", "BC", "BBV", "BM"]

export const flagshipReq = (shipName: string, hullType: string): boolean => {
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
