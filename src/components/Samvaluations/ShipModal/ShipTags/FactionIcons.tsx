export const FactionIcons: { [key: string]: React.JSX.Element } = {
  Universal: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/0.webp"
      alt="Universal"
      title="Faction: Universal"
      className="w-[32px] h-auto"
    />
  ),
  USS: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/1.webp"
      alt="USS"
      title="Faction: USS"
      className="w-[35px] h-auto"
    />
  ),
  HMS: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/2.webp"
      alt="HMS"
      title="Faction: HMS"
      className="w-[30px] h-auto"
    />
  ),
  IJN: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/3.webp"
      alt="IJN"
      title="Faction: IJN"
      className="w-[40px] h-auto"
    />
  ),
  KMS: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/4.webp"
      alt="KMS"
      title="Faction: KMS"
      className="w-[32px] h-auto"
    />
  ),
  DE: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/5.webp"
      alt="DE"
      title="Faction: DE"
      className="w-[33px] h-auto"
    />
  ),
  RN: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/6.webp"
      alt="RN"
      title="Faction: RN"
      className="w-[40px] h-auto"
    />
  ),
  SN: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/7.webp"
      alt="SN"
      title="Faction: SN"
      className="w-[40px] h-auto"
    />
  ),
  FFNF: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/8.webp"
      alt="FFNF"
      title="Faction: FFNF"
      className="w-[30px] h-auto"
    />
  ),
  MNF: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/9.webp"
      alt="MNF"
      title="Faction: MNF"
      className="w-[30px] h-auto"
    />
  ),
  MOT: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/96.webp"
      alt="MOT"
      title="Faction: MOT"
      className="w-[40px] h-auto !bg-[#fafafa]"
    />
  ),
  META: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/97.webp"
      alt="META"
      title="Faction: META"
      className="w-[37px] h-auto !bg-[#fafafa]"
    />
  ),
  Neptunia: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/101.webp"
      alt="Collab"
      title="Faction: Collab"
      className="w-[40px] h-auto !bg-[#fafafa]"
    />
  ),
  Bilibili: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/102.webp"
      alt="Collab"
      title="Faction: Collab"
      className="w-[40px] h-auto !bg-[#fafafa]"
    />
  ),
  default: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/100.webp"
      alt="Collab"
      title="Faction: Collab"
      className="w-[40px] h-auto !bg-[#fafafa]"
    />
  ),
}

export const getFactionIcon = (key: string): React.JSX.Element => {
  return FactionIcons[key] || FactionIcons.default
}
