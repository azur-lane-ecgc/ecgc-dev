import "./styles.css"

interface TableInfoProps {
  colName: string
  colWidth?: string
  colSpan?: number
  limiter?: boolean
  active?: boolean
}

interface ItemTableProps {
  tableInfo: TableInfoProps[]
  allActive?: boolean
}

export const ItemTable: React.FC<React.PropsWithChildren<ItemTableProps>> = ({
  tableInfo,
  allActive = false,
  children,
}) => {
  return (
    <div className="table-responsive">
      <table className="table-sm table-dark table-bordered border-secondary table text-center align-middle">
        <colgroup>
          {tableInfo.map((col, index) =>
            col.colSpan ? (
              Array(col.colSpan)
                .fill(null)
                .map((_, i) => (
                  <col
                    key={`${index}-${i}`}
                    width={col.colWidth ? col.colWidth : ""}
                  />
                ))
            ) : (
              <col key={index} width={col.colWidth ? col.colWidth : ""} />
            ),
          )}
        </colgroup>

        <thead>
          <tr className={`${allActive ? "bg-[#373b3e]" : ""}`}>
            {tableInfo.map((col, index) => (
              <th
                key={index}
                colSpan={col?.colSpan || 1}
                className={`${col.active ? "bg-[#373b3e]" : ""} ${
                  col?.limiter ? "ship_table_limiter" : ""
                } px-1`}
              >
                {col.colName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
