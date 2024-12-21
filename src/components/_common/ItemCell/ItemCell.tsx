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
  hover?: boolean
  caption?: boolean
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
  hover = false,
  caption = true,
}) => {
  const itemCell = (
    <div
      className={`border ${hasBorder ? "border-gray-400" : "border-transparent"} ${hover ? `shipCellHover` : ""} modifiedShipRowCell text-center`}
    >
      <div className="relative">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://azurlane.koumakan.jp/wiki/${wikiLink.replaceAll(" ", "_")}`}
          title={item}
          aria-label={item}
        >
          <div className={`icon rarity-${rarity} border-radius-0`}>
            <img
              loading="lazy"
              src={`/test_ecgc_2/images/${itemImg}`}
              alt={`${item}`}
            />
          </div>
          {caption && item}
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
