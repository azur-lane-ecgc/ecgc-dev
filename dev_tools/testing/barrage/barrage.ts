import { readFile, writeFile } from "fs/promises"

import type { ShipData } from "@ALData/types/ships"
import type { Barrage } from "@ALData/types/barrages"
import type { AugmentData } from "@ALData/types/augments"
import type { EquipmentData } from "@ALData/types/equipments"

type EnhancedBarrageData = {
  barrages: Barrage[]
  ships?: string[]
  equips?: string[]
}

// ————————————————————————————————————————————————
// 1) Gather and write enhanced barrages.json (SHIP barrages)
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

  const result: Record<number, EnhancedBarrageData> = {}
  for (const id of allSkillIds) {
    const arr = barrages[id]
    if (arr) {
      result[id] = {
        barrages: arr.map((b) => ({
          ...b,
          name: b.name.replace(/\s*\(([^)]+)\)$/, (_m, p1) => `\n(${p1})`),
        })),
        ships: Array.from(skillToShips[id] || []).sort(),
      }
    }
  }

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
// 2) Write enhanced barrages2.json (EQUIP + AUGMENT barrages)
// ————————————————————————————————————————————————
const createEquipAndAugBarrageJSON = async (): Promise<void> => {
  const barrages: Record<number, Barrage[]> = (await import(
    "@ALData/data/barrages.json"
  ).then((m) => m.default)) as Record<number, Barrage[]>

  const augments: Record<number, AugmentData> = (await import(
    "@ALData/data/augments.json"
  ).then((m) => m.default)) as Record<number, AugmentData>

  const equips: Record<number, EquipmentData> = (await import(
    "@ALData/data/equipments.json"
  ).then((m) => m.default)) as Record<number, EquipmentData>

  const allSkillIds = new Set<number>()
  const skillToItems: Record<number, Set<string>> = {}

  const addSkillAndItem = (id: number, itemName: string) => {
    allSkillIds.add(id)
    skillToItems[id] = skillToItems[id] || new Set()
    skillToItems[id].add(itemName)
  }

  for (const equip of Object.values(equips)) {
    equip.skills?.forEach((id) => addSkillAndItem(id, equip.name))
  }

  for (const augment of Object.values(augments)) {
    augment.skills?.forEach((id) => addSkillAndItem(id, augment.name))
  }

  const result: Record<number, EnhancedBarrageData> = {}
  for (const id of allSkillIds) {
    const arr = barrages[id]
    if (arr) {
      result[id] = {
        barrages: arr.map((b) => ({
          ...b,
          name: b.name.replace(/\s*\(([^)]+)\)$/, (_m, p1) => `\n(${p1})`),
        })),
        equips: Array.from(skillToItems[id]).sort(),
      }
    }
  }

  await writeFile(
    "dev_tools/barrage/barrages2.json",
    JSON.stringify(result, null, 2),
    "utf-8",
  )
  console.log(
    `barrages2.json written with ${Object.keys(result).length} entries.`,
  )
}

// ————————————————————————————————————————————————
// NEW: Overwrite aim_type in barrages2.json (equip/augment) too
// ————————————————————————————————————————————————
async function applyTargettingToAll(): Promise<void> {
  // load scraped data
  const scrapedRaw = await readFile("dev_tools/barrage/barrages3.json", "utf-8")
  const scraped: Record<
    number,
    Array<{
      parts: Array<{ damage: number; count: number; targetting: number }>
    }>
  > = JSON.parse(scrapedRaw)

  // helper to patch one JSON file
  async function patchFile(path: string) {
    const raw = await readFile(path, "utf-8")
    const data: Record<number, EnhancedBarrageData> = JSON.parse(raw)

    for (const [sidStr, entry] of Object.entries(data)) {
      const sid = Number(sidStr)
      const exact = scraped[sid]
      const fallback = scraped[Math.floor(sid / 10) * 10]
      const variants = exact ?? fallback ?? []

      entry.barrages.forEach((variant, vi) => {
        const sv = variants[vi]
        if (!sv || sv.parts.length !== variant.parts.length) return
        variant.parts.forEach((part, pi) => {
          const sp = sv.parts.find(
            (s) => s.damage === part.damage && s.count === part.count,
          )
          //@ts-ignore
          part.aim_type = sp?.targetting ?? 0
        })
      })
    }

    await writeFile(path, JSON.stringify(data, null, 2), "utf-8")
    console.log(`Patched targetting in ${path}`)
  }

  // patch both files
  await patchFile("dev_tools/barrage/barrages.json")
  await patchFile("dev_tools/barrage/barrages2.json")
}

// ————————————————————————————————————————————————
// 3) Convert JSON to Lua module
// ————————————————————————————————————————————————
const luaConvert = async (
  inputPath: string,
  outputPath: string,
): Promise<void> => {
  const isValidLuaId = (k: string) => /^[A-Za-z_]\w*$/.test(k)
  const escapeStr = (s: string) =>
    `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`

  const toLua = (v: any, indent = ""): string => {
    if (Array.isArray(v)) {
      return v.length
        ? `{ ${v.map((x) => toLua(x, indent)).join(", ")} }`
        : "{}"
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

  const jsonText = await readFile(inputPath, "utf-8")
  const data = JSON.parse(jsonText)
  const luaBody = toLua(data)
  const out = `local p = ${luaBody}\n\nreturn p\n`

  await writeFile(outputPath, out, "utf-8")
  console.log(`Lua module written to ${outputPath}`)
}

// ————————————————————————————————————————————————
// 4) Run both sets of conversions in order
// ————————————————————————————————————————————————
const main = async () => {
  try {
    await createJSON()
    await createEquipAndAugBarrageJSON()
    await applyTargettingToAll()

    await luaConvert(
      "dev_tools/barrage/barrages.json",
      "dev_tools/barrage/data.lua",
    )
    await luaConvert(
      "dev_tools/barrage/barrages2.json",
      "dev_tools/barrage/data2.lua",
    )

    console.log("All barrage data written successfully.")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
