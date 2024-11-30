import type { ShipCellProps } from "./ShipCell"

import "./styles.css"

export const ShipCellNoLink: React.FC<ShipCellProps> = ({
  ship = "",
  isKai = false,
  rarity = 1,

  iconNote = "",
  descriptionNote = "",
  largeDescNote = false,
  
  inGroup = false,
  hasBorder = false,
}) => {
  const itemImg = `ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`

  const itemCell = (
    <div
      className={`${hasBorder ? "border border-gray-400" : ""} modifiedShipRowCell text-center`}
    >
      <div className="relative">
        <a className="fake-modal-link" aria-label={ship} onClick={() => false}>
          <div className={`icon rarity-${rarity} border-radius-0`}>
            <img
              loading="lazy"
              src={`/test_ecgc_2/images/${itemImg}`}
              alt={`${ship}`}
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
          <div className={`description-note ${largeDescNote ? "larger" : ""}`}>
            <p dangerouslySetInnerHTML={{ __html: descriptionNote }}></p>
          </div>
        )}
      </div>
    </div>
  )

  return inGroup ? (
    itemCell
  ) : (
    <div className="flex justify-center items-center">{itemCell}</div>
  )
}
