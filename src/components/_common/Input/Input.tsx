import { useState, useRef, useEffect } from "react"
import { useDebounce } from "./useDebounce"

interface InputProps {
  className?: string
  title: string
  initialValue?: string
  placeholder?: string
  debounceTimer?: number
  onSelect: (searchTerm: string) => void
}

export const Input: React.FC<InputProps> = ({
  className,
  title,
  initialValue = "",
  placeholder,
  debounceTimer = 300,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTimer)

  useEffect(() => {
    if (!!initialValue) {
      onSelect(initialValue)
    }
  }, [])

  useEffect(() => {
    onSelect(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClear = () => {
    setSearchTerm("")
    onSelect("")
    inputRef.current?.focus()
  }

  return (
    <div className={className}>
      <p className="mb-1 font-bold text-fuchsia-400">{title}</p>
      <div className="relative w-48 max-w-48">
        <input
          name={`${title}SearchBar`}
          id={`${title}SearchBar`}
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder || `Search ${title.toLowerCase()}...`}
          className="w-full rounded-md border border-green-800 bg-[#212529] px-3 py-2 text-blue-200 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-1 focus:ring-fuchsia-400"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform font-bold text-pink-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
