import { useMemo, useState } from "react"

import { ShipCell } from "@components/_common/ItemCell"
import type { FleetTechData } from "./factionTech/types"
import { parseLocation } from "./parseLocation"

const allFactionData = Object.values(
  import.meta.glob("./factionTech/!(types).ts", {
    eager: true,
    import: "default",
  }),
) as FleetTechData[]

import "@components/_common/ItemTable/styles.css"

const tableInfo = [
  { colName: "Ship", colWidth: "15%", key: "ship" },
  { colName: "Location", colWidth: "50%", limiter: true, key: "location" },
  { colName: "Investment", colWidth: "17.5%", key: "investment" },
  {
    colName: "Tech Points",
    colWidth: "17.5%",
    limiter: true,
    key: "techPoints",
  },
]

interface FleetTechTableProps {
  faction: string
  excludeShipyard?: boolean | null | undefined
}

type SortOrder = "asc" | "desc" | null

type SortConfig = {
  column: string | null
  order: SortOrder
}

export const FleetTechTable: React.FC<FleetTechTableProps> = ({
  faction,
  excludeShipyard = true,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "investment",
    order: "desc",
  })

  const factionData = allFactionData.find((data) => data.faction === faction)

  //cache total tech points
  const totalTechPoints = useMemo(() => {
    if (!factionData?.data) return 0

    return factionData.data
      .filter((obj: { techPoints: number; isShipyard?: boolean }) =>
        excludeShipyard ? !obj.isShipyard : true,
      )
      .reduce(
        (
          sum: number,
          obj: {
            techPoints: number
            isShipyard?: boolean
          },
        ) => sum + (obj.techPoints || 0),
        0,
      )
  }, [faction, excludeShipyard])

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
    if (!factionData || !sortConfig.column || !sortConfig.order) {
      return factionData?.data || []
    }

    const sorted = [...factionData.data]

    sorted.sort((a, b) => {
      const { column, order } = sortConfig

      // tech point numeric sort
      if (column === "techPoints") {
        return order === "asc"
          ? a.techPoints - b.techPoints
          : b.techPoints - a.techPoints
      }

      // location sorting
      if (column === "location") {
        const aEvent = a.location[0]?.event || ""
        const bEvent = b.location[0]?.event || ""
        return order === "asc"
          ? aEvent.localeCompare(bEvent)
          : bEvent.localeCompare(aEvent)
      }

      // default sort
      if (column === "ship" || column === "investment") {
        return order === "asc"
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column])
      }

      return 0
    })

    return sorted
  }, [factionData, sortConfig])

  return (
    factionData && (
      <>
        {excludeShipyard ? (
          <p>
            You get <b>{totalTechPoints} Tech Points TOTAL</b> following this
            table (excluding{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://azurlane.koumakan.jp/wiki/Research#Shipyard"
              title="Shipyard"
            >
              Shipyard
            </a>
            ).
          </p>
        ) : (
          <p>
            You get <b>{totalTechPoints} Tech Points TOTAL</b> following this
            table.
          </p>
        )}

        <div className="table-responsive">
          <table className="table table-sm table-dark table-bordered text-center border-secondary align-middle">
            <colgroup>
              {tableInfo.map((col, index) => (
                <col key={index} width={col.colWidth ? col.colWidth : ""} />
              ))}
            </colgroup>

            <thead>
              <tr>
                {tableInfo.map((col, index) => (
                  <th
                    key={index}
                    className={`${col?.limiter && "ship_table_limiter"} px-1 relative`}
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex cursor-pointer">
                      <span className="flex-1 text-center align-middle justify-center pl-[8.75px] pr-2 w-full">
                        {col.colName}
                      </span>
                      <div className="flex flex-col justify-center m-0 space-y-0 space-x-0 *:!leading-[0.35]">
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
                  <td className="!py-2">
                    <ShipCell
                      ship={row.ship}
                      rarity={row.rarity}
                      className="!p-0"
                    />
                  </td>
                  <td>
                    <p>
                      {row.location.map((entry, index) => {
                        return (
                          <span key={index}>
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={`https://azurlane.koumakan.jp/wiki/${parseLocation(entry.event)}`}
                              title={entry.event}
                            >
                              {entry.event}
                            </a>
                            {entry.stages.length > 0 && (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: ` (${entry.stages.join(", ")})`,
                                }}
                              />
                            )}
                            {index < row.location.length - 1 && <br />}
                          </span>
                        )
                      })}
                    </p>
                  </td>
                  <td>
                    <p>{row.investment}</p>
                  </td>
                  <td>
                    <p>{row.techPoints}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  )
}
