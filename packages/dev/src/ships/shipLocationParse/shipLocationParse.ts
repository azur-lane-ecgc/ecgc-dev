import type { shipLocation, ShipLocationData } from "@/db/types"
import type { ShipDropData } from "@/packages/AzurLaneData/types/ships"
import { parseLocation } from "@/utils/parseLocation"

import { shipSeriesMap } from "./shipSeriesMap"

const shipDropData: Record<number, ShipDropData> =
  (await import("@/packages/AzurLaneData/data/ship_drops.json").then(
    (module) => module.default,
  )) as Record<number, ShipDropData>

const excludedEvents = [
  "Opposite-Colored",
  "Royal Maids Battle Royale",
  "Lunar New Year 2018",
]

const collabEvents = [
  "Bilibili 8th Anniversary",
  "Recently, Ayanami Seems...",
  "Stardust",
  "Visitors from Another Dimension",
  "Armored Trooper Votoms",
  "Bilibili 9th Anniversary: Battery Support Plan",
  "Atré Akihabara Collaboration",
  "Lawson Collaboration",
  "Utawarerumono Collab",
  "Virtual Connection Synchronicity",
  "Atré Akihabara Collaboration Rerun",
  "Looking Glass of Fact and Fiction",
  "Vacation Lane",
  "The Cutest Companions!",
  "Armored Trooper Votoms Rerun",
  "Azur Anthem",
  "World-Spanning Arclight",
  "The Alchemist and the Archipelago of Secrets",
  "Vacation Lane Rerun",
  "World-Spanning Arclight Rerun",
  "The Ninja Scrolls: Azur Flash",
  "Dangerous Inventions Incoming!",
  "Illusory Drifters",
  "The Alchemist and the Tower of Horizons",
  "DATE A LANE",
]

const exceptionShips = ["Formidable", "Mary Celeste", "Amity"]

const qualifiesAsPermanent = (ship: ShipDropData): boolean =>
  Boolean(
    (ship.timer && (ship.light || ship.heavy || ship.special)) ||
    ship.other.some((code) => code !== 11 && code !== 13) ||
    ship.maps.length > 0,
  )

const getShipEventKey = (events: Set<string>): string =>
  JSON.stringify([...events].sort())

const permanentEventKeys = new Set<string>()
for (const ship of Object.values(shipDropData)) {
  if (!qualifiesAsPermanent(ship) || ship.events.length === 0) continue
  const events = new Set(ship.events)
  if (events.size === ship.events.length) {
    permanentEventKeys.add(getShipEventKey(events))
  }
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
  9: null, // Returnee Rewards, aren't relevant to this guide
  10: "Memento (Collections)",
  11: "Cruise Pass", // NOT PERMANENT
  12: "META Shop",
  13: "META Showdown", // NOT PERMANENT
  14: "Dossier Analysis",
  15: "Shipyard",
  16: "Quest",
}

const parseOtherLocation = (name: string, id: number): shipLocation | null => {
  let locName = null

  if (id === 15) {
    locName = `Shipyard (PR${shipSeriesMap[name]})`
  } else {
    locName = OTHER_LOCATIONS[id]
  }

  if (!locName) {
    return null
  }

  return {
    name: locName,
    href: parseLocation(locName),
  }
}

const parseConstruction = (
  dropData: ShipDropData | undefined,
): shipLocation[] => {
  if (!dropData) return []
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

const parseEvents = (
  name: string,
  events: string[] | undefined,
): shipLocation[] => {
  if (!events) return []
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

  const firstEvent = filteredEvents[0]
  if (!firstEvent) return []
  // Rest of ships
  return [
    {
      name: firstEvent.replace(/Rerun/g, "").trim(),
      href: parseLocation(firstEvent),
    },
  ]
}

export const shipLocationParse = (
  name: string,
  id: number,
): ShipLocationData => {
  // Bulin Exception
  if (name.match(/Bulin/)) {
    return {
      events: [],
      other: [],
      construction: [],
      permanent: [
        {
          name: "See Common Resource Guide",
          href: "/common_resource",
        },
      ],
    }
  }

  const dropData = shipDropData[id]
  const events = parseEvents(name, dropData?.events)
  const other = dropData?.other
    ?.map((otherId) => parseOtherLocation(name, otherId))
    .filter(Boolean) as shipLocation[]
  const construction = parseConstruction(dropData)
  const permanent = dropData?.maps?.some((chapter) => chapter.length > 0)
    ? [
        {
          name: "Map Drop (check Wiki)",
          href: name.replaceAll(" ", "_"),
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

/** Checks permanent ship availability through direct sources and matching event groups. */
export const isPermanent = (
  id: number,
): { isPermanent: boolean; isCollab: boolean } => {
  const dropData = shipDropData[id]
  if (!dropData) return { isPermanent: false, isCollab: false }

  // collab flag
  const isCollab =
    dropData.events.length > 0 &&
    dropData.events.some((ev) => collabEvents.includes(ev))

  if (qualifiesAsPermanent(dropData)) {
    return { isPermanent: true, isCollab }
  }

  // Only qualifying ships enter the index, so this ship cannot match itself.
  const matchesPermanentEvent =
    dropData.events.length > 0 &&
    permanentEventKeys.has(getShipEventKey(new Set(dropData.events)))

  return {
    isPermanent: matchesPermanentEvent,
    isCollab: isCollab,
  }
}
