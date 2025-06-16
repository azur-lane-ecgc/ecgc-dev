// import type { ShipCellProps } from "./ShipCell"

// import "./styles.css"

// export const ShipCellNoLink: React.FC<ShipCellProps> = ({
//   ship = "",
//   isKai = false,
//   rarity = 1,
// }) => {
//   const shipImg = `ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`
//   const shipCell = (
//     <div
//       className={`border border-gray-400 modifiedShipRowCell text-center cursor-pointer`}
//     >
//       <div className="relative">
//         <div className="fake-modal-link">
//           <div className={`icon rarity-${rarity} border-radius-0`}>
//             <img
//               loading="lazy"
//               src={`/images/${shipImg}`}
//               alt={`${ship}`}
//             />
//           </div>
//           {`${ship} ${isKai ? "(Retrofit)" : ""}`}
//         </div>
//       </div>
//     </div>
//   )

//   return <div className="flex justify-center ships-center">{shipCell}</div>
// }
