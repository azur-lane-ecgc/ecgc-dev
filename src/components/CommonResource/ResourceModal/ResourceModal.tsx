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
  shipLinkStyle,
} from "@components/_common/ShipModal/styles"

import type { ResourceProps } from "../CommonResourceData/types"

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

  const name = item.name + "s"
  const rarity = item.rarity
  const imgUrl = item.image
  const wikiLink = item.wikiLink

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
                alt={`${name}`}
              />
            </div>
            {`${name}`}
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
            className={modalStyle}
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
              {/* Item Icon */}
              <div className="w-full flex justify-center">
                <div
                  className={`rarity-${rarity} my-1.5 min-w-fit w-fit p-0.5 shadow-[0_10px_25px_0_rgba(0,0,0,1)]`}
                >
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
                      alt={`${item.name}`}
                    />
                  </a>
                </div>
              </div>

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
              <h6 className="sm:hidden mt-3"> Scroll on Tables!</h6>
              <HR />

              {/* Totals */}
              <h4 className="text-left ml-1 mb-3">Total</h4>
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
                    <span className="!text-yellow-400">{item.total.daily}</span>{" "}
                    / Day
                  </td>
                  <td className=" font-bold">
                    <span className="!text-yellow-400">
                      {item.total.weekly}
                    </span>{" "}
                    / Week
                  </td>
                  <td className=" font-bold">
                    <span className="!text-yellow-400">
                      {item.total.monthly}
                    </span>{" "}
                    / Month
                  </td>
                  <td className=" font-bold">
                    <span className="!text-yellow-400">
                      {item.total.bimonthly}
                    </span>{" "}
                    / 2 Months
                  </td>
                </tr>
              </ItemTable>
              <HR />

              {/* Dailies */}
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
                <tr className="h-[120px] min-h-[120px]">
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
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
                <tr className="h-[120px] min-h-[120px]">
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr>
              </ItemTable>
              <HR />

              {/* Shops 1 */}
              <h4 className="text-left ml-1 mb-3">Shops</h4>
              <ItemTable
                tableInfo={[
                  { colName: "General", colWidth: "25%", limiter: true },
                  { colName: "Core Data", colWidth: "25%", limiter: true },
                  { colName: "Guild", colWidth: "25%", limiter: true },
                  { colName: "Merit", colWidth: "25%", limiter: true },
                ]}
                active={true}
              >
                <tr className="h-[120px] min-h-[120px]">
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr>
              </ItemTable>
              <br />

              {/* Shops 2 */}
              <ItemTable
                tableInfo={[
                  { colName: "Medal", colWidth: "25%", limiter: true },
                  { colName: "Prototype", colWidth: "25%", limiter: true },
                  { colName: "Event", colWidth: "25%", limiter: true },
                  { colName: "META", colWidth: "25%", limiter: true },
                ]}
                active={true}
              >
                <tr className="h-[120px] min-h-[120px]">
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr>
              </ItemTable>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
