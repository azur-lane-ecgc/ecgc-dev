export const parseEquipHref = (
  hull_type: string,
  equipment_type: string,
): string => {
  const normalizedEquipType = equipment_type
    .toLowerCase()
    .replace("main gun", "gun")

  switch (normalizedEquipType) {
    case "dd gun":
      return "dd_guns"
    case "cl gun":
      return "cl_guns"
    case "ca gun":
      return "ca_guns"
    case "bb gun":
      return "bb_guns"

    case "surface torpedo":
      return "surface_torpedoes"
    case "torpedo":
      return "surface_torpedoes"

    case "timed fuze aa gun":
      return "aa_guns"
    case "fuze aa gun":
      return "aa_guns"
    case "aa gun":
      return "aa_guns"
    case "aa gun (normal)":
      return "aa_guns"

    case "fighter":
      return "fighters"
    case "torpedo bomber":
      return "torpedo_bombers"
    case "dive bomber":
      return "dive_bombers"

    case "auxiliary":
      switch (hull_type.toLowerCase()) {
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
          return "ix_auxiliary"
        case "ae":
          return "ae_auxiliary"
        case "ar":
          return "ar_auxiliary"
        default:
          return ""
      }
    case "cb gun":
      return "cb_guns"
    case "seaplane":
      return "recon_planes"
    case "sub torpedo":
      return "ss_torpedo"

    case "asw equipment":
      return "asw_equipment"
    case "depth charge":
      return "asw_equipment"
    case "asw bomber":
      return "asw_equipment"
    case "asw plane":
      return "asw_equipment"
    case "asw heli":
      return "asw_equipment"
    case "asw helicopter":
      return "asw_equipment"

    case "cargo":
      return "ae_auxiliary"

    case "missile":
      return "surface_torpedoes"

    default:
      return ""
  }
}
