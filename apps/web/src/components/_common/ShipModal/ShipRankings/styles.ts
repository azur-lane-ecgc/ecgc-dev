// rank color helper functions
export const letterRankColor = (rank: string | null | undefined): string => {
  const getLetterRankColor: { [key: string]: string } = {
    SS: "bg-red-500",
    S: "bg-red-400",
    A: "bg-orange-400",
    B: "bg-orange-300",
    C: "bg-orange-200",
    D: "bg-gray-400",
    "": "",
  }

  return rank !== null
    ? (getLetterRankColor[rank?.replaceAll(/\*/g, "") ?? ""] ?? "")
    : ""
}

export const numberRankColor = (
  rank: number | string | null | undefined,
): string => {
  const getNumberRankColor: { [key: string]: string } = {
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

  return rank !== null ? (getNumberRankColor[rank?.toString() ?? ""] ?? "") : ""
}

interface DamageColorScale {
  tenthPercentile: number
  quarterPercentile: number
  median: number
  threeQuarterPercentile: number
  ninetiethPercentile: number
  ninetyNinthPercentile: number
}

/** Create a damage color scale from the values in one fleet ranking column. */
export const createDamageColorScale = (
  damageValues: Array<number | null | undefined>,
): DamageColorScale => {
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

/** Color a numeric damage value by its percentile within its ranking column. */
export const damageRankColor = (
  damage: number | null | undefined,
  damageScale: DamageColorScale,
): string => {
  if (damage === null || damage === undefined) {
    return ""
  }

  if (damage <= damageScale.tenthPercentile) {
    return "bg-red-100"
  }
  if (damage <= damageScale.quarterPercentile) {
    return "bg-red-200"
  }
  if (damage <= damageScale.median) {
    return "bg-red-300"
  }
  if (damage <= damageScale.threeQuarterPercentile) {
    return "bg-red-400"
  }
  if (damage <= damageScale.ninetiethPercentile) {
    return "bg-red-500"
  }
  if (damage <= damageScale.ninetyNinthPercentile) {
    return "bg-red-600"
  }

  return "bg-red-700"
}
