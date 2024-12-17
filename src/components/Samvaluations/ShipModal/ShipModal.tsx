import { useEffect, useState } from "react"
import {
  closeButtonStyle,
  modalOverlayStyle,
  shipIconContainerStyle,
  shipIconStyle,
  modalTriggerStyle,
  modalStyle,
  shipLinkStyle,
  // tagContainerStyle,
} from "./styles"

import "@components/_common/ItemCell/styles.css"

import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"
import { ShipCell } from "@components/_common/ItemCell"
import { RoleIcons } from "./RoleIcon"
import { ShipTags } from "./ShipTags"

interface TriggerProps {
  iconNote?: string
  descriptionNote?: string
  largeDescNote?: boolean
  hasBorder?: boolean
}

interface ShipModalProps {
  ship: string
  trigger?: TriggerProps
}

/**
 * ShipModal component that displays a modal with information about a ship.
 *
 * @component
 *
 * @param {ShipModalProps} props - The props for configuring the ship modal.
 * @param {string} props.ship - The ship's name.
 * @param {TriggerProps} [props.trigger] - trigger control (iconNote, descriptionNote, largeDescNote)
 *
 * @returns {React.JSX.Element} The Ship Modal itself.
 */
export const ShipModal: React.FC<ShipModalProps> = ({
  ship,
  trigger,
}: ShipModalProps): React.JSX.Element => {
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

  const location = ""
  const parsedLocation = location.replaceAll(" ", "_")
  const isKai = true
  const rarity = 4
  const shipImg = `ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`
  const samvaluationText = `Unicorn (Retrofit) is a healer-oriented CVL with great stats and amazing skills. She gains a preload which helps a lot with mobbing, and also gains backline healing capabilities as well. Her healing amount is also high as well. Overall, she is the best healer in the game, surpassing <a rel="noopener noreferrer" target="_blank" href="https://azurlane.koumakan.jp/wiki/Perseus" title="Perseus">Perseus</a>.`
  const faction = "HMS"
  const hullType = "CVL"
  const roles = ["Healer", "Healer", "Healer"]

  return (
    <>
      {/* Trigger "button" */}
      <div
        id={`modalTrigger${ship}`}
        className={`${modalTriggerStyle} ${!!trigger?.hasBorder ? "border-gray-400" : "border-transparent"}`}
        onClick={handleOpen}
      >
        <div className="relative">
          <div className="fake-modal-link">
            <div className={`icon rarity-${rarity} border-radius-0`}>
              <img
                loading="lazy"
                src={`/test_ecgc_2/images/${shipImg}`}
                alt={`${ship}`}
              />
            </div>
            {`${ship} ${isKai ? "(Retrofit)" : ""}`}
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
                dangerouslySetInnerHTML={{ __html: trigger.descriptionNote }}
              ></p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          id={`modalOverlay${ship}`}
          className={modalOverlayStyle}
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          {/* Inner Modal Content */}
          <div
            id={`shipModal${ship}`}
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

            <ShipTags hullType={hullType} faction={faction} roles={roles} />

            {/* Internal Content */}
            <div
              id={`innerModalContent${ship}`}
              className="mx-auto text-center"
            >
              {/* Heading */}
              <h1 className="mb-0">
                <a
                  className={shipLinkStyle}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(" ", "_")}`}
                >
                  {isKai ? ship + " (Retrofit)" : ship}
                </a>
              </h1>

              {/* Event / Location */}
              {!!location ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${parsedLocation}`}
                >
                  {location}
                </a>
              ) : (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://azurlane.koumakan.jp/wiki/Category:Ships"
                >
                  Base Game
                </a>
              )}
              <HR />

              {/* Flexbox for Icon + Samvaluation */}
              <div className={shipIconContainerStyle}>
                {/* Ship Icon */}
                <div className={`rarity-${rarity} ${shipIconStyle}`}>
                  <a
                    className={shipLinkStyle}
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(" ", "_")}`}
                  >
                    <img
                      loading="lazy"
                      src={`/test_ecgc_2/images/ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`}
                      alt={`${ship}`}
                    />
                  </a>
                </div>

                {/* Samvaluation */}
                <div className="text-sm">
                  <h3 className="text-xl underline">Samvaluation</h3>
                  <span
                    className="leading-normal text-[hsla(0,0%,100%,0.75)]"
                    dangerouslySetInnerHTML={{ __html: samvaluationText }}
                  ></span>
                </div>
              </div>
              <HR />

              {/* Equip Table */}
              <ItemTable
                tableInfo={[
                  { colName: "Ship", colWidth: "22%" },
                  { colName: "Location", colWidth: "25%" },
                  { colName: "Description", colWidth: "53%", limiter: true },
                ]}
              >
                <tr>
                  <td>
                    <ShipCell ship="Unicorn" rarity={3} />
                  </td>

                  <td>Guild Shop - Elite Ship</td>

                  <td>
                    <p>
                      Unicorn is the best healer in the game.{" "}
                      <b>Retrofit as soon as possible!</b>
                    </p>
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
