import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

export const allRoles = Array.from(
  new Set(
    [
      ...Object.values(shipData)
        .map((ship) => ship.roles)
        .flat(),
    ].filter((role) => role !== "Bad" && role !== "Meh"),
  ),
).sort()
