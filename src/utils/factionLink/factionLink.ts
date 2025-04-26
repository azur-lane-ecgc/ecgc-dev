export const factionToWikiMap: Record<string, string> = {
  Universal: "Universal",
  USS: "Eagle Union",
  HMS: "Royal Navy",
  IJN: "Sakura Empire",
  KMS: "Iron Blood",
  DE: "Dragon Empery",
  RN: "Sardegna Empire",
  SN: "Northern Parliament",
  FFNF: "Iris Libre",
  MNF: "Vichya Dominion",
  HNLMS: "Kingdom of Tulipa",
  MOT: "Tempesta",
  META: "META",
  Neptunia: "Neptunia",
  Bilibili: "Bilibili",
  Utawarerumono: "Utawarerumono",
  KizunaAI: "KizunaAI",
  Hololive: "Hololive",
  "Venus Vacation": "Venus Vacation",
  "The Idolmaster": "The Idolmaster",
  SSSS: "SSSS",
  "Atelier Ryza": "Atelier Ryza",
  "Senran Kagura": "Senran Kagura",
  "To LOVE-Ru": "To LOVE-Ru",
}

/**
 * Generates the Azur Lane Wiki page URL for a given faction.
 * @param faction - The faction string (e.g., "Eagle Union", "Royal Navy", etc.)
 * @returns The full URL to the faction's Azur Lane Wiki page.
 */
export const factionLink = (faction: string): string => {
  const wikiName = factionToWikiMap[faction]

  return (
    `https://azurlane.koumakan.jp/wiki/` +
    (wikiName ? wikiName.replaceAll(" ", "_") : "Category:Ships")
  )
}
