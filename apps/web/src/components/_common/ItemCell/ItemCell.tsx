import "./styles.css"

interface ItemCellProps {
  item: string
  altItemName?: string
  wikiLink: string
  itemImg: string
  imgOverride?: boolean

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

export const ItemCell: React.FC<ItemCellProps> = ({
  item = "",
  altItemName = "",
  wikiLink,
  itemImg,
  imgOverride = false,
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
  const itemCell = (
    <div
      className={`border ${
        hasBorder ? "border-gray-400" : "border-transparent"
      } ${
        hover ? `shipCellHover` : ""
      } modifiedShipRowCell text-center ${className}`}
    >
      <div className="relative">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://azurlane.koumakan.jp/wiki/${wikiLink.replaceAll(
            " ",
            "_",
          )}`}
          title={item}
          aria-label={item}
        >
          <div className={`icon rarity-${rarity} border-radius-0`}>
            <img
              width={56}
              height={56}
              loading="lazy"
              src={!imgOverride ? `/images/${itemImg}` : itemImg}
              alt={`${item}`}
            />
          </div>
          {caption && (altItemName || item)}
        </a>
        {!!iconNote && (
          <div className="icon-note">
            <p>{iconNote}</p>
          </div>
        )}
        {!!descriptionNote && (
          <div className={`description-note ${largeDescNote ? "larger" : ""} `}>
            <p dangerouslySetInnerHTML={{ __html: descriptionNote }}></p>
          </div>
        )}
      </div>
    </div>
  )

  return inGroup ? (
    itemCell
  ) : (
    <div className="flex items-center justify-center">{itemCell}</div>
  )
}
