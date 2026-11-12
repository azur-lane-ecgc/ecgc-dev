import { useCallback, useLayoutEffect, useRef } from "react"

/** Debounce control events and cancel pending delivery when the control unmounts. */
export const useDebouncedCallback = <T,>(
  callback: (value: T) => void,
  delay: number,
) => {
  const callbackRef = useRef(callback)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useLayoutEffect(() => cancel, [cancel])

  const schedule = (value: T) => {
    cancel()
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      callbackRef.current(value)
    }, delay)
  }

  return { schedule, cancel }
}
