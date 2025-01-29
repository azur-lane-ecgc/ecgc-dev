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
    // if (window.location.hash.includes(id)) {
    //   setOpen(true)
    //   return
    // }

    if (open) {
      history.replaceState(null, "", window.location.pathname)
      history.pushState(null, "", `#${id}`)
    }

    const handleHashChange = () => {
      if (open) {
        setOpen(false)

        history.replaceState(null, "", window.location.pathname)
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      if (open) {
        history.replaceState(null, "", window.location.pathname)
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
