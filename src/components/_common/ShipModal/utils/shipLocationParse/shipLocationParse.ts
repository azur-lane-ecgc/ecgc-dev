import type { ShipDropData } from "@data/types/ships"
import { parseLocation } from "@utils/parseLocation"
import { shipSeriesMap } from "./utils"

const shipDropData: Record<number, ShipDropData> = (await import(
  "@data/data/ship_drops.json"
).then((module) => module.default)) as Record<number, ShipDropData>

const excludedEvents = ["Opposite-Colored"]

interface shipLocation {
  name: string
  href: string
}

export const otherLocationsParse = (
  name: string,
  id: number,
): shipLocation | null => {
  switch (id) {
    case 0:
      name = "Guild Shop"
      break
    case 1:
      name = "Medal Shop"
      break
    case 2:
      name = "Core Data Shop"
      break
    case 3:
      name = "Merit Shop"
      break
    case 4:
      name = "Requisition"
      break
    case 5: // Protocore Shop
      return null
    case 6:
      name = "Permanent Ultra Rare Pity"
      break
    case 7: // Weekly Missions
      return null
    case 8:
      name = "Login Reward"
      break
    case 9: // Returnee Rewards
      name = "Akashi's Homecoming Campaign"
    case 10:
      name = "Memento (Collections)"
      break
    case 11:
      name = "Cruise Pass"
      break
    case 12:
      name = "META Shop"
      break
    case 13:
      name = "META Showdown"
      break
    case 14:
      name = "Dossier Analysis"
      break
    case 15:
      name = `Shipyard (PR${shipSeriesMap[name]})`
      break
    default:
      return {
        name: "IF YOU SEE THIS, DM THE WEBSITE DEVELOPER",
        href: "Category:Ships",
      }
  }

  return {
    name,
    href: parseLocation(name),
  }
}

export const shipLocationParse = (
  name: string,
  id: number,
): {
  events?: shipLocation[]
  other?: shipLocation[]
  permanent: shipLocation[]
} => {
  if (name.match(/Bulin/)) {
    return {
      permanent: [
        {
          name: "See Common Resource Guide",
          href: "/test_ecgc_2/common_resource",
        },
      ],
    }
  }

  const dropData = shipDropData[id]

  let locations = {
    events: [] as shipLocation[],
    other: [] as shipLocation[],
    permanent: [] as shipLocation[],
  }

  // Event Drops
  const events = dropData?.events ?? []
  if (events.length > 0) {
    locations.events = events
      .filter((event) => !excludedEvents.includes(event))
      .map((event) => ({
        name: event.replaceAll(/Rerun/g, "").trim(),
        href: parseLocation(event),
      }))
  }

  // "Other"
  if (dropData?.other && dropData.other.length > 0) {
    dropData.other.forEach((otherId) => {
      const otherLocation = otherLocationsParse(name, otherId)
      if (otherLocation) {
        locations.other.push(otherLocation)
      }
    })
  }

  // Construction
  let constructionName = "Construction"
  const categories = [] as string[]

  if (dropData?.light) categories.push("Light")
  if (dropData?.heavy) categories.push("Heavy")
  if (dropData?.special) categories.push("Special")

  if (categories.length > 0) {
    constructionName += ` (${categories.join(", ")})`
    locations.permanent.push({
      name: constructionName,
      href: "Construction",
    })
  }

  // Map Drops
  if (dropData?.maps?.some((chapter) => chapter.length > 0)) {
    locations.permanent.push({
      name: "Map Drop (check Wiki)",
      href: parseLocation(name),
    })
  }

  // Fallback
  if (locations.events.length === 0 && locations.other.length === 0) {
    locations.permanent.push({
      name: "Base Game",
      href: "Category:Ships",
    })
  }

  return locations
}
