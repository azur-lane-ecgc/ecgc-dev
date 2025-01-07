// export const parseFleetKey = (
//   fleetKey: string,
// ): { shipName: string; nameNote: string } => {
//   const exceptions = [
//     "Neptune (Neptunia)",
//     "Enterprise (Royal Navy)",
//     "Kasumi (Venus Vacation)",
//     "Fubuki (Senran Kagura)",
//     "Kaga(BB)",
//     "Amagi(CV)",
//   ]

//   for (const exception of exceptions) {
//     if (fleetKey.startsWith(exception)) {
//       return {
//         shipName: exception,
//         nameNote: fleetKey
//           .slice(exception.length)
//           .trim()
//           .replace(/^\(|\)$/g, ""),
//       }
//     }
//   }

//   const match = fleetKey.match(/^(.*?)\s*\((.*?)\)$/)
//   return match
//     ? { shipName: match[1].trim(), nameNote: match[2].trim() }
//     : { shipName: fleetKey.trim(), nameNote: "Base" }
// }
