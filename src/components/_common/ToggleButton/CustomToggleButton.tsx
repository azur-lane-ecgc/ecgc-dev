import { useEffect, useState } from "react"

import type { Option } from "./ToggleButton"

interface CustomToggleButtonProps {
  className?: string
  options: Option[]
  initialValue?: number
  onSelect: (payload?: string) => void
  reset?: any
}

export const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({
  className = "",
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
  return (
    <button
      className={className}
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
    >
      <span className="font-semibold">{options[selectedIndex].symbol}</span>
    </button>
  )
}
