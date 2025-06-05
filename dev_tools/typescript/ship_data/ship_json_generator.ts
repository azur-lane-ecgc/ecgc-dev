import { dirname } from "path"
import { existsSync, mkdirSync } from "fs"

import type { ShipData } from "@ALData/types/ships"
import type { AugmentData } from "@ALData/types/augments"
const ships: Record<number, ShipData> = (await import(
  "@ALData/data/ships.json"
).then((module) => module.default)) as Record<number, ShipData>

const augmentData: Record<number, AugmentData> = (await import(
  "@ALData/data/augments.json"
).then((module) => module.default)) as Record<number, AugmentData>

import type { ShipData as ProcessedShipData } from "@db/types"
import {
  isPermanent,
  shipDefaultAugmentParse,
  shipFactionParse,
  shipFleetTypeParse,
  shipHullTypeParse,
  shipLBBonusParse,
  shipLocationParse,
  shipNameParse,
  shipRarityParse,
  shipRoleParse,
  shipSamvaluationParse,
  shipSlotParse,
} from "../ships"

const OUTPUT_PATH = "../../src/db/ship_data/ship_data.json"

const writeShipDataToFile = async (
  ships: Record<number, ShipData>,
  augmentData: Record<number, AugmentData>,
) => {
  const processedData: Record<number, ProcessedShipData> = {}

  Object.keys(ships).forEach((id) => {
    const mrLarData = ships[+id]

    const ship = shipNameParse(mrLarData.id, mrLarData.name)
    const faction = shipFactionParse(mrLarData.nation)

    let rarity = shipRarityParse(mrLarData.rarity)
    const isKai = mrLarData.hasOwnProperty("retro")
    if (isKai) {
      rarity++
    }

    const hull = mrLarData?.retro?.hull ?? mrLarData.hull
    const hullType = shipHullTypeParse(hull)
    const fleetType: "main" | "ss" | "vg" = shipFleetTypeParse(hull)

    const LBBonus = shipLBBonusParse(mrLarData?.specific_buff)
    const slots = shipSlotParse(
      mrLarData.slots[mrLarData.slots.length - 1],
      mrLarData.retro?.slots,
    )

    const augments = (() => {
      const uniqueAugment = mrLarData?.unique_aug
        ? augmentData[mrLarData.unique_aug].name
        : ""

      const normalAugments = shipDefaultAugmentParse(hull)

      if (!!uniqueAugment) {
        return [uniqueAugment, ...normalAugments]
      }

      return normalAugments.length <= 0 ? null : normalAugments
    })()

    const locations = shipLocationParse(ship, +id)
    const permanent = isPermanent(+id)

    const samvaluationData = shipSamvaluationParse(ship)
    const samEval = samvaluationData.evaluation
    const fastLoad = samvaluationData?.preload2 || null
    const roles = shipRoleParse(ship, fleetType, hullType)

    processedData[+id] = {
      id: +id,
      ship,
      faction,
      rarity,
      isKai,
      hullType,
      fleetType,
      LBBonus,
      slots,
      augments,
      samEval,
      fastLoad: fastLoad,
      roles,
      locations,
      permanent,
    }
  })

  if (!existsSync(dirname(OUTPUT_PATH))) {
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
  }

  await Bun.write(OUTPUT_PATH, JSON.stringify(processedData, null, 2))

  console.log(`Ship data has been written to ${OUTPUT_PATH}`)
}

writeShipDataToFile(ships, augmentData)
