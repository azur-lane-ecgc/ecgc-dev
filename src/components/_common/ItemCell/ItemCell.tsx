import "./styles.css"

interface ItemCellProps {
  item: string
  wikiLink: string
  itemImg: string
  rarity: number
  iconNote?: string
  descriptionNote?: string
  largeDescNote?: boolean

  inGroup?: boolean
  hasBorder?: boolean
}

export const ItemCell: React.FC<ItemCellProps> = ({
  item = "",
  wikiLink,
  itemImg,
  rarity = 1,
  iconNote = "",
  descriptionNote = "",
  largeDescNote = false,
  inGroup = false,
  hasBorder = false,
}) => {
  const itemCell = (
    <div
      className={`${hasBorder ? "border border-gray-400" : ""} modifiedShipRowCell`}
    >
      <div className="relative">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://azurlane.koumakan.jp/wiki/${wikiLink}`}
          title={item}
        >
          <div className={`icon rarity-${rarity} border-radius-0`}>
            <img src={`/test_ecgc_2/images/${itemImg}`} alt={`${item}`} />
          </div>
          {item}
        </a>
        {!!iconNote && (
          <div className="icon-note">
            <p>{iconNote}</p>
          </div>
        )}
        {!!descriptionNote && (
          <div
            className={`description-note 
              ${largeDescNote ? "larger" : ""}
            `}
          >
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
