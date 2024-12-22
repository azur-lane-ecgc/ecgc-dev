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
  hover?: boolean
  caption?: boolean

  className?: string
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
  hover = false,
  caption = true,

  className = "",
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
      hover={hover}
      caption={caption}
      className={className}
    />
  )
}
