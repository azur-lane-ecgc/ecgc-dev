import type { ResourceProps } from "./types"

import CoinData from "./coin"
import OilData from "./oil"
import CoreData from "./coreData"
import GuildTokenData from "./guildToken"
import CrystalFragmentData from "./crystalFragment"
import PrototypeCoreData from "./protocore"
import WisdomCubeData from "./cube"

import T1EXPDataPackData from "./t1exp"
import HEPData from "./hep"

import CognitiveChipData from "./cogchip"
import CognitiveArrayData from "./cogarray"

import UniversalBulinData from "./purplebulin"
import PrototypeBulinData from "./goldbulin"
import SpecializedBulinData from "./rainbowbulin"

import T1PlateData from "./t1plate"
import T2PlateData from "./t2plate"
import T3PlateData from "./t3plate"
import T4PlateData from "./t4plate"

import AugmentModuleCoreData from "./augmentcore"
import AugmentModuleEXPData from "./augmentmodulestone"
import T1AugmentConversionData from "./t1augconversion"
import T2AugmentConversionData from "./t2augconversion"

import T1RetrofitPrintData from "./t1retrofit"
import T2RetrofitPrintData from "./t2retrofit"
import T3RetrofitPrintData from "./t3retrofit"

import T1SkillBookData from "./t1skillbook"
import T2SkillBookData from "./t2skillbook"
import T3SkillBookData from "./t3skillbook"
import T4SkillBookData from "./t4skillbook"

import GemData from "./gem"

export const InfiniteResourceData: ResourceProps[] = [
  CoinData,
  OilData,
  CoreData,
  GuildTokenData,
  CrystalFragmentData,
  PrototypeCoreData,
  WisdomCubeData,
  T1EXPDataPackData,
  HEPData,
  CognitiveChipData,
  CognitiveArrayData,
  UniversalBulinData,
  PrototypeBulinData,
  SpecializedBulinData,
  T1PlateData,
  T2PlateData,
  T3PlateData,
  T4PlateData,
  AugmentModuleCoreData,
  AugmentModuleEXPData,
  T1AugmentConversionData,
  T2AugmentConversionData,
  T1RetrofitPrintData,
  T2RetrofitPrintData,
  T3RetrofitPrintData,
  T1SkillBookData,
  T2SkillBookData,
  T3SkillBookData,
  T4SkillBookData,
]

export const FiniteResourceData: ResourceProps[] = [GemData]
