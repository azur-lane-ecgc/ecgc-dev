import { useState } from "react"

import "@/components/_common/ItemCell/styles.css"
import { ModalDialog } from "@/components/_common/ModalDialog/ModalDialog"
import type { TriggerProps } from "@/components/_common/ShipModal"
import {
  modalTriggerStyle,
  shipLinkStyle,
} from "@/components/_common/ShipModal/styles"
import { getImageAssetUrl } from "@/utils/images/imageAssetUrl"
import { useModalHistory } from "@/utils/modalHooks"

import type { ResourceProps } from "../CommonResourceData/types"
import { ResourceDrops } from "./ResourceDrops"
import { ResourceTotals } from "./ResourceTotals"

interface ResourceModalProps {
  readonly item: ResourceProps
  readonly trigger?: TriggerProps
}

// Resource modal with acquisition totals and drop locations.
export function ResourceModal({ item, trigger }: ResourceModalProps) {
  const [open, setOpen] = useState(false)
  const name = item.plural || item.name + "s"
  const resourceId = name.replaceAll(" ", "_")
  useModalHistory(resourceId, open, setOpen)
  return (
    <>
      <div
        className={`${modalTriggerStyle} ${trigger?.hasBorder ? "border-gray-400" : "border-transparent"}`}
      >
        <div className="relative">
          <button
            type="button"
            id={resourceId}
            className="fake-modal-link block w-full cursor-pointer border-0 bg-transparent p-0 text-[inherit]"
            onClick={() => setOpen(true)}
            aria-label={`Open modal for ${name}`}
          >
            <span
              className={`icon rarity-${Array.isArray(item.rarity) ? item.rarity[1] : item.rarity} border-radius-0 block`}
            >
              <img
                width={56}
                height={56}
                loading="lazy"
                src={getImageAssetUrl(
                  Array.isArray(item.image) ? item.image[1] : item.image,
                )}
                alt={item.name}
              />
            </span>
            {item.name}
          </button>
          {!!trigger?.iconNote && (
            <div className="icon-note pointer-events-none">
              <p>{trigger.iconNote}</p>
            </div>
          )}
          {!!trigger?.descriptionNote && (
            <div
              className={`description-note ${trigger.largeDescNote ? "larger" : ""}`}
            >
              <p>{trigger.descriptionNote}</p>
            </div>
          )}
        </div>
      </div>
      {open && (
        <ModalDialog
          name={name}
          onClose={() => setOpen(false)}
          className="max-w-200!"
        >
          <div
            id={`innerModalContent${name}`}
            className="mx-auto pt-1 text-center"
          >
            <h1 className="mb-0">
              <a
                className={shipLinkStyle}
                rel="noopener noreferrer"
                target="_blank"
                href={`https://azurlane.koumakan.jp/wiki/${item.wikiLink.replaceAll(" ", "_")}`}
              >
                {name}
              </a>
            </h1>
            <h6 className="mt-1 underline underline-offset-2 sm:hidden">
              Tables are scrollable horizontally!
            </h6>
            <ResourceTotals item={item} />
            {item.notes && (
              <p
                dangerouslySetInnerHTML={{ __html: `Note: ${item.notes}` }}
                className="mt-3 text-sm!"
              />
            )}
            <ResourceDrops drops={item.drops} />
          </div>
        </ModalDialog>
      )}
    </>
  )
}
