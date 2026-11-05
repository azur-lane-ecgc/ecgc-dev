/// <reference types="bun" />

import { expect, test } from "bun:test"

import {
  createDamageRankScales,
  createSurvivalRankScale,
  formatRankValue,
  getHighestValue,
  getRankingTier,
  hasLowTierFallback,
  rankingTypes,
} from "./rankings"

const createRankedShips = () =>
  Object.fromEntries(
    Array.from({ length: 1000 }, (_, index) => [
      `Ship ${index}`,
      [{ lightdmg: index + 1, mediumdmg: index + 1, heavydmg: index + 1 }],
    ]),
  )

test("retains the historical lowest-tier share and expands higher tiers", () => {
  const ships = createRankedShips()
  const scale = createDamageRankScales(ships, "vg").lightdmg
  const counts = [0, 0, 0, 0, 0]

  for (const variants of Object.values(ships)) {
    const tier = getRankingTier(variants[0]!.lightdmg, scale)
    counts[tier - 1]!++
  }

  expect(counts).toEqual([709, 135, 94, 36, 26])
})

test("counts each ship once regardless of its number of variants", () => {
  const ships = createRankedShips()
  const originalScales = createDamageRankScales(ships, "vg")
  ships["Ship 999"] = Array.from({ length: 100 }, () => ({
    lightdmg: 1000,
    mediumdmg: 1000,
    heavydmg: 1000,
  }))

  expect(createDamageRankScales(ships, "vg")).toEqual(originalScales)
})

test("keeps equal values together and does not promote an all-tied population", () => {
  const ships = {
    First: [{ lightdmg: 500, mediumdmg: 500, heavydmg: 500 }],
    Second: [{ lightdmg: 500, mediumdmg: 500, heavydmg: 500 }],
  }
  const scale = createDamageRankScales(ships, "vg").lightdmg

  expect(getRankingTier(500, scale)).toBe(1)
  expect(getRankingTier(500, scale)).toBe(1)
  expect(getRankingTier(null, scale)).toBe(0)
  expect(getRankingTier(Number.NaN, scale)).toBe(0)
  expect(getRankingTier(0, scale)).toBe(0)
})

test("uses separate historical populations for each fleet and armor type", () => {
  const ships = createRankedShips()
  const main = createDamageRankScales(ships, "main")
  const vanguard = createDamageRankScales(ships, "vg")

  expect(main.lightdmg).not.toEqual(vanguard.lightdmg)
  expect(vanguard.lightdmg).not.toEqual(vanguard.heavydmg)
})

test("preserves the submarine sheet's ordinal damage scores", () => {
  const scales = createDamageRankScales({}, "ss")

  for (let score = 1; score <= 7; score++) {
    expect(getRankingTier(score, scales.lightdmg)).toBe(score)
  }
  expect(formatRankValue(7, "Heavy DMG", scales)).toBe("SS")
})

test("converts measured vanguard survival to the historical rating range", () => {
  const ships = Object.fromEntries(
    Array.from({ length: 1000 }, (_, index) => [
      `Ship ${index}`,
      [{ selfsurvival: index + 1 }],
    ]),
  )
  const scale = createSurvivalRankScale(ships)

  expect(getRankingTier(50, scale)).toBe(1)
  expect(getRankingTier(1000, scale)).toBe(5)
})

test("shows assigned D tiers for the eight missing collaboration ships", () => {
  const scales = createDamageRankScales(createRankedShips(), "vg")
  for (const ship of [
    "22",
    "33",
    "Kuon",
    "Nekone",
    "Rurutie",
    "Uruuru",
    "Saraana",
    "Fumiruiru",
  ]) {
    expect(hasLowTierFallback(ship)).toBe(true)
    for (const value of Object.keys(rankingTypes)) {
      const ranking = getHighestValue(
        "vg",
        { mfRankings: null, vgRankings: null, ssRankings: null },
        { value },
      )
      expect(formatRankValue(ranking, value, scales)).toBe("D")
    }
  }
  expect(hasLowTierFallback("Unknown future ship")).toBe(false)
})
