import { FaPhoneAlt } from 'react-icons/fa'
import { LeadForm } from './LeadForm'
import { business } from '../data/business'
import type { Vehicle } from '../types/vehicle'
import { trackContactCta } from '../utils/ctaTracking'

type VehicleContactPanelProps = {
  vehicle: Pick<Vehicle, 'id' | 'stockNumber' | 'price'>
  title: string
  headingId?: string
}

const phoneHref = business.phoneHref || business.contactHref

export const VehicleContactPanel = ({ vehicle, title, headingId = 'vehicle-detail-contact-title' }: VehicleContactPanelProps) => (
  <aside className="vehicle-detail-contact-panel">
    <div className="vehicle-detail-contact-heading">
      <div className="lead-form-heading-copy"><h2 id={headingId}>Have a Question?</h2><p>Fill out the form below and our team will get back to you shortly.</p></div>
    </div>
    <LeadForm title="Send Message" vehicleId={vehicle.id} vehicleContentId={vehicle.stockNumber || vehicle.id} vehicleName={title} vehicleValue={vehicle.price} variant="vehicle-inline" className="vehicle-detail-contact-form" phonePlaceholder="(816) 358-0100" messagePlaceholder="Message" fieldLabels={{ name: 'Your Name', phone: 'Phone Number', email: 'Email Address', message: 'Message' }} />
    <a href={phoneHref} className="vehicle-detail-contact-panel__phone" onClick={() => trackContactCta('phone_click', 'Vehicle Question Panel Phone')}><FaPhoneAlt aria-hidden="true" />{business.phoneDisplay}</a>
  </aside>
)
