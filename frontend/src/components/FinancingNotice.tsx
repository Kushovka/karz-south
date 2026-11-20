import { FaCreditCard } from 'react-icons/fa'

export const FinancingNotice = () => (
  <aside className="financing-note-banner" aria-label="Financing information">
    <span className="financing-note-banner__icon" aria-hidden="true"><FaCreditCard /></span>
    <span className="financing-note-banner__divider" aria-hidden="true" />
    <p>Financing is not available through our dealership.</p>
  </aside>
)
