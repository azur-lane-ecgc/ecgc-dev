import shipDataJson from "@/db/ship_data/ship_data.json"
import type { ShipData } from "@/db/types"
const shipData = shipDataJson as Record<number, ShipData>

import { factionToWikiMap } from "@/utils/factionLink"

const allFactions = Array.from(
  new Set(
    Object.values(shipData).map(
      (ship) => factionToWikiMap[ship.faction] ?? "Universal",
    ),
  ),
)

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
  "BLACK★ROCK SHOOTER",
  "Atelier Yumia",
  "Date A Live",
]

const collaborationFactionCodes = new Set(collaborationFactions)

export const allianceFactionsMap: Record<string, string[]> = {
  "Azur Lane": azurLaneFactions,
  "Crimson Axis": crimsonAxisFactions,
  META: ["META"],
  Tempesta: ["MOT"],
  "Kingdom of Tulipa": ["HNLMS"],
  Collaboration: collaborationFactions,
}

const allianceFactionCodes = new Set(Object.values(allianceFactionsMap).flat())

export const allFactionOptions = [
  ...Object.keys(allianceFactionsMap).map((alliance) => ({
    label: alliance,
    value: alliance,
  })),
  ...allFactions
    .filter((faction) => {
      return (
        !allianceFactionCodes.has(faction) ||
        collaborationFactionCodes.has(faction)
      )
    })
    .map((faction) => ({
      label: faction,
      value: Object.keys(factionToWikiMap).find(
        (key) => factionToWikiMap[key] === faction,
      ),
    })),
]
