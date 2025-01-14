import { useMemo, useState } from "react"

import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"
import {
  letterRankColor,
  numberRankColor,
} from "@components/Samvaluations/ShipModal/styles"

import type {
  ShipRankingTypes,
  MainFleetRankingProps,
} from "../../../../data/rankings/types"

const MainFleetData: Record<string, MainFleetRankingProps[]> = (await import(
  "@data/rankings/mainFleetRankings.json"
).then((module) => module.default)) as Record<number, MainFleetRankingProps[]>

export const MainFleetRanking: React.FC<ShipRankingTypes> = ({ ship }) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  // obtain rankings from data
  const rankings: MainFleetRankingProps[] = useMemo(
    () => MainFleetData[ship],
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
                  className={`${ranking.ex && letterRankColor(ranking.ex)} !text-black font-semibold`}
                >
                  {ranking.ex ?? "\u200B"}
                </td>
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
                <td
                  className={`${ranking.flagreq && numberRankColor(ranking.flagreq || "")} !text-black font-semibold`}
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
                  className={`${ranking.dmguptime && numberRankColor(ranking.dmguptime)} !text-black font-semibold`}
                >
                  {ranking.dmguptime ?? "\u200B"}
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
                { colName: "Rammers", colWidth: "5%" },
                { colName: "Other Main", colWidth: "5%" },
                { colName: "VG Survival", colWidth: "5%" },
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
                  className={`${ranking.rammers && numberRankColor(ranking.rammers)} !text-black font-semibold`}
                >
                  {ranking.rammers ?? "\u200B"}
                </td>
                <td
                  className={`${ranking.othermain && numberRankColor(ranking.othermain)} !text-black font-semibold`}
                >
                  {ranking.othermain ?? "\u200B"}
                </td>
                <td
                  className={`${ranking.vgsurvival && numberRankColor(ranking.vgsurvival)} !text-black font-semibold`}
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
