import "@components/_common/ItemCell/styles.css"
import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"

import type { ShipData } from "@db/types"

import { parseEquipHref, shipImageParse } from "@utils/ships"

import { ShipTags } from "./ShipTags"
import {
  MainFleetRanking,
  VanguardFleetRanking,
  SSFleetRanking,
} from "./ShipRankings"
import { ShipEHPDisplay } from "./ShipEHP"
import { ShipLocations } from "./ShipLocations"
import { useShipData } from "./ShipModalHooks"

import {
  closeButtonStyle,
  modalOverlayStyle,
  shipIconContainerStyle,
  shipIconStyle,
  modalStyle,
  shipLinkStyle,
} from "./styles"

interface ShipModalInner {
  id: number
  handleClose: () => void
}

export const ShipModalInner: React.FC<ShipModalInner> = ({
  id,
  handleClose,
}) => {
  const shipData: ShipData | null = useShipData(id, true)
  if (!!!shipData) {
    return false
  }
  const ship = shipData.ship
  const faction = shipData.faction
  const rarity = shipData.rarity
  const isKai = shipData.isKai
  const hullType = shipData.hullType
  const fleetType = shipData.fleetType
  const LBBonus = shipData.LBBonus
  const slots = shipData.slots
  const augments = shipData.augments
  const samEval = shipData.samEval
  const fastLoad = shipData.fastLoad
  const roles = shipData.roles
  const locations = shipData.locations

  const shipImg = shipImageParse(ship, isKai)

  return (
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
                <img loading="lazy" src={`${shipImg}`} alt={`${ship}`} />
              </a>
            </div>

            {/* Samvaluation */}
            <div className="text-sm w-full">
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
                  <span className="text-green-400 font-semibold">
                    {fastLoad}
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
                  <span className="text-fuchsia-400 font-semibold">
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
  )
}
