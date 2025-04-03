import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

export const allHullTypes = Array.from(
  new Set([
    ...Object.values(shipData).map((ship) =>
      ship.hullType === "DDGv" ? "DDG" : ship.hullType,
    ),
    "IX",
  ]),
).sort()
