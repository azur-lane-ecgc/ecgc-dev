import { useEffect, useMemo, useState } from "react"

import "@components/_common/ItemCell/styles.css"
import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"

import { formatDate } from "@utils/formatDate"

import type { ShipData } from "@data/types/ships"

import type { AugmentData } from "@data/types/augments"
import augments from "@data/data/augments.json"
const augmentData = augments as Record<number, AugmentData>

import { ShipTags } from "./ShipTags"
import { ShipRankings } from "./ShipRankings"

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
import { shipSamvaluationParse } from "./utils/shipSamvaluationParse/shipSamvaluationParse"

export interface TriggerProps {
  iconNote?: string | null
  descriptionNote?: string | null
  largeDescNote?: boolean | null
  hasBorder?: boolean | null
}

interface ShipModalProps {
  mrLarData: ShipData
  trigger?: TriggerProps
}

const lastUpdated = formatDate("12/12/2024")

/**
 * ShipModal component that displays a modal with information about a ship.
 *
 * @component
 *
 * @param {ShipModalProps} props - The props for configuring the ship modal.
 * @param {ShipData} props.mrLarData - ShipData from MrLar's Azur Lane Data
 * @param {TriggerProps} [props.trigger] - trigger control (iconNote, descriptionNote, largeDescNote)
 *
 * @returns {React.JSX.Element} The Ship Modal itself.
 */
export const ShipModal: React.FC<ShipModalProps> = ({
  mrLarData,
  trigger,
}: ShipModalProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
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

  // mrlar
  const ship = shipNameParse(mrLarData.id, mrLarData.name)
  const faction = useMemo(
    () => shipFactionParse(mrLarData.nation),
    [mrLarData.nation],
  )
  let rarity = shipRarityParse(mrLarData.rarity)
  const isKai = mrLarData.hasOwnProperty("retro")
  if (isKai) {
    rarity++
  }
  const hull = mrLarData?.retro?.hull ?? mrLarData.hull
  const hullType = useMemo(() => shipHullTypeParse(hull), [hull])
  const limitBreakBonus = useMemo(
    () => shipLimitBreakBonusParse(mrLarData?.specific_buff),
    [mrLarData],
  )
  const slots = useMemo(
    () =>
      shipSlotParse(
        mrLarData.slots[mrLarData.slots.length - 1],
        mrLarData.retro,
      ),
    [mrLarData.slots],
  )
  const augments = useMemo(() => {
    const uniqueAugment = mrLarData?.unique_aug
      ? augmentData[mrLarData.unique_aug].name
      : ""

    const normalAugments = shipDefaultAugmentParse(hull)

    if (!!uniqueAugment) {
      return [uniqueAugment, ...normalAugments]
    }

    return normalAugments
  }, [hull])
  const shipImg = useMemo(() => shipImageParse(ship, isKai), [])

  // me
  const samvaluationData = useMemo(() => shipSamvaluationParse(ship), [ship])
  const location = samvaluationData.event
  const samvaluationText = samvaluationData.evaluation

  const roles = useMemo(() => ["Healer"].slice(0, 5), [])
  const fastLoad = "1 Preloaded Airstrike"

  //mebot
  const eHP = 1234

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
              {!!location && (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={location.href}
                >
                  {location.name}
                </a>
              )}
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
                <div className="text-sm">
                  <span className="text-[14.5px] leading-normal text-[hsla(0,0%,100%,0.75)]">
                    {!!samvaluationText ? samvaluationText : "N/A"}
                  </span>
                </div>
              </div>
              <HR />

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
                    {augments.map((augment, augIndex) => (
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
                    ))}
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

              {/* End Game Rankings */}
              <h3 className="text-xl">
                <a
                  href="https://docs.google.com/spreadsheets/d/13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0/edit?gid=0#gid=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="by Suchiguma and his team"
                  aria-label="End Game Azur Lane Rankings"
                >
                  End Game Azur Lane Rankings
                </a>
              </h3>
              <p className="text-sm">
                <b>Last Updated</b>:{" "}
                <span className="text-[#00ffff]">{lastUpdated}</span>
              </p>
              <ShipRankings ship={ship} hull={hull} />

              {/* EHP */}
              <span className="text-lg leading-normal text-[hsla(0,0%,100%,0.75)]">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://docs.google.com/spreadsheets/d/1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc"
                  title="eHP Chart"
                >
                  eHP
                </a>
                : <b className="text-cyan-400">{eHP}</b>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
