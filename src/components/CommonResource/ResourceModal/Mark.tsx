interface MarkProps {
  mark: "check" | "x" | undefined | null
  className?: string
}

export const Mark: React.FC<MarkProps> = ({ mark, className = "" }) => {
  return (
    <div className={`${className}`}>
      {mark === "check" ? "\u2714" : "\u274C"}
    </div>
  )
}
