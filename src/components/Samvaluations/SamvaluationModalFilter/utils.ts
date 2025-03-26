import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

export const allFactions = [
  ...Array.from(
    new Set([...Object.values(shipData).map((ship) => ship.faction)]),
  ).sort(),
]

export const allHullTypes = Array.from(
  new Set([
    ...Object.values(shipData).map((ship) =>
      ship.hullType === "DDGv" ? "DDG" : ship.hullType,
    ),
    "IX",
  ]),
).sort()

export const allRarities: Record<number, string> = {
  5: "Ultra Rare (5)",
  4: "Super Rare (4)",
  3: "Elite (3)",
  2: "Rare (2)",
  1: "Common (1)",
}

export const allRarityOptions = Object.entries(allRarities)
  .sort(([a], [b]) => Number(b) - Number(a))
  .map(([_, value]) => value)
