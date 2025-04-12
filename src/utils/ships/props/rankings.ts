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
