import { ItemTable } from "@/components/_common/ItemTable"
import type { ShipData } from "@/db/types"
import { parseEquipHref } from "@/utils/ships"

// Ship equipment slots, augments, and limit break bonuses.
export function ShipEquipment({ shipData }: { readonly shipData: ShipData }) {
  const { slots, hullType, augments, fastLoad, LBBonus } = shipData
  return (
    <ItemTable
      tableInfo={[
        { colName: "Slot", colWidth: "10%" },
        { colName: "Equipment", colWidth: "55%", limiter: true },
        { colName: "Efficiency", colWidth: "15%" },
        { colName: "Mounts", colWidth: "10%" },
      ]}
    >
      {[
        "primary",
        "secondary",
        "tertiary",
        "first auxiliary",
        "second auxiliary",
      ].map((slotName, index) => {
        const slot = slots[index]
        return (
          <tr key={slotName} className="text-base *:text-base">
            <td>{index + 1}</td>
            <td>
              {slot.type.map((type, typeIndex) => {
                const equipHref = parseEquipHref(hullType, type)
                return (
                  <span key={type}>
                    {typeIndex > 0 && ", "}
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`/equipment#${equipHref}`}
                    >
                      {type}
                    </a>
                  </span>
                )
              })}
            </td>
            <td>{Math.round(slot.efficiency * 100)}%</td>
            <td>{Math.round(slot.mounts)}</td>
          </tr>
        )
      })}
      <tr className="*:text-base">
        <td>
          <b>Augments</b>
        </td>
        <td colSpan={4}>
          {augments ? (
            augments.map((augment, augIndex) => (
              <span key={augment}>
                {augIndex > 0 && ", "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://azurlane.koumakan.jp/wiki/${augment.replaceAll(
                    " ",
                    "_",
                  )}`}
                >
                  {augment}
                </a>
              </span>
            ))
          ) : (
            <span>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={`https://azurlane.koumakan.jp/wiki/Augmentation`}
              >
                N/A
              </a>
            </span>
          )}
        </td>
      </tr>

      {!!fastLoad && (
        <tr className="*:text-base">
          <td>
            <b>Preload</b>
          </td>
          <td colSpan={4}>
            <span className="font-semibold text-green-400">
              {fastLoad.text}
            </span>
          </td>
        </tr>
      )}
      {!!LBBonus && (
        <tr className="*:text-base">
          <td>
            <b>MLB Bonus</b>
          </td>
          <td colSpan={4}>
            <span className="font-semibold text-fuchsia-400">{LBBonus}</span>
          </td>
        </tr>
      )}
    </ItemTable>
  )
}
