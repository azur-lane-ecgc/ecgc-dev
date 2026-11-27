const spreadsheetShipNames: Readonly<Record<string, string>> = {
  Mercury: "Merkuriy",
  "Tokisaki Kurumi": "Kurumi Tokisaki",
  "Kaguya Yamai and Yuzuru Yamai": "Kaguya Yamai・Yuzuru Yamai",
  "Unzen Chan": "Unzen-chan",
  "Koln META": "Köln META",
  "Giosue Carducci": "Giosuè Carducci",
  "William D Porter": "William D. Porter",
  "Ōkami Mio": "Ookami Mio",
}

/** Maps spreadsheet ship names to the names used by game data. */
export const normalizeSpreadsheetShipName = (name: string): string =>
  spreadsheetShipNames[name] ?? name
