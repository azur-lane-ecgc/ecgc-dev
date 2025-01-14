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
  96: "MOT",
  97: "META",
  101: "Collab",
  102: "Collab",
  103: "Collab",
  104: "Collab",
  105: "Collab",
  106: "Collab",
  107: "Collab",
  108: "Collab",
  109: "Collab",
  110: "Collab",
  111: "Collab",
}

export const shipFactionParse = (faction: number): string => {
  return factionMap[faction] ?? factionMap[0]
}
