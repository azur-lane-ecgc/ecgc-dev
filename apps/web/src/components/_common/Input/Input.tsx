import { useState, useRef } from "react"

import { useDebouncedCallback } from "@/utils/useDebouncedCallback"

interface InputProps {
  className?: string
  title: string
  visibleTitle?: boolean
  initialValue?: string
  placeholder?: string
  debounceTimer?: number
  onSelect: (searchTerm: string) => void
  reset?: string
}

const InputBase: React.FC<Omit<InputProps, "reset">> = ({
  className,
  title,
  visibleTitle = true,
  initialValue = "",
  placeholder,
  debounceTimer = 300,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { schedule, cancel } = useDebouncedCallback(onSelect, debounceTimer)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    schedule(event.target.value)
  }

  const handleClear = () => {
    setSearchTerm("")
    cancel()
    onSelect("")
    inputRef.current?.focus()
  }

  return (
    <div>
      {!!visibleTitle && (
        <label
          htmlFor={`${title}SearchBar`}
          className="mb-2! block font-bold text-fuchsia-400"
        >
          {title}
        </label>
      )}
      <div className={`relative ${className}`}>
        <input
          aria-label={title}
          name={`${title}SearchBar`}
          id={`${title}SearchBar`}
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder || `Search ${title.toLowerCase()}...`}
          className="w-full rounded-md border-green-800 bg-[#212529] px-3 py-2 pr-10 font-medium text-blue-200 placeholder-gray-400 shadow-lg focus:ring-1 focus:ring-orange-500 focus:outline-hidden"
        />
        {searchTerm && (
          <button
            type="button"
            aria-label={`Clear ${title.toLowerCase()}`}
            onClick={handleClear}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-lg text-pink-300 hover:text-red-400"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

/** Renders a search input that clears itself when its reset value changes. */
export const Input: React.FC<InputProps> = ({ reset, ...props }) => (
  <InputBase key={String(reset)} {...props} />
)
