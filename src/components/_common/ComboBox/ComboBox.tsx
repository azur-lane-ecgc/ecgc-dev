import { useState, useRef, useEffect } from "react"
import { HR } from "../HR"

interface ComboBoxProps {
  title: string
  options: string[]
  onSelect?: (option: string) => void
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  title,
  options,
  onSelect,
}) => {
  const [input, setInput] = useState<string>("")
  const [selected, setSelected] = useState<string | null>(null)
  const [showOptions, setShowOptions] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (showOptions && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showOptions])

  const filteredOptions = input
    ? options.filter((item) =>
        item.toLowerCase().startsWith(input.toLowerCase()),
      )
    : options

  const handleSelect = (name: string) => {
    if (selected === name) {
      setSelected(null)
      setInput("")
    } else {
      setSelected(name)
      setInput("")
      if (onSelect) {
        onSelect(name)
      }
    }
    setShowOptions(false)
  }

  return (
    <div ref={wrapperRef} className="bg-white w-fit">
      <div
        className="cursor-pointer"
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <input
          id={`${title}_input`}
          type="text"
          value={selected || "choose an option"}
          readOnly
          className="pl-1"
        />
      </div>

      {showOptions && (
        <div className="absolute bg-white border border-gray-300 mt-0 w-fit z-10">
          <input
            ref={inputRef}
            type="text"
            placeholder="select option"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-1 w-full border-transparent focus:outline-none"
          />
          <hr className="border-black"/>
          <ul className="max-h-60 overflow-auto list-none m-0 pl-1">
            {filteredOptions.map((item, index) => (
              <li
                className="text-black cursor-pointer hover:bg-gray-200"
                key={index}
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
