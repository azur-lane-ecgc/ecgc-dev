import { writeFile } from "node:fs/promises"
import { google } from "googleapis"
import path from "path"

import {
  getGoogleSheetColumn,
  parseGoogleSheetHeaders,
} from "../googleSheetSchema"

const SERVICE_ACCOUNT_FILE = "../credentials.json"
const SPREADSHEET_ID = "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc"
const SHEET_NAMES = ["eHP 3"]
const OUTPUT_PATHS = ["../../apps/web/src/db/ehp/shipEHP.json"]
const REQUIRED_HEADERS = ["Ship", "Average eHP", "3 STD (ABS)"]

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

const getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
  })
  const authToken = await auth.getClient()
  return authToken
}

const extractBaseName = (shipName: string): string => {
  const match = shipName.match(/\((.*?)\)/)

  if (match && match[1] !== undefined && match.index !== undefined) {
    const note = match[1]

    if (
      ["Venus Vacation", "Senran Kagura", "Neptunia", "Royal Navy"].some(
        (phrase) => note.includes(phrase),
      )
    ) {
      return shipName.trim()
    }

    return shipName.substring(0, match.index).trim()
  }

  return shipName.trim()
}

const processSheet = async (sheetName: string, auth: any) => {
  const sheets = google.sheets({ version: "v4", auth })
  const headerResult = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1:ZZ1`,
  })
  const columns = parseGoogleSheetHeaders(headerResult.data.values?.[0] ?? [])
  const columnIndexes = Object.fromEntries(
    REQUIRED_HEADERS.map((headerName) => [
      headerName,
      getGoogleSheetColumn(columns, sheetName, headerName),
    ]),
  )

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A2:ZZ`,
  })

  const values = result.data.values
  if (!values) {
    return {}
  }

  const dataDict: Record<string, any[]> = {}

  for (const row of values) {
    const originalName = String(row[columnIndexes["Ship"] ?? -1] ?? "").trim()
    if (!originalName) continue
    const baseName = extractBaseName(originalName)
    const totalEHP = String(
      row[columnIndexes["Average eHP"] ?? -1] ?? "",
    ).trim()
    const std = String(row[columnIndexes["3 STD (ABS)"] ?? -1] ?? "").trim()

    const entry = {
      name: originalName,
      totalEHP: totalEHP,
      std: std,
    }

    if (!dataDict[baseName]) {
      dataDict[baseName] = []
    }

    if (!dataDict[baseName].some((e) => e.name === entry.name)) {
      dataDict[baseName].push(entry)
    }
  }

  return dataDict
}

export const main = async (): Promise<Record<string, any[]>> => {
  if (SHEET_NAMES.length !== OUTPUT_PATHS.length) {
    throw new Error("Number of sheet names must match number of output paths")
  }

  const auth = await getAuthToken()

  for (let i = 0; i < SHEET_NAMES.length; i++) {
    const sheetName = SHEET_NAMES[i]
    const outputPath = OUTPUT_PATHS[i]

    if (!sheetName || !outputPath) {
      continue
    }

    const sheetData = await processSheet(sheetName, auth)

    await writeFile(outputPath, JSON.stringify(sheetData, null, 2) + "\n")

    console.log(
      `Data from sheet '${sheetName}' has been written to ${path.relative(
        process.cwd(),
        outputPath,
      )}`,
    )

    return sheetData
  }

  return {} as Record<string, any[]>
}
