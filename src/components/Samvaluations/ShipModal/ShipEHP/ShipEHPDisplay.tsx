import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"
import { ehpUpdateDate } from "@components/_common/Constants"

import type { ShipEHPProps } from "@db/types"

import { formatDate } from "@utils/formatDate"

import { getEHPColor, getSTDColor } from "./gradient"

interface ShipEHPDisplayProps {
  shipEHP: ShipEHPProps[] | null | undefined
}

export const ShipEHPDisplay: React.FC<ShipEHPDisplayProps> = ({ shipEHP }) => {
  if (!!!shipEHP) {
    return false
  }

  return (
    <>
      <h3 className="text-xl">
        <a
          href="https://docs.google.com/spreadsheets/d/1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc"
          target="_blank"
          rel="noopener noreferrer"
          title="by Mebot"
          aria-label="EHP V3 by Mebot"
        >
          EHP V3
        </a>
      </h3>
      <p className="text-sm">
        <b>Last Updated</b>:{" "}
        <span className="text-[#00ffff]">{formatDate(ehpUpdateDate)}</span>
      </p>

      <ItemTable
        tableInfo={[
          { colName: "Ship", colWidth: "60%", active: true },
          { colName: "Total EHP", colWidth: "20%", limiter: true },
          { colName: "3 STD (ABS)", colWidth: "20%", limiter: true },
        ]}
      >
        {shipEHP.map((ehpItem) => {
          const totalEHP = Number(ehpItem.totalEHP.replace("%", "").trim())
          const std = Number(ehpItem.std.replace("%", "").trim())

          return (
            <tr key={ehpItem.name}>
              <td className="hover:!bg-gray-800">
                <span className="text-base text-lime-400/90 font-bold">
                  {ehpItem.name}
                </span>
              </td>
              <td
                style={{ backgroundColor: getEHPColor(totalEHP) }}
                className="!text-black !font-bold"
              >
                {totalEHP}%
              </td>
              <td
                style={{ backgroundColor: getSTDColor(std) }}
                className="!text-black !font-bold"
              >
                {std}%
              </td>
            </tr>
          )
        })}
      </ItemTable>
      <HR />
    </>
  )
}
