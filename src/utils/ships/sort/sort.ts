import type { ShipData } from "@db/types"

export const shipSort = (ships: ShipData[]): ShipData[] => {
  return [...ships].sort((a, b) => {
    if (b.rarity !== a.rarity) {
      return b.rarity - a.rarity
    }
    return a.ship.localeCompare(b.ship)
  })
}
