import { useState, useRef, useEffect } from "react"
import { useDebounce } from "@/utils/useDebounce"

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

interface InputBaseProps extends Omit<InputProps, "reset"> {
  resetOnMount: boolean
}

const InputBase: React.FC<InputBaseProps> = ({
  className,
  title,
  visibleTitle = true,
  initialValue = "",
  placeholder,
  debounceTimer = 300,
  onSelect,
  resetOnMount,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const onSelectRef = useRef(onSelect)
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTimer)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    onSelectRef.current(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (!resetOnMount) {
      return
    }

    onSelectRef.current("")
    inputRef.current?.blur()
  }, [resetOnMount])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClear = () => {
    setSearchTerm("")
    onSelectRef.current("")
    inputRef.current?.focus()
  }

  return (
    <div>
      {!!visibleTitle && (
        <p className="mb-2! font-bold text-fuchsia-400">{title}</p>
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
          className="w-full rounded-md border-green-800 bg-[#212529] px-3 py-2 pr-10 font-medium text-blue-200 placeholder-gray-400 shadow-lg focus:ring-1 focus:ring-orange-500 focus:outline-hidden"
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

/** Renders a search input that clears itself when its reset value changes. */
export const Input: React.FC<InputProps> = ({ reset, ...props }) => (
  <InputBase key={String(reset)} {...props} resetOnMount={Boolean(reset)} />
)
