export interface GoogleSheetColumns {
  readonly columnIndex: ReadonlyMap<string, number>
}

/** Parses Google Sheets headers for name-based column lookup. */
export const parseGoogleSheetHeaders = (
  headers: unknown[],
): GoogleSheetColumns => {
  const columnIndex = new Map<string, number>()

  headers.forEach((header, index) => {
    const normalizedHeader = String(header ?? "").trim()
    if (normalizedHeader && !columnIndex.has(normalizedHeader)) {
      columnIndex.set(normalizedHeader, index)
    }
  })

  return { columnIndex }
}

/** Gets a Google Sheet column index by its exact header name. */
export const getGoogleSheetColumn = (
  columns: GoogleSheetColumns,
  sheetName: string,
  headerName: string,
): number => {
  const columnIndex = columns.columnIndex.get(headerName)
  if (columnIndex === undefined) {
    throw new Error("Google Sheet column not found", {
      cause: {
        sheetName,
        headerName,
        availableHeaders: [...columns.columnIndex.keys()],
      },
    })
  }
  return columnIndex
}
