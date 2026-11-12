import { useState } from "react"

import { truncateArray } from "@/utils/string"
import { useDebouncedCallback } from "@/utils/useDebouncedCallback"

import { ComboBoxMenu } from "./ComboBoxMenu"
import { useComboBoxMenu } from "./useComboBoxMenu"

interface MultiComboBoxProps {
  className?: string
  title: string
  options: string[]
  initialOptions?: string[]
  forceSelect?: boolean
  moveSelectedToTop?: boolean
  onSelect: (option: string[]) => void
  disabled?: boolean
  disabledMessage?: string
  reset?: string
}

// Render a multiple selection combo box with a mobile option menu.
const MultiSelectComboboxBase: React.FC<Omit<MultiComboBoxProps, "reset">> = ({
  className,
  title,
  options,
  initialOptions,
  forceSelect,
  moveSelectedToTop = false,
  onSelect,
  disabled,
  disabledMessage,
}) => {
  const [input, setInput] = useState<string>("")
  const [selected, setSelected] = useState<string[]>(initialOptions || [])

  const { schedule } = useDebouncedCallback(onSelect, 190)
  const selectedOptions = new Set(selected)

  const menu = useComboBoxMenu()
  const { wrapperRef, showOptions, toggleOptions } = menu

  const filteredOptions = (() => {
    const baseOptions = input
      ? options.filter((item) =>
          item.toLowerCase().includes(input.toLowerCase()),
        )
      : options

    if (moveSelectedToTop) {
      const selectedInBase = baseOptions.filter((item) =>
        selectedOptions.has(item),
      )
      const nonSelectedInBase = baseOptions.filter(
        (item) => !selectedOptions.has(item),
      )

      return [...selectedInBase, ...nonSelectedInBase]
    }

    return baseOptions
  })()

  const handleSelect = (name: string) => {
    let newSelected: string[]

    if (forceSelect && selectedOptions.has(name) && selected.length === 1) {
      newSelected = [name]
    } else {
      newSelected = selectedOptions.has(name)
        ? selected.filter((item) => item !== name)
        : [...selected, name]
    }

    setSelected(newSelected)
    schedule(newSelected)

    if (newSelected.length === 0) {
      setInput("")
    }
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
        } rounded-md border border-green-800 shadow-lg hover:bg-[#394047]`}
        onClick={() => {
          if (!disabled) {
            toggleOptions()
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

/** Renders a multi-selection combo box that resets when reset or disabled changes. */
export const MultiSelectCombobox: React.FC<MultiComboBoxProps> = ({
  reset,
  ...props
}) => (
  <MultiSelectComboboxBase
    key={`${String(reset)}-${String(props.disabled)}`}
    {...props}
  />
)
