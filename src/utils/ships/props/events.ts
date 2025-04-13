import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

export const allEvents = Array.from(
  new Set([
    ...Object.values(shipData)
      .map((ship) => ship.locations.events.map((event) => event.name))
      .flat(),
  ]),
).sort()
