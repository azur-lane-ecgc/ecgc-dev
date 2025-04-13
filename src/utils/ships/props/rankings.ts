import type { AllShipData } from "@db/types"
import type { ShipFilterProps } from "@store/Samvaluation/useShipFilter"

export const rankingTypes: Record<string, string> = {
  "Light DMG": "lightdmg",
  "Medium DMG": "mediumdmg",
  "Heavy DMG": "heavydmg",
  "Off. Buff": "offensivebuff",
  "Meta Boss": "meta",
  "W14 Mob": "w14mob",
  "W14 Boss": "w14boss",
  "W15 Mob": "w15mob",
  "W15 Boss": "w15boss",
  "Event EX": "ex",
}

export const letterRankToNumber = (rank: string | null | undefined): number => {
  const rankMapping: { [key: string]: number } = {
    SS: 6,
    S: 5,
    A: 4,
    B: 3,
    C: 2,
    D: 1,
  }

  if (!rank) return 0

  const cleaned = rank.replaceAll(/\*/g, "")
  return rankMapping[cleaned] ?? 0
}

export const getHighestValue = (
  ship: AllShipData,
  rankingSort: ShipFilterProps["filters"]["rankingSort"],
) => {
  if (!ship.rankings) {
    return 0
  }
  const sortKey = rankingTypes[rankingSort.value] as string

  const rankingsToUse =
    ship.fleetType === "vg"
      ? ship.rankings.vgRankings
      : ship.fleetType === "main"
        ? ship.rankings.mfRankings
        : ship.fleetType === "ss"
          ? ship.rankings.ssRankings
          : null

  if (!rankingsToUse || !Array.isArray(rankingsToUse)) {
    return 0
  }

  return Math.max(
    0,
    ...rankingsToUse.map((r) => {
      const ranking = r as any

      let value = ranking[sortKey]

      if (
        ship.fleetType === "ss" &&
        (sortKey === "w14mob" ||
          sortKey === "w14boss" ||
          sortKey === "w15mob" ||
          sortKey === "w15boss")
      ) {
        value = ranking.campaign
      }

      // numeric fields (lightdmg, mediumdmg, heavydmg, offensivebuff)
      if (typeof value === "number") {
        return value ?? 0
      }

      // string fields (meta, w14mob, etc.)
      if (typeof value === "string") {
        return letterRankToNumber(value)
      }

      return 0
    }),
  )
}
