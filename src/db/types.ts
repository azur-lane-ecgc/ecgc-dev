import type { ShipEHPProps } from "./ehp/types"
import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "./rankings/types"
import type { ShipData } from "./ship_data/types"

export interface AllShipData extends ShipData {
  rankings?:
    | MainFleetRankingProps[]
    | VanguardFleetRankingProps[]
    | SSFleetRankingProps[]
    | null
  ehp?: ShipEHPProps[] | null
  locationNames: string[]
}

export * from "./ehp/types"
export * from "./rankings/types"
export * from "./ship_data/types"
