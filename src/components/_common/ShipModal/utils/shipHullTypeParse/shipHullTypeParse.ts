const hullMap: Record<number, string> = {
  0: "Unknown",
  1: "DD",
  2: "CL",
  3: "CA",
  4: "BC",
  5: "BB",
  6: "CVL",
  7: "CV",
  8: "SS",
  9: "CAV",
  10: "BBV",
  11: "CT",
  12: "AR",
  13: "BM",
  14: "TRP",
  15: "Cargo",
  16: "Bomb",
  17: "SSV",
  18: "CB",
  19: "AE",
  20: "DDGv",
  21: "DDGm",
  22: "IXs",
  23: "IXv",
  24: "IXm",
  25: "Special",
}

export const shipHullTypeParse = (hull: number): string => {
  return hullMap[hull] ?? "Unknown"
}

export const shipFleetTypeParse = (hull: number): "main" | "ss" | "vg" => {
  if ([4, 5, 6, 7, 10, 12, 13, 24].includes(hull)) return "main"
  if ([8, 17, 22].includes(hull)) return "ss"
  return "vg"
}
