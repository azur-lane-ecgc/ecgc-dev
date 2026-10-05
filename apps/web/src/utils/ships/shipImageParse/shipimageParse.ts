import imageMaterialsUnknownShip from "@/assets/materials/UnknownShip.png"
import type { ImageMetadata } from "astro"

import { getShipIconName } from "./shipIconName"

const shipModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/ship_icons/*.png",
  { eager: true },
)

export const shipIcons = Object.fromEntries(
  Object.entries(shipModules).map(([path, module]) => {
    const filename = path
      .split("/")
      .pop()
      ?.replace(".png", "")
      ?.normalize("NFC")
    const imageUrl = decodeURIComponent(module.default.src)

    return [filename, imageUrl]
  }),
)

export const shipImageParse = (ship: string, isKai?: boolean): string => {
  const shipKey = getShipIconName(ship, isKai)

  return shipIcons[shipKey] ?? imageMaterialsUnknownShip.src
}
