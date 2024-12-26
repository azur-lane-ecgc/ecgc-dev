import { useEffect, useState } from "react"

import "@components/_common/ItemCell/styles.css"

import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"
import type { TriggerProps } from "@components/_common/ShipModal"
import {
  closeButtonStyle,
  modalOverlayStyle,
  modalTriggerStyle,
  modalStyle,
  shipIconStyle,
  shipLinkStyle,
} from "@components/_common/ShipModal/styles"

import type { ResourceProps } from "../CommonResourceData/types"
import { getCellColor } from "../utils/getCellColor"

import { LocationLinks } from "./LocationLinks"
import { Mark } from "./Mark"

interface ResourceModalProps {
  item: ResourceProps
  trigger?: TriggerProps
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  item,
  trigger,
}): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    return
  }, [open])

  const name = item.plural || item.name + "s"
  const rarity = item.rarity
  const imgUrl = item.image
  const wikiLink = item.wikiLink
  const drops = item.drops

  return (
    <>
      {/* Trigger "button" */}
      <div
        id={`modalTrigger${name}`}
        className={`${modalTriggerStyle} ${!!trigger?.hasBorder ? "border-gray-400" : "border-transparent"}`}
        onClick={handleOpen}
      >
        <div className="relative">
          <div className="fake-modal-link">
            <div className={`icon rarity-${rarity} border-radius-0`}>
              <img
                loading="lazy"
                src={`/test_ecgc_2/images/${imgUrl}`}
                alt={`${item.name}`}
              />
            </div>
            {`${item.name}`}
          </div>
          {!!trigger?.iconNote && (
            <div className="icon-note">
              <p>{trigger.iconNote}</p>
            </div>
          )}
          {!!trigger?.descriptionNote && (
            <div
              className={`description-note 
              ${trigger.largeDescNote ? "larger" : ""}
            `}
            >
              <p
                onClick={(e) => e.stopPropagation()}
                dangerouslySetInnerHTML={{ __html: trigger.descriptionNote }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          id={`modalOverlay${name}`}
          className={modalOverlayStyle}
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          {/* Modal Window */}
          <div
            id={`resourceModal${name}`}
            className={`${modalStyle} !max-w-[800px]`}
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className={closeButtonStyle}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            {/* Internal Content */}
            <div
              id={`innerModalContent${name}`}
              className="mx-auto text-center pt-1"
            >
              {/* Heading */}
              <h1 className="mb-0">
                <a
                  className={`${shipLinkStyle}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${wikiLink.replaceAll(" ", "_")}`}
                >
                  {name}
                </a>
              </h1>
              <h6 className="sm:hidden mt-1 underline underline-offset-2">
                Tables are scrollable horizontally!
              </h6>

              <div
                className={"flex flex-col md:flex-row items-center gap-4 mt-5"}
              >
                {/* Item Icon */}
                <div className={`rarity-${rarity} ${shipIconStyle}`}>
                  <a
                    className={shipLinkStyle}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={name}
                    href={`https://azurlane.koumakan.jp/wiki/${wikiLink.replaceAll(" ", "_")}`}
                  >
                    <img
                      loading="lazy"
                      src={`/test_ecgc_2/images/${imgUrl}`}
                      alt={`${name}`}
                    />
                  </a>
                </div>

                {/* Totals */}
                <div className="w-full">
                  <ItemTable
                    tableInfo={[
                      { colName: "Daily", colWidth: "25%", limiter: true },
                      { colName: "Weekly", colWidth: "25%", limiter: true },
                      { colName: "Monthly", colWidth: "25%", limiter: true },
                      {
                        colName: "Bimonthly",
                        colWidth: "25%",
                        limiter: true,
                      },
                    ]}
                    active={true}
                  >
                    <tr>
                      <td className=" font-bold">
                        <span className="!text-yellow-400">
                          {item.total.daily}
                        </span>
                        {item.total.daily !== "N/A" && " / Day"}
                      </td>
                      <td className=" font-bold">
                        <span className="!text-yellow-400">
                          {item.total.weekly}
                        </span>
                        {item.total.weekly !== "N/A" && " / Week"}
                      </td>
                      <td className=" font-bold">
                        <span className="!text-yellow-400">
                          {item.total.monthly}
                        </span>
                        {item.total.monthly !== "N/A" && " / Month"}
                      </td>
                      <td className=" font-bold">
                        <span className="!text-yellow-400">
                          {item.total.bimonthly}
                        </span>
                        {item.total.bimonthly !== "N/A" && " / 2 Months"}
                      </td>
                    </tr>
                  </ItemTable>
                </div>
              </div>

              {item.notes && (
                <p
                  dangerouslySetInnerHTML={{ __html: `Note: ${item.notes}` }}
                  className="!text-sm mt-3"
                ></p>
              )}
              <HR />

              <h4 className="text-left ml-1 mb-3">Daily</h4>
              <ItemTable
                tableInfo={[
                  { colName: "Academy", colWidth: "25%", limiter: true },
                  { colName: "Missions", colWidth: "25%", limiter: true },
                  { colName: "Daily Raid", colWidth: "25%", limiter: true },
                  { colName: "Cruise Pass", colWidth: "25%", limiter: true },
                ]}
                active={true}
              >
                <tr className="h-[175px] min-h-[175px]">
                  <td className={getCellColor(drops.academy?.checkMark.color)}>
                    <Mark mark={drops.academy?.checkMark} />
                    <LocationLinks locations={drops.academy?.locations} />
                  </td>
                  <td className={getCellColor(drops.missions?.checkMark.color)}>
                    <Mark mark={drops.missions?.checkMark} />
                    <LocationLinks locations={drops.missions?.locations} />
                  </td>
                  <td
                    className={getCellColor(drops.dailyRaid?.checkMark.color)}
                  >
                    <Mark mark={drops.dailyRaid?.checkMark} />
                    <LocationLinks locations={drops.dailyRaid?.locations} />
                  </td>
                  <td
                    className={getCellColor(drops.cruisePass?.checkMark.color)}
                  >
                    <Mark mark={drops.cruisePass?.checkMark} />
                    <LocationLinks locations={drops.cruisePass?.locations} />
                  </td>
                </tr>
              </ItemTable>
              <HR />

              {/* Farming */}
              <h4 className="text-left ml-1 mb-3">Farming</h4>
              <ItemTable
                tableInfo={[
                  { colName: "Campaign", colWidth: "25%", limiter: true },
                  { colName: "Hard Mode", colWidth: "25%", limiter: true },
                  { colName: "Event", colWidth: "25%", limiter: true },
                  { colName: "OPSI", colWidth: "25%", limiter: true },
                ]}
                active={true}
              >
                <tr className="h-[175px] min-h-[175px]">
                  <td
                    className={getCellColor(
                      drops.campaignDrop?.checkMark.color,
                    )}
                  >
                    <Mark mark={drops.campaignDrop?.checkMark} />
                    <LocationLinks locations={drops.campaignDrop?.locations} />
                  </td>
                  <td
                    className={getCellColor(
                      drops.hardModeDrop?.checkMark.color,
                    )}
                  >
                    <Mark mark={drops.hardModeDrop?.checkMark} />
                    <LocationLinks locations={drops.hardModeDrop?.locations} />
                  </td>
                  <td
                    className={getCellColor(drops.eventDrop?.checkMark.color)}
                  >
                    <Mark mark={drops.eventDrop?.checkMark} />
                    <LocationLinks locations={drops.eventDrop?.locations} />
                  </td>
                  <td className={getCellColor(drops.opsi?.checkMark.color)}>
                    <Mark mark={drops.opsi?.checkMark} />
                    <LocationLinks locations={drops.opsi?.locations} />
                  </td>
                </tr>
              </ItemTable>
              <HR />

              {/* Shops 1 */}
              <h4 className="text-left ml-1 mb-3">Shops</h4>
              <ItemTable
                tableInfo={[
                  { colName: "General", colWidth: "25%", limiter: true },
                  { colName: "Merit", colWidth: "25%", limiter: true },
                  { colName: "Guild", colWidth: "25%", limiter: true },
                  { colName: "META", colWidth: "25%", limiter: true },
                ]}
                active={true}
              >
                <tr className="h-[175px] min-h-[175px]">
                  <td
                    className={getCellColor(drops.generalShop?.checkMark.color)}
                  >
                    <Mark mark={drops.generalShop?.checkMark} />
                    <LocationLinks locations={drops.generalShop?.locations} />
                  </td>
                  <td
                    className={getCellColor(drops.meritShop?.checkMark.color)}
                  >
                    <Mark mark={drops.meritShop?.checkMark} />
                    <LocationLinks locations={drops.meritShop?.locations} />
                  </td>
                  <td
                    className={getCellColor(drops.guildShop?.checkMark.color)}
                  >
                    <Mark mark={drops.guildShop?.checkMark} />
                    <LocationLinks locations={drops.guildShop?.locations} />
                  </td>
                  <td className={getCellColor(drops.metaShop?.checkMark.color)}>
                    <Mark mark={drops.metaShop?.checkMark} />
                    <LocationLinks locations={drops.metaShop?.locations} />
                  </td>
                </tr>
              </ItemTable>
              <br />

              {/* Shops 2 */}
              <ItemTable
                tableInfo={[
                  { colName: "Core Data", colWidth: "25%", limiter: true },
                  { colName: "Medal", colWidth: "25%", limiter: true },
                  { colName: "Prototype", colWidth: "25%", limiter: true },
                  { colName: "Event", colWidth: "25%", limiter: true },
                ]}
                active={true}
              >
                <tr className="h-[175px] min-h-[175px]">
                  <td
                    className={getCellColor(
                      drops.coreDataShop?.checkMark.color,
                    )}
                  >
                    <Mark mark={drops.coreDataShop?.checkMark} />
                    <LocationLinks locations={drops.coreDataShop?.locations} />
                  </td>
                  <td
                    className={getCellColor(drops.medalShop?.checkMark.color)}
                  >
                    <Mark mark={drops.medalShop?.checkMark} />
                    <LocationLinks locations={drops.medalShop?.locations} />
                  </td>
                  <td
                    className={getCellColor(
                      drops.prototypeShop?.checkMark.color,
                    )}
                  >
                    <Mark mark={drops.prototypeShop?.checkMark} />
                    <LocationLinks locations={drops.prototypeShop?.locations} />
                  </td>
                  <td
                    className={getCellColor(drops.eventShop?.checkMark.color)}
                  >
                    <Mark mark={drops.eventShop?.checkMark} />
                    <LocationLinks locations={drops.eventShop?.locations} />
                  </td>
                </tr>
              </ItemTable>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
