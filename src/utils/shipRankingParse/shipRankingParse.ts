import type { MainFleetRankingProps, VanguardFleetRankingProps } from "./types"

export const shipRankingParse = (
  isMainFleet: boolean,
  ship: string,
): VanguardFleetRankingProps | MainFleetRankingProps => {
  isMainFleet && isMainFleet
  ship + " "

  const ranking = {
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

  return isMainFleet
    ? (ranking as MainFleetRankingProps)
    : (ranking as VanguardFleetRankingProps)
}
