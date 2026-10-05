import { writeFile } from "node:fs/promises"
import { google } from "googleapis"
import path from "path"

import {
  getGoogleSheetColumn,
  parseGoogleSheetHeaders,
} from "../googleSheetSchema"

const SERVICE_ACCOUNT_FILE = "../credentials.json"
const SPREADSHEET_ID = "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0"
const SHEET_NAME = "MAIN (no img)"
const OUTPUT_PATH = "../../apps/web/src/db/rankings/mainFleetRankings.json"
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
  "Flag Req.",
  "Light Dmg",
  "Medium Dmg",
  "Heavy Dmg",
  "AoE Dmg",
  "Dmg Uptime",
  "Offense Buff",
  "Self Survival",
  "AA",
  "Rammers",
  "Other Main",
  "VG Survival",
]

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

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

const getColumnIndexes = async (auth: any): Promise<Record<string, number>> => {
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A2:ZZ2`,
  })
  const columns = parseGoogleSheetHeaders(res.data.values?.[0] ?? [])

  return Object.fromEntries(
    EXPECTED_HEADERS.map((headerName) => [
      headerName,
      getGoogleSheetColumn(columns, SHEET_NAME, headerName),
    ]),
  )
}

const processSheet = async (auth: any): Promise<Record<string, any[]>> => {
  const columnIndexes = await getColumnIndexes(auth)
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A3:ZZ`,
  })

  const values = res.data.values || []
  const dataDict: Record<string, any[]> = {}

  for (const row of values) {
    if (row.length < 1) continue

    const fleetKey = String(row[columnIndexes["Name"] ?? -1] ?? "").trim()
    if (!fleetKey) continue
    const parsedKey = parseFleetKey(fleetKey)

    const rowData: Record<string, string | null> = {}
    for (const headerName of EXPECTED_HEADERS) {
      if (headerName === "Name") continue
      const cellValue = row[columnIndexes[headerName] ?? -1]
      rowData[headerName] =
        cellValue === undefined || cellValue === null || cellValue === ""
          ? null
          : String(cellValue).trim()
    }

    if (!dataDict[parsedKey.shipName]) {
      dataDict[parsedKey.shipName] = []
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
      dmguptime: rowData["Dmg Uptime"] ? parseInt(rowData["Dmg Uptime"]) : null,
      offensivebuff: rowData["Offense Buff"]
        ? parseInt(rowData["Offense Buff"])
        : null,
      selfsurvival: rowData["Self Survival"]
        ? parseInt(rowData["Self Survival"])
        : null,
      aa: rowData["AA"] ? parseInt(rowData["AA"]) : null,
      rammers: rowData["Rammers"] ? parseInt(rowData["Rammers"]) : null,
      othermain: rowData["Other Main"] ? parseInt(rowData["Other Main"]) : null,
      vgsurvival: rowData["VG Survival"]
        ? parseInt(rowData["VG Survival"])
        : null,
    }

    if (parsedKey.nameNote === "") {
      dataDict[parsedKey.shipName]?.unshift(ranking)
    } else {
      dataDict[parsedKey.shipName]?.push(ranking)
    }
  }

  for (const shipName in dataDict) {
    dataDict[shipName]?.sort((a, b) => {
      if (a.nameNote.length > 0 && b.nameNote.length === 0) return 1
      if (a.nameNote.length === 0 && b.nameNote.length > 0) return -1
      return a.nameNote.localeCompare(b.nameNote)
    })
  }

  return dataDict
}

export const main = async (): Promise<Record<string, any[]>> => {
  const auth = await getAuthToken()
  const sheetData = await processSheet(auth)

  const sortedSheetData = Object.keys(sheetData)
    .sort()
    .reduce((obj: Record<string, any>, key: string) => {
      obj[key] = sheetData[key]
      return obj
    }, {})

  await writeFile(OUTPUT_PATH, JSON.stringify(sortedSheetData, null, 2) + "\n")
  console.log(
    `Data from sheet '${SHEET_NAME}' has been written to ${path.relative(
      process.cwd(),
      OUTPUT_PATH,
    )}`,
  )

  return sortedSheetData
}
