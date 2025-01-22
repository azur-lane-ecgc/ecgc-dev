export const RoleIcons: { [key: string]: React.JSX.Element } = {
  Healer: (
    <i className="fa-solid fa-heart text-red-400 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
  Tank: (
    <i className="fa-solid fa-shield-halved text-green-600 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
  SuperTank: (
    <i className="fa-solid fa-shield text-green-600 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
  default: (
    <i className="fa-solid fa-heart text-red-400 text-[30px] w-full h-auto md:translate-y-2 md:translate-x-2" />
  ),
}
