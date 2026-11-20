import { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { VehicleContactPanel } from './VehicleContactPanel'

type VehicleQuoteDialogProps = {
  open: boolean
  onClose: () => void
  vehicleId: string
  vehicleContentId: string
  vehicleName: string
  vehicleValue: number
}

export const VehicleQuoteDialog = ({ open, onClose, vehicleId, vehicleContentId, vehicleName, vehicleValue }: VehicleQuoteDialogProps) => {
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
      className="vehicle-quote-dialog vehicle-quote-dialog--vehicle-contact"
      aria-labelledby="vehicle-quote-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="vehicle-quote-dialog__header vehicle-quote-dialog__header--close-only">
        <button type="button" className="vehicle-quote-dialog__close" aria-label="Close quote form" onClick={onClose}>
          <FaTimes aria-hidden="true" />
        </button>
      </div>
      <VehicleContactPanel
        vehicle={{ id: vehicleId, stockNumber: vehicleContentId, price: vehicleValue }}
        title={vehicleName}
        headingId="vehicle-quote-dialog-title"
      />
    </dialog>
  )
}
