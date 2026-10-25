import { expect, test } from "bun:test"

import type { VanguardFleetRankingProps } from "@/db/types"

import { createShipRoleParser } from "./shipRoleParse"

test("keeps ship role data scoped to one processing run", () => {
  const rankings: Record<string, VanguardFleetRankingProps[]> = {
    "Test Ship": [
      {
        hardarbiter: "S",
        cm: "D",
        meta: "D",
        w14mob: "D",
        w14boss: "D",
        w15mob: "D",
        w15boss: "D",
        ex: "D",
        lightdmg: 0,
        mediumdmg: 0,
        heavydmg: 0,
        aoedmg: 0,
      },
    ],
  }
  const parseTankRoles = createShipRoleParser(
    { "Test Ship": [{ name: "Test Ship", totalEHP: "100%", std: "0%" }] },
    {},
    {},
    rankings,
    {},
  )
  const parseOtherRoles = createShipRoleParser({}, {}, {}, rankings, {})

  expect(parseTankRoles("Test Ship", "vg", "CA")).toEqual(["Tank", "SuperTank"])
  expect(parseOtherRoles("Test Ship", "vg", "CA")).toEqual(["Meh"])
  expect(parseTankRoles("Test Ship", "vg", "CA")).toEqual(["Tank", "SuperTank"])
})
