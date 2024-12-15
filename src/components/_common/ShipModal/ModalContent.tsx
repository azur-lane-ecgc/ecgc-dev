import { ModalShipIcon } from "./ModalShipIcon"

interface ModalContentProps {
  ship: string
  isKai?: boolean
  rarity: number
}

export const ModalContent: React.FC<ModalContentProps> = ({
  ship,
  isKai = false,
  rarity,
}) => {
  return (
    <div className="mx-auto text-center">
      <h1 className="mb-0">Unicorn (Retrofit)</h1>
      <a href="https://azurlane.koumakan.jp/wiki/Category:Ships">Base Game</a>

      <ModalShipIcon ship={ship} isKai={isKai} rarity={rarity} />
    </div>
  )
}
