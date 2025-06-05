import type { SlotData } from "@ALData/types/ships"
import type { SlotProps } from "@db/types"

const SlotMap: { [key: number]: string } = {
  0: "Unknown",
  1: "DD Main Gun",
  2: "CL Main Gun",
  3: "CA Main Gun",
  4: "BB Main Gun",
  5: "Torpedo",
  6: "AA Gun",
  7: "Fighter",
  8: "Torpedo Bomber",
  9: "Dive Bomber",
  10: "Auxiliary",
  11: "CB Main Gun",
  12: "Seaplane",
  13: "Submarine Torpedo",
  14: "ASW Equipment",
  15: "ASW Plane",
  17: "ASW Helicopter",
  18: "Cargo",
  20: "Missile",
  21: "Timed Fuze AA Gun",
}

export const shipSlotParse = (
  shipSlotData: SlotData[],
  retroSlots?: Partial<SlotData>[],
): SlotProps[] => {
  return shipSlotData.map((data, index) => {
    const retroSlot = retroSlots?.[index]

    const equipType = (retroSlot?.types || data.types).map(
      (typeId) => SlotMap[typeId],
    )

    // 100% Auxiliary efficiency, else calc from data
    const efficiency = equipType.includes(SlotMap[10])
      ? 1
      : (data.efficiency || 1) + (retroSlot?.efficiency || 0)

    return {
      type: equipType,
      efficiency: efficiency,
      mounts: (data.base || 1) + (retroSlot?.base || 0),
    }
  })
}
