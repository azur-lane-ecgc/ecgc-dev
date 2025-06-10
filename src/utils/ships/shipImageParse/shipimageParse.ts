import type { ImageMetadata } from "astro"

const shipModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/ship_icons/*.png",
  { eager: true },
)

const shipIcons = Object.fromEntries(
  Object.entries(shipModules).map(([path, module]) => {
    const filename = path.split("/").pop()?.replace(".png", "")
    const imageUrl = decodeURIComponent(module.default.src)
    return [filename, imageUrl]
  }),
)

export const shipImageParse = (ship: string, isKai?: boolean): string => {
  const shipKey = `${decodeURIComponent(ship)}${isKai ? "Kai" : ""}Icon`
  const result = shipIcons[shipKey]

  return result ?? "/images/materials/UnknownShip.png"
}
