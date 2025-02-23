import { useEffect, useState } from "react"

import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"

import { checkAndUpdateDatabase } from "@db/dexie"
import type { ShipData } from "@db/ship_data/types"

import { formatLocation } from "@utils/formatLocation"

const ships: Record<number, ShipData> = (await import(
  "@db/ship_data/ship_data.json"
).then((module) => module.default)) as Record<number, ShipData>

export const SamvaluationModalFilter = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    checkAndUpdateDatabase().then(() => {
      console.log("Database checked and populated if needed.")
    })
  }, [])

  return (
    <>
      <ItemContainer>
        {Object.keys(ships).map((key) => {
          const ship = ships[parseInt(key, 10)]
          if (!ship) return false
          return (
            <ShipModal
              key={ship.id}
              shipData={ship}
              trigger={{
                iconNote: "Rank: SS",
                descriptionNote: `Events: ${formatLocation(
                  ship.locations.events,
                )}`,
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
