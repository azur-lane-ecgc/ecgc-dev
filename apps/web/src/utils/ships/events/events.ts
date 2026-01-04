import type { shipLocation } from "@/db/types"

const eventData = (await import("./azurLaneEvents.json"))
  .default as shipLocation[]

export const allEvents = eventData.map((event) => event.name)
