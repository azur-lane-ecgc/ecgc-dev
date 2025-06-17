// import type { SSFleetRankingProps } from "../types"
// import tempSSdata from "./tempss.json"
// import { parseFleetKey } from "./parseFleetKey"

// interface SheetSSFleetData {
//   [key: string]: {
//     Notes?: string
//     "Hard Arbiter": string
//     CM: string
//     Campaign?: string
//     Consistency?: string
//     "Fleet Req."?: string
//     "Flag Req."?: string
//     "Light Dmg": string
//     "Medium Dmg": string
//     "Heavy Dmg": string
//     "Offense Buff"?: string
//   }
// }

// export const convertToSSFleetRanking = (): Record<
//   string,
//   SSFleetRankingProps[]
// > => {
//   const SSFleetData: SheetSSFleetData = tempSSdata

//   const convertedData: Record<string, SSFleetRankingProps[]> = {}

//   for (const fleetKey in SSFleetData) {
//     const fleet = SSFleetData[fleetKey]

//     const { shipName, nameNote } = parseFleetKey(fleetKey)

//     const ranking: SSFleetRankingProps = {
//       nameNote,
//       notes: fleet.Notes,
//       hardarbiter: fleet["Hard Arbiter"],
//       cm: fleet.CM,
//       campaign: fleet.Campaign,
//       consistency: fleet.Consistency ? parseInt(fleet.Consistency) : undefined,
//       fleetreq: fleet["Fleet Req."]
//         ? parseInt(fleet["Fleet Req."] as string)
//         : undefined,
//       flagreq: fleet["Flag Req."]
//         ? parseInt(fleet["Flag Req."] as string)
//         : undefined,
//       lightdmg: parseInt(fleet["Light Dmg"]),
//       mediumdmg: parseInt(fleet["Medium Dmg"]),
//       heavydmg: parseInt(fleet["Heavy Dmg"]),
//       offensivebuff: fleet["Offense Buff"]
//         ? parseInt(fleet["Offense Buff"])
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
