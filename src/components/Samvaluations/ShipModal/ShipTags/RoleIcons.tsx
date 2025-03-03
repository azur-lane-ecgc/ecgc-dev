export const RoleIcons: { [key: string]: React.JSX.Element } = {
  Healer: <i className="fa-solid fa-heart h-auto text-[30px] text-red-400" />,
  Tank: (
    <i className="fa-solid fa-shield-halved h-auto text-[27px] text-green-600" />
  ),
  SuperTank: (
    <i className="fa-solid fa-shield-halved h-auto text-[27px] text-fuchsia-400" />
  ),
  FastLoad: (
    <i className="fa-solid fa-jet-fighter h-auto text-[25px] text-green-600" />
  ),
  Preload: (
    <i className="fa-solid fa-jet-fighter h-auto text-[25px] text-fuchsia-400" />
  ),
  AA: <i className="fa-solid fa-plane-slash h-auto text-[25px] text-red-300" />,
  AACarry: (
    <i className="fa-solid fa-plane-slash h-auto text-[25px] text-blue-500" />
  ),
  ASW: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/stats/asw.webp"
      alt="icon"
      className="h-auto w-[32px] text-red-300"
    />
  ),
  DmgDealer: (
    <i className="fa-solid fa-shuttle-space h-auto text-[25px] text-orange-400" />
  ),
  TopDmg: (
    <i className="fa-solid fa-shuttle-space h-auto text-[25px] text-orange-700" />
  ),
  default: <i className="fa-solid fa-heart h-auto text-[30px] text-red-400" />,
}
