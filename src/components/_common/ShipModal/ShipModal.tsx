import { useState } from "react"

interface ShipModalProps {
  ship: string
  children?: any
}

export const ShipModal: React.FC<ShipModalProps> = ({ children, ship }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {/* Trigger button */}
      <div onClick={handleOpen} className="cursor-pointer inline-block">
        {children}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[60]">
          <div className="bg-ecgc-secondary rounded-lg shadow-lg w-3/4 max-w-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            {/* Modal content */}
            <div className="container mx-auto">
              <p>{ship} is really good trust me bro</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
