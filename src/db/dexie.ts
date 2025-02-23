import Dexie from "dexie"
import type { ShipEHPProps } from "./ehp/types"
import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "./rankings/types"
import type { ShipData, ShipLocationData } from "./ship_data/types"

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
const shipData = (await import("./ship_data/ship_data.json")).default as Record<
  number,
  ShipData
>

export interface AllShipData extends ShipData {
  rankings?:
    | MainFleetRankingProps[]
    | VanguardFleetRankingProps[]
    | SSFleetRankingProps[]
    | null
  ehp?: ShipEHPProps[] | null
  locationNames: string[]
}

class ShipDatabase extends Dexie {
  ships: Dexie.Table<AllShipData, number>
  info: Dexie.Table<{ key: string; value: any }, string>

  constructor() {
    super("ECGCShipDatabase")
    this.version(1).stores({
      ships:
        "&id, ship, faction, rarity, hullType, fleetType, roles, *locationNames",
      info: "&key",
    })
    this.ships = this.table("ships")
    this.info = this.table("info")
  }
}

const extractLocationNames = (locations: ShipLocationData): string[] => {
  return [
    ...locations.events.map((loc) => loc.name),
    ...locations.other.map((loc) => loc.name),
    ...locations.construction.map((loc) => loc.name),
    ...locations.permanent.map((loc) => loc.name),
  ]
}

export const populateDatabase = async () => {
  await db.ships.clear()
  const allShips: AllShipData[] = Object.values(shipData).map((ship) => ({
    ...ship,
    rankings:
      mainFleetRankings[ship.ship] ||
      vgFleetRankings[ship.ship] ||
      ssFleetRankings[ship.ship] ||
      null,
    ehp: ehp[ship.ship] || null,
    locationNames: extractLocationNames(ship.locations),
  }))
  await db.ships.bulkPut(allShips)
}

const generateHash = (data: any): string => {
  return btoa(
    JSON.stringify(data)
      .split("")
      .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
      .toString(),
  )
}

export const checkAndUpdateDatabase = async () => {
  const rawDataHash = generateHash({
    shipData,
    mainFleetRankings,
    vgFleetRankings,
    ssFleetRankings,
    ehp,
  })

  // Retrieve the last stored hash from IndexedDB
  const storedHashEntry = await db.info.get("data_hash")
  const storedHash = storedHashEntry ? storedHashEntry.value : ""

  if (storedHash === rawDataHash) {
    console.log("Database is up-to-date.")
    return
  }

  console.log("Database data has changed, updating...")

  await populateDatabase()
  await db.info.put({ key: "data_hash", value: rawDataHash })
}

export const db = new ShipDatabase()
