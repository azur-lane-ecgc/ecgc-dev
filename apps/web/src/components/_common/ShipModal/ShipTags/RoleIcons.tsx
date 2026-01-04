export const RoleIcons: { [key: string]: React.JSX.Element } = {
  Bad: (
    <i className="fa-solid fa-trash-arrow-up h-auto text-[28px] text-orange-400" />
  ),
  Meh: <i className="fa-solid fa-recycle h-auto text-[30px] text-cyan-400" />,
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
  FlagPref: (
    <i className="fa-solid fa-flag h-auto text-[25px] text-orange-300" />
  ),
  FlagReq: <i className="fa-solid fa-flag h-auto text-[25px] text-amber-700" />,
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
  OffSupport: (
    <i className="fa-solid fa-sun h-auto text-[27px] text-yellow-500" />
  ),
  DefSupport: (
    <i className="fa-solid fa-moon h-auto text-[27px] text-violet-200" />
  ),
  default: <i className="fa-solid fa-heart h-auto text-[30px] text-red-400" />,
}
