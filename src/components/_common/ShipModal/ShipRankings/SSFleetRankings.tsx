import { useMemo, useState } from "react"

import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"
import {
  letterRankColor,
  numberRankColor,
} from "@components/_common/ShipModal/styles"

import type { ShipRankingTypes, SSFleetRankingProps } from "./types"

const SSFleetData: Record<string, SSFleetRankingProps[]> = (await import(
  "./data/ssFleetRankings.json"
).then((module) => module.default)) as Record<number, SSFleetRankingProps[]>

export const SSFleetRanking: React.FC<ShipRankingTypes> = ({ ship }) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  const rankings: SSFleetRankingProps[] = useMemo(
    () => SSFleetData[ship],
    [ship],
  )

  if (!!!rankings) {
    return <p>This ship doesn't have rankings currently. Come back later!</p>
  }

  const ranking = rankings[rankingIndex]

  return (
    <>
      <div className="flex justify-start gap-2 mb-4">
        {rankings.map((ranking, index) => (
          <button
            key={index}
            className={`px-4 py-2 border rounded font-semibold ${
              rankingIndex === index
                ? "bg-fuchsia-600/60 text-white"
                : "bg-gray-300/85"
            }`}
            onClick={() => setRankingIndex(index)}
          >
            {ranking.nameNote || "Base"}
          </button>
        ))}
      </div>
      {ranking && (
        <div>
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
          <br />
        </div>
      )}
      <HR />
      {ranking.notes && (
        <>
          <h3 className="text-xl underline">Notes</h3>
          <p className="text-[14.5px] leading-normal">
            {rankings[rankingIndex].notes}
          </p>
        </>
      )}
    </>
  )
}
