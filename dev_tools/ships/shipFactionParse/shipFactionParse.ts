const factionMap: Record<number, string> = {
  0: "Universal",
  1: "USS",
  2: "HMS",
  3: "IJN",
  4: "KMS",
  5: "DE",
  6: "RN",
  7: "SN",
  8: "FFNF",
  9: "MNF",
  11: "HNLMS",
  96: "MOT",
  97: "META",
  101: "Neptunia",
  102: "Bilibili",
  103: "Utawarerumono",
  104: "KizunaAI",
  105: "Hololive",
  106: "Venus Vacation",
  107: "The Idolmaster",
  108: "SSSS",
  109: "Atelier Ryza",
  110: "Senran Kagura",
  111: "To LOVE-Ru",
}

export const shipFactionParse = (faction: number): string => {
  return factionMap[faction] ?? factionMap[0]
}
