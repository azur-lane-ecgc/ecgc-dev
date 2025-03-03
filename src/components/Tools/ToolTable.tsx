import { useMemo, useState } from "react"
import { ToolData } from "./toolData"

import "@components/_common/ItemTable/styles.css"

const tableInfo = [
  { colName: "Tool", colWidth: "42%", key: "tool", limiter: true },
  { colName: "Author(s)", colWidth: "16%", key: "authors", limiter: false },
  {
    colName: "Description",
    colWidth: "42%",
    key: "description",
    limiter: true,
  },
]

type SortOrder = "asc" | "desc" | null

type SortConfig = {
  column: string | null
  order: SortOrder
}

interface ToolTableProps {
  category: string | null
}

export const ToolTable: React.FC<ToolTableProps> = ({ category }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "tool",
    order: "asc",
  })

  const filteredData = useMemo(() => {
    if (category === null) {
      return ToolData
    }
    return ToolData.filter((item) => item.category.includes(category))
  }, [category])

  // sort function
  const handleSort = (columnKey: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.column === columnKey) {
        const nextOrder =
          prevConfig.order === "asc"
            ? "desc"
            : prevConfig.order === "desc"
              ? null
              : "asc"
        return { column: nextOrder ? columnKey : null, order: nextOrder }
      }
      return { column: columnKey, order: "asc" }
    })
  }

  // sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig.column || !sortConfig.order) {
      return filteredData
    }

    const sorted = [...filteredData]

    sorted.sort((a, b) => {
      const { column, order } = sortConfig

      if (column === "tool") {
        return order === "asc"
          ? a.tool.localeCompare(b.tool)
          : b.tool.localeCompare(a.tool)
      }

      if (column === "authors") {
        const aAuthors = a.authors.join(", ")
        const bAuthors = b.authors.join(", ")
        return order === "asc"
          ? aAuthors.localeCompare(bAuthors)
          : bAuthors.localeCompare(aAuthors)
      }

      if (column === "description") {
        const aDescription =
          typeof a.description === "string"
            ? a.description
            : (a.description as any).props?.children?.toString() || ""
        const bDescription =
          typeof b.description === "string"
            ? b.description
            : (b.description as any).props?.children?.toString() || ""

        return order === "asc"
          ? aDescription.localeCompare(bDescription)
          : bDescription.localeCompare(aDescription)
      }

      return 0
    })

    return sorted
  }, [sortConfig, category])

  return (
    <div className="table-responsive">
      <table className="table-sm table-dark table-bordered border-secondary table text-center align-middle">
        <colgroup>
          {tableInfo.map((col, index) => (
            <col key={index} width={col.colWidth} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {tableInfo.map((col, index) => (
              <th
                key={index}
                className={`${
                  col?.limiter && "ship_table_limiter"
                } relative px-1`}
                onClick={() => handleSort(col.key)}
              >
                <div className="flex cursor-pointer">
                  <span className="w-full flex-1 justify-center pl-[8.75px] pr-2 text-center align-middle">
                    {col.colName}
                  </span>
                  <div className="m-0 flex flex-col justify-center space-x-0 space-y-0 *:!leading-[0.35]">
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
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              <td className="!py-4">
                <span className="text-lg">
                  <a
                    href={row.toolLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.tool}
                  </a>
                </span>
              </td>
              <td>
                <p>{row.authors.join(", ")}</p>
              </td>
              <td>
                <p>{row.description}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
