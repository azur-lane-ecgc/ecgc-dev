import { useState } from "react"

import { HR } from "@/components/_common/HR"
import mainFleetRankingsJson from "@/db/rankings/mainFleetRankings.json"
import type { MainFleetRankingProps } from "@/db/types"
import { createDamageRankScales, hasLowTierFallback } from "@/utils/ships"

import { RankingTable } from "./RankingTable"
const mainFleetRankings = mainFleetRankingsJson as Record<
  string,
  MainFleetRankingProps[]
>
const mainFleetDamageScales = createDamageRankScales(mainFleetRankings, "main")

import { RankingHeader } from "./RankingHeader"
import { damageRankColor, letterRankColor, numberRankColor } from "./styles"

interface MainFleetRankingComponentProps {
  ship: string
}

export const MainFleetRanking: React.FC<MainFleetRankingComponentProps> = ({
  ship,
}) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  const rankings = mainFleetRankings[ship]

  if (!rankings) {
    if (hasLowTierFallback(ship)) {
      return (
        <p>
          No spreadsheet entry is available. Assigned D tier for all rankings.
        </p>
      )
    }
    return <p>This ship doesn't have rankings currently. Come back later!</p>
  }

  const ranking = rankings[rankingIndex]

  return (
    <>
      <RankingHeader />
      <div className="mb-4 flex justify-start gap-2">
        {rankings.map((ranking, index) => (
          <button
            key={ranking.nameNote || "Base"}
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
            <RankingTable
              columns={[
                [
                  "Hard Arbiter",
                  ranking.hardarbiter,
                  letterRankColor(ranking.hardarbiter),
                ],
                ["Meta", ranking.meta, letterRankColor(ranking.meta)],
                ["CM", ranking.cm, letterRankColor(ranking.cm)],
                ["W14 Mob", ranking.w14mob, letterRankColor(ranking.w14mob)],
                ["W14 Boss", ranking.w14boss, letterRankColor(ranking.w14boss)],
                ["W15/16 Mob", ranking.w15mob, letterRankColor(ranking.w15mob)],
                [
                  "W15/16 Boss",
                  ranking.w15boss,
                  letterRankColor(ranking.w15boss),
                ],
              ]}
            />
            <br />

            {/* Usage */}
            <RankingTable
              columns={[
                ["EX", ranking.ex, letterRankColor(ranking.ex)],
                [
                  "Consistency",
                  ranking.consistency,
                  numberRankColor(ranking.consistency),
                ],
                [
                  "Fleet Req",
                  ranking.fleetreq,
                  numberRankColor(ranking.fleetreq),
                ],
                ["Gear Req", ranking.gearreq, numberRankColor(ranking.gearreq)],
                [
                  "Flag Req",
                  ranking.flagreq,
                  numberRankColor(ranking.flagreq || ""),
                ],
              ]}
            />
            <br />

            {/* Offense */}
            <RankingTable
              columns={[
                [
                  "Light DMG",
                  ranking.lightdmg,
                  damageRankColor(
                    ranking.lightdmg,
                    mainFleetDamageScales.lightdmg,
                  ),
                ],
                [
                  "Medium DMG",
                  ranking.mediumdmg,
                  damageRankColor(
                    ranking.mediumdmg,
                    mainFleetDamageScales.mediumdmg,
                  ),
                ],
                [
                  "Heavy DMG",
                  ranking.heavydmg,
                  damageRankColor(
                    ranking.heavydmg,
                    mainFleetDamageScales.heavydmg,
                  ),
                ],
                ["Aoe DMG", ranking.aoedmg, numberRankColor(ranking.aoedmg)],
                [
                  "DMG Uptime",
                  ranking.dmguptime,
                  numberRankColor(ranking.dmguptime),
                ],
                [
                  "Off. Buff",
                  ranking.offensivebuff,
                  numberRankColor(ranking.offensivebuff),
                ],
              ]}
            />
            <br />

            {/* Defense */}
            <RankingTable
              columns={[
                [
                  "Self Survival",
                  ranking.selfsurvival,
                  numberRankColor(ranking.selfsurvival),
                ],
                ["AA", ranking.aa, numberRankColor(ranking.aa)],
                ["Rammers", ranking.rammers, numberRankColor(ranking.rammers)],
                [
                  "Other Main",
                  ranking.othermain,
                  numberRankColor(ranking.othermain),
                ],
                [
                  "VG Survival",
                  ranking.vgsurvival,
                  numberRankColor(ranking.vgsurvival),
                ],
              ]}
            />
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
