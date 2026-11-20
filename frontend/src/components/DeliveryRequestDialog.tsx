import { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { DeliveryRequestFormPanel } from './DeliveryRequestFormPanel'

type DeliveryRequestDialogProps = {
  open: boolean
  onClose: () => void
}

export const DeliveryRequestDialog = ({ open, onClose }: DeliveryRequestDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="vehicle-quote-dialog delivery-request-dialog delivery-request-dialog--shared-form"
      aria-labelledby="delivery-request-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="vehicle-quote-dialog__header vehicle-quote-dialog__header--close-only">
        <button type="button" className="vehicle-quote-dialog__close" aria-label="Close delivery request form" onClick={onClose}>
          <FaTimes aria-hidden="true" />
        </button>
      </div>
      <DeliveryRequestFormPanel headingId="delivery-request-dialog-title" />
    </dialog>
  )
}
