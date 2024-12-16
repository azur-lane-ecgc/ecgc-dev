import { useState } from "react"
import {
  closeButtonStyle,
  ModalContainerStyle,
  ModalStyle,
  shipIconContainerStyle,
  shipIconStyle,
  modalTriggerStyle,
} from "./styles"

interface ShipModalProps {
  ship: string
  isKai?: boolean
}

export const ShipModal: React.FC<ShipModalProps> = ({ ship, isKai = true }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const rarity = 4
  const shipImg = `ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`
  const samvaluationText = `<p>Unicorn (Retrofit) is a healer-oriented CVL with great stats and amazing skills. She gains a preload which helps a lot with mobbing, and also gains backline healing capabilities as well. Her healing amount is also high as well. Overall, she is the best healer in the game, surpassing <a rel="noopener noreferrer" target="_blank" href="https://azurlane.koumakan.jp/wiki/Perseus" title="Perseus">Perseus</a>.</p>`

  return (
    <>
      {/* Trigger "button" */}
      <div className={modalTriggerStyle} onClick={handleOpen}>
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
        <div className={ModalContainerStyle} onClick={handleClose}>
          <div
            id={`shipModal${ship}`}
            className={ModalStyle}
            onClick={(e) => e.stopPropagation()}
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
            <div className="mx-auto text-center">
              <h1 className="mb-0">Unicorn (Retrofit)</h1>
              <a href="https://azurlane.koumakan.jp/wiki/Category:Ships">
                Base Game
              </a>

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
                <div>
                  <p dangerouslySetInnerHTML={{ __html: samvaluationText }}></p>
                </div>
              </div>
              <br />

              <p>MORE CONTENT YAY</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
