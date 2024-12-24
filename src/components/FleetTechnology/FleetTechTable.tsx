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

interface FleetTechTableProps {
  faction: string
}

export const FleetTechTable: React.FC<FleetTechTableProps> = ({ faction }) => {
  const tableInfo = [
    { colName: "Ship", colWidth: "15%" },
    { colName: "Location", colWidth: "50%", limiter: true },
    { colName: "Investment", colWidth: "17.5%" },
    { colName: "Tech Points", colWidth: "17.5%", limiter: true },
  ]
  const factionData = allFactionData.find((data) => data.faction === faction)

  const totalTechPoints =
    factionData?.data
      .filter(
        (obj: { techPoints: number; isShipyard?: boolean }) => !obj.isShipyard,
      )
      .reduce(
        (sum: number, obj: { techPoints: number }) =>
          sum + (obj.techPoints || 0),
        0,
      ) || null

  return (
    factionData && (
      <>
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
                  >
                    <div className="flex">
                      <span className="flex-1 text-center align-middle justify-center pr-2 w-full">
                        {col.colName}
                      </span>
                      <div className="flex flex-col justify-center m-0 space-y-0 space-x-0 *:!leading-[0.35]">
                        <i className="fa fa-caret-up text-sm"></i>
                        <i className="fa fa-caret-down text-sm"></i>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {factionData.data.map((row, index) => (
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
