import { useEffect, useState } from "react"
import type { ShipData } from "@db/types"

// hook to get ship data
export const useShipData = (id: number, isVisible: boolean) => {
  const [shipData, setShipData] = useState<ShipData | null>(null)

  useEffect(() => {
    const fetchShipsData = async () => {
      if (isVisible && !shipData) {
        try {
          const fetchShips: Record<number, ShipData> = (await import(
            "@db/ship_data/ship_data.json"
          ).then((module) => module.default)) as Record<number, ShipData>
          setShipData(fetchShips[id])
        } catch (error) {
          console.error(`PLEASE DM SITE DEVELOPER ASAP REGARDING SHIP ${id}`)
          console.error(error)
        }
      }
    }

    fetchShipsData()
  }, [isVisible, id, shipData])

  return shipData
}
