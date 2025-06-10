import { useState } from "react"
import { useTrackVisibility } from "react-intersection-observer-hook"

import "@components/_common/ItemCell/styles.css"
import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"
import { IconSkeleton } from "@components/_common/Skeleton"

import type { ShipData } from "@db/types"

import {
  useBodyOverflow,
  useModalFocus,
  // useModalHistory,
} from "@utils/modalHooks"
import { parseEquipHref, shipImageParse } from "@utils/ships"

import { ShipTags } from "./ShipTags"
import {
  MainFleetRanking,
  VanguardFleetRanking,
  SSFleetRanking,
} from "./ShipRankings"
import { ShipEHPDisplay } from "./ShipEHP"
import { ShipLocations } from "./ShipLocations"

import {
  closeButtonStyle,
  modalOverlayStyle,
  shipIconContainerStyle,
  shipIconStyle,
  modalTriggerStyle,
  modalStyle,
  shipLinkStyle,
} from "./styles"

export interface TriggerProps {
  iconNote?: string | null
  descriptionNote?: string | null
  largeDescNote?: boolean | null
  hasBorder?: boolean | null
}

interface ShipModalProps {
  uniqueID?: string
  shipData: ShipData
  trigger?: TriggerProps
  loading: boolean
}

/**
 * ShipModal component that displays a modal with information about a ship.
 *
 * @component
 *
 * @param {ShipModalProps} props - The props for configuring the ship modal.
 * @param {ShipData} props.shipData - Complete data regarding the ship including rankings and EHP
 * @param {TriggerProps} [props.trigger] - trigger control (iconNote, descriptionNote, largeDescNote)
 *
 * @returns {React.ReactNode} The Ship Modal itself.
 */
