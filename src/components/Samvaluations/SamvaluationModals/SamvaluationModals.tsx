import { HR } from "@components/_common/HR"
import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/_common/ShipModal"

import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "@db/types"
const mainFleetRankings = (await import("@db/rankings/mainFleetRankings.json"))
  .default as Record<string, MainFleetRankingProps[]>
const vgFleetRankings = (await import("@db/rankings/vgFleetRankings.json"))
  .default as Record<string, VanguardFleetRankingProps[]>
const ssFleetRankings = (await import("@db/rankings/ssFleetRankings.json"))
  .default as Record<string, SSFleetRankingProps[]>

import {
  initialFilters,
  useShipFilter,
} from "@store/Samvaluation/useShipFilter"

// import { formatLocation } from "@utils/formatLocation"
import { getHighestValue, numberToLetterRank } from "@utils/ships"

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
              ? `Rank: ${numberToLetterRank(
                  getHighestValue(
                    ship.fleetType,
                    { mfRankings, vgRankings, ssRankings },
                    state.filters.rankingSort,
                  ),
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
        <div className="container mx-auto mt-5 w-9/12 border-t !border-t-gray-400 pt-4 text-center">
          <span className="font-bold text-red-400">
            There are no ships that meet this criteria.
          </span>
        </div>
      )}
    </>
  )
}
