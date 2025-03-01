import { useEffect, useState } from "react"

import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"

import { db } from "@db/dexie"
import { checkAndUpdateDatabase } from "@db/populateDb"
import type { AllShipData } from "@db/types"

import { formatLocation } from "@utils/formatLocation"

export const SamvaluationModalFilter = () => {
  const [ships, setShips] = useState<AllShipData[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    const fetchShips = async () => {
      await checkAndUpdateDatabase()
      const allShips = await db.ships.orderBy("id").toArray()
      setShips(allShips)
    }

    fetchShips()
  }, [])

  return (
    <ItemContainer>
      {ships.map((ship) => (
        <ShipModal
          key={ship.id}
          shipData={ship}
          trigger={{
            iconNote: "Rank: SS",
            descriptionNote: `Events: ${formatLocation(ship.locations.events)}`,
            largeDescNote: false,
            hasBorder: true,
          }}
        />
      ))}
    </ItemContainer>
  )
}
