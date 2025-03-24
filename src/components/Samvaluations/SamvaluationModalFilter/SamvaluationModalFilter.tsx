import { useState, useEffect } from "react"

import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"
import { ComboBox, MultiSelectCombobox } from "@components/_common/ComboBox"
import { Input } from "@components/_common/Input"

import { checkAndUpdateDatabase } from "@db/populateDb"
import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

import { formatLocation } from "@utils/formatLocation"

import { rarityOptions, useShipFilter } from "./useShipFilter"

export const SamvaluationModalFilter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    checkAndUpdateDatabase().then(() => setLoading(false))
  }, [])

  const { state, dispatch } = useShipFilter(loading)

  return (
    <>
      <div className="flex flex-row flex-wrap gap-3.5">
        <Input
          title="Ship Name"
          onSelect={(searchTerm) =>
            dispatch({
              type: "SET_FILTER",
              payload: { searchTerm: searchTerm.trim() },
            })
          }
          placeholder="Base Name ONLY"
          debounceTimer={275}
        />
        <MultiSelectCombobox
          title="Hull Type"
          options={Array.from(
            new Set([
              ...Object.values(shipData).map((ship) => ship.hullType),
              "IX",
            ]),
          ).sort((a, b) => a.localeCompare(b))}
          onSelect={(hullType) =>
            dispatch({
              type: "SET_FILTER",
              payload: { hullType: hullType || [] },
            })
          }
        />
        <MultiSelectCombobox
          title="Rarity"
          options={rarityOptions.map((r) => r.label)}
          onSelect={(selectedLabels) =>
            dispatch({
              type: "SET_FILTER",
              payload: {
                rarity: [
                  ...new Set(
                    selectedLabels
                      ?.map(
                        (label) =>
                          rarityOptions.find((r) => r.label === label)?.value,
                      )
                      .filter(Boolean),
                  ),
                ].sort((a, b) => (b ?? 0) - (a ?? 0)),
              },
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
