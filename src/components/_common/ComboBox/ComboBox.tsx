import { useState, useRef, useEffect } from "react"

export interface ComboBoxProps {
  className?: string
  title: string
  options: string[]
  initialOption?: string
  forceSelect?: boolean
  onSelect?: (option: string | null) => void
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  className,
  title,
  options,
  initialOption,
  forceSelect,
  onSelect,
}) => {
  const [input, setInput] = useState<string>("")
  const [selected, setSelected] = useState<string | null>(initialOption || null)
  const [showOptions, setShowOptions] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRenderMobile, setShouldRenderMobile] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (initialOption && onSelect) {
      onSelect(initialOption)
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (showOptions) {
      setShouldRenderMobile(true)
      setTimeout(() => setIsVisible(true), 10)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => setShouldRenderMobile(false), 300)
      return () => clearTimeout(timer)
    }
  }, [showOptions])

  const filteredOptions = (() => {
    const baseOptions = input
      ? options.filter((item) =>
          item.toLowerCase().startsWith(input.toLowerCase()),
        )
      : options

    // selected item moved to top
    if (selected && baseOptions.includes(selected)) {
      return [selected, ...baseOptions.filter((item) => item !== selected)]
    }

    return baseOptions
  })()

  const handleSelect = (name: string) => {
    const newSelected =
      forceSelect && selected === name ? name : selected === name ? null : name

    setSelected(newSelected)
    setInput("")
    if (onSelect) {
      onSelect(newSelected)
    }

    setShowOptions(false)
  }

  return (
    <div ref={wrapperRef} className={className}>
      {/* combobox button */}
      <p className="mb-1 font-bold text-fuchsia-400">{title}</p>
      <button
        id={`${title}_input`}
        className="px-1 py-2 w-52 max-w-52 bg-[#212529] border border-green-800 rounded-md shadow-lg"
        onClick={() => setShowOptions((prev) => !prev)}
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

      {/* combobox menu (desktop) */}
      {showOptions && (
        <div className="hidden sm:block absolute bg-[#212529] border border-gray-500 shadow-md mt-1 w-52 max-w-52 z-10 rounded-xl">
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-2 py-1 w-full border-transparent focus:outline-none bg-[#444d55] text-gray-200 rounded-t-xl"
          />
          <div className="max-h-[11.5rem] overflow-auto px-1 my-1">
            {filteredOptions.length === 0 ? (
              <div className="flex items-center justify-center text-gray-300 cursor-default p-1 italic text-sm h-[50px] mx-auto my-auto rounded-md">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`${
                    selected === item ? "text-orange-400" : "text-gray-300"
                  } font-semibold cursor-pointer hover:bg-[#444d55] p-1 h-[32px] rounded-md flex justify-between items-center`}
                >
                  {item}
                  {selected === item && (
                    <span className="text-cyan-400">{"\u2713"}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Combobox menu (mobile) */}
      {shouldRenderMobile && (
        <div className="block sm:hidden fixed inset-0 z-[80]">
          {/* Overlay with fade animation */}
          <div
            className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${
              isVisible ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setShowOptions(false)}
          />

          {/* Close message */}
          <span
            className={`fixed top-[7px] left-1/2 transform -translate-x-1/2 py-2 font-bold text-fuchsia-400 bg-transparent w-full text-center z-30 pointer-events-none transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Click Outside to Exit
          </span>

          {/* Bottom menu with slide animation */}
          <div
            className={`absolute bottom-0 left-0 w-full bg-[#212529] rounded-t-xl transform transition-all duration-300 ease-in-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-2 py-3 w-full border-transparent focus:outline-none bg-[#444d55] text-gray-200 rounded-t-xl"
            />
            <div className="h-72 max-h-72 overflow-auto px-1 py-2">
              {filteredOptions.length === 0 ? (
                <div className="flex items-center justify-center text-gray-300 cursor-default p-1 italic text-sm h-[50px] mx-auto my-auto rounded-md">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(item)}
                    className={`${
                      selected === item ? "text-orange-400" : "text-gray-300"
                    } font-semibold cursor-pointer hover:bg-[#444d55] p-3 h-[40px] rounded-md flex justify-between items-center`}
                  >
                    {item}
                    {selected === item && (
                      <span className="text-cyan-400">{"\u2713"}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
