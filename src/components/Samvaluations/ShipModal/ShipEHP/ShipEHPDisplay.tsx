import { HR } from "@components/_common/HR"
import { ItemTable } from "@components/_common/ItemTable"
import { ehpUpdateDate } from "@components/_common/Constants"

import { formatDate } from "@utils/formatDate"

import jsonEHP from "./shipEHP.json"
const shipEHPData = jsonEHP as Record<string, ShipEHPProps[]>

export interface ShipEHPProps {
  name: string
  totalEHP: string
  std: string
}

interface ShipEHPDisplayProps {
  ship: string
}

const getEHPColor = (totalEHP: number): string => {
  let totalEHPColor = "#FFFFFF"
  if (totalEHP !== 100) {
    if (totalEHP > 100) {
      const ratio = Math.min((totalEHP - 100) / 30, 1)
      totalEHPColor = `rgb(
                  ${Math.round(255 - 151 * ratio)},
                  ${Math.round(255 - 114 * ratio)},
                  ${Math.round(255 - 55 * ratio)})`
    } else {
      const ratio = Math.min(Math.max((totalEHP - 70) / 30, 0), 1)
      totalEHPColor = `rgb(
                  ${Math.round(230 + (255 - 230) * ratio)},
                  ${Math.round(124 + (255 - 124) * ratio)},
                  ${Math.round(115 + (255 - 115) * ratio)})`
    }
  }

  return totalEHPColor
}

const getSTDColor = (std: number): string => {
  let stdColor = "#FFFFFF"
  if (std !== 30) {
    if (std < 30) {
      const ratio = Math.min(Math.max((std - 20) / 10, 0), 1)
      stdColor = `rgb(
        ${Math.round(94 + (255 - 94) * ratio)},
        ${Math.round(141 + (255 - 141) * ratio)},
        ${Math.round(200 + (255 - 200) * ratio)})`
    } else {
      const ratio = Math.min(Math.max((std - 30) / 10, 0), 1)
      stdColor = `rgb(
        ${Math.round(255 - (255 - 230) * ratio)},
        ${Math.round(255 - (255 - 124) * ratio)},
        ${Math.round(255 - (255 - 115) * ratio)})`
    }
  }

  return stdColor
}

export const ShipEHPDisplay: React.FC<ShipEHPDisplayProps> = ({ ship }) => {
  const shipEHP = shipEHPData[ship]

  return (
    shipEHP && (
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
  )
}
