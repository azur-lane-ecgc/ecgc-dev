import { writeFile } from "node:fs/promises"
import path from "path"

import { google } from "googleapis"

import {
  getGoogleSheetColumn,
  parseGoogleSheetHeaders,
} from "../googleSheetSchema"
import { normalizeSpreadsheetShipName } from "../ships/shipNameParse/spreadsheetShipName"

const SERVICE_ACCOUNT_FILE = "../credentials.json"
const SPREADSHEET_ID = "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0"
const SHEET_NAME = "VG (no img)"
const OUTPUT_PATH = "../../apps/web/src/db/rankings/vgFleetRankings.json"
const EXPECTED_HEADERS = [
  "Name",
  "Notes",
  "Hard Arbiter",
  "META",
  "CM",
  "W14 Mob",
  "W14 Boss",
  "W15/16 Mob",
  "W15/16 Boss",
  "EX",
  "Consistency",
  "Fleet Req.",
  "Gear Req.",
  "Light Dmg",
  "Medium Dmg",
  "Heavy Dmg",
  "AoE Dmg",
  "Offense Buff",
  "Self Survival",
  "AA",
  "ASW",
  "Defense Buff",
]

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
const priorityOrder: Record<string, number> = {
  SS: 5,
  S: 4,
  A: 3,
  B: 2,
  C: 1,
  D: 0,
}

const getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
  })
  return auth.getClient()
}

const parseFleetKey = (
  fleetKey: string,
): {
  shipName: string
  nameNote: string
} => {
  const exceptions = [
    "Neptune (Neptunia)",
    "Enterprise (Royal Navy)",
    "Kasumi (Venus Vacation)",
    "Fubuki (Senran Kagura)",
    "Kaga(BB)",
    "Amagi(CV)",
  ]

  for (const exception of exceptions) {
    if (fleetKey.startsWith(exception)) {
      return {
        shipName: exception,
        nameNote: fleetKey.slice(exception.length).trim().replace(/\(|\)/g, ""),
      }
    }
  }

  const match = fleetKey.match(/^(.*?)\s*\((.*?)\)$/)
  return match && match[1] && match[2]
    ? { shipName: match[1].trim(), nameNote: match[2].trim() }
    : { shipName: fleetKey.trim(), nameNote: "" }
}

const processSheet = async (auth: any): Promise<Record<string, any[]>> => {
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A2:ZZ`,
  })
  const values = res.data.values ?? []
  const columns = parseGoogleSheetHeaders(values[0] ?? [])
  const columnIndexes = Object.fromEntries(
    EXPECTED_HEADERS.map((headerName) => [
      headerName,
      getGoogleSheetColumn(columns, SHEET_NAME, headerName),
    ]),
  )
  const dataDict: Record<string, any[]> = {}

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const row = values[rowIndex]!
    if (row.length < 1) continue

    const fleetKey = String(row[columnIndexes["Name"] ?? -1] ?? "").trim()
    if (!fleetKey) continue
    const parsedKey = parseFleetKey(fleetKey)
    const shipName = normalizeSpreadsheetShipName(parsedKey.shipName)

    const rowData: Record<string, string | null> = {}
    for (const headerName of EXPECTED_HEADERS) {
      if (headerName === "Name") continue
      const cellValue = row[columnIndexes[headerName] ?? -1]
      rowData[headerName] =
        cellValue === undefined || cellValue === null || cellValue === ""
          ? null
          : String(cellValue).trim()
    }

    if (!dataDict[shipName]) {
      dataDict[shipName] = []
    }

    const ranking = {
      nameNote: parsedKey.nameNote,
      notes: rowData["Notes"] || null,
      hardarbiter: rowData["Hard Arbiter"] || null,
      meta: rowData["META"] || null,
      cm: rowData["CM"] || null,
      w14mob: rowData["W14 Mob"] || null,
      w14boss: rowData["W14 Boss"] || null,
      w15mob: rowData["W15/16 Mob"] || null,
      w15boss: rowData["W15/16 Boss"] || null,
      ex: rowData["EX"] || null,
      consistency: rowData["Consistency"]
        ? parseInt(rowData["Consistency"])
        : null,
      fleetreq: rowData["Fleet Req."] ? parseInt(rowData["Fleet Req."]) : null,
      gearreq: rowData["Gear Req."] ? parseInt(rowData["Gear Req."]) : null,
      flagreq: rowData["Flag Req."] ? parseInt(rowData["Flag Req."]) : null,
      lightdmg: rowData["Light Dmg"] ? parseInt(rowData["Light Dmg"]) : null,
      mediumdmg: rowData["Medium Dmg"] ? parseInt(rowData["Medium Dmg"]) : null,
      heavydmg: rowData["Heavy Dmg"] ? parseInt(rowData["Heavy Dmg"]) : null,
      aoedmg: rowData["AoE Dmg"] ? parseInt(rowData["AoE Dmg"]) : null,
      offensivebuff: rowData["Offense Buff"]
        ? parseInt(rowData["Offense Buff"])
        : null,
      selfsurvival: rowData["Self Survival"]
        ? parseInt(rowData["Self Survival"])
        : null,
      aa: rowData["AA"] ? parseInt(rowData["AA"]) : null,
      asw: rowData["ASW"] ? parseInt(rowData["ASW"]) : null,
      defensivebuff: rowData["Defense Buff"]
        ? parseInt(rowData["Defense Buff"])
        : null,
    }

    if (parsedKey.nameNote === "") {
      dataDict[shipName]?.unshift(ranking)
    } else {
      dataDict[shipName]?.push(ranking)
    }
  }

  return dataDict
}

/** Reads fleet ranking headers and data in one sheet request. */
export const main = async (): Promise<Record<string, any[]>> => {
  const auth = await getAuthToken()
  const sheetData = await processSheet(auth)

  const sortedKeys = Object.keys(sheetData).sort()

  const sortedSheetData = sortedKeys.reduce(
    (obj: Record<string, any>, key: string) => {
      const rankings = sheetData[key]
      if (rankings) {
        const sortedRankings = rankings.sort((a, b) => {
          const aPriority = priorityOrder[a.w14boss] || 0
          const bPriority = priorityOrder[b.w14boss] || 0
          if (aPriority !== bPriority) {
            return bPriority - aPriority
          }
          return a.nameNote.localeCompare(b.nameNote)
        })
        obj[key] = sortedRankings
      }
      return obj
    },
    {},
  )

  await writeFile(OUTPUT_PATH, JSON.stringify(sortedSheetData, null, 2) + "\n")
  console.log(
    `Data from sheet '${SHEET_NAME}' has been written to ${path.relative(
      process.cwd(),
      OUTPUT_PATH,
    )}`,
  )

  return sortedSheetData
}
