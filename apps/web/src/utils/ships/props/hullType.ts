import shipDataJson from "@/db/ship_data/ship_data.json"
import type { ShipData } from "@/db/types"
const shipData = shipDataJson as Record<number, ShipData>

export const allHullTypes = Array.from(
  new Set([
    ...Object.values(shipData).map((ship) =>
      ship.hullType === "DDGv" ? "DDG" : ship.hullType,
    ),
    "IX",
  ]),
).sort()
