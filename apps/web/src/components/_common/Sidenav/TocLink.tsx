interface TocLink {
  id: string
  level: number
  onClick: () => void
  children?: React.ReactNode
}
export const TocLink: React.FC<TocLink> = ({
  id,
  level,
  onClick,
  children,
}) => {
  const TocStyle = (level: number) => {
    switch (level) {
      case 1:
        return "toc_h_one"
      case 2:
        return "toc_h_two"
      default:
        return "toc_h_one"
    }
  }

  return (
    <a
      rel="noopener noreferrer"
      target="_self"
      href={`#${id}`}
      onClick={onClick}
      className={TocStyle(level)}
    >
      {children}
    </a>
  )
}
