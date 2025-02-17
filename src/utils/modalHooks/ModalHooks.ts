import { useEffect, useRef } from "react"

// hook for modal focus handling
export const useModalFocus = (
  open: boolean,
  triggerButtonID: string,
  modalID: string,
  shipID?: string,
) => {
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      if (shipID && window.location.hash.includes(shipID)) {
        const triggerButton = document.getElementById(triggerButtonID)
        if (triggerButton) {
          triggerButton.focus()
        }
      }
      return
    }

    const elementId = open ? modalID : triggerButtonID
    const element = document.getElementById(elementId)

    if (element) {
      element.focus()
    }
  }, [open, modalID, triggerButtonID])
}

// hook to manage history and popstate
export const useModalHistory = (
  id: string,
  open: boolean,
  setOpen: (open: boolean) => void,
) => {
  useEffect(() => {
    const basePath = window.location.pathname

    if (open) {
      history.replaceState(null, "", basePath)
      history.pushState(null, "", `${basePath}#/${id}`)
    }

    const handleHashChange = () => {
      if (open) {
        setOpen(false)
        history.replaceState(null, "", basePath)
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      if (open) {
        history.replaceState(null, "", basePath)
      }
    }
  }, [id, open, setOpen])
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
