import { useState } from "react"

import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"

import type { SSFleetRankingProps } from "@db/types"
const ssFleetRankings = (await import("@db/rankings/ssFleetRankings.json"))
  .default as Record<string, SSFleetRankingProps[]>

import { RankingHeader } from "./RankingHeader"
import { letterRankColor, numberRankColor } from "./styles"

interface SSFleetRankingComponentProps {
  ship: string
}

export const SSFleetRanking: React.FC<SSFleetRankingComponentProps> = ({
  ship,
}) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  const rankings = ssFleetRankings[ship]

  if (!rankings) {
    return <p>This ship doesn't have rankings currently. Come back later!</p>
  }

  const ranking = rankings[rankingIndex]

  return (
    <>
      <RankingHeader />
      <div className="mb-4 flex justify-start gap-2">
        {rankings.map((ranking, index) => (
          <button
            key={index}
            className={`rounded border px-4 py-2 font-semibold ${
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
                className={`${letterRankColor(
                  ranking.hardarbiter,
                )} font-semibold !text-black`}
              >
                {ranking.hardarbiter ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(
                  ranking.cm,
                )} font-semibold !text-black`}
              >
                {ranking.cm ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(
                  ranking.campaign,
                )} font-semibold !text-black`}
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
                className={`${numberRankColor(
                  ranking.consistency,
                )} font-semibold !text-black`}
              >
                {ranking.consistency ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.fleetreq,
                )} font-semibold !text-black`}
              >
                {ranking.fleetreq ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.flagreq,
                )} font-semibold !text-black`}
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
                className={`${numberRankColor(
                  ranking.lightdmg,
                )} font-semibold !text-black`}
              >
                {ranking.lightdmg ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.mediumdmg,
                )} font-semibold !text-black`}
              >
                {ranking.mediumdmg ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.heavydmg,
                )} font-semibold !text-black`}
              >
                {ranking.heavydmg ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.offensivebuff,
                )} font-semibold !text-black`}
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
