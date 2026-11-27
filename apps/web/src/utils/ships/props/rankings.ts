import type {
  ShipData,
  VanguardFleetRankingProps,
  MainFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"

const letterRankValues: { [key: string]: number } = {
  SS: 6,
  S: 5,
  A: 4,
  B: 3,
  C: 2,
  D: 1,
}

const numberRankLabels: { [key: number]: string } = {
  6: "SS",
  5: "S",
  4: "A",
  3: "B",
  2: "C",
  1: "D",
}

const unrankedCollaborationShips = new Set([
  "22",
  "33",
  "Kuon",
  "Nekone",
  "Rurutie",
  "Uruuru",
  "Saraana",
  "Fumiruiru",
])

/** Identifies unranked collaboration ships with an assigned D-tier fallback. */
export const hasLowTierFallback = (ship: string): boolean =>
  unrankedCollaborationShips.has(ship)

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
  if (!rank) return 0

  const cleaned = rank.replaceAll("*", "")
  return letterRankValues[cleaned] ?? 0
}

const numberToLetterRank = (
  input: number | string | null | undefined,
): string => {
  if (typeof input === "string") {
    return input
  }

  if (typeof input === "number") {
    return input >= 6 ? "SS" : (numberRankLabels[input] ?? "D")
  }

  return "D"
}

export type DamageRankKey = "lightdmg" | "mediumdmg" | "heavydmg"

/** Stores upper bounds for ordinal ship rating tiers, starting at tier 1. */
export interface RankingTierScale {
  upperBounds: readonly number[]
}

interface DamageRanking {
  lightdmg: number | null | undefined
  mediumdmg: number | null | undefined
  heavydmg: number | null | undefined
}

// Counts use each ship's highest rating across variants at a6d107ac (2025-09-27).
// The arrays contain counts for scores 0, 1, 2, and each higher score.
// Higher-tier shares grow by 20% relative to their historical shares.
// Tier 1 keeps its share. Tier 2 supplies the extra higher-tier slots.
const higherTierShareMultiplier = 1.2
const historicalDamageTierCounts = {
  main: {
    lightdmg: [3, 153, 56, 29, 14, 11, 2],
    mediumdmg: [3, 149, 51, 34, 13, 11, 7],
    heavydmg: [3, 159, 57, 24, 13, 6, 6],
  },
  vg: {
    lightdmg: [6, 346, 80, 39, 15, 11],
    mediumdmg: [6, 383, 61, 35, 7, 5],
    heavydmg: [7, 430, 40, 13, 6, 1],
  },
} as const
const historicalSurvivalTierCounts = [0, 290, 135, 49, 13, 10]
const submarineRatingScale: RankingTierScale = {
  upperBounds: [1, 2, 3, 4, 5, 6],
}

const createRatingScale = (
  values: number[],
  historicalCounts: readonly number[],
): RankingTierScale => {
  const sortedValues = values
    .filter((value) => Number.isFinite(value) && value >= 0)
    .sort((first, second) => first - second)
  const historicalTotal = historicalCounts.reduce(
    (total, count) => total + count,
    0,
  )
  const tierTwoShare =
    historicalCounts.slice(2).reduce((total, count) => total + count, 0) /
    historicalTotal
  const upperBounds: number[] = []
  let higherCount =
    historicalTotal - historicalCounts[0]! - historicalCounts[1]!

  for (let tier = 1; tier < historicalCounts.length - 1; tier++) {
    const higherShare = Math.min(
      tierTwoShare,
      (higherCount / historicalTotal) *
        (tier >= 2 ? higherTierShareMultiplier : 1),
    )
    const index = Math.ceil(sortedValues.length * (1 - higherShare)) - 1
    upperBounds.push(sortedValues[index] ?? Number.POSITIVE_INFINITY)
    higherCount -= historicalCounts[tier + 1]!
  }
  return { upperBounds }
}

/** Converts measured values to tiers without splitting equal values between tiers. */
export const getRankingTier = (
  value: number | null | undefined,
  scale: RankingTierScale,
): number => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return 0
  }
  for (let index = 0; index < scale.upperBounds.length; index++) {
    if (value <= scale.upperBounds[index]!) return index + 1
  }
  return scale.upperBounds.length + 1
}

/** Builds damage tiers per fleet and armor from each ship's highest variant value. */
export const createDamageRankScales = (
  rankings: Record<string, DamageRanking[]>,
  fleet: "main" | "vg" | "ss",
): Record<DamageRankKey, RankingTierScale> => {
  if (fleet === "ss") {
    // Submarine damage already uses ordinal scores, rather than measured damage.
    return {
      lightdmg: submarineRatingScale,
      mediumdmg: submarineRatingScale,
      heavydmg: submarineRatingScale,
    }
  }
  const keys = ["lightdmg", "mediumdmg", "heavydmg"] as const
  const values: Record<DamageRankKey, number[]> = {
    lightdmg: [],
    mediumdmg: [],
    heavydmg: [],
  }
  for (const variants of Object.values(rankings)) {
    for (const key of keys) {
      let highest = Number.NEGATIVE_INFINITY
      for (const variant of variants) {
        const value = variant[key]
        if (typeof value === "number" && Number.isFinite(value)) {
          highest = Math.max(highest, value)
        }
      }
      if (Number.isFinite(highest)) values[key].push(highest)
    }
  }
  return {
    lightdmg: createRatingScale(
      values.lightdmg,
      historicalDamageTierCounts[fleet].lightdmg,
    ),
    mediumdmg: createRatingScale(
      values.mediumdmg,
      historicalDamageTierCounts[fleet].mediumdmg,
    ),
    heavydmg: createRatingScale(
      values.heavydmg,
      historicalDamageTierCounts[fleet].heavydmg,
    ),
  }
}

/** Builds vanguard survival tiers from each ship's highest survival value. */
export const createSurvivalRankScale = (
  rankings: Record<string, Array<{ selfsurvival?: number | null }>>,
): RankingTierScale => {
  const values: number[] = []
  for (const variants of Object.values(rankings)) {
    let highest = Number.NEGATIVE_INFINITY
    for (const variant of variants) {
      if (
        typeof variant.selfsurvival === "number" &&
        Number.isFinite(variant.selfsurvival)
      ) {
        highest = Math.max(highest, variant.selfsurvival)
      }
    }
    if (Number.isFinite(highest)) values.push(highest)
  }
  return createRatingScale(values, historicalSurvivalTierCounts)
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
  damageScales: Record<DamageRankKey, RankingTierScale>,
): string => {
  const rankingKey = rankingTypes[rankingName]

  if (typeof rankValue === "string") {
    return numberToLetterRank(rankValue)
  }

  if (isDamageRankKey(rankingKey)) {
    return numberToLetterRank(
      getRankingTier(rankValue, damageScales[rankingKey]),
    )
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
  rankingSort: { value: string },
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
