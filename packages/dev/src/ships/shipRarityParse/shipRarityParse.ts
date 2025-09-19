export const shipRarityParse = (rarity: number): number => {
  switch (rarity) {
    case 1:
    case 2:
      return 1
    case 3:
    case 4:
    case 5:
    case 6:
      return rarity - 1
    case 7:
      return 4
    case 8:
      return 5
    default:
      return 1
  }
}
