import { ItemCell } from "./ItemCell"
import "./styles.css"

export interface ShipCellProps {
  ship: string
  isKai?: boolean
  rarity: number

  iconNote?: string
  descriptionNote?: string
  largeDescNote?: boolean

  inGroup?: boolean
  hasBorder?: boolean
}

export const ShipCell: React.FC<ShipCellProps> = ({
  ship = "",
  isKai = false,
  rarity = 1,
  iconNote = "",
  descriptionNote = "",
  largeDescNote = false,
  inGroup = false,
  hasBorder = false,
}) => {
  return (
    <ItemCell
      item={`${ship} ${isKai ? "(Retrofit)" : ""}`}
      wikiLink={ship}
      itemImg={`ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`}
      rarity={rarity}
      iconNote={iconNote}
      descriptionNote={descriptionNote}
      largeDescNote={largeDescNote}
      inGroup={inGroup}
      hasBorder={hasBorder}
    />
  )
}
