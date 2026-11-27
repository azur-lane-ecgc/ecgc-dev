const FactionIcons: { [key: string]: React.JSX.Element } = {
  Universal: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/0.webp"
      alt="Universal"
      title="Faction: Universal"
      className="h-auto w-8"
    />
  ),
  USS: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/1.webp"
      alt="USS"
      title="Faction: USS"
      className="h-auto w-[35px]"
    />
  ),
  HMS: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/2.webp"
      alt="HMS"
      title="Faction: HMS"
      className="h-auto w-7.5"
    />
  ),
  IJN: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/3.webp"
      alt="IJN"
      title="Faction: IJN"
      className="h-auto w-10"
    />
  ),
  KMS: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/4.webp"
      alt="KMS"
      title="Faction: KMS"
      className="h-auto w-8"
    />
  ),
  DE: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/5.webp"
      alt="DE"
      title="Faction: DE"
      className="h-auto w-8.25"
    />
  ),
  RN: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/6.webp"
      alt="RN"
      title="Faction: RN"
      className="h-auto w-10"
    />
  ),
  SN: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/7.webp"
      alt="SN"
      title="Faction: SN"
      className="h-auto w-10"
    />
  ),
  FFNF: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/8.webp"
      alt="FFNF"
      title="Faction: FFNF"
      className="h-auto w-7.5"
    />
  ),
  MNF: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/9.webp"
      alt="MNF"
      title="Faction: MNF"
      className="h-auto w-7.5"
    />
  ),
  HNLMS: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/11.webp"
      alt="HNLMS"
      title="Faction: HNLMS"
      className="h-auto w-7.5"
    />
  ),
  MOT: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/96.webp"
      alt="MOT"
      title="Faction: MOT"
      className="h-auto w-10 bg-[#fafafa]!"
    />
  ),
  META: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/97.webp"
      alt="META"
      title="Faction: META"
      className="h-auto w-9.25 bg-[#fafafa]!"
    />
  ),
  Neptunia: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/101.webp"
      alt="Collab"
      title="Faction: Collab"
      className="h-auto w-10 bg-[#fafafa]!"
    />
  ),
  Bilibili: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/102.webp"
      alt="Collab"
      title="Faction: Collab"
      className="h-auto w-10 bg-[#fafafa]!"
    />
  ),
  default: (
    <img
      loading="lazy"
      src="https://al.mrlar.dev/icons/nation/100.webp"
      alt="Collab"
      title="Faction: Collab"
      className="h-auto w-10 bg-[#fafafa]!"
    />
  ),
}

export const getFactionIcon = (key: string): React.JSX.Element => {
  return FactionIcons[key] || FactionIcons.default
}
