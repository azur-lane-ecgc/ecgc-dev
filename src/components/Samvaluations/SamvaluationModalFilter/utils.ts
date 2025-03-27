import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>
import type { AllShipData } from "@db/types"

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

// fleet type
export const fleetTypeMapping: Record<string, string> = {
  "Main Fleet": "main",
  "Vanguard Fleet": "vg",
  "Submarine Fleet": "ss",
}

// unique augment
export const hasUniqueAugment = (
  augments: AllShipData["augments"] | null,
  hullType: string,
): boolean => {
  if (!!!augments) return false

  if (hullType.startsWith("AE") || hullType.startsWith("BM")) {
    return augments.length > 1
  }

  if (hullType.startsWith("IX")) {
    return augments.length > 0
  }

  return augments.length > 2
}

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

// roles
export const allRoles = Array.from(
  new Set(
    [
      ...Object.values(shipData)
        .map((ship) => ship.roles)
        .flat(),
    ].filter((role) => role !== "Bad" && role !== "Meh"),
  ),
).sort()
