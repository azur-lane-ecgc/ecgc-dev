import { useMemo, useState } from "react"

import "@components/_common/ItemCell/styles.css"
import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"
import { endGameRankingsUpdateDate } from "@components/_common/Constants"

import { formatDate } from "@utils/formatDate"

import type { ShipData } from "@data/types/ships"
import type { AugmentData } from "@data/types/augments"

const ships: Record<number, ShipData> = (await import(
  "@data/data/ships.json"
).then((module) => module.default)) as Record<number, ShipData>

const augmentData: Record<number, AugmentData> = (await import(
  "@data/data/augments.json"
).then((module) => module.default)) as Record<number, AugmentData>

import { ShipTags } from "./ShipTags"
import {
  MainFleetRanking,
  VanguardFleetRanking,
  SSFleetRanking,
} from "./ShipRankings"
import { ShipEHPDisplay } from "./ShipEHP"
import { ShipLocations } from "./ShipLocations"

import {
  parseEquipHref,
  shipHullTypeParse,
  shipFactionParse,
  shipDefaultAugmentParse,
  shipLimitBreakBonusParse,
  shipSlotParse,
  shipNameParse,
  shipRarityParse,
  shipImageParse,
  shipSamvaluationParse,
  shipFleetTypeParse,
} from "./utils"

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
  id: number
  trigger?: TriggerProps
}

/**
 * ShipModal component that displays a modal with information about a ship.
 *
 * @component
 *
 * @param {ShipModalProps} props - The props for configuring the ship modal.
 * @param {number} props.id - Azur Lane ID of the ship
 * @param {TriggerProps} [props.trigger] - trigger control (iconNote, descriptionNote, largeDescNote)
 *
 * @returns {React.ReactNode} The Ship Modal itself.
 */
export const ShipModal: React.FC<ShipModalProps> = ({
  id,
  trigger,
}: ShipModalProps): React.ReactNode => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    if (!document.body.classList.contains("overflow-hidden")) {
      document.body.classList.add("overflow-hidden")
    }
  }

  const handleClose = () => {
    setOpen(false)
    if (document.body.classList.contains("overflow-hidden")) {
      document.body.classList.remove("overflow-hidden")
    }
  }

  // mrlar
  const mrLarData = ships[id]
  const ship = shipNameParse(mrLarData.id, mrLarData.name)
  const faction = shipFactionParse(mrLarData.nation)

  let rarity = shipRarityParse(mrLarData.rarity)
  const isKai = mrLarData.hasOwnProperty("retro")
  if (isKai) {
    rarity++
  }
  const hull = mrLarData?.retro?.hull ?? mrLarData.hull
  const hullType = shipHullTypeParse(hull)
  const fleetType: "main" | "ss" | "vg" = shipFleetTypeParse(hull)

  const limitBreakBonus = shipLimitBreakBonusParse(mrLarData?.specific_buff)
  const slots = shipSlotParse(
    mrLarData.slots[mrLarData.slots.length - 1],
    mrLarData.retro,
  )

  const augments = useMemo(() => {
    const uniqueAugment = mrLarData?.unique_aug
      ? augmentData[mrLarData.unique_aug].name
      : ""

    const normalAugments = shipDefaultAugmentParse(hull)

    if (!!uniqueAugment) {
      return [uniqueAugment, ...normalAugments]
    }

    return normalAugments.length <= 0 ? null : normalAugments
  }, [hull])
  const shipImg = shipImageParse(ship, isKai)

  // me
  const samvaluationData = shipSamvaluationParse(ship)
  const samvaluationText = samvaluationData.evaluation
  const fastLoad = samvaluationData?.preload ?? ""
  const roles = useMemo(() => ["Healer"].slice(0, 5), [])

  return (
    <>
      {/* Trigger "button" */}
      <div
        id={`modalTrigger${ship}`}
        className={`${modalTriggerStyle} ${!!trigger?.hasBorder ? "border-gray-400" : "border-transparent"}`}
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
      >
        <div className="relative">
          <div className="fake-modal-link">
            <div className={`icon rarity-${rarity} border-radius-0`}>
              <img loading="lazy" src={`${shipImg}`} alt={`${ship}`} />
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
          id={`modalOverlay${ship}`}
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
              className="mx-auto text-center pt-1"
            >
              {/* Heading */}
              <h1 className="mb-0">
                <a
                  className={`${shipLinkStyle}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(" ", "_")}`}
                >
                  {isKai ? ship + " (Retrofit)" : ship}
                </a>
              </h1>

              {/* Event / Location */}
              <ShipLocations shipName={ship} id={id} />
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
                    href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(" ", "_")}`}
                  >
                    <img loading="lazy" src={`${shipImg}`} alt={`${ship}`} />
                  </a>
                </div>

                {/* Samvaluation */}
                <div className="text-sm w-full">
                  <span
                    className="text-[14.5px] leading-normal text-[hsla(0,0%,100%,0.75)]"
                    dangerouslySetInnerHTML={{ __html: samvaluationText! }}
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
                              href={`/test_ecgc_2/equipment#${equipHref}`}
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
                            href={`https://azurlane.koumakan.jp/wiki/${augment.replaceAll(" ", "_")}`}
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
                      <span className="text-green-400 font-semibold">
                        {fastLoad}
                      </span>
                    </td>
                  </tr>
                )}
                {!!limitBreakBonus && (
                  <tr className="*:text-base">
                    <td>
                      <b>MLB Bonus</b>
                    </td>
                    <td colSpan={4}>
                      <span className="text-fuchsia-400 font-semibold">
                        {limitBreakBonus}
                      </span>
                    </td>
                  </tr>
                )}
              </ItemTable>
              <HR />

              {/* Rankings for End Game Azur Lane */}
              <h3 className="text-xl">
                <a
                  href="https://docs.google.com/spreadsheets/d/13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0/edit?gid=0#gid=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="by Suchiguma and his team"
                  aria-label="Rankings for End Game Azur Lane (by Suchiguma)"
                >
                  Rankings for End Game Azur Lane
                </a>
              </h3>
              <p className="text-sm">
                <b>Last Updated</b>:{" "}
                <span className="text-[#00ffff]">
                  {formatDate(endGameRankingsUpdateDate)}
                </span>
              </p>

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
