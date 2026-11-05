import { useState } from "react"

import { truncateString } from "@/utils/string"

import { useComboBoxMenu } from "./useComboBoxMenu"

interface ComboBoxProps {
  className?: string
  title: string
  options: string[]
  initialOption?: string
  forceSelect?: boolean
  onSelect: (option: string | null) => void
  disabled?: boolean
  disabledMessage?: string
  reset?: string
}

// Render a single selection combo box with a mobile option menu.
const ComboBoxBase: React.FC<Omit<ComboBoxProps, "reset">> = ({
  className,
  title,
  options,
  initialOption,
  forceSelect,
  onSelect,
  disabled,
  disabledMessage,
}) => {
  const [input, setInput] = useState<string>("")
  const [selected, setSelected] = useState<string | null>(initialOption || null)
  const {
    wrapperRef,
    inputRef,
    showOptions,
    shouldRenderMobile,
    isVisible,
    toggleOptions,
    closeOptions,
  } = useComboBoxMenu()

  const filteredOptions = (() => {
    const baseOptions = input
      ? options.filter((item) =>
          item.toLowerCase().includes(input.toLowerCase()),
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
    onSelect(newSelected)
    closeOptions()
  }

  return (
    <div ref={wrapperRef} className={className}>
      {/* combobox button */}
      <p
        title={disabledMessage}
        className={`mb-2! font-bold ${disabled ? "cursor-pointer text-red-300/90! underline!" : ""}`}
      >
        {title}
      </p>
      <button
        id={`${title}_input`}
        className={`w-48 max-w-48 px-1 py-2 ${
          showOptions ? "bg-[#2e343a]" : "bg-[#212529]"
        } rounded-md border border-green-800 shadow-lg ${disabled ? "cursor-not-allowed" : "hover:bg-[#394047]"}`}
        onClick={() => {
          if (!disabled) {
            toggleOptions()
          }
        }}
      >
        <div className="flex">
          <span
            className={`mb-0 w-full flex-1 justify-center text-center align-middle font-bold ${
              selected ? "text-orange-400" : "text-blue-200"
            } ${disabled ? "text-blue-200/80!" : ""}`}
          >
            {selected ? truncateString(selected, 18) : `${title}...`}
          </span>
          <div className="m-0 flex flex-col justify-center space-y-0 space-x-0 *:leading-[0.35]!">
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
        <div className="absolute z-10 mt-1 hidden w-48 max-w-48 rounded-xl border-gray-500 bg-[#212529] shadow-md sm:block">
          <input
            id={`${title}ComboBoxDesktop`}
            ref={inputRef}
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-t-xl border-transparent bg-[#444d55] py-1 pl-2 text-gray-200 focus:outline-hidden"
          />
          <div className="my-1 max-h-64 overflow-auto px-1">
            {filteredOptions.length === 0 ? (
              <div className="mx-auto my-auto flex h-8 cursor-default items-center justify-center rounded-md p-1 text-sm text-gray-300 italic">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`${
                    selected === item ? "text-orange-400" : "text-gray-300"
                  } flex h-fit cursor-pointer items-center justify-between rounded-md p-1 font-semibold hover:bg-[#444d55]`}
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
        <div className="fixed inset-0 z-80 block sm:hidden">
          {/* Overlay with fade animation */}
          <div
            className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${
              isVisible ? "opacity-50" : "opacity-0"
            }`}
            onClick={closeOptions}
          />

          {/* Close message */}
          <span
            className={`pointer-events-none fixed top-1.75 left-1/2 z-30 w-full -translate-x-1/2 transform bg-transparent py-2 text-center font-bold text-fuchsia-400 transition-all duration-300 ${
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
              className="w-full rounded-t-xl border-transparent bg-[#444d55] py-3 pl-2 text-gray-200 focus:outline-hidden"
            />
            <div className="h-72 max-h-72 overflow-auto px-1 py-2">
              {filteredOptions.length === 0 ? (
                <div className="mx-auto my-auto flex h-12.5 cursor-default items-center justify-center rounded-md p-1 text-sm text-gray-300 italic">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(item)}
                    className={`${
                      selected === item ? "text-orange-400" : "text-gray-300"
                    } flex h-10 cursor-pointer items-center justify-between rounded-md p-3 font-semibold hover:bg-[#444d55]`}
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

/** Renders a single-selection combo box that resets when reset or disabled changes. */
export const ComboBox: React.FC<ComboBoxProps> = ({ reset, ...props }) => (
  <ComboBoxBase key={`${String(reset)}-${String(props.disabled)}`} {...props} />
)
