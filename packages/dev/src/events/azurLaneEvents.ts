import type { ShipData } from "@/packages/AzurLaneData/types/ships"
import { shipNameParse, shipLocationParse } from "../ships"

export const main = async () => {
  const ships: Record<number, ShipData> = (await import(
    "@/packages/AzurLaneData/data/ships.json"
  ).then((m) => m.default)) as Record<number, ShipData>

  const OUTPUT_PATH =
    "packages/frontend/src/utils/ships/events/azurLaneEvents.json"

  // Bucket: href -> { location, dates[] }
  const bucket = new Map<
    string,
    { location: { name: string; href: string }; dates: number[] }
  >()

  for (const [id, ship] of Object.entries(ships)) {
    const locs = shipLocationParse(shipNameParse(+id, ship.name), +id)
    for (const loc of locs.events) {
      const key = loc.href
      if (!bucket.has(key)) {
        bucket.set(key, { location: loc, dates: [] })
      }
      if (ship.date) {
        bucket.get(key)!.dates.push(ship.date)
      }
    }
  }

  const mode = (nums: number[]): number | undefined => {
    if (nums.length === 0) return undefined
    const freq = new Map<number, number>()
    let bestNum = nums[0],
      bestCount = 0
    for (const n of nums) {
      const count = (freq.get(n) || 0) + 1
      freq.set(n, count)
      if (count > bestCount) {
        bestCount = count
        bestNum = n
      }
    }
    return bestNum
  }

  const sortedLocations = Array.from(bucket.values())
    .map(({ location, dates }) => ({
      location,
      modeDate: mode(dates),
    }))
    .sort((a, b) => (b.modeDate || 0) - (a.modeDate || 0))
    .map(({ location }) => location)

  await Bun.write(OUTPUT_PATH, JSON.stringify(sortedLocations, null, 2))

  console.log(
    `Wrote ${sortedLocations.length} unique event locations to ${OUTPUT_PATH}`,
  )
}

main().catch((err) => {
  console.error("An error occurred", err)
  process.exit(1)
})
