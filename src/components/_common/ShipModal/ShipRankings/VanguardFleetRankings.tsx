import { useState } from "react"

import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"
import {
  letterRankColor,
  numberRankColor,
} from "@components/_common/ShipModal/styles"

import type { ShipRankingTypes, VanguardFleetRankingProps } from "./types"

import { convertToVanguardFleetRanking } from "./data"

const VGFleetData: Record<string, VanguardFleetRankingProps> =
  convertToVanguardFleetRanking()

export const VanguardFleetRanking: React.FC<ShipRankingTypes> = ({ ship }) => {
  const [index, setIndex] = useState<number>(0)

  // obtain rankings from data
  const ranking: VanguardFleetRankingProps = VGFleetData[ship]

  return (
    <>
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
            { colName: "EX", colWidth: "5%" },
          ]}
        >
          <tr className="*:text-base">
            <td
              className={`${ranking.hardarbiter && letterRankColor(ranking.hardarbiter)} !text-black font-semibold`}
            >
              {ranking.hardarbiter ?? "\u200B"}
            </td>
            <td
              className={`${ranking.meta && letterRankColor(ranking.meta)} !text-black font-semibold`}
            >
              {ranking.meta ?? "\u200B"}
            </td>
            <td
              className={`${ranking.cm && letterRankColor(ranking.cm)} !text-black font-semibold`}
            >
              {ranking.cm ?? "\u200B"}
            </td>
            <td
              className={`${ranking.w14mob && letterRankColor(ranking.w14mob)} !text-black font-semibold`}
            >
              {ranking.w14mob ?? "\u200B"}
            </td>
            <td
              className={`${ranking.w14boss && letterRankColor(ranking.w14boss)} !text-black font-semibold`}
            >
              {ranking.w14boss ?? "\u200B"}
            </td>
            <td
              className={`${ranking.w15mob && letterRankColor(ranking.w15mob)} !text-black font-semibold`}
            >
              {ranking.w15mob ?? "\u200B"}
            </td>
            <td
              className={`${ranking.w15boss && letterRankColor(ranking.w15boss)} !text-black font-semibold`}
            >
              {ranking.w15boss ?? "\u200B"}
            </td>
            <td
              className={`${ranking.ex && letterRankColor(ranking.ex)} !text-black font-semibold`}
            >
              {ranking.ex ?? "\u200B"}
            </td>
          </tr>
        </ItemTable>
        <br />

        {/* Usage */}
        <ItemTable
          tableInfo={[
            { colName: "Consistency", colWidth: "5%" },
            { colName: "Fleet Req", colWidth: "5%" },
            { colName: "Gear Req", colWidth: "5%" },
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
              className={`${ranking.gearreq && numberRankColor(ranking.gearreq)} !text-black font-semibold`}
            >
              {ranking.gearreq ?? "\u200B"}
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
            { colName: "AOE DMG", colWidth: "5%" },
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
              className={`${ranking.aoedmg && numberRankColor(ranking.aoedmg)} !text-black font-semibold`}
            >
              {ranking.aoedmg ?? "\u200B"}
            </td>
            <td
              className={`${ranking.offensivebuff && numberRankColor(ranking.offensivebuff)} !text-black font-semibold`}
            >
              {ranking.offensivebuff ?? "\u200B"}
            </td>
          </tr>
        </ItemTable>
        <br />

        {/* Defense */}
        <ItemTable
          tableInfo={[
            { colName: "Self Survival", colWidth: "5%" },
            { colName: "AA", colWidth: "5%" },
            { colName: "ASW", colWidth: "5%" },
            { colName: "Def. Buff", colWidth: "5%" },
          ]}
        >
          <tr className="*:text-base">
            <td
              className={`${ranking.selfsurvival && numberRankColor(ranking.selfsurvival)} !text-black font-semibold`}
            >
              {ranking.selfsurvival ?? "\u200B"}
            </td>
            <td
              className={`${ranking.aa && numberRankColor(ranking.aa)} !text-black font-semibold`}
            >
              {ranking.aa ?? "\u200B"}
            </td>
            <td
              className={`${ranking.asw && numberRankColor(ranking.asw)} !text-black font-semibold`}
            >
              {ranking.asw ?? "\u200B"}
            </td>
            <td
              className={`${ranking.defensivebuff && numberRankColor(ranking.defensivebuff)} !text-black font-semibold`}
            >
              {ranking.defensivebuff ?? "\u200B"}
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
