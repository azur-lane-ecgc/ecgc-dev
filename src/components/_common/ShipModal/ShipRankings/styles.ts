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
  }

  return rank !== null ? (getNumberRankColor[rank?.toString() ?? ""] ?? "") : ""
}
