import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

import { factionToWikiMap } from "@utils/factionLink"

// hull types
export const allHullTypes = Array.from(
  new Set([
    ...Object.values(shipData).map((ship) =>
      ship.hullType === "DDGv" ? "DDG" : ship.hullType,
    ),
    "IX",
  ]),
).sort()

// rarity
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

// faction
const allFactions = [
  ...Array.from(
    new Set([
      ...Object.values(shipData).map(
        (ship) => factionToWikiMap[ship.faction] ?? "Universal",
      ),
    ]),
  ),
]

const azurLaneFactions = ["USS", "HMS", "DE", "SN", "FFNF"]
const crimsonAxisFactions = ["IJN", "KMS", "MNF", "RN"]
const collaborationFactions = [
  "Bilibili",
  "Neptunia",
  "Utawarerumono",
  "KizunaAI",
  "Hololive",
  "Venus Vacation",
  "The Idolmaster",
  "SSSS",
  "Atelier Ryza",
  "Senran Kagura",
  "To LOVE-Ru",
]

export const allianceFactionsMap: Record<string, string[]> = {
  "Azur Lane": azurLaneFactions,
  "Crimson Axis": crimsonAxisFactions,
  META: ["META"],
  Tempesta: ["MOT"],
  Collaboration: collaborationFactions,
}

export const allFactionOptions = [
  ...Object.keys(allianceFactionsMap).map((alliance) => ({
    label: alliance,
    value: alliance,
  })),
  ...allFactions
    .filter((faction) => {
      return (
        !Object.values(allianceFactionsMap).flat().includes(faction) ||
        collaborationFactions.includes(faction)
      )
    })
    .map((faction) => ({
      label: faction,
      value: Object.keys(factionToWikiMap).find(
        (key) => factionToWikiMap[key] === faction,
      ),
    })),
]
