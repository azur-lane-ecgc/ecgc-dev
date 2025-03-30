export const allRarities: Record<string, string> = {
  "Ultra Rare (5)": "5",
  "Super Rare (4)": "4",
  "Elite (3)": "3",
  "Rare (2)": "2",
  "Common (1)": "1",
}

export const allRarityOptions = Object.keys(allRarities).sort(
  (a, b) => Number(allRarities[b]) - Number(allRarities[a]),
)
