interface MarkProps {
  mark?: {
    color: "red" | "green" | "sand" | "optimal"
    mark: "check" | "x"
    optimal?: boolean
  }
  className?: string
}

export const Mark: React.FC<MarkProps> = ({ mark, className = "" }) => (
  <div
    className={`${className} ${
      !!mark
        ? "absolute top-0 left-1 !text-base sm:text-lg md:!text-xl"
        : "!text-3xl block"
    } font-bold ${mark?.optimal ? "!text-emerald-700" : "!text-black"}`}
  >
    {mark?.mark === "check" ? "\u2713" : "\u2717"}
  </div>
)
