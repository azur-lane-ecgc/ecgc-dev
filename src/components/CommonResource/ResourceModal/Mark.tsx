interface MarkProps {
  mark: "check" | "x" | undefined | null
  className?: string
}

export const Mark: React.FC<MarkProps> = ({ mark, className = "" }) => (
  <div
    className={`${className} ${
      mark
        ? "absolute top-0 left-1 !text-base sm:text-lg md:!text-xl"
        : "!text-4xl block"
    } font-bold text-black`}
  >
    {mark === "check" ? "\u2713" : "\u2717"}
  </div>
)
