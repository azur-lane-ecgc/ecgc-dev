import type { MainFleetRankingProps } from "@db/types"

const MainFleetRankingData: Record<string, MainFleetRankingProps[]> =
  (await import("@db/rankings/mainFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, MainFleetRankingProps[]>

export const flagshipPref = (shipName: string): boolean => {
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
