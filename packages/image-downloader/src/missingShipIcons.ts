import { readdir } from "node:fs/promises"

import { getShipIconName } from "../../../apps/web/src/utils/ships/shipImageParse/shipIconName"

interface ProcessedShipRecord {
  id: number
  ship: string
  isKai: boolean
}

interface RawShipRecord {
  name?: string
  stats?: unknown[]
  retro?: {
    stats?: unknown
  }
}

/** Path from the monorepo root to the website's current ship icon directory. */
export const shipIconOutputDirectory = "apps/web/src/assets/ship_icons/"

export interface MissingShipIcon {
  id: number
  ship: string
  isKai: boolean
  iconName: string
  iconFile: string
}

export interface ShipIconInventory {
  shipRecordCount: number
  shipsWithListedStats: number
  existingIconCount: number
  missingIconCount: number
  missingShipIcons: MissingShipIcon[]
}

const monorepoRoot = new URL("../../../", import.meta.url)

const readJsonObject = async <T>(path: URL): Promise<Record<string, T>> => {
  const value = JSON.parse(await Bun.file(path).text()) as Record<string, T>
  if (!value)
    throw new Error(`JSON file did not contain an object: ${path.pathname}`)
  return value
}

const hasListedStats = (stats: unknown): boolean =>
  Array.isArray(stats)
    ? stats.length > 0
    : typeof stats === "object" &&
      stats !== null &&
      Object.keys(stats).length > 0

/** Finds ship icons required by Samvaluation records with listed game stats. */
export const findMissingShipIcons = async (): Promise<ShipIconInventory> => {
  const processedShips = await readJsonObject<ProcessedShipRecord>(
    new URL("apps/web/src/db/ship_data/ship_data.json", monorepoRoot),
  )
  const rawShips = await readJsonObject<RawShipRecord>(
    new URL("packages/AzurLaneData/data/ships.json", monorepoRoot),
  )
  const iconDirectory = new URL(shipIconOutputDirectory, monorepoRoot)
  const iconFiles = (await readdir(iconDirectory)).filter((name) =>
    name.toLowerCase().endsWith(".png"),
  )
  const existingIconNames = new Set(
    iconFiles.map((name) => name.replace(/\.png$/iu, "").normalize("NFC")),
  )

  const missingShipIcons: MissingShipIcon[] = []
  let shipsWithListedStats = 0

  for (const ship of Object.values(processedShips)) {
    const rawShip = rawShips[String(ship.id)]
    const listedStats = ship.isKai
      ? hasListedStats(rawShip?.retro?.stats)
      : hasListedStats(rawShip?.stats)

    if (!listedStats) continue
    shipsWithListedStats++

    const iconName = getShipIconName(ship.ship, ship.isKai)
    if (!existingIconNames.has(iconName)) {
      missingShipIcons.push({
        id: ship.id,
        ship: ship.ship,
        isKai: ship.isKai,
        iconName,
        iconFile: `${iconName}.png`,
      })
    }
  }

  missingShipIcons.sort((first, second) => first.id - second.id)

  return {
    shipRecordCount: Object.keys(processedShips).length,
    shipsWithListedStats,
    existingIconCount: existingIconNames.size,
    missingIconCount: missingShipIcons.length,
    missingShipIcons,
  }
}
