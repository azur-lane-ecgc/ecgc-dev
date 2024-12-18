import { useEffect, useState } from "react"

import "@components/_common/ItemCell/styles.css"
import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"

import { parseEquipHref } from "@utils/shipDataParse"
import {
  shipRankingParse,
  type MainFleetRankingProps,
  type SSFleetRankingProps,
  type VanguardFleetRankingProps,
} from "@utils/shipRankingParse"
import { formatDate } from "@utils/formatDate"

import {
  closeButtonStyle,
  modalOverlayStyle,
  shipIconContainerStyle,
  shipIconStyle,
  modalTriggerStyle,
  modalStyle,
  shipLinkStyle,
} from "./styles"
import { ShipTags } from "./ShipTags"

interface TriggerProps {
  iconNote?: string | null
  descriptionNote?: string | null
  largeDescNote?: boolean | null
  hasBorder?: boolean | null
}

interface SlotProps {
  type: string[]
  efficiency: number
  mounts: number
  preload: boolean
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

  const ship = data
  const location = ""
  const parsedLocation = location.replaceAll(" ", "_")
  const isKai = true
  const rarity = 4
  const shipImg = `ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`
  const samvaluationText = `Unicorn (Retrofit) is a healer-oriented CVL with great stats and amazing skills. She gains a preload, which helps a lot with mobbing. In addition, she also gains Main Fleet healing capabilities, although it's only on her first airstrike. Her healing amount is very high and consistent compared to other ships. Overall, she is the best healer in the game, surpassing <a rel="noopener noreferrer" target="_blank" href="https://azurlane.koumakan.jp/wiki/Perseus" title="Perseus">Perseus</a>.`
  const faction = "HMS"
  const hullType = "CVL"
  const roles = ["Healer"].slice(0, 5)
  const isMainFleet = true
  const rankings:
    | MainFleetRankingProps
    | VanguardFleetRankingProps
    | SSFleetRankingProps = shipRankingParse(isMainFleet, ship)

  const slots: SlotProps[] = [
    {
      type: ["Fighter"],
      efficiency: 1.45,
      mounts: 4,
      preload: true,
    },
    {
      type: ["Torpedo Bomber"],
      efficiency: 1.35,
      mounts: 3,
      preload: true,
    },
    {
      type: ["AA Gun"],
      efficiency: 0.8,
      mounts: 1,
      preload: false,
    },
    {
      type: ["Auxiliary", "ASW Plane"],
      efficiency: 1,
      mounts: 1,
      preload: false,
    },
    {
      type: ["Auxiliary", "ASW Plane"],
      efficiency: 1,
      mounts: 1,
      preload: false,
    },
  ]
  const augments = ["Scepter", "Hunting Bow"]

