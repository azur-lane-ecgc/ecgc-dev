interface ModalShipIconProps {
  ship: string
  isKai?: boolean
  rarity: number
}

export const ModalShipIcon: React.FC<ModalShipIconProps> = ({
  ship,
  isKai,
  rarity,
}) => {
  return (
    <div
      className={`overflow-hidden my-1.5 w-fit p-0.5 shadow-[0_10px_25px_0_rgba(0,0,0,1)] h-auto rarity-${rarity} border-radius-0 
        sm:mx-0 mx-auto`}
    >
      <img
        loading="lazy"
        src={`/test_ecgc_2/images/ship_icons/${isKai ? ship + "Kai" : ship}Icon.png`}
        alt={`${ship}`}
      />
    </div>
  )
}
