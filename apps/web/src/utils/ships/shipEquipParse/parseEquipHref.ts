export const parseEquipHref = (
  hull_type: string,
  equipment_type: string,
): string => {
  const normalizedEquipType = equipment_type
    .toLowerCase()
    .replace("main gun", "gun")

  const normalizedHullType = hull_type.toLowerCase()

  const isMainFleet = ["bb", "bc", "bbv", "cv", "cvl"].includes(
    normalizedHullType,
  )

  switch (normalizedEquipType) {
    // main guns
    case "dd gun":
      return isMainFleet ? "main_fleet_secondary_guns" : "dd_guns"
    case "cl gun":
      return isMainFleet ? "main_fleet_secondary_guns" : "cl_guns"
    case "ca gun":
      return "ca_guns"
    case "cb gun":
      return "cb_guns"
    case "bb gun":
      return "bb_guns"

    // torps
    case "surface torpedo":
    case "torpedo":
      return "surface_torpedoes"
    case "missile":
      return "surface_torpedoes"
    case "sub torpedo":
      return "ss_torpedo"

    // aa guns
    case "timed fuze aa gun":
    case "fuze aa gun":
    case "aa gun":
    case "aa gun (normal)":
      return "aa_guns"

    // planes
    case "fighter":
      return "fighters"
    case "torpedo bomber":
      return "torpedo_bombers"
    case "dive bomber":
      return "dive_bombers"

    // auxes
    case "auxiliary":
      switch (normalizedHullType) {
        case "bb":
        case "bc":
        case "bbv":
          return "bb_auxiliary"
        case "cv":
        case "cvl":
          return "cv_auxiliary"
        case "ca":
        case "cb":
        case "cl":
          return "cruiser_auxiliary"
        case "dd":
          return "dd_auxiliary"
        case "ss":
          return "ss_auxiliary"
        case "ix":
        case "ixm":
        case "ixv":
        case "ixs":
          return "ix_auxiliary"
        case "ae":
          return "ae_auxiliary"
        case "ar":
          return "ar_auxiliary"
        default:
          return ""
      }
    case "cargo":
      return "ae_auxiliary"

    // misc
    case "seaplane":
      return "recon_planes"

    // asw
    case "asw equipment":
    case "depth charge":
    case "asw bomber":
    case "asw plane":
    case "asw heli":
    case "asw helicopter":
      return "asw_equipment"

    default:
      return ""
  }
}
