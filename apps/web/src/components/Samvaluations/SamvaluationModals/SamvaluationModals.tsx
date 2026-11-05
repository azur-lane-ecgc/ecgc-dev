import { HR } from "@/components/_common/HR"
import { ItemContainer } from "@/components/_common/ItemCell"
import { ShipModal } from "@/components/_common/ShipModal"
import mainFleetRankingsJson from "@/db/rankings/mainFleetRankings.json"
import ssFleetRankingsJson from "@/db/rankings/ssFleetRankings.json"
import vgFleetRankingsJson from "@/db/rankings/vgFleetRankings.json"
import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"
const mainFleetRankings = mainFleetRankingsJson as Record<
  string,
  MainFleetRankingProps[]
>
const mainFleetDamageScales = createDamageRankScales(mainFleetRankings, "main")
const vgFleetRankings = vgFleetRankingsJson as Record<
  string,
  VanguardFleetRankingProps[]
>
const vanguardFleetDamageScales = createDamageRankScales(vgFleetRankings, "vg")
const ssFleetRankings = ssFleetRankingsJson as Record<
  string,
  SSFleetRankingProps[]
>
const ssFleetDamageScales = createDamageRankScales(ssFleetRankings, "ss")

import {
  initialFilters,
  useShipFilter,
} from "@/store/Samvaluation/useShipFilter"
import {
  createDamageRankScales,
  formatRankValue,
  getHighestValue,
} from "@/utils/ships"

const damageRankScales = {
  main: mainFleetDamageScales,
  vg: vanguardFleetDamageScales,
  ss: ssFleetDamageScales,
}

import { SamvaluationModalFilters } from "./SamvaluationModalFilters"

export const SamvaluationModals: React.FC = () => {
  const { state, dispatch } = useShipFilter(initialFilters)

  return (
    <>
      <SamvaluationModalFilters state={state} dispatch={dispatch} />
      <HR />

      {/* Ship Modals */}
      {state.visibleShips.length > 0 ? (
        <ItemContainer>
          {state.visibleShips.map((ship) => {
            let mfRankings = null as (typeof mainFleetRankings)[string] | null
            let vgRankings = null as (typeof vgFleetRankings)[string] | null
            let ssRankings = null as (typeof ssFleetRankings)[string] | null

            if (ship.fleetType === "main") {
              mfRankings =
                (
                  mainFleetRankings as Record<
                    string,
                    (typeof mainFleetRankings)[string]
                  >
                )[ship.ship] || null
            } else if (ship.fleetType === "vg") {
              vgRankings =
                (
                  vgFleetRankings as Record<
                    string,
                    (typeof vgFleetRankings)[string]
                  >
                )[ship.ship] || null
            } else if (ship.fleetType === "ss") {
              ssRankings =
                (
                  ssFleetRankings as Record<
                    string,
                    (typeof ssFleetRankings)[string]
                  >
                )[ship.ship] || null
            }

            const rankNote = state.filters.rankingSort.value
              ? `Rank: ${formatRankValue(
                  getHighestValue(
                    ship.fleetType,
                    { mfRankings, vgRankings, ssRankings },
                    state.filters.rankingSort,
                  ),
                  state.filters.rankingSort.value,
                  damageRankScales[ship.fleetType],
                )}`
              : null

            return (
              <ShipModal
                key={ship.id}
                shipData={ship}
                trigger={{
                  iconNote: ship.isKai ? "Retrofit" : "",
                  descriptionNote: rankNote,
                  largeDescNote: false,
                  hasBorder: false,
                }}
                loading={state.loading}
              />
            )
          })}
        </ItemContainer>
      ) : (
        <div className="container mx-auto mt-5 w-9/12 border-t border-t-gray-400! pt-4 text-center">
          <span className="font-bold text-red-400">
            There are no ships that meet this criteria.
          </span>
        </div>
      )}
    </>
  )
}
