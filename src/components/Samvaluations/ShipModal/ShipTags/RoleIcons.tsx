export const RoleIcons: { [key: string]: React.JSX.Element } = {
  Healer: (
    <i className="fa-solid fa-heart text-red-400 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
  Tank: (
    <i className="fa-solid fa-shield-halved text-green-600 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
  SuperTank: (
    <i className="fa-solid fa-shield-halved text-fuchsia-400 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
  FastLoad: (
    <i className="fa-solid fa-jet-fighter text-green-600 text-[25px] w-full h-auto md:translate-y-[10px] md:translate-x-[9px]" />
  ),
  Preload: (
    <i className="fa-solid fa-jet-fighter text-fuchsia-400 text-[25px] w-full h-auto md:translate-y-[10px] md:translate-x-[9px]" />
  ),
  AA: (
    <i className="fa-solid fa-plane-slash text-red-300 text-[25px] w-full h-auto md:translate-y-[10px] md:translate-x-[9px]" />
  ),
  default: (
    <i className="fa-solid fa-heart text-red-400 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
}
