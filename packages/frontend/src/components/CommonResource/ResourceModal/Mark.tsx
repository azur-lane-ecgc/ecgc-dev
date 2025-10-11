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
        ? "absolute left-1 top-0 !text-sm sm:text-base md:!text-lg"
        : "block !text-3xl"
    } font-bold !text-black`}
  >
    {mark?.optimal ? "\u2055" : mark?.mark === "check" ? "\u2713" : "\u2717"}
  </div>
)
