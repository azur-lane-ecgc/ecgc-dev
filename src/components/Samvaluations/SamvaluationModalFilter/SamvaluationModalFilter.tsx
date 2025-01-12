import { useState } from "react"

import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/_common/ShipModal"

import type { ShipData } from "@data/types/ships"
import shipData from "@data/data/ships.json"
const ships = shipData as Record<number, ShipData>

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
              id={ship.id}
              trigger={{
                iconNote: null,
                descriptionNote: null,
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
