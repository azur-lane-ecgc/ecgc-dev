import "./styles.css"

interface TableInfoProps {
  colName: string
  colWidth: string
}

interface ShipTableProps {
  tableInfo: TableInfoProps[]
}

export const ShipTable: React.FC<React.PropsWithChildren<ShipTableProps>> = ({
  tableInfo,
  children,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-dark table-bordered text-center border-secondary align-middle">
        <colgroup>
          {tableInfo.map((col, index) => (
            <col key={index} width={col.colWidth} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {tableInfo.map((col, index) => (
              <th key={index}>{col.colName}</th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
