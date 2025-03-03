import { useState, useRef, useEffect } from "react"
import { truncateString } from "@utils/truncateString"
import type { ComboBoxProps } from "./ComboBox"

export interface MultiSelectComboBoxProps
  extends Omit<ComboBoxProps, "onSelect"> {
  onSelect?: (options: string[]) => void
}

export const MultiSelectComboBox: React.FC<MultiSelectComboBoxProps> = ({
  className,
  title,
  options,
  initialOption,
  forceSelect,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string[]>(
    initialOption ? [initialOption] : [],
  )
  const [input, setInput] = useState<string>("")
  const [showOptions, setShowOptions] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (initialOption && onSelect) {
      onSelect([initialOption])
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredOptions = input
    ? options.filter((item) =>
        item.toLowerCase().startsWith(input.toLowerCase()),
      )
    : options

  const handleSelect = (name: string) => {
    let newSelected
    if (selected.includes(name)) {
      newSelected = selected.filter((item) => item !== name)
    } else {
      newSelected = forceSelect ? [name] : [...selected, name]
    }
    setSelected(newSelected)
    if (onSelect) {
      onSelect(newSelected)
    }
  }

  return (
    <div ref={wrapperRef} className={className}>
      <p className="mb-1 font-bold text-fuchsia-400">{title}</p>
      <button
        className="px-1 py-2 w-48 max-w-48 bg-[#212529] hover:bg-[#394047] border border-green-800 rounded-md shadow-lg"
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <div className="flex">
          <span className="flex-1 text-center font-bold text-blue-200">
            {selected.length > 0
              ? truncateString(selected.join(", "), 18)
              : `${title}...`}
          </span>
        </div>
      </button>
      {showOptions && (
        <div className="absolute bg-[#212529] border border-gray-500 shadow-md mt-1 w-48 max-w-48 z-10 rounded-xl">
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-2 py-1 w-full bg-[#444d55] text-gray-200 rounded-t-xl"
          />
          <div className="max-h-64 overflow-auto px-1 my-1">
            {filteredOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className={`cursor-pointer hover:bg-[#444d55] p-1 rounded-md flex justify-between items-center ${
                  selected.includes(item) ? "text-orange-400" : "text-gray-300"
                }`}
              >
                {item}
                {selected.includes(item) && (
                  <span className="text-cyan-400">✔</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
