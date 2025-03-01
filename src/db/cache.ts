import { db } from "./dexie"

export const cacheShipImage = async (shipName: string, imageUrl: string) => {
  await db.ship_img.put({ ship: shipName, image: imageUrl })
}

export const getCachedShipImage = async (
  shipName: string,
): Promise<string | null> => {
  const entry = await db.ship_img.get(shipName)
  return entry ? entry.image : null
}
