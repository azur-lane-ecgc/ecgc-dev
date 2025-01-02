import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"
import {
  letterRankColor,
  numberRankColor,
} from "@components/_common/ShipModal/styles"

import type { ShipRankingTypes, SSFleetRankingProps } from "./types"

export const SSFleetRanking: React.FC<ShipRankingTypes> = ({ ship }) => {
  ship + " "

  // Flasher
  const ranking: SSFleetRankingProps = {
    notes: "Absolutely requires flag if not with Gato-class (Albacore).",

    hardarbiter: "S",
    cm: "S",
    campaign: "S",

    consistency: -2,
    fleetreq: -1,
    flagreq: -3,

    lightdmg: 2,
    mediumdmg: 4,
    heavydmg: 5,
    offensivebuff: 2,
  }

  return (
    <>
      <div>
        {/* Rank */}
        <ItemTable
          tableInfo={[
            { colName: "Hard Arbiter", colWidth: "5%" },
            { colName: "CM", colWidth: "5%" },
            { colName: "Campaign", colWidth: "5%" },
          ]}
        >
          <tr className="*:text-base">
            <td
              className={`${ranking.hardarbiter && letterRankColor(ranking.hardarbiter)} !text-black font-semibold`}
            >
              {ranking.hardarbiter ?? "\u200B"}
            </td>
            <td
              className={`${ranking.cm && letterRankColor(ranking.cm)} !text-black font-semibold`}
            >
              {ranking.cm ?? "\u200B"}
            </td>
            <td
              className={`${ranking.campaign && letterRankColor(ranking.campaign)} !text-black font-semibold`}
            >
              {ranking.campaign ?? "\u200B"}
            </td>
          </tr>
        </ItemTable>
        <br />

        {/* Usage */}
        <ItemTable
          tableInfo={[
            { colName: "Consistency", colWidth: "5%" },
            { colName: "Fleet Req", colWidth: "5%" },
            { colName: "Flag Req", colWidth: "5%" },
          ]}
        >
          <tr className="*:text-base">
            <td
              className={`${ranking.consistency && numberRankColor(ranking.consistency)} !text-black font-semibold`}
            >
              {ranking.consistency ?? "\u200B"}
            </td>
            <td
              className={`${ranking.fleetreq && numberRankColor(ranking.fleetreq)} !text-black font-semibold`}
            >
              {ranking.fleetreq ?? "\u200B"}
            </td>
            <td
              className={`${ranking.flagreq && numberRankColor(ranking.flagreq)} !text-black font-semibold`}
            >
              {ranking.flagreq ?? "\u200B"}
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
            { colName: "Off. Buff", colWidth: "5%" },
          ]}
        >
          <tr className="*:text-base">
            <td
              className={`${ranking.lightdmg && numberRankColor(ranking.lightdmg)} !text-black font-semibold`}
            >
              {ranking.lightdmg ?? "\u200B"}
            </td>
            <td
              className={`${ranking.mediumdmg && numberRankColor(ranking.mediumdmg)} !text-black font-semibold`}
            >
              {ranking.mediumdmg ?? "\u200B"}
            </td>
            <td
              className={`${ranking.heavydmg && numberRankColor(ranking.heavydmg)} !text-black font-semibold`}
            >
              {ranking.heavydmg ?? "\u200B"}
            </td>
            <td
              className={`${ranking.offensivebuff && numberRankColor(ranking.offensivebuff)} !text-black font-semibold`}
            >
              {ranking.offensivebuff ?? "\u200B"}
            </td>
          </tr>
        </ItemTable>
      </div>
      {ranking.notes && (
        <>
          <HR />
          <h3 className="text-xl underline">Notes</h3>
          <p className="text-[14.5px] leading-normal">{ranking.notes}</p>
        </>
      )}
    </>
  )
}
