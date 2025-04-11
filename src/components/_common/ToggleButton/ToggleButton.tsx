import { useEffect, useState } from "react"

export interface Option {
  title: string
  payload: string
  symbol?: string
}

interface ToggleButtonProps {
  className?: string
  title: string
  options: Option[]
  initialValue?: number
  onSelect: (payload: string) => void
  reset?: any
}

const getDefaultSymbol = (index: number, optionsCount: number): string => {
  if (optionsCount === 2) {
    return index === 0 ? "\u2713" : "\u2717"
  } else if (optionsCount === 3) {
    return index === 0 ? "\u2713 \u2717" : index === 1 ? "\u2713" : "\u2717"
  }
  return ""
}

// base toggle button
const ToggleButton: React.FC<ToggleButtonProps> = ({
  className = "",
  title,
  options,
  initialValue = 0,
  onSelect,
  reset,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialValue)
  const optionsCount = options.length

  useEffect(() => {
    if (!!reset) {
      setSelectedIndex(initialValue)
    }
  }, [reset, initialValue])

  const handleClick = () => {
    const nextIndex = (selectedIndex + 1) % optionsCount
    setSelectedIndex(nextIndex)
    onSelect(options[nextIndex].payload)
  }

  const getSymbol = (index: number): string => {
    const option = options[index]
    return option.symbol ?? getDefaultSymbol(index, optionsCount)
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
              {/* invisible so takes up space */}
              {options[selectedIndex].title}
            </div>
            <div className="m-0 flex w-10 flex-col items-end justify-center">
              <span className="text-cyan-400">{getSymbol(selectedIndex)}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

interface ThreeToggleButtonProps extends Omit<ToggleButtonProps, "options"> {
  options: [Option, Option, Option]
}

export const ThreeToggleButton: React.FC<ThreeToggleButtonProps> = (props) => {
  return <ToggleButton {...props} />
}
