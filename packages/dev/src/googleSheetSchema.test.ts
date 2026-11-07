import { expect, test } from "bun:test"

import {
  getGoogleSheetColumn,
  parseGoogleSheetHeaders,
} from "./googleSheetSchema"

test("reads damage and survival by header after ranking columns move", () => {
  const headers = [
    "Name",
    "Offense Buff",
    "Heavy Dmg",
    "Self Survival",
    "Light Dmg",
    "Medium Dmg",
  ]
  const row = ["Ägir", 2, 968, 161, 1050, 1152]
  const columns = parseGoogleSheetHeaders(headers)

  for (const [header, expected] of [
    ["Light Dmg", 1050],
    ["Medium Dmg", 1152],
    ["Heavy Dmg", 968],
    ["Self Survival", 161],
    ["Offense Buff", 2],
  ] as const) {
    expect(row[getGoogleSheetColumn(columns, "VG", header)]).toBe(expected)
  }
})

test("trims source headers and preserves their original column indexes", () => {
  const columns = parseGoogleSheetHeaders([
    "",
    "Hull",
    "Name",
    "Notes",
    " Hard Arbiter",
    " META ",
  ])

  expect(getGoogleSheetColumn(columns, "MAIN", "Name")).toBe(2)
  expect(getGoogleSheetColumn(columns, "MAIN", "Hard Arbiter")).toBe(4)
  expect(getGoogleSheetColumn(columns, "MAIN", "META")).toBe(5)
})

test("rejects missing ranking headers instead of reading a neighboring column", () => {
  const columns = parseGoogleSheetHeaders(["Name", "Light Dmg", "Offense Buff"])

  expect(() => getGoogleSheetColumn(columns, "MAIN", "Medium Dmg")).toThrow(
    "Google Sheet column not found",
  )
})
