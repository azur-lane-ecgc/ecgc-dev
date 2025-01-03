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
            { colName: "Ship", colWidth: "60%", active: true, limiter: true },
            { colName: "Total EHP", colWidth: "20%", limiter: true },
            { colName: "3 STD (ABS)", colWidth: "20%", limiter: true },
          ]}
        >
          {shipEHP.map((ehpItem) => (
            <tr>
              <td>
                <span className="text-base text-cyan-300 font-bold">
                  {ehpItem.name}
                </span>
              </td>
              <td>
                <span>{ehpItem.totalEHP}</span>
              </td>
              <td>
                <span>{ehpItem.std}</span>
              </td>
            </tr>
          ))}
        </ItemTable>
        <HR />
      </>
    )
  )
}
