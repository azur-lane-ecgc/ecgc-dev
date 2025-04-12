import { db } from "./dexie"

// export const cacheShipImage = async (shipID: number, imageUrl: string) => {
//   await db.ship_img.put({ id: shipID, image: imageUrl })
// }

// export const getCachedShipImage = async (
//   shipID: number,
// ): Promise<string | null> => {
//   const entry = await db.ship_img.get(shipID)
//   return entry ? entry.image : null
// }
