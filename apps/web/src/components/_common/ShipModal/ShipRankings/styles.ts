import { getRankingTier, type RankingTierScale } from "@/utils/ships"

const letterRankColors: { [key: string]: string } = {
  SS: "bg-red-500",
  S: "bg-red-400",
  A: "bg-orange-400",
  B: "bg-orange-300",
  C: "bg-orange-200",
  D: "bg-gray-400",
  "": "",
}

const numberRankColors: { [key: string]: string } = {
  "-5": "bg-yellow-500",
  "-4": "bg-yellow-400",
  "-3": "bg-yellow-300",
  "-2": "bg-yellow-200",
  "-1": "bg-yellow-100",
  "": "",
  "0": "bg-zinc-300",
  "1": "bg-red-100",
  "2": "bg-red-200",
  "3": "bg-red-300",
  "4": "bg-red-400",
  "5": "bg-red-500",
  "6": "bg-red-600",
  "7": "bg-red-700",
}

// rank color helper functions
export const letterRankColor = (rank: string | null | undefined): string => {
  return rank !== null
    ? (letterRankColors[rank?.replaceAll("*", "") ?? ""] ?? "")
    : ""
}

export const numberRankColor = (
  rank: number | string | null | undefined,
): string => {
  return rank !== null ? (numberRankColors[rank?.toString() ?? ""] ?? "") : ""
}

/** Colors measured damage with the same rating tiers used for ship roles. */
export const damageRankColor = (
  damage: number | null | undefined,
  damageScale: RankingTierScale,
): string => {
  if (damage === null || damage === undefined) {
    return ""
  }

  return numberRankColor(getRankingTier(damage, damageScale))
}
