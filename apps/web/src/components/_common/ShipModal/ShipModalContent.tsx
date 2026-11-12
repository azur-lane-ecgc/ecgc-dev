import { HR } from "@/components/_common/HR"
import type { ShipData } from "@/db/types"
import { shipImageParse } from "@/utils/ships"

import { ShipEHPDisplay } from "./ShipEHP"
import { ShipEquipment } from "./ShipEquipment"
import { ShipFleetRanking } from "./ShipFleetRanking"
import { ShipLocations } from "./ShipLocations"
import { ShipTags } from "./ShipTags"
import { shipIconContainerStyle, shipIconStyle, shipLinkStyle } from "./styles"

// Ship modal heading, evaluation, equipment, and rankings.
export function ShipModalContent({
  shipData,
}: {
  readonly shipData: ShipData
}) {
  const { ship, hullType, faction, roles, locations, rarity, isKai, samEval } =
    shipData
  const shipImg = shipImageParse(ship, isKai)
  return (
    <>
      {/* Role Tags */}
      <ShipTags hullType={hullType} faction={faction} roles={roles} />

      {/* Internal Content */}
      <div id={`innerModalContent${ship}`} className="mx-auto pt-1 text-center">
        {/* Heading */}
        <h1 className="mb-0">
          <a
            className={`${shipLinkStyle}`}
            rel="noopener noreferrer"
            target="_blank"
            href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(
              " ",
              "_",
            )}`}
          >
            {isKai ? ship + " (Retrofit)" : ship}
          </a>
        </h1>

        {/* Event / Location */}
        <ShipLocations locations={locations} />
        <HR />

        {/* Flexbox for Icon + Samvaluation */}
        <div className={shipIconContainerStyle}>
          {/* Ship Icon */}
          <div className={`rarity-${rarity} ${shipIconStyle}`}>
            <a
              className={shipLinkStyle}
              rel="noopener noreferrer"
              target="_blank"
              title={ship}
              href={`https://azurlane.koumakan.jp/wiki/${ship.replaceAll(
                " ",
                "_",
              )}`}
            >
              <img
                width={116}
                height={116}
                loading="lazy"
                src={`${shipImg}`}
                alt={`${ship}`}
              />
            </a>
          </div>

          {/* Samvaluation */}
          <div className="w-full text-sm">
            <span
              className="text-[14.5px] leading-normal text-[hsla(0,0%,100%,0.75)]"
              dangerouslySetInnerHTML={{ __html: samEval ?? "" }}
            />
          </div>
        </div>
        <HR />

        {/* EHP */}
        <ShipEHPDisplay ship={ship} />

        <ShipEquipment shipData={shipData} />
        <HR />
        <ShipFleetRanking shipData={shipData} />
      </div>
    </>
  )
}
