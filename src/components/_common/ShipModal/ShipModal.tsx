import { useEffect, useState } from "react"
import {
  closeButtonStyle,
  modalOverlayStyle,
  shipIconContainerStyle,
  shipIconStyle,
  modalTriggerStyle,
  modalStyle,
  shipLinkStyle,
} from "./styles"

import { HR } from "@components/_common/HR"

import { ItemTable } from "../ItemTable"
import { ShipCell } from "../ItemCell"

interface ShipModalProps {
  ship: string
}

export const ShipModal: React.FC<ShipModalProps> = ({ ship }) => {
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

  const location = "Ashen Simulacrum"
  const isKai = true
  const rarity = 4
  const shipImg = `ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`
  const samvaluationText = `Unicorn (Retrofit) is a healer-oriented CVL with great stats and amazing skills. She gains a preload which helps a lot with mobbing, and also gains backline healing capabilities as well. Her healing amount is also high as well. Overall, she is the best healer in the game, surpassing <a rel="noopener noreferrer" target="_blank" href="https://azurlane.koumakan.jp/wiki/Perseus" title="Perseus">Perseus</a>.`

  return (
    <>
      {/* Trigger "button" */}
      <div
        id={`modalTrigger${ship}`}
        className={modalTriggerStyle}
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
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Modal content */}
            <div id={`modalContent${ship}`} className="mx-auto text-center">
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
              {location ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${location.replaceAll(" ", "_")}`}
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

              <div className={shipIconContainerStyle}>
                {/* Ship Icon */}
                <div className={`rarity-${rarity} ${shipIconStyle}`}>
                  <img
                    loading="lazy"
                    src={`/test_ecgc_2/images/ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`}
                    alt={`${ship}`}
                  />
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
