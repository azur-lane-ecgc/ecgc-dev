import { useState } from "react"

import { HR } from "@/components/_common/HR"
import vgFleetRankingsJson from "@/db/rankings/vgFleetRankings.json"
import type { VanguardFleetRankingProps } from "@/db/types"
import { createDamageRankScales, hasLowTierFallback } from "@/utils/ships"

import { RankingTable } from "./RankingTable"
const vgFleetRankings = vgFleetRankingsJson as Record<
  string,
  VanguardFleetRankingProps[]
>
const vanguardFleetDamageScales = createDamageRankScales(vgFleetRankings, "vg")

import { RankingHeader } from "./RankingHeader"
import { damageRankColor, letterRankColor, numberRankColor } from "./styles"

interface VGFleetComponentRankingProps {
  ship: string
}

export const VanguardFleetRanking: React.FC<VGFleetComponentRankingProps> = ({
  ship,
}) => {
  const [rankingIndex, setRankingIndex] = useState<number>(0)

  const rankings = vgFleetRankings[ship]

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
        <div>
          {/* Rank Table */}
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
              ["EX", ranking.ex, letterRankColor(ranking.ex)],
            ]}
          />
          <br />

          {/* Usage Table */}
          <RankingTable
            columns={[
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
            ]}
          />
          <br />

          {/* Offense Table */}
          <RankingTable
            columns={[
              [
                "Light DMG",
                ranking.lightdmg,
                damageRankColor(
                  ranking.lightdmg,
                  vanguardFleetDamageScales.lightdmg,
                ),
              ],
              [
                "Medium DMG",
                ranking.mediumdmg,
                damageRankColor(
                  ranking.mediumdmg,
                  vanguardFleetDamageScales.mediumdmg,
                ),
              ],
              [
                "Heavy DMG",
                ranking.heavydmg,
                damageRankColor(
                  ranking.heavydmg,
                  vanguardFleetDamageScales.heavydmg,
                ),
              ],
              ["AOE DMG", ranking.aoedmg, numberRankColor(ranking.aoedmg)],
              [
                "Off. Buff",
                ranking.offensivebuff,
                numberRankColor(ranking.offensivebuff),
              ],
            ]}
          />
          <br />

          {/* Defense Table */}
          <RankingTable
            columns={[
              ["AA", ranking.aa, numberRankColor(ranking.aa)],
              ["ASW", ranking.asw, numberRankColor(ranking.asw)],
              [
                "Def. Buff",
                ranking.defensivebuff,
                numberRankColor(ranking.defensivebuff),
              ],
            ]}
          />
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
