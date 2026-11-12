import { ItemTable } from "@/components/_common/ItemTable"
import {
  shipIconStyle,
  shipLinkStyle,
} from "@/components/_common/ShipModal/styles"
import { getImageAssetUrl } from "@/utils/images/imageAssetUrl"

import type { ResourceProps } from "../CommonResourceData/types"

// Resource icons and acquisition totals with the original responsive layout.
export function ResourceTotals({ item }: { readonly item: ResourceProps }) {
  const name = item.plural || item.name + "s"
  const hasOneTime = !!item.total.oneTime && item.total.oneTime !== "N/A"
  const hasVariants = Array.isArray(item.image) && Array.isArray(item.rarity)
  const stacked = hasVariants || hasOneTime
  const images = Array.isArray(item.image)
    ? hasVariants
      ? item.image
      : item.image.slice(0, 1)
    : [item.image]
  const columns = [
    { key: "daily", label: "Daily", suffix: " / Day" },
    { key: "weekly", label: "Weekly", suffix: " / Week" },
    { key: "monthly", label: "Monthly", suffix: " / Month" },
    { key: "bimonthly", label: "Bimonthly", suffix: " / 2 Months" },
    ...(hasOneTime
      ? [{ key: "oneTime", label: "One-Time", suffix: "" } as const]
      : []),
  ] as const
  return (
    <div
      className={
        stacked ? "mt-5" : "mt-5 flex flex-col items-center gap-4 md:flex-row"
      }
    >
      <div
        className={
          stacked ? "flex w-full flex-row flex-wrap justify-center gap-4" : ""
        }
      >
        {images.map((image, index) => (
          <div
            key={image}
            className={`rarity-${Array.isArray(item.rarity) ? item.rarity[index] : item.rarity} ${shipIconStyle}`}
          >
            <a
              className={shipLinkStyle}
              rel="noopener noreferrer"
              target="_blank"
              title={name}
              href={`https://azurlane.koumakan.jp/wiki/${item.wikiLink.replaceAll(" ", "_")}`}
            >
              <img
                loading="lazy"
                width={100}
                height={100}
                src={getImageAssetUrl(image)}
                alt={name}
              />
            </a>
          </div>
        ))}
      </div>
      {stacked && <br />}
      <div className="w-full">
        <ItemTable
          tableInfo={columns.map((column) => ({
            colName: column.label,
            colWidth: hasOneTime ? "20%" : "25%",
            limiter: true,
          }))}
          allActive={true}
        >
          <tr>
            {columns.map((column) => (
              <td key={column.key} className="font-bold">
                <span className="text-yellow-400!">
                  {item.total[column.key]}
                </span>
                {item.total[column.key] !== "N/A" && column.suffix}
              </td>
            ))}
          </tr>
        </ItemTable>
      </div>
    </div>
  )
}
