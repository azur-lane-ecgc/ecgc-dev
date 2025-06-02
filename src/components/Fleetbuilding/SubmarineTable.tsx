import { ItemTable } from "@components/_common/ItemTable"
import { ShipModal } from "@components/_common/ShipModal"

import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

import type { SSEntry } from "./SSFShipCategories"

interface SubmarineTableProps {
  main: SSEntry[]
  substitute: SSEntry[]
}

export const SubmarineTable: React.FC<SubmarineTableProps> = ({
  main,
  substitute,
}): React.ReactNode => {
  return (
    <ItemTable
      tableInfo={[
        { colName: "Take 3 of", colWidth: "50%" },
        { colName: "Substitutions", colWidth: "50%" },
      ]}
    >
      <tr className="*:text-base">
        <td>
          <div className="mx-[10px] my-[20px] flex flex-wrap justify-center">
            {main.map((entry) => {
              const ship = Object.values(shipData).find(
                (s) => s.ship === entry.name,
              )
              if (!ship) return null

              return (
                <ShipModal
                  key={`main-${ship.id}`}
                  uniqueID={`main-${ship.id}`}
                  shipData={ship}
                  trigger={{
                    hasBorder: false,
                    iconNote: entry.iconNote ?? null,
                    descriptionNote: entry.descriptionNote ?? null,
                    largeDescNote: null,
                  }}
                  loading={false}
                />
              )
            })}
          </div>
        </td>

        <td>
          <div className="mx-[10px] my-[20px] flex flex-wrap justify-center">
            {substitute.map((entry) => {
              const ship = Object.values(shipData).find(
                (s) => s.ship === entry.name,
              )
              if (!ship) return null

              return (
                <ShipModal
                  key={`sub-${ship.id}`}
                  uniqueID={`sub-${ship.id}`}
                  shipData={ship}
                  trigger={{
                    hasBorder: false,
                    iconNote: entry.iconNote ?? null,
                    descriptionNote: entry.descriptionNote ?? null,
                    largeDescNote: null,
                  }}
                  loading={false}
                />
              )
            })}
          </div>
        </td>
      </tr>
    </ItemTable>
  )
}
