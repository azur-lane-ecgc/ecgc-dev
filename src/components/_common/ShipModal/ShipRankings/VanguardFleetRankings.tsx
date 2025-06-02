import { useState } from "react"

import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"

import type { VanguardFleetRankingProps } from "@db/types"
const vgFleetRankings = (await import("@db/rankings/vgFleetRankings.json"))
  .default as Record<string, VanguardFleetRankingProps[]>

import { RankingHeader } from "./RankingHeader"
import { letterRankColor, numberRankColor } from "./styles"

interface VGFleetComponentRankingProps {
  ship: string
}

export const VanguardFleetRanking: React.FC<VGFleetComponentRankingProps> = ({
  ship,
}) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  const rankings = vgFleetRankings[ship]

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
          {/* Rank Table */}
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
                className={`${letterRankColor(
                  ranking.hardarbiter,
                )} font-semibold !text-black`}
              >
                {ranking.hardarbiter ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(
                  ranking.meta,
                )} font-semibold !text-black`}
              >
                {ranking.meta ?? "\u200B"}
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
                  ranking.w14mob,
                )} font-semibold !text-black`}
              >
                {ranking.w14mob ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(
                  ranking.w14boss,
                )} font-semibold !text-black`}
              >
                {ranking.w14boss ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(
                  ranking.w15mob,
                )} font-semibold !text-black`}
              >
                {ranking.w15mob ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(
                  ranking.w15boss,
                )} font-semibold !text-black`}
              >
                {ranking.w15boss ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(
                  ranking.ex,
                )} font-semibold !text-black`}
              >
                {ranking.ex ?? "\u200B"}
              </td>
            </tr>
          </ItemTable>
          <br />

          {/* Usage Table */}
          <ItemTable
            tableInfo={[
              { colName: "Consistency", colWidth: "5%" },
              { colName: "Fleet Req", colWidth: "5%" },
              { colName: "Gear Req", colWidth: "5%" },
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
                  ranking.gearreq,
                )} font-semibold !text-black`}
              >
                {ranking.gearreq ?? "\u200B"}
              </td>
            </tr>
          </ItemTable>
          <br />

          {/* Offense Table */}
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
                  ranking.aoedmg,
                )} font-semibold !text-black`}
              >
                {ranking.aoedmg ?? "\u200B"}
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

          {/* Defense Table */}
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
                className={`${numberRankColor(
                  ranking.selfsurvival,
                )} font-semibold !text-black`}
              >
                {ranking.selfsurvival ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.aa,
                )} font-semibold !text-black`}
              >
                {ranking.aa ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.asw,
                )} font-semibold !text-black`}
              >
                {ranking.asw ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(
                  ranking.defensivebuff,
                )} font-semibold !text-black`}
              >
                {ranking.defensivebuff ?? "\u200B"}
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
