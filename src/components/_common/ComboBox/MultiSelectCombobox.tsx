import { useState, useRef, useEffect } from "react"

import { useDebounce } from "@utils/useDebounce"
import { truncateArray } from "@utils/string"

interface MultiComboBoxProps {
  className?: string
  title: string
  options: string[]
  initialOptions?: string[]
  forceSelect?: boolean
  moveSelectedToTop?: boolean
  onSelect: (option: string[] | null) => void
  disabled?: boolean
  disabledMessage?: string
  reset?: any
}

export const MultiSelectCombobox: React.FC<MultiComboBoxProps> = ({
  className,
  title,
  options,
  initialOptions,
  forceSelect,
  moveSelectedToTop = false,
  onSelect,
  disabled,
  disabledMessage,
  reset,
}) => {
  const [input, setInput] = useState<string>("")
  const [selected, setSelected] = useState<string[]>(initialOptions || [])
  const [showOptions, setShowOptions] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRenderMobile, setShouldRenderMobile] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const debouncedSelected: string[] = useDebounce(selected, 190)

  useEffect(() => {
    if (initialOptions && onSelect) {
      onSelect(initialOptions)
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
    onSelect(debouncedSelected.length > 0 ? debouncedSelected : [])
  }, [debouncedSelected])

  useEffect(() => {
    if (showOptions) {
      setShouldRenderMobile(true)
      setTimeout(() => setIsVisible(true), 75)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => setShouldRenderMobile(false), 300)
      return () => clearTimeout(timer)
    }
  }, [showOptions])

  useEffect(() => {
    if (!!reset) {
      setSelected(initialOptions || [])
      setInput("")
    }
  }, [reset])

  useEffect(() => {
    if (disabled) {
      setSelected(initialOptions || [])
      setInput("")
      onSelect([])
    }
  }, [disabled])

  const filteredOptions = (() => {
    const baseOptions = input
      ? options.filter((item) =>
          item.toLowerCase().includes(input.toLowerCase()),
        )
      : options

    if (moveSelectedToTop) {
      const selectedInBase = baseOptions.filter((item) =>
        selected.includes(item),
      )
      const nonSelectedInBase = baseOptions.filter(
        (item) => !selected.includes(item),
      )

      return [...selectedInBase, ...nonSelectedInBase]
    }

    return baseOptions
  })()

  const handleSelect = (name: string) => {
    let newSelected: string[]

    if (forceSelect && selected.includes(name) && selected.length === 1) {
      newSelected = [name]
    } else {
      newSelected = selected.includes(name)
        ? selected.filter((item) => item !== name)
        : [...selected, name]
    }

    setSelected(newSelected)

    if (newSelected.length === 0) {
      setInput("")
    }
  }

  return (
    <div ref={wrapperRef} className={className}>
      {/* combobox button */}
      <p
        title={disabledMessage}
        className={`!mb-2 font-bold ${disabled ? "text-red-300/90! underline! cursor-pointer" : ""}`}
      >
        {title}
      </p>
      <button
        id={`${title}_input`}
        className={`w-48 max-w-48 px-1 py-2 ${
          showOptions ? "bg-[#2e343a]" : "bg-[#212529]"
        } rounded-md border border-green-800 shadow-lg hover:bg-[#394047]`}
        onClick={() => {
          if (!disabled) {
            setShowOptions((prev) => !prev)
          }
        }}
      >
        <div className="flex">
          <span
            className={`mb-0 w-full flex-1 justify-center text-center align-middle font-bold ${
              selected.length ? "text-orange-400" : "text-blue-200"
            } ${disabled ? "text-blue-200/80!" : ""}`}
          >
            {selected.length ? truncateArray(selected, 18) : `${title}...`}
          </span>
          <div className="m-0 flex flex-col justify-center space-x-0 space-y-0 *:!leading-[0.35]">
            {showOptions ? (
              <i className="fa fa-caret-up text-sm text-cyan-300"></i>
            ) : (
              <i
                className={`fa fa-caret-down text-sm text-cyan-300 ${disabled ? "text-cyan-300/50!" : ""}`}
              ></i>
            )}
          </div>
        </div>
      </button>

      {/* combobox menu (desktop) */}
      {showOptions && (
        <div className="absolute z-10 mt-1 hidden w-48 max-w-48 rounded-xl border border-gray-500 bg-[#212529] shadow-md sm:block">
          <input
            id={`${title}ComboBoxDesktop`}
            ref={inputRef}
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-t-xl border-transparent bg-[#444d55] py-1 pl-2 text-gray-200 focus:outline-none"
          />
          <div className="my-1 max-h-64 overflow-auto px-1">
            {filteredOptions.length === 0 ? (
              <div className="mx-auto my-auto flex h-[32px] cursor-default items-center justify-center rounded-md p-1 text-sm italic text-gray-300">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`${
                    selected.includes(item)
                      ? "text-orange-400"
                      : "text-gray-300"
                  } flex h-fit cursor-pointer items-center justify-between rounded-md p-1 font-semibold hover:bg-[#444d55]`}
                >
                  {item}
                  {selected.includes(item) && (
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
        <div className="fixed inset-0 z-[80] block sm:hidden">
          {/* Overlay with fade animation */}
          <div
            className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${
              isVisible ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setShowOptions(false)}
          />

          {/* Close message */}
          <span
            className={`pointer-events-none fixed left-1/2 top-[7px] z-30 w-full -translate-x-1/2 transform bg-transparent py-2 text-center font-bold text-fuchsia-400 transition-all duration-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Click Outside to Exit
          </span>

          {/* Bottom menu with slide animation */}
          <div
            className={`absolute bottom-0 left-0 w-full transform rounded-t-xl bg-[#212529] transition-all duration-300 ease-in-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <input
              id={`${title}ComboBoxMobile`}
              ref={inputRef}
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-t-xl border-transparent bg-[#444d55] py-3 pl-2 text-gray-200 focus:outline-none"
            />
            <div className="h-72 max-h-72 overflow-auto px-1 py-2">
              {filteredOptions.length === 0 ? (
                <div className="mx-auto my-auto flex h-[50px] cursor-default items-center justify-center rounded-md p-1 text-sm italic text-gray-300">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(item)}
                    className={`${
                      selected.includes(item)
                        ? "text-orange-400"
                        : "text-gray-300"
                    } flex h-[40px] cursor-pointer items-center justify-between rounded-md p-3 font-semibold hover:bg-[#444d55]`}
                  >
                    {item}
                    {selected.includes(item) && (
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