export const ShipModal: React.FC<ShipModalProps> = ({
  shipData,
  trigger,
  loading = false,
  uniqueID = undefined,
}: ShipModalProps): React.ReactNode => {
  const [open, setOpen] = useState(false)
  const [ref, { isVisible }] = useTrackVisibility({
    rootMargin: "200px",
  })

  const {
    id,
    ship,
    faction,
    rarity,
    isKai,
    hullType,
    fleetType,
    LBBonus,
    slots,
    augments,
    samEval,
    fastLoad,
    roles,
    locations,
  } = shipData

  const shipImg = shipImageParse(ship, isKai)

  const handleClose = () => {
    if (loading) {
      return
    }
    setOpen(false)
  }

  const handleOpen = () => {
    if (loading) {
      return
    }
    setOpen(true)
  }

  // hook calls
  useModalFocus(
    open,
    uniqueID ?? id.toString(),
    `modalOverlay${uniqueID ?? ship}`,
    id.toString(),
  )
  // useModalHistory(id.toString(), open, setOpen)
  useBodyOverflow(open)

  return (
    <>
      {/* Trigger "button" */}
      <div
        id={`${uniqueID ?? id}`}
        className={`${modalTriggerStyle} ${
          !!trigger?.hasBorder ? "border-gray-400" : "border-transparent"
        }`}
        onClick={handleOpen}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOpen()
            e.preventDefault()
          }
        }}
        aria-label={`Open modal for ${ship}`}
        ref={ref}
      >
        <div className="relative">
          <div className="fake-modal-link" ref={ref}>
            <div
              className={`icon border-radius-0 ${
                isVisible ? `rarity-${rarity}` : ``
              }`}
            >
              {isVisible && !!shipImg && !loading ? (
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
              className={`description-note ${trigger.largeDescNote ? "larger" : ""} `}
            >
              <p
                onClick={(e) => e.stopPropagation()}
                dangerouslySetInnerHTML={{
                  __html: trigger.descriptionNote,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          id={`modalOverlay${uniqueID ?? ship}`}
          className={modalOverlayStyle}
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClose()
              e.preventDefault()
            }
          }}
          aria-label={`Close modal for ${ship}`}
        >
          {/* Modal Window */}
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

            {/* Role Tags */}
            <ShipTags hullType={hullType} faction={faction} roles={roles} />

            {/* Internal Content */}
            <div
              id={`innerModalContent${ship}`}
              className="mx-auto pt-1 text-center"
            >
              {/* Heading */}
              <h1 className="mb-0">
                <a
                  className={`${shipLinkStyle}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(
                    " ",
                    "_",
                  )}`}
                >
                  {isKai ? ship + " (Retrofit)" : ship}
                </a>
              </h1>

              {/* Event / Location */}
              <ShipLocations locations={locations} />
              <HR />

              {/* Flexbox for Icon + Samvaluation */}
              <div className={shipIconContainerStyle}>
                {/* Ship Icon */}
                <div className={`rarity-${rarity} ${shipIconStyle}`}>
                  <a
                    className={shipLinkStyle}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={ship}
                    href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(
                      " ",
                      "_",
                    )}`}
                  >
                    <img
                      width={116}
                      height={116}
                      loading="lazy"
                      src={`${shipImg}`}
                      alt={`${ship}`}
                    />
                  </a>
                </div>

                {/* Samvaluation */}
                <div className="w-full text-sm">
                  <span
                    className="text-[14.5px] leading-normal text-[hsla(0,0%,100%,0.75)]"
                    dangerouslySetInnerHTML={{ __html: samEval! }}
                  />
                </div>
              </div>
              <HR />

              {/* EHP */}
              <ShipEHPDisplay ship={ship} />

              {/* Equip Table */}
              <ItemTable
                tableInfo={[
                  { colName: "Slot", colWidth: "10%" },
                  { colName: "Equipment", colWidth: "55%", limiter: true },
                  { colName: "Efficiency", colWidth: "15%" },
                  { colName: "Mounts", colWidth: "10%" },
                ]}
              >
                {slots.map((slot, index) => (
                  <tr key={index} className="text-base *:text-base">
                    <td>{index + 1}</td>
                    <td>
                      {slot.type.map((type, typeIndex) => {
                        const equipHref = parseEquipHref(hullType, type)
                        return (
                          <span key={typeIndex}>
                            {typeIndex > 0 && ", "}
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={`/equipment#${equipHref}`}
                            >
                              {type}
                            </a>
                          </span>
                        )
                      })}
                    </td>
                    <td>{Math.round(slot.efficiency * 100)}%</td>
                    <td>{Math.round(slot.mounts)}</td>
                  </tr>
                ))}
                <tr className="*:text-base">
                  <td>
                    <b>Augments</b>
                  </td>
                  <td colSpan={4}>
                    {augments ? (
                      augments.map((augment, augIndex) => (
                        <span key={augIndex}>
                          {augIndex > 0 && ", "}
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`https://azurlane.koumakan.jp/wiki/${augment.replaceAll(
                              " ",
                              "_",
                            )}`}
                          >
                            {augment}
                          </a>
                        </span>
                      ))
                    ) : (
                      <span>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href={`https://azurlane.koumakan.jp/wiki/Augmentation`}
                        >
                          N/A
                        </a>
                      </span>
                    )}
                  </td>
                </tr>

                {!!fastLoad && (
                  <tr className="*:text-base">
                    <td>
                      <b>Preload</b>
                    </td>
                    <td colSpan={4}>
                      <span className="font-semibold text-green-400">
                        {fastLoad.text}
                      </span>
                    </td>
                  </tr>
                )}
                {!!LBBonus && (
                  <tr className="*:text-base">
                    <td>
                      <b>MLB Bonus</b>
                    </td>
                    <td colSpan={4}>
                      <span className="font-semibold text-fuchsia-400">
                        {LBBonus}
                      </span>
                    </td>
                  </tr>
                )}
              </ItemTable>
              <HR />

              {/* Rankings for End Game Azur Lane */}
              {(() => {
                switch (fleetType) {
                  case "main":
                    return <MainFleetRanking ship={ship} />
                  case "ss":
                    return <SSFleetRanking ship={ship} />
                  case "vg":
                    return <VanguardFleetRanking ship={ship} />
                  default:
                    return false
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
