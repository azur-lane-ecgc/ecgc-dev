import type { ShipData } from "@/db/types"

import {
  MainFleetRanking,
  VanguardFleetRanking,
  SSFleetRanking,
} from "./ShipRankings"

// Ship rankings for the corresponding fleet type.
export function ShipFleetRanking({
  shipData,
}: {
  readonly shipData: ShipData
}) {
  switch (shipData.fleetType) {
    case "main":
      return <MainFleetRanking ship={shipData.ship} />
    case "ss":
      return <SSFleetRanking ship={shipData.ship} />
    case "vg":
      return <VanguardFleetRanking ship={shipData.ship} />
    default: {
      const fleetType: never = shipData.fleetType
      return fleetType
    }
  }
}
