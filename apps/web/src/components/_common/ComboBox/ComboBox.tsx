import { useState } from "react"

import { truncateString } from "@/utils/string"

import { ComboBoxMenu } from "./ComboBoxMenu"
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
  const menu = useComboBoxMenu()
  const { wrapperRef, showOptions, toggleOptions, closeOptions } = menu

  const selectedOptions = new Set(selected ? [selected] : [])

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
        type="button"
        aria-label={title}
        aria-expanded={showOptions}
        disabled={disabled}
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

      <ComboBoxMenu
        menu={menu}
        title={title}
        input={input}
        options={filteredOptions}
        selected={selectedOptions}
        onInput={setInput}
        onSelect={handleSelect}
      />
    </div>
  )
}

/** Renders a single-selection combo box that resets when reset or disabled changes. */
export const ComboBox: React.FC<ComboBoxProps> = ({ reset, ...props }) => (
  <ComboBoxBase key={`${String(reset)}-${String(props.disabled)}`} {...props} />
)
