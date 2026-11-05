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

test("assigns low tiers to the eight unranked collaboration ships", () => {
  const ships = [
    "22",
    "33",
    "Kuon",
    "Nekone",
    "Rurutie",
    "Uruuru",
    "Saraana",
    "Fumiruiru",
  ]
  const ehp = Object.fromEntries(
    ships.map((ship) => [ship, [{ name: ship, totalEHP: "200%", std: "0%" }]]),
  )
  const parseRoles = createShipRoleParser(ehp, {}, {}, {}, {})

  for (const ship of ships) {
    expect(parseRoles(ship, "vg", "CA")).toEqual(["Bad"])
    expect(parseRoles(ship, "main", "CV")).toEqual(["Bad"])
  }
})

test("uses published rankings when an assigned low-tier ship receives an entry", () => {
  const ranking: VanguardFleetRankingProps = {
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
  }
  const parseRoles = createShipRoleParser(
    { Kuon: [{ name: "Kuon", totalEHP: "200%", std: "0%" }] },
    {},
    {},
    { Kuon: [ranking] },
    {},
  )

  expect(parseRoles("Kuon", "vg", "CA")).toEqual(["Tank", "SuperTank"])
})

test("uses rating tiers for measured damage and survival without changing source data", () => {
  const rankings: Record<string, VanguardFleetRankingProps[]> =
    Object.fromEntries(
      Array.from({ length: 100 }, (_, index) => [
        `Ship ${index}`,
        [
          {
            hardarbiter: "D",
            cm: "D",
            meta: "D",
            w14mob: "D",
            w14boss: "D",
            w15mob: "D",
            w15boss: "D",
            ex: "D",
            lightdmg: 1000 + index * 10,
            mediumdmg: 1000 + index * 10,
            heavydmg: 1000 + index * 10,
            selfsurvival: 50 + index,
            aoedmg: 0,
          },
        ],
      ]),
    )
  const original = structuredClone(rankings)
  const parseRoles = createShipRoleParser({}, {}, {}, rankings, {})

  expect(parseRoles("Ship 0", "vg", "DD")).toEqual(["Bad"])
  expect(parseRoles("Ship 99", "vg", "DD")).toEqual(["DmgDealer", "TopDmg"])
  expect(rankings).toEqual(original)
})

test("does not treat notes or variant names as ship quality grades", () => {
  const ranking: VanguardFleetRankingProps = {
    notes: "S",
    nameNote: "SS",
    hardarbiter: "D",
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
  }
  const parseRoles = createShipRoleParser(
    {},
    {},
    {},
    { "Test Ship": [ranking] },
    {},
  )

  expect(parseRoles("Test Ship", "vg", "DD")).toEqual(["Bad"])
})
