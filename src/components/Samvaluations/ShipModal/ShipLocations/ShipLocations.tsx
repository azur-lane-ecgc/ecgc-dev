import type React from "react"
import type { shipLocation, ShipLocationData } from "@utils/ships"
import { shipLocationParse } from "@utils/ships"

interface ShipLocationProps {
  shipName: string
  id: number
}

const LocationItem: React.FC<{ locations: shipLocation[] }> = ({
  locations,
}) => {
  if (locations.length === 0) {
    return false
  }

  return (
    <>
      {locations.map((loc, index) => (
        <div key={index} className="inline text-wrap text-base">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://azurlane.koumakan.jp/wiki/${loc.href}`}
            title={loc.name}
            aria-label={loc.name}
          >
            {loc.name}
          </a>
          <span className="inline text-white/75">
            {index < locations.length - 1 ? ", " : <br />}
          </span>
        </div>
      ))}
    </>
  )
}

export const ShipLocations: React.FC<ShipLocationProps> = ({
  shipName,
  id,
}) => {
  const locations: ShipLocationData = shipLocationParse(shipName, id)

  return (
    <>
      {
        <>
          <LocationItem locations={[...locations.events]} />
          <LocationItem
            locations={[
              ...locations.other,
              ...locations.construction,
              ...locations.permanent,
            ]}
          />
        </>
      }
    </>
  )
}
