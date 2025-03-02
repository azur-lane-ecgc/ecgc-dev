import type { shipLocation } from "@db/types"

export const formatLocation = (locations: shipLocation[]) => {
  if (!locations || locations.length === 0) {
    return "None!"
  }

  return locations
    .map(
      (loc, index) => `
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://azurlane.koumakan.jp/wiki/${loc.href}"
        title="${loc.name}"
        aria-label="${loc.name}"
      >${loc.name}</a>${index < locations.length - 1 ? ", " : ""}`,
    )
    .join("")
}
