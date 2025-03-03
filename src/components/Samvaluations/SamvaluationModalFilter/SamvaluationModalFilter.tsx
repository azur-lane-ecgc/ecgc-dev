import { useState, useEffect } from "react"

import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"
import { ComboBox, MultiSelectComboBox } from "@components/_common/ComboBox"

import { checkAndUpdateDatabase } from "@db/populateDb"
import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

import { formatLocation } from "@utils/formatLocation"

import { useShipFilter } from "./useShipFilter"

export const SamvaluationModalFilter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    checkAndUpdateDatabase().then(() => setLoading(false))
  }, [])

  const { state, dispatch } = useShipFilter(loading)

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4">
        <ComboBox
          title="Hull Type"
          options={Array.from(
            new Set([
              ...Object.values(shipData).map((ship) => ship.hullType),
              "DDGm",
              "IX",
            ]),
          ).sort((a, b) => a.localeCompare(b))}
          onSelect={(hullType) =>
            dispatch({
              type: "SET_FILTER",
              payload: { hullType: hullType ? [hullType] : [] },
            })
          }
        />
      </div>
      <ItemContainer>
        {state.visibleShips.map((ship) => (
          <ShipModal
            key={ship.id}
            shipData={ship}
            trigger={{
              iconNote: "Rank: SS",
              descriptionNote: `Events: ${formatLocation(ship.locations.events)}`,
              largeDescNote: false,
              hasBorder: true,
            }}
            loading={loading}
          />
        ))}
      </ItemContainer>
    </>
  )
}
