import { useState, useRef, useEffect } from "react"

export interface ComboBoxProps {
  className?: string
  title: string
  options: string[]
  onSelect?: (option: string | null) => void
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  title,
  options,
  className,
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
    const newSelected = selected === name ? null : name

    setSelected(newSelected)
    setInput("")
    if (onSelect) {
      onSelect(newSelected)
    }

    console.log("child selected option", newSelected)
    setShowOptions(false)
  }

  return (
    <div ref={wrapperRef} className={className}>
      {/* combobox button */}
      <div
        className="cursor-pointer"
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <p className="mb-1 font-bold text-fuchsia-400">{title}</p>
        <button
          id={`${title}_input`}
          className="px-1 py-2 w-40 max-w-40 bg-[#212529] border-white rounded-md"
        >
          <div className="flex">
            <span className="flex-1 text-center align-middle justify-center pl-[8.75px] pr-2 w-full mb-0 font-bold text-orange-400">
              {selected || title + "..."}
            </span>
            <div className="flex flex-col justify-center m-0 space-y-0 space-x-0 *:!leading-[0.35]">
              {showOptions ? (
                <i className="fa fa-caret-up text-sm text-cyan-300"></i>
              ) : (
                <i className="fa fa-caret-down text-sm text-cyan-300"></i>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* combobox menu (desktop) */}
      {showOptions && (
        <div className="hidden md:block absolute bg-[#212529] border border-gray-500 shadow-md mt-1 w-40 z-10 rounded-xl">
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-1 py-1 w-full border-transparent focus:outline-none bg-[#444d55] text-gray-200 rounded-t-xl"
          />
          <div className="max-h-72 overflow-auto px-1 mt-1">
            {filteredOptions.length === 0 ? (
              <div className="flex items-center justify-center text-gray-300 cursor-default p-1 italic text-sm h-[50px] mx-auto my-auto rounded-md">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((item, index) => (
                <div
                  className="text-gray-300 font-semibold cursor-pointer hover:bg-[#444d55] p-1 h-[32px] rounded-md flex justify-between"
                  key={index}
                  onClick={() => handleSelect(item)}
                >
                  {item}
                  {selected === item ? (
                    <span className="text-cyan-400">{"\u2713"}</span>
                  ) : (
                    false
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
