import { useState } from "react"

import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"

import type { MainFleetRankingProps } from "@db/types"
const mainFleetRankings = (await import("@db/rankings/mainFleetRankings.json"))
  .default as Record<string, MainFleetRankingProps[]>

import { RankingHeader } from "./RankingHeader"
import { letterRankColor, numberRankColor } from "./styles"

interface MainFleetRankingComponentProps {
  ship: string
}

export const MainFleetRanking: React.FC<MainFleetRankingComponentProps> = ({
  ship,
}) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  const rankings = mainFleetRankings[ship]

  if (!!!rankings) {
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
              <tr className="*:text-base">
                <td
                  className={`${letterRankColor(
                    ranking.ex,
                  )} font-semibold !text-black`}
                >
                  {ranking.ex ?? "\u200B"}
                </td>
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
                <td
                  className={`${numberRankColor(
                    ranking.flagreq || "",
                  )} font-semibold !text-black`}
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
                { colName: "Aoe DMG", colWidth: "5%" },
                { colName: "DMG Uptime", colWidth: "5%" },
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
                    ranking.dmguptime,
                  )} font-semibold !text-black`}
                >
                  {ranking.dmguptime ?? "\u200B"}
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
                    ranking.rammers,
                  )} font-semibold !text-black`}
                >
                  {ranking.rammers ?? "\u200B"}
                </td>
                <td
                  className={`${numberRankColor(
                    ranking.othermain,
                  )} font-semibold !text-black`}
                >
                  {ranking.othermain ?? "\u200B"}
                </td>
                <td
                  className={`${numberRankColor(
                    ranking.vgsurvival,
                  )} font-semibold !text-black`}
                >
                  {ranking.vgsurvival ?? "\u200B"}
                </td>
              </tr>
            </ItemTable>
          </div>
          <HR />
          {ranking.notes && (
            <>
              <h3 className="text-xl underline">Notes</h3>
              <p className="text-[14.5px] leading-normal">{ranking.notes}</p>
            </>
          )}
        </>
      )}
    </>
  )
}
