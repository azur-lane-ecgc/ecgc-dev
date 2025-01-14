import { useEffect, useState } from "react"

import { ItemCellSkeleton } from "@components/_common/Skeleton"
import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"

import type { ShipData } from "@data/ship_data/types"

export const SamvaluationModalFilter = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [ships, setShips] = useState<Record<number, ShipData>>({})

  useEffect(() => {
    const fetchShipsData = async () => {
      setLoading(true)
      const fetchShips: Record<number, ShipData> = (await import(
        "@data/ship_data/ship_data.json"
      ).then((module) => module.default)) as Record<number, ShipData>
      setShips(fetchShips)
      setLoading(false)
    }

    fetchShipsData()
  }, [])

  return (
    <>
      {loading && (
        <ItemContainer>
          {Array.from({ length: 100 }).map((_, index) => (
            <ItemCellSkeleton key={index} />
          ))}
        </ItemContainer>
      )}

      {!loading && (
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
                  descriptionNote: null,
                  largeDescNote: false,
                  hasBorder: true,
                }}
              />
            )
          })}
        </ItemContainer>
      )}
    </>
  )
}
