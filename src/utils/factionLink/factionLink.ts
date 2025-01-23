const factionToWikiMap: Record<string, string> = {
  Universal: "Universal",
  USS: "Eagle Union",
  HMS: "Royal Navy",
  IJN: "Sakura Empire",
  KMS: "Iron Blood",
  DE: "Dragon Empery",
  RN: "Sardegna Empire",
  SN: "Northern_Parliament",
  FFNF: "Iris Libre",
  MNF: "Vichya Dominion",
  MOT: "Tempesta",
  META: "META",
}

/**
 * Generates the Azur Lane Wiki page URL for a given faction.
 * @param faction - The faction string (e.g., "USS", "HMS", etc.)
 * @returns The full URL to the faction's Azur Lane Wiki page.
 */
export const factionLink = (faction: string): string => {
  const baseUrl = "https://azurlane.koumakan.jp/wiki/"
  const wikiPage = factionToWikiMap[faction]

  if (!!!wikiPage) {
    return `${baseUrl}/Category:Ships`
  }

  return `${baseUrl}${wikiPage}`
}
