import type { ShipDropData } from "@data/types/ships"
import { parseLocation } from "@utils/parseLocation"
import { shipSeriesMap } from "./utils"

const shipDropData: Record<number, ShipDropData> = (await import(
  "@data/data/ship_drops.json"
).then((module) => module.default)) as Record<number, ShipDropData>

const excludedEvents = [
  "Opposite-Colored",
  "Royal Maids Battle Royale",
  "Lunar New Year 2018",
]
const exceptionShips = ["Formidable", "Mary Celeste", "Chang Chun", "Tai Yuan"]

export interface shipLocation {
  name: string
  href: string
}

export interface ShipLocationData {
  events: shipLocation[]
  other: shipLocation[]
  construction: shipLocation[]
  permanent: shipLocation[]
}

const OTHER_LOCATIONS: Record<number, string | null> = {
  0: "Guild Shop",
  1: "Medal Shop",
  2: "Core Data Shop",
  3: "Merit Shop",
  4: "Requisition",
  5: null, // Protocore Shop
  6: "Permanent Ultra Rare Pity",
  7: null, // Weekly Missions
  8: "Login Reward",
  9: "Akashi's Homecoming Campaign", // Returnee Rewards
  10: "Memento (Collections)",
  11: "Cruise Pass",
  12: "META Shop",
  13: "META Showdown",
  14: "Dossier Analysis",
  15: "Shipyard",
  16: "Quest",
}

const parseOtherLocation = (name: string, id: number): shipLocation | null => {
  if (id === 15) {
    name = `Shipyard (PR${shipSeriesMap[name]})`
  } else {
    name = OTHER_LOCATIONS[id] || "IF YOU SEE THIS, DM THE WEBSITE DEVELOPER"
  }

  if (!name) return null

  return {
    name,
    href: parseLocation(name),
  }
}

const parseConstruction = (dropData: ShipDropData): shipLocation[] => {
  const categories = []
  if (dropData?.light) categories.push("Light")
  if (dropData?.heavy) categories.push("Heavy")
  if (dropData?.special) categories.push("Special")

  return categories.length > 0
    ? [
        {
          name: `Construction (${categories.join(", ")})`,
          href: "Construction",
        },
      ]
    : []
}

const parseEvents = (name: string, events: string[]): shipLocation[] => {
  const filteredEvents = events.filter(
    (event) => !excludedEvents.includes(event),
  )

  if (filteredEvents.length === 0) return []

  // Hard-coded exceptions
  if (exceptionShips.includes(name)) {
    return filteredEvents.map((event) => ({
      name: event.replace(/Rerun/g, "").trim(),
      href: parseLocation(event),
    }))
  }

  // An Shan / Fu Shun
  else if (name === "An Shan" || name === "Fu Shun") {
    return [
      {
        name: "Lunar New Year (every year)",
        href: parseLocation("Lunar New Year"),
      },
    ]
  }

  // Rest of ships
  return [
    {
      name: filteredEvents[0].replace(/Rerun/g, "").trim(),
      href: parseLocation(filteredEvents[0]),
    },
  ]
}

export const shipLocationParse = (
  name: string,
  id: number,
): ShipLocationData => {
  if (name.match(/Bulin/)) {
    return {
      events: [],
      other: [],
      construction: [],
      permanent: [
        {
          name: "See Common Resource Guide",
          href: "/test_ecgc_2/common_resource",
        },
      ],
    }
  }

  const dropData = shipDropData[id]!

  const events = parseEvents(name, dropData.events)
  const other = dropData.other
    ?.map((otherId) => parseOtherLocation(name, otherId))
    .filter(Boolean) as shipLocation[]
  const construction = parseConstruction(dropData || {})
  const permanent = dropData?.maps?.some((chapter) => chapter.length > 0)
    ? [
        {
          name: "Map Drop (check Wiki)",
          href: parseLocation(name),
        },
      ]
    : []

  // Fallback
  if (
    !events.length &&
    !other.length &&
    !construction.length &&
    !permanent.length
  ) {
    permanent.push({
      name: "Unobtainable",
      href: "Category:Ships",
    })
  }

  return { events, other, construction, permanent }
}
