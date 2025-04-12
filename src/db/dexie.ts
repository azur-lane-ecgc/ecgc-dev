import Dexie from "dexie"
import type { AllShipData } from "./types"

class ShipDatabase extends Dexie {
  ships: Dexie.Table<AllShipData, number>
  info: Dexie.Table<{ key: string; value: any }, string>
  // ship_img: Dexie.Table<{ id: number; image: string }, number>

  constructor() {
    super("ECGCShipDatabase")
    this.version(1).stores({
      ships:
        "&id, ship, faction, rarity, hullType, fleetType, *roles, *locationNames",
      info: "&key",
      ship_img: "&id",
    })

    this.ships = this.table("ships")
    this.info = this.table("info")
    // this.ship_img = this.table("ship_img")
  }
}

export const db = new ShipDatabase()
