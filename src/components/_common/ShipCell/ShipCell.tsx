import "./styles.css"

interface ShipCellProps {
  ship: string
  isKai?: boolean
  rarity: number
  iconNote?: string
  descriptionNote?: string

  inGroup?: boolean
  hasBorder?: boolean
}

export const ShipCell: React.FC<ShipCellProps> = ({
  ship = "",
  isKai = false,
  rarity = 1,
  iconNote = "",
  descriptionNote = "",
  inGroup = false,
  hasBorder = false,
}) => {
  const shipCell = (
    <div
      className={`${hasBorder ? "border border-gray-400" : ""} modifiedShipRowCell`}
    >
      <div className="relative">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://azurlane.koumakan.jp/wiki/${ship}`}
          title={ship}
        >
          <div className={`icon rarity-${rarity} border-radius-0`}>
            <img
              src={`images/ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`}
              alt="Unicorn"
            />
          </div>
          {ship}
        </a>
        {!!iconNote && (
          <div className="icon-note">
            <p>{iconNote}</p>
          </div>
        )}
        {!!descriptionNote && (
          <div className="description-note">
            <p>{descriptionNote}</p>
          </div>
        )}
      </div>
    </div>
  )

  return inGroup ? (
    shipCell
  ) : (
    <div className="flex justify-center items-center">{shipCell}</div>
  )
}
