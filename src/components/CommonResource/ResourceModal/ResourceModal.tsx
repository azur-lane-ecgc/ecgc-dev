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

import { ResourceData } from "../CommonResourceData"

interface ResourceModalProps {
  name: string
  trigger?: TriggerProps
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  name,
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

  const item = ResourceData.find(
    (item) => name.toLowerCase() === item.name.toLowerCase(),
  )!
  name = item.name + "s"
  const rarity = item.rarity
  const imgUrl = item.image
  const wikiLink = item.wikiLink

  if (trigger) {
    trigger.descriptionNote = String(item.total.monthly || "")
  }

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
              <HR />

              {/* Location */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
