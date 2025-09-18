import { useState, useRef, useEffect, useCallback } from "react"
import { useDebounce } from "@/utils/useDebounce"

interface InputProps {
  className?: string
  title: string
  visibleTitle?: boolean
  initialValue?: string
  placeholder?: string
  debounceTimer?: number
  onSelect: (searchTerm: string) => void
  reset?: any
}

export const Input: React.FC<InputProps> = ({
  className,
  title,
  visibleTitle = true,
  initialValue = "",
  placeholder,
  debounceTimer = 300,
  onSelect,
  reset,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTimer)

  const handleClear = useCallback(() => {
    setSearchTerm("")
    onSelect("")
    inputRef.current?.focus()
  }, [onSelect])

  useEffect(() => {
    if (initialValue) {
      onSelect(initialValue)
    }
  }, [initialValue, onSelect])

  useEffect(() => {
    onSelect(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSelect])

  useEffect(() => {
    if (reset) {
      handleClear()
      inputRef.current?.blur()
    }
  }, [reset, handleClear])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      {!!visibleTitle && (
        <p className="!mb-2 font-bold text-fuchsia-400">{title}</p>
      )}
      <div className={`relative ${className}`}>
        <input
          name={`${title}SearchBar`}
          id={`${title}SearchBar`}
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder || `Search ${title.toLowerCase()}...`}
          className="w-full rounded-md border border-green-800 bg-[#212529] px-3 py-2 pr-10 font-medium text-blue-200 placeholder-gray-400 shadow-lg focus:ring-1 focus:ring-orange-500 focus:outline-none"
        />
        {searchTerm && (
          <button
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
