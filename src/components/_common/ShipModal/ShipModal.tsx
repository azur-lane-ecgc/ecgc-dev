import { useState } from "react"

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
      <div
        className={`border border-gray-400 modifiedShipRowCell text-center cursor-pointer`}
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
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[60]"
          onClick={handleClose}
        >
          <div
            id={`shipModal${ship}`}
            className={`bg-ecgc-secondary rounded-lg shadow-lg w-full md:min-w-[750px] md:w-7/12 p-7 relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-xl"
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

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
                {/* Ship Icon */}
                <div
                  className={`overflow-hidden my-1.5 min-w-fit w-fit p-0.5 shadow-[0_10px_25px_0_rgba(0,0,0,1)] h-auto rarity-${rarity} border-radius-0 `}
                >
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
