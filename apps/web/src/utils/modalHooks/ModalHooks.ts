import { useEffect } from "react"

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
