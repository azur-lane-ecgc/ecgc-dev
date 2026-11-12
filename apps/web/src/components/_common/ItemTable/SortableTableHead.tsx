interface SortableTableHeadProps {
  readonly columns: readonly {
    key: string
    colName: string
    limiter?: boolean
  }[]
  readonly sortConfig: { column: string | null; order: "asc" | "desc" | null }
  readonly onSort: (column: string) => void
}

// Render sortable table column headings with native buttons and sort announcements.
export const SortableTableHead = ({
  columns,
  sortConfig,
  onSort,
}: SortableTableHeadProps) => (
  <thead>
    <tr>
      {columns.map((col) => (
        <th
          key={col.key}
          className={`${col?.limiter && "ship_table_limiter"} relative px-1`}
          aria-sort={
            sortConfig.column === col.key
              ? sortConfig.order === "asc"
                ? "ascending"
                : "descending"
              : undefined
          }
        >
          <button
            type="button"
            className="flex w-full cursor-pointer items-center text-inherit"
            onClick={() => onSort(col.key)}
          >
            <span className="w-full flex-1 justify-center pr-2 pl-[8.75px] text-center align-middle">
              {col.colName}
            </span>
            <div className="m-0 flex flex-col justify-center space-y-0 space-x-0 *:leading-[0.35]!">
              <i
                className={`fa fa-caret-up text-sm ${
                  sortConfig.column === col.key
                    ? sortConfig.order === "asc"
                      ? "text-cyan-300"
                      : "invisible"
                    : ""
                }`}
              ></i>
              <i
                className={`fa fa-caret-down text-sm ${
                  sortConfig.column === col.key
                    ? sortConfig.order === "desc"
                      ? "text-cyan-300"
                      : "invisible"
                    : ""
                }`}
              ></i>
            </div>
          </button>
        </th>
      ))}
    </tr>
  </thead>
)
