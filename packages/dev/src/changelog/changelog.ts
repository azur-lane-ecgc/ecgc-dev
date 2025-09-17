import { google } from "googleapis"

const SERVICE_ACCOUNT_FILE = "credentials.json"
const CHANGELOG_PATH = "src/constants/lastUpdated.ts"
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

const SPREADSHEETS = [
  {
    spreadsheet_id: "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc",
    sheet_name: "Notes",
    cell_range: "A1",
    date_format: "%B %d, %Y",
    update_key: "ehpUpdateDate",
  },
  {
    spreadsheet_id: "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0",
    sheet_name: "Changelog",
    cell_range: "A2",
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
  cell_range: string,
  date_format: string,
): Promise<string | null> => {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheet_id,
      range: `${sheet_name}!${cell_range}`,
    })

    let dateStr = result.data.values?.[0]?.[0]
    if (!dateStr) {
      return null
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
      throw new Error(`Invalid date format in Changelog: ${dateStr}`)
    }

    const month = String(dateObj.getMonth() + 1).padStart(2, "0")
    const day = String(dateObj.getDate()).padStart(2, "0")
    const year = dateObj.getFullYear()
    return `${month}/${day}/${year}`
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching sheet: ${error.message}`)
    } else {
      console.error(`An unknown error occurred while fetching sheet`)
    }
    return null
  }
}

const updateConstantsFile = async (updates: Record<string, string>) => {
  let fileContent = ""
  for (const [key, new_date] of Object.entries(updates)) {
    fileContent += `export const ${key} = "${new_date}"\n`
  }

  await Bun.write(CHANGELOG_PATH, fileContent)
}

export const main = async () => {
  const updates: Record<string, string> = {}

  for (const sheetConfig of SPREADSHEETS) {
    const changelogDate = await getChangelogDate(
      sheetConfig.spreadsheet_id,
      sheetConfig.sheet_name,
      sheetConfig.cell_range,
      sheetConfig.date_format,
    )
    if (changelogDate) {
      updates[sheetConfig.update_key] = changelogDate
    }
  }

  if (Object.keys(updates).length > 0) {
    await updateConstantsFile(updates)
    console.log(`Updated dates: ${JSON.stringify(updates)}`)
  } else {
    console.log("No valid dates found, skipping update.")
  }
}

main().catch((err) => {
  console.error("An error occurred", err)
  process.exit(1)
})
