import { ItemTable } from "@components/_common/ItemTable"
import { HR } from "@components/_common/HR"
import {
  letterRankColor,
  numberRankColor,
} from "@components/_common/ShipModal/styles"

import type {
  MainFleetRankingProps,
  SSFleetRankingProps,
  VanguardFleetRankingProps,
} from "./types"

interface ShipRankingTypes {
  ship: string
  hull: number
}

export const ShipRankings: React.FC<ShipRankingTypes> = ({ ship, hull }) => {
  ship + " "

  const isMainFleet: boolean = [4, 5, 6, 7, 10, 12, 13, 24].includes(hull)
  const isSSFleet: boolean = [8, 17, 22].includes(hull)
  const isVanguardFleet: boolean = !isMainFleet && !isSSFleet

  // Unicorn
  let ranking1: MainFleetRankingProps = {
    notes: "The best primary healer as of 2024.",

    hardarbiter: "D",
    meta: "D",
    cm: "C",
    w14mob: "SS",
    w14boss: "D",
    w15mob: "S",
    w15boss: "B",
    ex: "D",

    lightdmg: 1,
    mediumdmg: 1,
    heavydmg: 1,
    aoedmg: 1,
    dmguptime: 1,
    selfsurvival: -1,
    othermain: 1,
    vgsurvival: 5,
  }

  // Agir
  let ranking2: VanguardFleetRankingProps = {
    notes: "Tank with armor break for any boss and inconsistent slow.",

    hardarbiter: "S",
    meta: "S",
    cm: "S",
    w14mob: "A",
    w14boss: "SS",
    w15mob: "B",
    w15boss: "B",
    ex: "D",

    gearreq: -1,

    lightdmg: 1,
    mediumdmg: 3,
    heavydmg: 2,
    aoedmg: 2,
    offensivebuff: 2,

    selfsurvival: 5,
  }

  // Flasher
  let ranking3: SSFleetRankingProps = {
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

  let ranking:
    | MainFleetRankingProps
    | VanguardFleetRankingProps
    | SSFleetRankingProps = ranking1

  if (isMainFleet) {
    ranking = ranking1
  }
  if (isVanguardFleet) {
    ranking = ranking2
  }
  if (isSSFleet) {
    ranking = ranking3
  }

  return (
    <>
      {isMainFleet && (
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
                className={`${(ranking as MainFleetRankingProps).hardarbiter && letterRankColor((ranking as MainFleetRankingProps).hardarbiter)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).hardarbiter ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).meta && letterRankColor((ranking as MainFleetRankingProps).meta)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).meta ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).cm && letterRankColor((ranking as MainFleetRankingProps).cm)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).cm ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).w14mob && letterRankColor((ranking as MainFleetRankingProps).w14mob)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).w14mob ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).w14boss && letterRankColor((ranking as MainFleetRankingProps).w14boss)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).w14boss ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).w15mob && letterRankColor((ranking as MainFleetRankingProps).w15mob)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).w15mob ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).w15boss && letterRankColor((ranking as MainFleetRankingProps).w15boss)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).w15boss ?? "\u200B"}
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
                className={`${(ranking as MainFleetRankingProps).ex && letterRankColor((ranking as MainFleetRankingProps).ex)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).ex ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).consistency && numberRankColor((ranking as MainFleetRankingProps).consistency)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).consistency ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).fleetreq && numberRankColor((ranking as MainFleetRankingProps).fleetreq)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).fleetreq ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).gearreq && numberRankColor((ranking as MainFleetRankingProps).gearreq)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).gearreq ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).flagreq && numberRankColor((ranking as MainFleetRankingProps).flagreq || "")} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).flagreq ?? "\u200B"}
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
                className={`${(ranking as MainFleetRankingProps).lightdmg && numberRankColor((ranking as MainFleetRankingProps).lightdmg)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).lightdmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).mediumdmg && numberRankColor((ranking as MainFleetRankingProps).mediumdmg)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).mediumdmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).heavydmg && numberRankColor((ranking as MainFleetRankingProps).heavydmg)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).heavydmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).aoedmg && numberRankColor((ranking as MainFleetRankingProps).aoedmg)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).aoedmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).dmguptime && numberRankColor((ranking as MainFleetRankingProps).dmguptime)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).dmguptime ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).offensivebuff && numberRankColor((ranking as MainFleetRankingProps).offensivebuff)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).offensivebuff ?? "\u200B"}
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
                className={`${(ranking as MainFleetRankingProps).selfsurvival && numberRankColor((ranking as MainFleetRankingProps).selfsurvival)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).selfsurvival ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).aa && numberRankColor((ranking as MainFleetRankingProps).aa)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).aa ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).rammers && numberRankColor((ranking as MainFleetRankingProps).rammers)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).rammers ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).othermain && numberRankColor((ranking as MainFleetRankingProps).othermain)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).othermain ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as MainFleetRankingProps).vgsurvival && numberRankColor((ranking as MainFleetRankingProps).vgsurvival)} !text-black font-semibold`}
              >
                {(ranking as MainFleetRankingProps).vgsurvival ?? "\u200B"}
              </td>
            </tr>
          </ItemTable>
        </div>
      )}
      {isSSFleet && (
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
                className={`${(ranking as SSFleetRankingProps).hardarbiter && letterRankColor((ranking as SSFleetRankingProps).hardarbiter)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).hardarbiter ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as SSFleetRankingProps).cm && letterRankColor((ranking as SSFleetRankingProps).cm)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).cm ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as SSFleetRankingProps).campaign && letterRankColor((ranking as SSFleetRankingProps).campaign)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).campaign ?? "\u200B"}
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
                className={`${(ranking as SSFleetRankingProps).consistency && numberRankColor((ranking as SSFleetRankingProps).consistency)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).consistency ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as SSFleetRankingProps).fleetreq && numberRankColor((ranking as SSFleetRankingProps).fleetreq)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).fleetreq ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as SSFleetRankingProps).flagreq && numberRankColor((ranking as SSFleetRankingProps).flagreq)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).flagreq ?? "\u200B"}
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
                className={`${(ranking as SSFleetRankingProps).lightdmg && numberRankColor((ranking as SSFleetRankingProps).lightdmg)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).lightdmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as SSFleetRankingProps).mediumdmg && numberRankColor((ranking as SSFleetRankingProps).mediumdmg)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).mediumdmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as SSFleetRankingProps).heavydmg && numberRankColor((ranking as SSFleetRankingProps).heavydmg)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).heavydmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as SSFleetRankingProps).offensivebuff && numberRankColor((ranking as SSFleetRankingProps).offensivebuff)} !text-black font-semibold`}
              >
                {(ranking as SSFleetRankingProps).offensivebuff ?? "\u200B"}
              </td>
            </tr>
          </ItemTable>
        </div>
      )}
      {isVanguardFleet && (
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
                className={`${(ranking as VanguardFleetRankingProps).hardarbiter && letterRankColor((ranking as VanguardFleetRankingProps).hardarbiter)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).hardarbiter ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).meta && letterRankColor((ranking as VanguardFleetRankingProps).meta)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).meta ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).cm && letterRankColor((ranking as VanguardFleetRankingProps).cm)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).cm ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).w14mob && letterRankColor((ranking as VanguardFleetRankingProps).w14mob)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).w14mob ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).w14boss && letterRankColor((ranking as VanguardFleetRankingProps).w14boss)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).w14boss ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).w15mob && letterRankColor((ranking as VanguardFleetRankingProps).w15mob)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).w15mob ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).w15boss && letterRankColor((ranking as VanguardFleetRankingProps).w15boss)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).w15boss ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).ex && letterRankColor((ranking as VanguardFleetRankingProps).ex)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).ex ?? "\u200B"}
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
                className={`${(ranking as VanguardFleetRankingProps).consistency && numberRankColor((ranking as VanguardFleetRankingProps).consistency)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).consistency ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).fleetreq && numberRankColor((ranking as VanguardFleetRankingProps).fleetreq)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).fleetreq ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).gearreq && numberRankColor((ranking as VanguardFleetRankingProps).gearreq)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).gearreq ?? "\u200B"}
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
                className={`${(ranking as VanguardFleetRankingProps).lightdmg && numberRankColor((ranking as VanguardFleetRankingProps).lightdmg)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).lightdmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).mediumdmg && numberRankColor((ranking as VanguardFleetRankingProps).mediumdmg)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).mediumdmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).heavydmg && numberRankColor((ranking as VanguardFleetRankingProps).heavydmg)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).heavydmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).aoedmg && numberRankColor((ranking as VanguardFleetRankingProps).aoedmg)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).aoedmg ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).offensivebuff && numberRankColor((ranking as VanguardFleetRankingProps).offensivebuff)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).offensivebuff ??
                  "\u200B"}
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
                className={`${(ranking as VanguardFleetRankingProps).selfsurvival && numberRankColor((ranking as VanguardFleetRankingProps).selfsurvival)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).selfsurvival ??
                  "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).aa && numberRankColor((ranking as VanguardFleetRankingProps).aa)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).aa ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).asw && numberRankColor((ranking as VanguardFleetRankingProps).asw)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).asw ?? "\u200B"}
              </td>
              <td
                className={`${(ranking as VanguardFleetRankingProps).defensivebuff && numberRankColor((ranking as VanguardFleetRankingProps).defensivebuff)} !text-black font-semibold`}
              >
                {(ranking as VanguardFleetRankingProps).defensivebuff ??
                  "\u200B"}
              </td>
            </tr>
          </ItemTable>
        </div>
      )}
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
