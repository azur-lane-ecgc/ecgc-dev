import { writeFile } from "fs/promises"

import type { ShipData } from "@ALData/types/ships"
import type { Barrage } from "@ALData/types/barrages"

const ships: Record<number, ShipData> = (await import(
  "@ALData/data/ships.json"
).then((module) => module.default)) as Record<number, ShipData>

const barrages: Record<number, Barrage[]> = (await import(
  "@ALData/data/barrages.json"
).then((module) => module.default)) as Record<number, Barrage[]>

// Define our enhanced structure that includes ships
interface EnhancedBarrageData {
  barrages: Barrage[]
  ships: string[]
}

const main = async (): Promise<void> => {
  const allSkillIds = new Set<number>()

  // Create a mapping from skill IDs to ship names
  const skillToShips: Record<number, Set<string>> = {}

  // Helper function to add skill ID and ship name to our tracking
  const addSkillAndShip = (id: number, shipName: string) => {
    allSkillIds.add(id)

    if (!skillToShips[id]) {
      skillToShips[id] = new Set<string>()
    }

    skillToShips[id].add(shipName)
  }

  // Populate the mapping and collect all skill IDs
  Object.values(ships).forEach((ship) => {
    // Process main skills
    ship.skills.flat().forEach((id) => {
      addSkillAndShip(id, ship.name)
    })

    // Process retrofit skills if they exist
    if (ship.retro && ship.retro.skills) {
      ship.retro.skills.forEach((skill) => {
        if (skill.with) {
          addSkillAndShip(skill.with, ship.name)
        }
      })
    }

    // Process fate simulation skills if they exist
    // These are nested inside the research array
    if (ship.research) {
      ship.research.forEach((researchLevel) => {
        if (researchLevel && researchLevel.fate && researchLevel.fate.skills) {
          researchLevel.fate.skills.forEach((skill) => {
            if (skill.with) {
              addSkillAndShip(skill.with, ship.name)
            }
          })
        }
      })
    }
  })

  // Create the enhanced barrage data with ship names
  const result = Array.from(allSkillIds).reduce<
    Record<number, EnhancedBarrageData>
  >((acc, id) => {
    const barrageArray = barrages[id]
    if (barrageArray) {
      // Create the new structure with barrages array and ships array
      acc[id] = {
        barrages: barrageArray,
        ships: Array.from(skillToShips[id] || new Set()),
      }
    }
    return acc
  }, {})

  await writeFile(
    "dev_tools/barrage/barrages.json",
    JSON.stringify(result, null, 2),
    "utf-8",
  )
  console.log(
    `barrages.json written with ${Object.keys(result).length} entries.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
