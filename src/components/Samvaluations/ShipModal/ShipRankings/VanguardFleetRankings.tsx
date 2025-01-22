import { useMemo, useState } from "react"

import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"
import {
  letterRankColor,
  numberRankColor,
} from "@components/Samvaluations/ShipModal/styles"

import type {
  ShipRankingTypes,
  VanguardFleetRankingProps,
} from "@data/rankings/types"

const VGFleetData: Record<string, VanguardFleetRankingProps[]> = (await import(
  "@data/rankings/vgFleetRankings.json"
).then((module) => module.default)) as Record<
  string,
  VanguardFleetRankingProps[]
>

import { RankingHeader } from "./RankingHeader"

export const VanguardFleetRanking: React.FC<ShipRankingTypes> = ({ ship }) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  const rankings: VanguardFleetRankingProps[] = useMemo(
    () => VGFleetData[ship],
    [ship],
  )

  if (!!!rankings) {
    return <p>This ship doesn't have rankings currently. Come back later!</p>
  }

  const ranking = rankings[rankingIndex]

  return (
    <>
      <RankingHeader />
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
                className={`${letterRankColor(ranking.hardarbiter)} !text-black font-semibold`}
              >
                {ranking.hardarbiter ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(ranking.meta)} !text-black font-semibold`}
              >
                {ranking.meta ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(ranking.cm)} !text-black font-semibold`}
              >
                {ranking.cm ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(ranking.w14mob)} !text-black font-semibold`}
              >
                {ranking.w14mob ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(ranking.w14boss)} !text-black font-semibold`}
              >
                {ranking.w14boss ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(ranking.w15mob)} !text-black font-semibold`}
              >
                {ranking.w15mob ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(ranking.w15boss)} !text-black font-semibold`}
              >
                {ranking.w15boss ?? "\u200B"}
              </td>
              <td
                className={`${letterRankColor(ranking.ex)} !text-black font-semibold`}
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
                className={`${numberRankColor(ranking.consistency)} !text-black font-semibold`}
              >
                {ranking.consistency ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.fleetreq)} !text-black font-semibold`}
              >
                {ranking.fleetreq ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.gearreq)} !text-black font-semibold`}
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
                className={`${numberRankColor(ranking.lightdmg)} !text-black font-semibold`}
              >
                {ranking.lightdmg ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.mediumdmg)} !text-black font-semibold`}
              >
                {ranking.mediumdmg ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.heavydmg)} !text-black font-semibold`}
              >
                {ranking.heavydmg ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.aoedmg)} !text-black font-semibold`}
              >
                {ranking.aoedmg ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.offensivebuff)} !text-black font-semibold`}
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
                className={`${numberRankColor(ranking.selfsurvival)} !text-black font-semibold`}
              >
                {ranking.selfsurvival ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.aa)} !text-black font-semibold`}
              >
                {ranking.aa ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.asw)} !text-black font-semibold`}
              >
                {ranking.asw ?? "\u200B"}
              </td>
              <td
                className={`${numberRankColor(ranking.defensivebuff)} !text-black font-semibold`}
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
