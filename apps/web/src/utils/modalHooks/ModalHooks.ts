import { useEffect, useRef } from "react"

// hook for modal focus handling
export const useModalFocus = (
  open: boolean,
  triggerButtonID: string,
  modalID: string,
  shipID?: string,
) => {
  const hasMounted = useRef(false)
  const prevOpen = useRef(open)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
    }
  }, [shipID, triggerButtonID])

  useEffect(() => {
    if (hasMounted.current) {
      if (open && !prevOpen.current) {
        const modal = document.getElementById(modalID)
        if (modal) modal.focus()
      } else if (!open && prevOpen.current) {
        const trigger = document.getElementById(triggerButtonID)
        if (trigger) trigger.focus()
      }

      prevOpen.current = open
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
      if (!bodyClass.contains("overflow-hidden")) {
        bodyClass.add("overflow-hidden")
      }
    } else {
      if (bodyClass.contains("overflow-hidden")) {
        bodyClass.remove("overflow-hidden")
      }
    }
  }, [open])
}
