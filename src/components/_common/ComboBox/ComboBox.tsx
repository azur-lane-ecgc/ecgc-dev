import { useState, useRef, useEffect } from "react"

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
  const [input, setInput] = useState("")
  const [showOptions, setShowOptions] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

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

  const filteredOptions = input
    ? options.filter((item) => item.toLowerCase().includes(input.toLowerCase()))
    : options

  const handleSelect = (name: string) => {
    setInput(name)
    setShowOptions(false)
    console.log(`selected ${name}`)
    if (onSelect) {
      onSelect(name)
    }
  }

  return (
    <div ref={wrapperRef} className="bg-white w-fit">
      <input
        id={`${title}_input`}
        type="text"
        placeholder="choose an option"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowOptions(true)}
      />
      {showOptions && (
        <ul>
          {filteredOptions.map((item, index) => (
            <li
              className="text-black"
              key={index}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
