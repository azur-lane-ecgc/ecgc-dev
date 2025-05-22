import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

export const fastLoadShips: ShipData[] = Object.values(shipData).filter(
  (ship) => ship.roles.includes("FastLoad"),
)

export const preloadShips: ShipData[] = fastLoadShips.filter((ship) =>
  ship.roles.includes("Preload"),
)
