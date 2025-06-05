// import type { VanguardFleetRankingProps } from "../types"
// import tempVGdata from "./tempvg.json"
// import { parseFleetKey } from "./parseFleetKey"

// interface SheetVanguardFleetData {
//   [key: string]: {
//     Notes?: string
//     "Hard Arbiter": string
//     META: string
//     CM: string
//     "W14 Mob": string
//     "W14 Boss": string
//     "W15 Mob": string
//     "W15 Boss": string
//     EX: string
//     Consistency?: string
//     "Fleet Req."?: string
//     "Gear Req."?: string
//     "Flag Req."?: string
//     "Light Dmg": string
//     "Medium Dmg": string
//     "Heavy Dmg": string
//     "AoE Dmg": string
//     "Offense Buff"?: string
//     "Self Survival"?: string
//     AA?: string
//     ASW?: string
//     "Defense Buff"?: string
//   }
// }

// export const convertToVanguardFleetRanking = (): Record<
//   string,
//   VanguardFleetRankingProps[]
// > => {
//   const VanguardFleetData: SheetVanguardFleetData = tempVGdata

//   const convertedData: Record<string, VanguardFleetRankingProps[]> = {}

//   for (const fleetKey in VanguardFleetData) {
//     const fleet = VanguardFleetData[fleetKey]

//     const { shipName, nameNote } = parseFleetKey(fleetKey)

//     const ranking: VanguardFleetRankingProps = {
//       nameNote,
//       notes: fleet.Notes,

//       hardarbiter: fleet["Hard Arbiter"],
//       meta: fleet.META,
//       cm: fleet.CM,
//       w14mob: fleet["W14 Mob"],
//       w14boss: fleet["W14 Boss"],
//       w15mob: fleet["W15 Mob"],
//       w15boss: fleet["W15 Boss"],
//       ex: fleet.EX,

//       consistency: fleet.Consistency ? parseInt(fleet.Consistency) : undefined,
//       fleetreq: fleet["Fleet Req."]
//         ? parseInt(fleet["Fleet Req."] as string)
//         : undefined,
//       gearreq: fleet["Gear Req."]
//         ? parseInt(fleet["Gear Req."] as string)
//         : undefined,

//       lightdmg: parseInt(fleet["Light Dmg"]),
//       mediumdmg: parseInt(fleet["Medium Dmg"]),
//       heavydmg: parseInt(fleet["Heavy Dmg"]),
//       aoedmg: parseInt(fleet["AoE Dmg"]),
//       offensivebuff: fleet["Offense Buff"]
//         ? parseInt(fleet["Offense Buff"])
//         : undefined,

//       selfsurvival: fleet["Self Survival"]
//         ? parseInt(fleet["Self Survival"])
//         : undefined,
//       aa: fleet.AA ? parseInt(fleet.AA) : undefined,
//       asw: fleet.ASW ? parseInt(fleet.ASW) : undefined,
//       defensivebuff: fleet["Defense Buff"]
//         ? parseInt(fleet["Defense Buff"])
//         : undefined,
//     }

//     if (!convertedData[shipName]) {
//       convertedData[shipName] = []
//     }

//     if (nameNote === "") {
//       convertedData[shipName].unshift(ranking)
//     } else {
//       convertedData[shipName].push(ranking)
//     }
//   }

//   return convertedData
// }
