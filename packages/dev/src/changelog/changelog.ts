import { writeFile } from "node:fs/promises"

import { google } from "googleapis"

import {
  getGoogleSheetColumn,
  parseGoogleSheetHeaders,
} from "../googleSheetSchema"

const SERVICE_ACCOUNT_FILE = "../credentials.json"
const CHANGELOG_PATH = "../../apps/web/src/constants/lastUpdated.ts"
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

const SPREADSHEETS = [
  {
    spreadsheet_id: "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc",
    sheet_name: "Notes",
    cell_range: "A1",
    date_header: null,
    date_format: "%B %d, %Y",
    update_key: "ehpUpdateDate",
  },
  {
    spreadsheet_id: "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0",
    sheet_name: "Changelog",
    cell_range: null,
    date_header: "Date",
    date_format: "%Y/%m/%d",
    update_key: "endGameRankingsUpdateDate",
  },
] as const

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: SCOPES,
})

const sheets = google.sheets({ version: "v4", auth })

const getChangelogDate = async (
  spreadsheet_id: string,
  sheet_name: string,
  cell_range: string | null,
  date_header: string | null,
  date_format: string,
): Promise<string> => {
  let dateRow: unknown[] = []
  let dateCell: unknown = null

  if (cell_range) {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheet_id,
      range: `${sheet_name}!${cell_range}`,
    })
    dateRow = result.data.values?.[0] ?? []
  } else if (date_header) {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheet_id,
      range: `${sheet_name}!A1:ZZ2`,
    })
    const [headers, values] = result.data.values ?? []
    const columns = parseGoogleSheetHeaders(headers ?? [])
    const dateColumn = getGoogleSheetColumn(columns, sheet_name, date_header)
    dateRow = values ?? []
    dateCell = dateRow[dateColumn]
  } else {
    throw new Error("Google Sheet changelog source not defined")
  }

  if (cell_range) {
    dateCell = dateRow[0]
  }

  let dateStr =
    dateCell === null || dateCell === undefined ? "" : String(dateCell).trim()
  if (!dateStr) {
    throw new Error("Google Sheet changelog date is empty")
  }

  if (date_format === "%B %d, %Y") {
    dateStr = dateStr
      .replace("th,", ",")
      .replace("st,", ",")
      .replace("nd,", ",")
      .replace("rd,", ",")
  }

  const dateObj = new Date(dateStr)
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid Google Sheet changelog date", { cause: dateStr })
  }

  const month = String(dateObj.getMonth() + 1).padStart(2, "0")
  const day = String(dateObj.getDate()).padStart(2, "0")
  const year = dateObj.getFullYear()
  return `${month}/${day}/${year}`
}

const updateConstantsFile = async (updates: Record<string, string>) => {
  let fileContent = ""
  for (const [key, new_date] of Object.entries(updates)) {
    fileContent += `export const ${key} = "${new_date}"
`
  }

  await writeFile(CHANGELOG_PATH, fileContent)
}

export const main = async (): Promise<Record<string, string>> => {
  const updates: Record<string, string> = {}

  for (const sheetConfig of SPREADSHEETS) {
    const changelogDate = await getChangelogDate(
      sheetConfig.spreadsheet_id,
      sheetConfig.sheet_name,
      sheetConfig.cell_range,
      sheetConfig.date_header,
      sheetConfig.date_format,
    )
    updates[sheetConfig.update_key] = changelogDate
  }

  await updateConstantsFile(updates)
  console.log(`Updated dates: ${JSON.stringify(updates)}`)

  return updates
}
