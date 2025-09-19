import { google } from "googleapis"
import path from "path"

const SERVICE_ACCOUNT_FILE = "credentials.json"
const SPREADSHEET_ID = "1rb_uXVmDnK2YKe-0YRTrf3VUcQi8mKwEMYKCBFmVXCc"
const SHEET_NAMES = ["List"]
const OUTPUT_PATHS = ["src/aa_parsing/shipAA.json"]

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
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A2:C`,
  })

  const values = res.data.values
  if (!values) {
    return {} as Record<string, any[]>
  }

  const dataDict: Record<string, any[]> = {}

  for (const row of values) {
    if (row.length < 3) {
      continue
    }

    const originalName = row[0]?.trim()
    if (!originalName) continue
    const baseName = extractBaseName(originalName)
    const percentSD = row[1]?.trim()
    const aaSum = row[2]?.trim()

    const entry = {
      name: originalName,
      totalAA: aaSum,
      percentSD: percentSD,
    }

    if (!dataDict[baseName]) {
      dataDict[baseName] = []
    }
    dataDict[baseName].push(entry)
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

    await Bun.write(outputPath, JSON.stringify(sheetData, null, 2) + "\n")

    console.log(
      `Data from sheet '${sheetName}' has been written to ${path.relative(
        process.cwd(),
        outputPath,
      )}`,
    )

    return sheetData
  }

  return {}
}
