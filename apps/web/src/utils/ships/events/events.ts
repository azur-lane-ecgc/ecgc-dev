import type { shipLocation } from "@/db/types"

import eventDataJson from "./azurLaneEvents.json"

const eventData = eventDataJson as shipLocation[]

export const allEvents = eventData.map((event) => event.name)
