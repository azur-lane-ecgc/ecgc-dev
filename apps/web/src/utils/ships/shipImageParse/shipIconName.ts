/** Builds the canonical Samvaluation ship icon name for a base or retrofit ship. */
export const getShipIconName = (ship: string, isKai?: boolean): string =>
  `${decodeURIComponent(ship)}${isKai ? "Kai" : ""}Icon`.normalize("NFC")
