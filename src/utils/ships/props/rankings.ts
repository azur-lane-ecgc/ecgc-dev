import type {
  ShipData,
  VanguardFleetRankingProps,
  MainFleetRankingProps,
  SSFleetRankingProps,
} from "@db/types"
import type { ShipFilterProps } from "@store/Samvaluation/useShipFilter"

export const rankingTypes: Record<string, string> = {
  "Light DMG": "lightdmg",
  "Medium DMG": "mediumdmg",
  "Heavy DMG": "heavydmg",
  "Off. Buff": "offensivebuff",
  "Meta Boss": "meta",
  CM: "cm",
  "W14 Mob": "w14mob",
  "W14 Boss": "w14boss",
  "W15 Mob": "w15mob",
  "W15 Boss": "w15boss",
  "Event EX": "ex",
}

const letterRankToNumber = (rank: string | null | undefined): number => {
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

export const numberToLetterRank = (
  input: number | string | null | undefined,
): string => {
  const numberMapping: { [key: number]: string } = {
    6: "SS",
    5: "S",
    4: "A",
    3: "B",
    2: "C",
    1: "D",
  }

  if (typeof input === "string") {
    return input
  }

  if (typeof input === "number") {
    return numberMapping[input] ?? "D"
  }

  return "D"
}

export const getHighestValue = (
  fleetType: ShipData["fleetType"],
  rankings: {
    mfRankings: MainFleetRankingProps[] | null
    vgRankings: VanguardFleetRankingProps[] | null
    ssRankings: SSFleetRankingProps[] | null
  },
  rankingSort: ShipFilterProps["filters"]["rankingSort"],
) => {
  if (!rankings) {
    return 0
  }
  const sortKey = rankingTypes[rankingSort.value] as string

  const rankingsToUse =
    fleetType === "vg"
      ? rankings.vgRankings
      : fleetType === "main"
        ? rankings.mfRankings
        : fleetType === "ss"
          ? rankings.ssRankings
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
        fleetType === "ss" &&
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
