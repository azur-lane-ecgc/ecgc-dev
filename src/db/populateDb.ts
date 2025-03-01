import { db } from "./dexie"
import { cacheShipImage } from "./cache"
import { generateHash } from "./dbHash"

import { shipImageParse } from "@utils/ships"

import type { ShipEHPProps } from "./ehp/types"
import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "./rankings/types"
import type { ShipData, ShipLocationData } from "./ship_data/types"
import type { AllShipData } from "./types"

const shipData = (await import("./ship_data/ship_data.json")).default as Record<
  number,
  ShipData
>
const ehp = (await import("./ehp/shipEHP.json")).default as Record<
  string,
  ShipEHPProps[]
>
const mainFleetRankings = (await import("./rankings/mainFleetRankings.json"))
  .default as Record<string, MainFleetRankingProps[]>
const vgFleetRankings = (await import("./rankings/vgFleetRankings.json"))
  .default as Record<string, VanguardFleetRankingProps[]>
const ssFleetRankings = (await import("./rankings/ssFleetRankings.json"))
  .default as Record<string, SSFleetRankingProps[]>

const extractLocationNames = (locations: ShipLocationData): string[] => {
  return [
    ...locations.events.map((loc) => loc.name),
    ...locations.other.map((loc) => loc.name),
    ...locations.construction.map((loc) => loc.name),
    ...locations.permanent.map((loc) => loc.name),
  ]
}

export const populateDb = async () => {
  await db.ships.clear()
  await db.ship_img.clear()

  const allShips: AllShipData[] = Object.values(shipData).map((ship) => ({
    ...ship,
    rankings:
      ship.fleetType === "main"
        ? mainFleetRankings[ship.ship] || null
        : ship.fleetType === "vg"
          ? vgFleetRankings[ship.ship] || null
          : ship.fleetType === "ss"
            ? ssFleetRankings[ship.ship] || null
            : null,
    ehp: ehp[ship.ship] || null,
    locationNames: extractLocationNames(ship.locations),
  }))

  await db.ships.bulkPut(allShips)

  for (const ship of allShips) {
    const shipImage = shipImageParse(ship.ship, ship.isKai)
    await cacheShipImage(ship.id, shipImage)
  }
}

export const checkAndUpdateDatabase = async () => {
  const rawDataHash = generateHash({
    shipData,
    mainFleetRankings,
    vgFleetRankings,
    ssFleetRankings,
    ehp,
  })

  const storedHashEntry = await db.info.get("data_hash")
  const storedHash = storedHashEntry ? storedHashEntry.value : ""

  if (storedHash === rawDataHash) {
    console.log("Database is up-to-date.")
    return
  }

  console.log("Database data has changed, updating...")
  await populateDb()
  await db.info.put({ key: "data_hash", value: rawDataHash })
}
