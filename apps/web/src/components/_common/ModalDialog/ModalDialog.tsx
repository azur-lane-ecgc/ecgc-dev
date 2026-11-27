import { useLayoutEffect, useRef, type ReactNode } from "react"

import { closeButtonStyle, modalStyle } from "../ShipModal/styles"

let openDialogCount = 0
let bodyHadScrollLock = false

interface ModalDialogProps {
  readonly name: string
  readonly onClose: () => void
  readonly children: ReactNode
  readonly className?: string
}

// Native modal dialog focus, dismissal, and body scroll lifecycle.
export function ModalDialog({
  name,
  onClose,
  children,
  className = "",
}: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openDialogCount === 0) {
      bodyHadScrollLock = document.body.classList.contains("overflow-hidden")
      document.body.classList.add("overflow-hidden")
    }
    openDialogCount += 1
    dialog.showModal()
    closeButtonRef.current?.focus()
    return () => {
      dialog.close()
      openDialogCount -= 1
      if (openDialogCount === 0 && !bodyHadScrollLock) {
        document.body.classList.remove("overflow-hidden")
      }
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={name}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto border-0 bg-transparent p-0 text-inherit backdrop:bg-black/40"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="fixed inset-0 h-full w-full cursor-default border-0 bg-transparent p-0"
      />
      <div className={`${modalStyle} ${className}`}>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={closeButtonStyle}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        {children}
      </div>
    </dialog>
  )
}