  return (
    <>
      {/* Trigger "button" */}
      <div
        id={`modalTrigger${ship}`}
        className={`${modalTriggerStyle} ${!!trigger?.hasBorder ? "border-gray-400" : "border-transparent"}`}
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
                dangerouslySetInnerHTML={{ __html: trigger.descriptionNote }}
              ></p>
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
                  <h3 className="text-xl underline">Samvaluation</h3>
                  <span
                    className="leading-normal text-[hsla(0,0%,100%,0.75)]"
                    dangerouslySetInnerHTML={{ __html: samvaluationText }}
                  ></span>
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
                    { colName: "Preload", colWidth: "10%" },
                  ]}
                >
                  {slots.map((slot, index) => (
                    <tr key={index}>
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
                      <td
                        className={`${slot.preload ? "bg-[#98fb98]" : "bg-[#f08080]"}`}
                      >
                        <span className="text-xl text-black">
                          {slot.preload ? "\u2713" : "\u2717"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
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
              {isMainFleet && (
                <div>
                  {/* Rank */}
                  <ItemTable
                    tableInfo={[
                      { colName: "Hard Arbiter", colWidth: "5%" },
                      { colName: "Meta", colWidth: "5%" },
                      { colName: "CM", colWidth: "5%" },
                      { colName: "W14 Mob", colWidth: "5%" },
                      { colName: "W14 Boss", colWidth: "5%" },
                      { colName: "W15 Mob", colWidth: "5%" },
                      { colName: "W15 Boss", colWidth: "5%" },
                    ]}
                  >
                    <tr>
                      <td>{rankings.hardarbiter ?? "\u200B"}</td>
                      <td>
                        {(rankings as MainFleetRankingProps).meta ?? "\u200B"}
                      </td>
                      <td>{rankings.cm ?? "\u200B"}</td>
                      <td>
                        {(rankings as MainFleetRankingProps).w14mob ?? "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).w14boss ??
                          "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).w15mob ?? "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).w15boss ??
                          "\u200B"}
                      </td>
                    </tr>
                  </ItemTable>
                  <br />

                  {/* Usage */}
                  <ItemTable
                    tableInfo={[
                      { colName: "EX", colWidth: "5%" },
                      { colName: "Consistency", colWidth: "5%" },
                      { colName: "Fleet Req", colWidth: "5%" },
                      { colName: "Gear Req", colWidth: "5%" },
                      { colName: "Flag Req", colWidth: "5%" },
                    ]}
                  >
                    <tr>
                      <td>
                        {(rankings as MainFleetRankingProps).ex ?? "\u200B"}
                      </td>
                      <td>{rankings.consistency ?? "\u200B"}</td>
                      <td>{rankings.fleetreq ?? "\u200B"}</td>
                      <td>{rankings.gearreq ?? "\u200B"}</td>
                      <td>
                        {(rankings as MainFleetRankingProps).flagreq ??
                          "\u200B"}
                      </td>
                    </tr>
                  </ItemTable>
                  <br />

                  {/* Offense */}
                  <ItemTable
                    tableInfo={[
                      { colName: "Light DMG", colWidth: "5%" },
                      { colName: "Medium DMG", colWidth: "5%" },
                      { colName: "Heavy DMG", colWidth: "5%" },
                      { colName: "Aoe DMG", colWidth: "5%" },
                      { colName: "DMG Uptime", colWidth: "5%" },
                      { colName: "Off. Buff", colWidth: "5%" },
                    ]}
                  >
                    <tr>
                      <td>{rankings.lightdmg ?? "\u200B"}</td>
                      <td>{rankings.mediumdmg ?? "\u200B"}</td>
                      <td>{rankings.heavydmg ?? "\u200B"}</td>
                      <td>
                        {(rankings as MainFleetRankingProps).aoedmg ?? "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).dmguptime ??
                          "\u200B"}
                      </td>
                      <td>{rankings.offensivebuff ?? "\u200B"}</td>
                    </tr>
                  </ItemTable>
                  <br />

                  {/* Defense */}
                  <ItemTable
                    tableInfo={[
                      { colName: "Self Survival", colWidth: "5%" },
                      { colName: "AA", colWidth: "5%" },
                      { colName: "Rammers", colWidth: "5%" },
                      { colName: "Other Main", colWidth: "5%" },
                      { colName: "VG Survival", colWidth: "5%" },
                    ]}
                  >
                    <tr>
                      <td>
                        {(rankings as MainFleetRankingProps).selfsurvival ??
                          "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).aa ?? "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).rammers ??
                          "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).othermain ??
                          "\u200B"}
                      </td>
                      <td>
                        {(rankings as MainFleetRankingProps).vgsurvival ??
                          "\u200B"}
                      </td>
                    </tr>
                  </ItemTable>
                </div>
              )}
              {rankings.notes && (
                <>
                  <HR />
                  <h3 className="underline">Notes</h3>
                  <p className="text-sm">{rankings.notes}</p>
                  {/* <ItemTable
                    tableInfo={[{ colName: "Notes", colWidth: "100%" }]}
                  >
                    <tr>
                      <td>{rankings.notes}</td>
                    </tr>
                  </ItemTable> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
