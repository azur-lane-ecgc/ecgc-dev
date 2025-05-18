import { readFile, writeFile } from "fs/promises"

import type { ShipData } from "@ALData/types/ships"
import type { Barrage } from "@ALData/types/barrages"
import type { AugmentData } from "@ALData/types/augments"

type EnhancedBarrageData = {
  barrages: Barrage[]
  ships: string[]
}

// ————————————————————————————————————————————————
// 1) Gather and write enhanced barrages.json
// ————————————————————————————————————————————————
const createJSON = async (): Promise<void> => {
  const ships: Record<number, ShipData> = (await import(
    "@ALData/data/ships.json"
  ).then((m) => m.default)) as Record<number, ShipData>

  const barrages: Record<number, Barrage[]> = (await import(
    "@ALData/data/barrages.json"
  ).then((m) => m.default)) as Record<number, Barrage[]>

  const augments: Record<number, AugmentData> = (await import(
    "@ALData/data/augments.json"
  ).then((m) => m.default)) as Record<number, AugmentData>

  const allSkillIds = new Set<number>()
  const skillToShips: Record<number, Set<string>> = {}

  const addSkillAndShip = (id: number, shipName: string) => {
    allSkillIds.add(id)
    skillToShips[id] = skillToShips[id] || new Set()
    skillToShips[id].add(shipName)
  }

  Object.values(ships).forEach((ship) => {
    ship.skills.flat().forEach((id) => addSkillAndShip(id, ship.name))
    ship.retro?.skills.forEach(
      (skill) => skill.with && addSkillAndShip(skill.with, ship.name),
    )
    ship.research?.forEach((lvl) =>
      lvl.fate?.skills.forEach(
        (skill) => skill.with && addSkillAndShip(skill.with, ship.name),
      ),
    )
    if (ship.unique_aug) {
      const augment = augments[ship.unique_aug]
      augment?.skill_upgrades?.forEach((upgrade) => {
        if (upgrade.with) {
          addSkillAndShip(upgrade.with, ship.name)
        }
      })
    }
  })

  const result: Record<number, EnhancedBarrageData> = Array.from(
    allSkillIds,
  ).reduce(
    (acc, id) => {
      const arr = barrages[id]
      if (arr) {
        acc[id] = {
          barrages: arr,
          ships: Array.from(skillToShips[id] || []).sort(),
        }
      }
      return acc
    },
    {} as Record<number, EnhancedBarrageData>,
  )

  // ————————————————————————————————————————————————
  // 1.5) Move trailing "(…)" onto its own line within the name
  // ————————————————————————————————————————————————
  Object.values(result).forEach(({ barrages }) => {
    barrages.forEach((barrage) => {
      barrage.name = barrage.name.replace(
        /\s*\(([^)]+)\)$/,
        (_match, p1) => `\n(${p1})`,
      )
    })
  })

  await writeFile(
    "dev_tools/barrage/barrages.json",
    JSON.stringify(result, null, 2),
    "utf-8",
  )
  console.log(
    `barrages.json written with ${Object.keys(result).length} entries.`,
  )
}

// ————————————————————————————————————————————————
// 2) Convert that JSON to a Lua module
// ————————————————————————————————————————————————
const luaConvert = async (
  inputPath: string,
  outputPath: string,
): Promise<void> => {
  // Helpers
  const isValidLuaId = (k: string) => /^[A-Za-z_]\w*$/.test(k)
  const escapeStr = (s: string) =>
    `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`

  const toLua = (v: any, indent = ""): string => {
    if (Array.isArray(v)) {
      if (!v.length) return "{}"
      return `{ ${v.map((x) => toLua(x, indent)).join(", ")} }`
    }
    if (v && typeof v === "object") {
      const entries = Object.entries(v)
      if (!entries.length) return "{}"
      const lines = entries.map(([k, val]) => {
        const key = isValidLuaId(k) ? k : `["${k}"]`
        return `${indent}  ${key} = ${toLua(val, indent + "  ")}`
      })
      return `{\n${lines.join(",\n")}\n${indent}}`
    }
    switch (typeof v) {
      case "string":
        return escapeStr(v)
      case "number":
      case "boolean":
        return String(v)
      default:
        return "nil"
    }
  }

  // Read JSON
  const jsonText = await readFile(inputPath, "utf-8")
  const data = JSON.parse(jsonText)

  // Convert & wrap
  const luaBody = toLua(data)
  const out = `local p = ${luaBody}\n\nreturn p\n`

  // Write Lua file
  await writeFile(outputPath, out, "utf-8")
  console.log(`Lua module written to ${outputPath}`)
}

// ————————————————————————————————————————————————
// Run both in sequence
// ————————————————————————————————————————————————
createJSON()
  .then(() =>
    luaConvert("dev_tools/barrage/barrages.json", "dev_tools/barrage/data.lua"),
  )
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
