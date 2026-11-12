import { ItemTable } from "@/components/_common/ItemTable"

type RankingColumn = readonly [
  label: string,
  value: string | number | null | undefined,
  color: string,
]

// Render a ship ranking table with its domain labels and rank colors.
export const RankingTable = ({
  columns,
}: {
  readonly columns: readonly RankingColumn[]
}) => (
  <ItemTable
    tableInfo={columns.map(([label]) => ({
      colName: label,
      colWidth: "5%",
    }))}
  >
    <tr className="*:text-base">
      {columns.map(([label, value, color]) => (
        <td key={label} className={`${color} font-semibold !text-black`}>
          {value ?? "\u200B"}
        </td>
      ))}
    </tr>
  </ItemTable>
)
