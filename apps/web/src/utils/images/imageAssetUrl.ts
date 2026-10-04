import type { ImageMetadata } from "astro"

const imageAssetModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/{augments,equipment,materials,misc,ship_type}/*.{png,jpg,jpeg}",
  { eager: true },
)

// Resolve image asset URLs for item icons and site metadata.
export const getImageAssetUrl = (imagePath: string): string => {
  const imageAsset = imageAssetModules[`/src/assets/${imagePath}`]
  if (!imageAsset) {
    throw new Error("Image asset not found", { cause: imagePath })
  }
  return imageAsset.default.src
}
