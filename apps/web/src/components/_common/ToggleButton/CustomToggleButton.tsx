import { useState } from "react"

import type { Option } from "./ToggleButton"

interface CustomToggleButtonProps {
  className?: string
  options: Option[]
  initialValue?: number
  onSelect: (payload?: string) => void
  reset?: any
}

const CustomToggleButtonBase: React.FC<
  Omit<CustomToggleButtonProps, "reset">
> = ({ className = "", options, initialValue = 0, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialValue)
  const optionsCount = options.length

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

/** Renders a symbol toggle that resets when its reset value changes. */
export const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({
  reset,
  ...props
}) => <CustomToggleButtonBase key={String(reset)} {...props} />
