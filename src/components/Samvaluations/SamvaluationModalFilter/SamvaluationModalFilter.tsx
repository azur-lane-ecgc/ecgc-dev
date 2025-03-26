import { useState, useEffect } from "react"
import { useLiveQuery } from "dexie-react-hooks"

import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"
import { MultiSelectCombobox } from "@components/_common/ComboBox"
import { Input } from "@components/_common/Input"
import { ToggleButton } from "@components/_common/ToggleButton"

import { db } from "@db/dexie"
import { checkAndUpdateDatabase } from "@db/populateDb"
import type { AllShipData } from "@db/types"

import { formatLocation } from "@utils/formatLocation"

import { useShipFilter } from "./useShipFilter"
import { rarityOptions } from "./utils"

export const SamvaluationModalFilter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const shipData: AllShipData[] = useLiveQuery(() => db.ships.toArray()) || []
  const { state, dispatch } = useShipFilter(loading)

  useEffect(() => {
    checkAndUpdateDatabase().then(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="mb-3">
        <button
          className="rounded-xl border border-pink-800 bg-purple-400 px-4 py-2 shadow-lg hover:bg-purple-300"
          onClick={() => dispatch({ type: "RESET_FILTER", payload: null })}
        >
          <div className="text-center font-bold text-black">Clear Filters</div>
        </button>
      </div>

      {/* ComboBoxes */}
      <div className="mb-3 flex flex-row flex-wrap gap-3.5">
        <MultiSelectCombobox
          title="Fleet Type"
          options={["Main Fleet", "Vanguard Fleet", "Submarine Fleet"]}
          onSelect={(fleetType) =>
            dispatch({
              type: "SET_FILTER",
              payload: { fleetType: fleetType || [] },
            })
          }
          reset={state.reset}
        />
        <MultiSelectCombobox
          title="Hull Type"
          options={Array.from(
            new Set([
              ...shipData.map((ship) =>
                ship.hullType === "DDGv" ? "DDG" : ship.hullType,
              ),
              "IX",
            ]),
          ).sort()}
          onSelect={(hullType) =>
            dispatch({
              type: "SET_FILTER",
              payload: { hullType: hullType || [] },
            })
          }
          reset={state.reset}
        />
        <MultiSelectCombobox
          title="Faction"
          options={[
            ...Array.from(
              new Set([...shipData.map((ship) => ship.faction)]),
            ).sort(),
          ]}
          onSelect={(faction) =>
            dispatch({
              type: "SET_FILTER",
              payload: { faction: faction || [] },
            })
          }
          reset={state.reset}
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
          reset={state.reset}
        />
      </div>

      {/* Input + Button Container */}
      <div className="mb-3 flex flex-row-reverse flex-wrap justify-end gap-3.5">
        {/* Unique Augment Filter */}
        <ToggleButton
          title="Augments"
          options={[
            { title: "All", payload: "" },
            { title: "Unique", payload: "true" },
            { title: "Standard", payload: "false" },
          ]}
          initialValue={0}
          onSelect={(nextOption) =>
            dispatch({
              type: "SET_FILTER",
              payload: { hasUniqueAugment: nextOption },
            })
          }
          reset={state.reset}
        />

        {/* Retrofit Filter */}
        <ToggleButton
          title="Retrofit"
          options={[
            { title: "All", payload: "" },
            { title: "Has-Retrofit", payload: "true" },
            { title: "No Retrofit", payload: "false" },
          ]}
          initialValue={0}
          onSelect={(nextOption) =>
            dispatch({
              type: "SET_FILTER",
              payload: { isKai: nextOption },
            })
          }
          reset={state.reset}
        />

        {/* Search Bar */}
        <Input
          className="w-full sm:w-56 md:w-72"
          title="Ship Name"
          onSelect={(searchTerm) =>
            dispatch({
              type: "SET_FILTER",
              payload: { searchTerm: searchTerm.trim() },
            })
          }
          placeholder="Base Name ONLY"
          debounceTimer={275}
          reset={state.reset}
        />
      </div>

      {/* Ship Modals */}
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
