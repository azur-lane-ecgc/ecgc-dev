export const RoleIcons: { [key: string]: React.JSX.Element } = {
  Healer: <i className="fa-solid fa-heart text-red-400 text-[30px] h-auto" />,
  Tank: (
    <i className="fa-solid fa-shield-halved text-green-600 text-[27px] h-auto" />
  ),
  SuperTank: (
    <i className="fa-solid fa-shield-halved text-fuchsia-400 text-[27px] h-auto" />
  ),
  FastLoad: (
    <i className="fa-solid fa-jet-fighter text-green-600 text-[25px] h-auto" />
  ),
  Preload: (
    <i className="fa-solid fa-jet-fighter text-fuchsia-400 text-[25px] h-auto" />
  ),
  AA: <i className="fa-solid fa-plane-slash text-red-300 text-[25px] h-auto" />,
  AACarry: (
    <i className="fa-solid fa-plane-slash text-blue-500 text-[25px] h-auto" />
  ),
  ASW: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/stats/asw.webp"
      alt="icon"
      className="w-[32px] h-auto text-red-300"
    />
  ),
  default: <i className="fa-solid fa-heart text-red-400 text-[30px] h-auto" />,
}
