import { useEffect } from "react"

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

// hook to manage history and popstate
export const useModalHistory = (
  id: string,
  open: boolean,
  setOpen: (open: boolean) => void,
) => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.modalOpen && open) {
        event.preventDefault()
        setOpen(false)
      }
    }

    if (open) {
      history.replaceState({ modalOpen: true }, "", window.location.href)
    } else {
      history.replaceState(null, "", window.location.href)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
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
