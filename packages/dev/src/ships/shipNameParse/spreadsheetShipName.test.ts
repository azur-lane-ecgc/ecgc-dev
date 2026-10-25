import { expect, test } from "bun:test"

import { shipNameParse } from "./shipNameParse"
import { normalizeSpreadsheetShipName } from "./spreadsheetShipName"

const rawShips: Record<number, { name: string }> = await Bun.file(
  new URL("../../../../AzurLaneData/data/ships.json", import.meta.url),
).json()

test.each([
  { id: 763, name: "Mercury" },
  { id: 10155, name: "Tokisaki Kurumi" },
  { id: 10156, name: "Kaguya Yamai and Yuzuru Yamai" },
  { id: 740, name: "Unzen Chan" },
  { id: 30059, name: "Koln META" },
  { id: 680, name: "Giosue Carducci" },
  { id: 12, name: "William D Porter" },
  { id: 10057, name: "Ōkami Mio" },
])("joins spreadsheet name $name to game ship $id", ({ id, name }) => {
  expect(normalizeSpreadsheetShipName(name)).toBe(
    shipNameParse(id, rawShips[id]!.name),
  )
})

test("preserves fleet group names and unmapped ship names", () => {
  expect(normalizeSpreadsheetShipName("Tempestack")).toBe("Tempestack")
  expect(normalizeSpreadsheetShipName("Enterprise (Royal Navy)")).toBe(
    "Enterprise (Royal Navy)",
  )
})
