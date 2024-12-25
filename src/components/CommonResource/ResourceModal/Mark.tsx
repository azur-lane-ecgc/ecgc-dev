interface MarkProps {
  mark: "check" | "x" | undefined | null
  className?: string
}

export const Mark: React.FC<MarkProps> = ({ mark, className = "" }) => {
  return (
    <div
      className={`${className} !text-4xl font-bold text-black block ${mark && "group-hover:hidden"}`}
    >
      {mark === "check" ? "\u2713" : "\u2717"}
    </div>
  )
}
