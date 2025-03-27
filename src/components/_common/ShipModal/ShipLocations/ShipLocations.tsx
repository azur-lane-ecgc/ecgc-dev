import type { shipLocation, ShipLocationData } from "@db/types"

interface ShipLocationProps {
  locations: ShipLocationData
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

export const ShipLocations: React.FC<ShipLocationProps> = ({ locations }) => {
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
