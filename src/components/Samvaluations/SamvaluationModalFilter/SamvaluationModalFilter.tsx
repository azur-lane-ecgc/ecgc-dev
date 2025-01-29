import { useState } from "react"

import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"

import type { ShipData } from "@data/ship_data/types"

import { formatLocation } from "@utils/formatLocation"

const ships: Record<number, ShipData> = (await import(
  "@data/ship_data/ship_data.json"
).then((module) => module.default)) as Record<number, ShipData>

export const SamvaluationModalFilter = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  return (
    <>
      <ItemContainer>
        {Object.keys(ships).map((key) => {
          const ship = ships[parseInt(key, 10)]
          if (!ship) return false
          return (
            <ShipModal
              key={ship.id}
              id={ship.id}
              trigger={{
                iconNote: null,
                descriptionNote: `Events: ${formatLocation(ship.locations.events)}`,
                largeDescNote: false,
                hasBorder: true,
              }}
            />
          )
        })}
      </ItemContainer>
    </>
  )
}
