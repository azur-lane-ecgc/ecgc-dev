import { useEffect, useRef } from "react"

// hook for modal focus handling
export const useModalFocus = (
  open: boolean,
  triggerButtonID: string,
  modalID: string,
) => {
  useEffect(() => {
    const elementId = open ? modalID : triggerButtonID

    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
    }
  }, [open, modalID, triggerButtonID])
}

// hook to manage url hash for modal
export const useModalHistory = (
  id: string,
  open: boolean,
  setOpen?: () => void,
) => {
  const initialLoad = useRef(true)

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      return
    }

    if (open) {
      if (!(window.location.hash === `#${id}`)) {
        history.replaceState(null, "", `#${id}`)
      }
    } else {
      if (window.location.hash === `#${id}`) {
        history.replaceState(null, "", window.location.pathname)
      }
    }

    return () => {
      if (open) {
        history.replaceState(null, "", window.location.pathname)
      }
    }
  }, [id, open])
}

// hook to manage body overflow
export const useBodyOverflow = (open: boolean) => {
  useEffect(() => {
    const bodyClass = document.body.classList
    if (open) {
      !bodyClass.contains("overflow-hidden") && bodyClass.add("overflow-hidden")
    } else {
      bodyClass.contains("overflow-hidden") &&
        bodyClass.remove("overflow-hidden")
    }
  }, [open])
}
