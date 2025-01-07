// import type { MainFleetRankingProps } from "../types"
// import tempMainData from "./tempmain.json"
// import { parseFleetKey } from "./parseFleetKey"

// interface SheetMainFleetData {
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
//     "Dmg Uptime"?: string
//     "Offense Buff"?: string
//     "Self Survival"?: string
//     AA?: string
//     Rammers?: string
//     "Other Main"?: string
//     "VG Survival"?: string
//   }
// }

// export const convertToMainFleetRanking = (): Record<
//   string,
//   MainFleetRankingProps[]
// > => {
//   const MainFleetData: SheetMainFleetData = tempMainData

//   const convertedData: Record<string, MainFleetRankingProps[]> = {}

//   for (const fleetKey in MainFleetData) {
//     const fleet = MainFleetData[fleetKey]

//     const { shipName, nameNote } = parseFleetKey(fleetKey)

//     const ranking: MainFleetRankingProps = {
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
//       flagreq: fleet["Flag Req."]
//         ? parseInt(fleet["Flag Req."] as string)
//         : undefined,

//       lightdmg: parseInt(fleet["Light Dmg"]),
//       mediumdmg: parseInt(fleet["Medium Dmg"]),
//       heavydmg: parseInt(fleet["Heavy Dmg"]),
//       aoedmg: parseInt(fleet["AoE Dmg"]),
//       dmguptime: fleet["Dmg Uptime"]
//         ? parseInt(fleet["Dmg Uptime"])
//         : undefined,
//       offensivebuff: fleet["Offense Buff"]
//         ? parseInt(fleet["Offense Buff"])
//         : undefined,

//       selfsurvival: fleet["Self Survival"]
//         ? parseInt(fleet["Self Survival"])
//         : undefined,
//       aa: fleet.AA ? parseInt(fleet.AA) : undefined,
//       rammers: fleet.Rammers ? parseInt(fleet.Rammers) : undefined,
//       othermain: fleet["Other Main"]
//         ? parseInt(fleet["Other Main"])
//         : undefined,
//       vgsurvival: fleet["VG Survival"]
//         ? parseInt(fleet["VG Survival"])
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
