import { HR } from "@/components/_common/HR"
import { ItemTable } from "@/components/_common/ItemTable"
import { getCellColor } from "@/utils/commonResource"

import type { ResourceProps } from "../CommonResourceData/types"
import { LocationLinks } from "./LocationLinks"
import { Mark } from "./Mark"

const resourceDropGroups = [
  {
    title: "Daily",
    columns: [
      ["Academy", "academy"],
      ["Missions", "missions"],
      ["Daily Raid", "dailyRaid"],
      ["Cruise Pass", "cruisePass"],
    ],
  },
  {
    title: "Farming",
    columns: [
      ["Campaign", "campaignDrop"],
      ["Hard Mode", "hardModeDrop"],
      ["Event", "eventDrop"],
      ["OPSI", "opsi"],
    ],
  },
  {
    title: "Shops",
    columns: [
      ["General", "generalShop"],
      ["Merit", "meritShop"],
      ["Guild", "guildShop"],
      ["META", "metaShop"],
    ],
  },
  {
    title: "",
    columns: [
      ["Core Data", "coreDataShop"],
      ["Medal", "medalShop"],
      ["Prototype", "prototypeShop"],
      ["Event", "eventShop"],
    ],
  },
] as const

// Resource daily, farming, and shop drop tables.
export function ResourceDrops({
  drops,
}: {
  readonly drops: ResourceProps["drops"]
}) {
  return resourceDropGroups.map((group) => (
    <section key={group.columns[0][1]}>
      {group.title ? (
        <>
          <HR />
          <h4 className="mb-3 ml-1 text-left">{group.title}</h4>
        </>
      ) : (
        <br />
      )}
      <ItemTable
        tableInfo={group.columns.map(([label]) => ({
          colName: label,
          colWidth: "25%",
          limiter: true,
        }))}
        allActive={true}
      >
        <tr className="h-43.75 min-h-43.75">
          {group.columns.map(([, key]) => (
            <td key={key} className={getCellColor(drops[key]?.checkMark.color)}>
              <Mark mark={drops[key]?.checkMark} />
              <LocationLinks locations={drops[key]?.locations} />
            </td>
          ))}
        </tr>
      </ItemTable>
    </section>
  ))
}
