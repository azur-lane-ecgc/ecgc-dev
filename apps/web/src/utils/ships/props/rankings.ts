import type {
  ShipData,
  VanguardFleetRankingProps,
  MainFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"
import type { ShipFilterProps } from "@/store/Samvaluation/useShipFilter"

export const rankingTypes: Record<string, string> = {
  "Light DMG": "lightdmg",
  "Medium DMG": "mediumdmg",
  "Heavy DMG": "heavydmg",
  "Off. Buff": "offensivebuff",
  "Meta Boss": "meta",
  CM: "cm",
  "W14 Mob": "w14mob",
  "W14 Boss": "w14boss",
  "W15/16 Mob": "w15mob",
  "W15/16 Boss": "w15boss",
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

const numberToLetterRank = (
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

export type DamageRankKey = "lightdmg" | "mediumdmg" | "heavydmg"

export interface RankPercentileScale {
  tenthPercentile: number
  quarterPercentile: number
  median: number
  threeQuarterPercentile: number
  ninetiethPercentile: number
  ninetyNinthPercentile: number
}

interface DamageRanking {
  lightdmg: number | null | undefined
  mediumdmg: number | null | undefined
  heavydmg: number | null | undefined
}

/** Create percentile thresholds from one fleet's numeric damage values. */
export const createDamageRankScales = (
  rankings: DamageRanking[],
): Record<DamageRankKey, RankPercentileScale> => {
  const createScale = (
    damageValues: Array<number | null | undefined>,
  ): RankPercentileScale => {
    const sortedDamageValues = damageValues
      .filter((damage): damage is number => typeof damage === "number")
      .sort((firstDamage, secondDamage) => firstDamage - secondDamage)

    const percentile = (percent: number): number => {
      const index = Math.floor((sortedDamageValues.length - 1) * percent)
      return sortedDamageValues[index] ?? 0
    }

    return {
      tenthPercentile: percentile(0.1),
      quarterPercentile: percentile(0.25),
      median: percentile(0.5),
      threeQuarterPercentile: percentile(0.75),
      ninetiethPercentile: percentile(0.9),
      ninetyNinthPercentile: percentile(0.99),
    }
  }

  return {
    lightdmg: createScale(rankings.map(({ lightdmg }) => lightdmg)),
    mediumdmg: createScale(rankings.map(({ mediumdmg }) => mediumdmg)),
    heavydmg: createScale(rankings.map(({ heavydmg }) => heavydmg)),
  }
}

/** Convert damage to D, C, B, A, S, or SS by fleet percentile bands. */
const percentileToLetterRank = (
  damage: number | null | undefined,
  damageScale: RankPercentileScale,
): string => {
  if (damage === null || damage === undefined) {
    return "D"
  }
  if (damage <= damageScale.tenthPercentile) {
    return "D"
  }
  if (damage <= damageScale.quarterPercentile) {
    return "C"
  }
  if (damage <= damageScale.median) {
    return "B"
  }
  if (damage <= damageScale.threeQuarterPercentile) {
    return "A"
  }
  if (damage <= damageScale.ninetiethPercentile) {
    return "S"
  }

  return "SS"
}

/** Check whether a ranking field uses percentile-based damage scales. */
const isDamageRankKey = (
  rankingKey: string | undefined,
): rankingKey is DamageRankKey =>
  rankingKey === "lightdmg" ||
  rankingKey === "mediumdmg" ||
  rankingKey === "heavydmg"

/** Format a ranking value for display while preserving each field's scale. */
export const formatRankValue = (
  rankValue: number | string | null | undefined,
  rankingName: string,
  damageScales: Record<DamageRankKey, RankPercentileScale>,
): string => {
  const rankingKey = rankingTypes[rankingName]

  if (typeof rankValue === "string") {
    return numberToLetterRank(rankValue)
  }

  if (isDamageRankKey(rankingKey)) {
    return percentileToLetterRank(rankValue, damageScales[rankingKey])
  }

  return numberToLetterRank(rankValue)
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
