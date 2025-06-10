import type { ShipDropData } from "@ALData/types/ships"
import type { shipLocation, ShipLocationData } from "@db/types"
import { parseLocation } from "@utils/parseLocation"

import { shipSeriesMap } from "./utils"

const shipDropData: Record<number, ShipDropData> = (await import(
  "@ALData/data/ship_drops.json"
).then((module) => module.default)) as Record<number, ShipDropData>

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
]

const exceptionShips = ["Formidable", "Mary Celeste"]

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
  11: "Cruise Pass", // NOT PERMANENT
  12: "META Shop",
  13: "META Showdown", // NOT PERMANENT
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
  const events = parseEvents(name, dropData.events)
  const other = dropData.other
    ?.map((otherId) => parseOtherLocation(name, otherId))
    .filter(Boolean) as shipLocation[]
  const construction = parseConstruction(dropData || {})
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

export const isPermanent = (
  id: number,
): { isPermanent: boolean; isCollab: boolean } => {
  const dropData = shipDropData[id]
  if (!dropData) return { isPermanent: false, isCollab: false }

  const qualifies = (ship: ShipDropData): boolean => {
    if (!ship) return false

    // rule 1: ship is available in light / heavy / special construction
    const r1 = !!ship.timer && (ship.light || ship.heavy || ship.special)

    // rule 2: ship is available from permanent not map-drop or not build sources (ex. shops)
    const r2 =
      ship.other.length > 0 &&
      ship.other.some((code) => code !== 11 && code !== 13)

    // rule 3: ship is available from campaign map-drop
    const r3 = ship.maps.length > 0

    return r1 || r2 || r3
  }

  // rule 4: other event ships from this ship's events are permanent (through rules 1-3)
  const events: Set<string> = new Set(dropData.events)

  const rule4 =
    events.size > 0 &&
    Object.entries(shipDropData).some(([k, ship]) => {
      if (Number(k) === id) return false // skip self

      const ev = ship.events
      if (ev.length !== events.size) return false
      const evSet = new Set(ev)
      if (evSet.size !== events.size) return false

      for (const e of events) if (!evSet.has(e)) return false

      return qualifies(ship)
    })

  // collab flag
  const isCollab =
    dropData.events.length > 0 &&
    dropData.events.some((ev) => collabEvents.includes(ev))

  return {
    isPermanent: qualifies(dropData) || rule4,
    isCollab: isCollab,
  }
}
