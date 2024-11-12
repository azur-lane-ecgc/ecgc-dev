import { ItemCell } from "./ItemCell"
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
  return (
    <ItemCell
      item={ship}
      wikiLink={ship}
      itemImg={`ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`}
      rarity={rarity}
      iconNote={iconNote}
      descriptionNote={descriptionNote}
      inGroup={inGroup}
      hasBorder={hasBorder}
    />
  )
}
