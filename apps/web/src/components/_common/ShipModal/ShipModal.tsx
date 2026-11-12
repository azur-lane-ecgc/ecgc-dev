import { useState } from "react"
import { useTrackVisibility } from "react-intersection-observer-hook"

import "@/components/_common/ItemCell/styles.css"
import { ModalDialog } from "@/components/_common/ModalDialog/ModalDialog"
import { IconSkeleton } from "@/components/_common/Skeleton"
import type { ShipData } from "@/db/types"
import { shipImageParse } from "@/utils/ships"

import { ShipModalContent } from "./ShipModalContent"
import { modalTriggerStyle } from "./styles"

// Ship and resource trigger notes and display options.
export interface TriggerProps {
  iconNote?: string | null
  descriptionNote?: string | null
  largeDescNote?: boolean | null
  hasBorder?: boolean | null
  nonRetrofit?: boolean | null
}

interface ShipModalProps {
  readonly uniqueID?: string
  readonly shipData: ShipData
  readonly trigger?: TriggerProps
  readonly loading?: boolean
}

// Ship modal with a keyboard accessible trigger and lazy ship icon.
export function ShipModal({
  shipData,
  trigger,
  loading = false,
  uniqueID,
}: ShipModalProps) {
  const [open, setOpen] = useState(false)
  const [ref, { isVisible }] = useTrackVisibility({ rootMargin: "200px" })
  const { id, ship, rarity, isKai } = shipData
  const shipImg = shipImageParse(ship, trigger?.nonRetrofit ? false : isKai)

  return (
    <>
      <div
        ref={ref}
        className={`${modalTriggerStyle} ${trigger?.hasBorder ? "border-gray-400" : "border-transparent"}`}
      >
        <div className="relative">
          <button
            type="button"
            id={`${uniqueID ?? id}`}
            className="fake-modal-link block w-full cursor-pointer border-0 bg-transparent p-0 text-[inherit]"
            disabled={loading}
            onClick={() => setOpen(true)}
            aria-label={`Open modal for ${ship}`}
          >
            <span
              className={`icon border-radius-0 block ${isVisible ? `rarity-${trigger?.nonRetrofit ? rarity - 1 : rarity}` : ""}`}
            >
              {isVisible && shipImg && !loading ? (
                <img
                  width={56}
                  height={56}
                  loading="lazy"
                  src={shipImg}
                  alt={ship}
                />
              ) : (
                <IconSkeleton />
              )}
            </span>
            {`${ship} ${!trigger?.nonRetrofit && isKai ? "(Retrofit)" : ""}`}
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
              <p
                dangerouslySetInnerHTML={{ __html: trigger.descriptionNote }}
              />
            </div>
          )}
        </div>
      </div>
      {open && (
        <ModalDialog name={ship} onClose={() => setOpen(false)}>
          <ShipModalContent shipData={shipData} />
        </ModalDialog>
      )}
    </>
  )
}
