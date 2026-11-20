import { LeadForm } from './LeadForm'

type DeliveryRequestFormPanelProps = {
  headingId?: string
}

export const DeliveryRequestFormPanel = ({ headingId = 'delivery-request-title' }: DeliveryRequestFormPanelProps) => (
  <div className="delivery-redesign__form-card">
    <div className="delivery-redesign__form-heading">
      <div className="lead-form-heading-copy"><h2 id={headingId}>Request Delivery Information</h2><p>Tell us a few details about what you’re looking for, and a member of our team will follow up with delivery availability, timing, and a quote.</p></div>
    </div>
    <LeadForm
      title="Send Request"
      variant="vehicle-inline"
      className="delivery-redesign__form"
      showVehicleInterest
      showZipCode
      phonePlaceholder="(___) ___-____"
      messagePlaceholder="Let us know any details about your delivery needs."
      fieldLabels={{ name: 'Name', phone: 'Phone Number', email: 'Email', message: 'Message' }}
    />
  </div>
)
