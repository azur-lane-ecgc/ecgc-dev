import { useEffect, useState } from "react"
import { ModalContent } from "./ModalContent"

interface ShipModalProps {
  ship: string
  children?: any
}

export const ShipModal: React.FC<ShipModalProps> = ({ children, ship }) => {
  const [open, setOpen] = useState(false)
  const [shift, setShift] = useState(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const sidenav = document.getElementById("sidenav")

    if (sidenav && !sidenav.classList.contains("custom-sidenav-collapse")) {
      setShift(true)
    } else {
      setShift(false)
    }
  }, [open])

  return (
    <>
      {/* Trigger button */}
      <div onClick={handleOpen} className="cursor-pointer inline-block">
        {children}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[60]"
          onClick={handleClose}
        >
          <div
            id="shipModal"
            className={`bg-ecgc-secondary rounded-lg shadow-lg w-full md:min-w-[750px] md:w-7/12 p-6 relative ${shift ? "custom-sidenav-shift" : ""}`}
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
            <ModalContent ship={ship} isKai={true} rarity={4} />
          </div>
        </div>
      )}
    </>
  )
}
