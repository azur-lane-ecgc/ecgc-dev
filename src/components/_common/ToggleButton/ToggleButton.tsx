import { useEffect, useState } from "react"

interface ToggleButtonProps {
  className?: string
  title: string
  options: [
    { title: string; payload: string }, // both
    { title: string; payload: string }, // positive
    { title: string; payload: string }, // negative
  ]
  initialValue?: number
  onSelect: (payload: string) => void
  reset?: any
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  className = "",
  title,
  options,
  initialValue = 0,
  onSelect,
  reset,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialValue)

  useEffect(() => {
    if (!!reset) {
      setSelectedIndex(initialValue)
    }
  }, [reset])

  const handleClick = () => {
    const nextIndex = (selectedIndex + 1) % 3
    setSelectedIndex(nextIndex)
    onSelect(options[nextIndex].payload)
  }

  return (
    <div className={className}>
      <p className="!mb-2 font-bold">{title}</p>
      <button
        className="w-36 rounded-xl border border-green-800 bg-gray-950 px-1 py-2 shadow-lg hover:bg-gray-800 sm:w-40 md:w-48"
        onClick={handleClick}
      >
        <div className="relative flex items-center">
          <div className="absolute -left-2 right-0 text-center font-bold text-orange-400">
            {options[selectedIndex].title}
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="invisible w-full text-center font-bold text-orange-400">
              {options[selectedIndex].title}
            </div>
            <div className="m-0 flex w-10 flex-col items-end justify-center">
              {selectedIndex === 0 ? (
                <span className="text-base text-cyan-400">
                  {"\u2713 \u2717"}
                </span>
              ) : selectedIndex === 1 ? (
                <span className="text-cyan-400">{"\u2713"}</span>
              ) : (
                <span className="text-cyan-400">{"\u2717"}</span>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
