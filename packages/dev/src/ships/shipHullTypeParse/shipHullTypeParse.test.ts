import { expect, test } from "bun:test"

import { shipFleetTypeParse, shipHullTypeParse } from "./shipHullTypeParse"

test.each([
  [8, "SS", "ss"],
  [17, "SSV", "ss"],
  [22, "IXs", "ss"],
  [23, "IXv", "vg"],
  [24, "IXm", "main"],
] as const)(
  "groups hull %i (%s) with the %s fleet for ranking comparisons",
  (hull, hullType, fleetType) => {
    expect(shipHullTypeParse(hull)).toBe(hullType)
    expect(shipFleetTypeParse(hull)).toBe(fleetType)
  },
)
