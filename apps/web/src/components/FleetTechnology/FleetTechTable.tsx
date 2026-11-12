import { useMemo, useState } from "react"

import { ShipCell } from "@/components/_common/ItemCell"
import { SortableTableHead } from "@/components/_common/ItemTable/SortableTableHead"
import { parseLocation } from "@/utils/parseLocation"

import { allFactionData } from "./factionTech"

import "@/components/_common/ItemTable/styles.css"

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
  excludeShipyard?: boolean
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
  }, [factionData, excludeShipyard])

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
        <p>
          You get <b>{totalTechPoints} Tech Points TOTAL</b> following this
          table
          {excludeShipyard && (
            <>
              {" "}
              (excluding{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://azurlane.koumakan.jp/wiki/Shipyard"
                title="Shipyard"
              >
                Shipyard
              </a>
              )
            </>
          )}
          .
        </p>

        <div className="table-responsive">
          <table className="table-sm table-dark table-bordered border-secondary table text-center align-middle">
            <colgroup>
              {tableInfo.map((col) => (
                <col key={col.key} width={col.colWidth ? col.colWidth : ""} />
              ))}
            </colgroup>

            <SortableTableHead
              columns={tableInfo}
              sortConfig={sortConfig}
              onSort={handleSort}
            />

            <tbody>
              {sortedData.map((row) => (
                <tr key={row.ship}>
                  <td className="py-2!">
                    <ShipCell
                      ship={row.ship}
                      rarity={row.rarity}
                      className="p-0!"
                    />
                  </td>
                  <td>
                    <p>
                      {row.location.map((entry, index) => {
                        return (
                          <span key={entry.event}>
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              href={`https://azurlane.koumakan.jp/wiki/${parseLocation(
                                entry.event,
                              )}`}
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
