import { useEffect, useMemo, useState } from "react"

import "@components/_common/ItemCell/styles.css"
import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"

import { parseEquipHref } from "@utils/shipDataParse"
import {
  ShipRankingParse,
  type MainFleetRankingProps,
  type SSFleetRankingProps,
  type VanguardFleetRankingProps,
} from "@components/_common/ShipModal/shipRankingParse"
import { formatDate } from "@utils/formatDate"

import {
  closeButtonStyle,
  modalOverlayStyle,
  shipIconContainerStyle,
  shipIconStyle,
  modalTriggerStyle,
  modalStyle,
  shipLinkStyle,
  letterRankColor,
  numberRankColor,
} from "./styles"
import { ShipTags } from "./ShipTags"

export interface TriggerProps {
  iconNote?: string | null
  descriptionNote?: string | null
  largeDescNote?: boolean | null
  hasBorder?: boolean | null
}

interface SlotProps {
  type: string[]
  efficiency: number
  mounts: number
}

interface ShipModalProps {
  data: string
  trigger?: TriggerProps
}

const lastUpdated = formatDate("12/12/2024")

/**
 * ShipModal component that displays a modal with information about a ship.
 *
 * @component
 *
 * @param {ShipModalProps} props - The props for configuring the ship modal.
 * @param {string} props.data - The ship's name.
 * @param {TriggerProps} [props.trigger] - trigger control (iconNote, descriptionNote, largeDescNote)
 *
 * @returns {React.JSX.Element} The Ship Modal itself.
 */
export const ShipModal: React.FC<ShipModalProps> = ({
  data,
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

  const ship = data
  const location = ""
  const parsedLocation = location.replaceAll(" ", "_")
  const isKai = true
  const rarity = 4
  const shipImg = useMemo(
    () => `ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`,
    [],
  )
  const samvaluationText = useMemo(
    () => (
      <>
        Unicorn (Retrofit) is a healer-oriented CVL with great stats and amazing
        skills. She gains a preload, which helps a lot with mobbing. In
        addition, she also gains Main Fleet healing capabilities, although it's
        only on her first airstrike. Her healing amount is very high and
        consistent compared to other ships. Overall, she is the best healer in
        the game, surpassing{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://azurlane.koumakan.jp/wiki/Perseus"
          title="Perseus"
        >
          Perseus
        </a>
        .
      </>
    ),
    [],
  )

  const faction = "HMS"
  const hull = 6
  const hullType = "CVL"
  const roles = useMemo(() => ["Healer"].slice(0, 5), [])

  const slots: SlotProps[] = useMemo(
    () => [
      {
        type: ["Fighter"],
        efficiency: 1.45,
        mounts: 4,
      },
      {
        type: ["Torpedo Bomber"],
        efficiency: 1.35,
        mounts: 3,
      },
      {
        type: ["AA Gun"],
        efficiency: 0.8,
        mounts: 1,
      },
      {
        type: ["Auxiliary", "ASW Plane"],
        efficiency: 1,
        mounts: 1,
      },
      {
        type: ["Auxiliary", "ASW Plane"],
        efficiency: 1,
        mounts: 1,
      },
    ],
    [],
  )

  const fastLoad = (
    <span className="text-green-400">1 Preloaded Airstrike.</span>
  )

  const augments = useMemo(() => ["Scepter", "Hunting Bow"], [])

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
              <img
                loading="lazy"
                src={`/test_ecgc_2/images/${shipImg}`}
                alt={`${ship}`}
              />
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
              {!!location ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${parsedLocation}`}
                >
                  {location}
                </a>
              ) : (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://azurlane.koumakan.jp/wiki/Category:Ships"
                >
                  Base Game
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
                    <img
                      loading="lazy"
                      src={`/test_ecgc_2/images/ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`}
                      alt={`${ship}`}
                    />
                  </a>
                </div>

                {/* Samvaluation */}
                <div className="text-sm">
                  <span className="text-[14.5px] leading-normal text-[hsla(0,0%,100%,0.75)]">
                    {samvaluationText}
                  </span>
                </div>
              </div>
              <HR />
              {/* Equip Table */}
              <div>
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
                      <td>{slot.efficiency * 100}%</td>
                      <td>{slot.mounts}</td>
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
                      <td colSpan={4}>{fastLoad}</td>
                    </tr>
                  )}
                </ItemTable>
              </div>
              <HR />
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

              <ShipRankingParse ship={ship} hull={hull} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
