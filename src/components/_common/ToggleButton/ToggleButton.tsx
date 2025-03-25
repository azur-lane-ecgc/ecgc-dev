interface ToggleButtonProps {
  className?: string
  title: string
  options: [string, string, string]
  value: string
  onSelect: (value: string) => void
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  className = "",
  title,
  options,
  value,
  onSelect,
}) => {
  const nextValue =
    value === options[0]
      ? options[1]
      : value === options[1]
        ? options[2]
        : options[0]

  return (
    <div className={className}>
      <p className="!mb-2 font-bold">{title}</p>
      <button
        className="w-32 rounded-xl border border-green-800 bg-gray-950 px-1 py-2 shadow-lg hover:bg-gray-800 sm:w-40 md:w-48"
        onClick={() => onSelect(nextValue)}
      >
        <div className="relative flex items-center">
          <div className="absolute -left-2 right-0 text-center font-bold text-orange-400">
            {value}
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="invisible w-full text-center font-bold text-orange-400">
              {value}
            </div>
            <div className="m-0 flex w-10 flex-col items-end justify-center">
              {value === options[0] ? (
                <span className="text-base text-cyan-400">
                  {"\u2713 \u2717"}
                </span>
              ) : value === options[1] ? (
                <span className="text-cyan-400">{"\u2717"}</span>
              ) : (
                <span className="text-cyan-400">{"\u2713"}</span>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
