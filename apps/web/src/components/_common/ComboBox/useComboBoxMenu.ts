import { useCallback, useEffect, useRef, useState } from "react"

interface ComboBoxMenuState {
  wrapperRef: React.RefObject<HTMLDivElement | null>
  inputRef: React.RefObject<HTMLInputElement | null>
  showOptions: boolean
  shouldRenderMobile: boolean
  isVisible: boolean
  toggleOptions: () => void
  closeOptions: () => void
}

/** Animates combo-box menus and closes them when a user clicks outside. */
export const useComboBoxMenu = (): ComboBoxMenuState => {
  const [showOptions, setShowOptions] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRenderMobile, setShouldRenderMobile] = useState(false)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const closeTimerRef = useRef<number | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current === null) {
      return
    }

    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }, [])

  const openOptions = useCallback(() => {
    clearCloseTimer()
    setShouldRenderMobile(true)
    setShowOptions(true)
  }, [clearCloseTimer])

  const closeOptions = useCallback(() => {
    setShowOptions(false)
    setIsVisible(false)
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setShouldRenderMobile(false)
      closeTimerRef.current = null
    }, 300)
  }, [clearCloseTimer])

  const toggleOptions = useCallback(() => {
    if (showOptions) {
      closeOptions()
      return
    }

    openOptions()
  }, [closeOptions, openOptions, showOptions])

  useEffect(() => {
    if (!showOptions) {
      return
    }

    const openTimer = window.setTimeout(() => setIsVisible(true), 75)

    if (inputRef.current) {
      inputRef.current.focus()
    }

    return () => window.clearTimeout(openTimer)
  }, [showOptions])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeOptions()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [closeOptions, wrapperRef])

  useEffect(() => clearCloseTimer, [clearCloseTimer])

  return {
    wrapperRef,
    inputRef,
    showOptions,
    shouldRenderMobile,
    isVisible,
    toggleOptions,
    closeOptions,
  }
}
