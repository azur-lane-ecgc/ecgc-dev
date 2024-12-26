interface MarkProps {
  mark?: {
    mark: "check" | "x" | undefined | null
    color: "red" | "green" | "sand"
  }
  className?: string
}

export const Mark: React.FC<MarkProps> = ({ mark, className = "" }) => {
  if (mark === undefined || mark === null) {
    return (
      <div className={`${className} !text-4xl font-bold text-black block`}>
        {"\u2717"}
      </div>
    )
  }

  return (
    <div className={`${className} !text-4xl font-bold text-black hidden`}>
      {mark.mark === "check" ? "\u2713" : "\u2717"}
    </div>
  )
}
