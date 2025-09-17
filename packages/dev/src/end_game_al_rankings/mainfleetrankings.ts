import { google } from "googleapis"
import path from "path"

const SERVICE_ACCOUNT_FILE = "credentials.json"
const SPREADSHEET_ID = "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0"
const SHEET_NAME = "MAIN (no img)"
const OUTPUT_PATH = "packages/frontend/src/db/rankings/mainFleetRankings.json"

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

const getHeaders = async (auth: any): Promise<string[]> => {
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!D2:AA2`,
  })
  return (res.data.values?.[0] || []).map((h: any) => h.trim())
}

const processSheet = async (auth: any): Promise<Record<string, any[]>> => {
  const headers = await getHeaders(auth)
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!C3:AA`,
  })

  const values = res.data.values || []
  const dataDict: Record<string, any[]> = {}

  for (const row of values) {
    if (row.length < 1) continue

    const fleetKey = row[0]?.trim()
    if (!fleetKey) continue
    const parsedKey = parseFleetKey(fleetKey)

    const rowData: Record<string, string | null> = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      if (header) {
        rowData[header] = row[i + 1] ? row[i + 1].trim() : null
      }
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
      w15mob: rowData["W15 Mob"] || null,
      w15boss: rowData["W15 Boss"] || null,
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

export const main = async () => {
  const auth = await getAuthToken()
  const sheetData = await processSheet(auth)

  const sortedSheetData = Object.keys(sheetData)
    .sort()
    .reduce((obj: Record<string, any>, key: string) => {
      obj[key] = sheetData[key]
      return obj
    }, {})

  await Bun.write(OUTPUT_PATH, JSON.stringify(sortedSheetData, null, 2) + "\n")
  console.log(
    `Data from sheet '${SHEET_NAME}' has been written to ${path.relative(
      process.cwd(),
      OUTPUT_PATH,
    )}`,
  )
}

main().catch((err) => {
  console.error("An error occurred", err)
  process.exit(1)
})
