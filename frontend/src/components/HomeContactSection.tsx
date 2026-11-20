import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { LeadForm } from './LeadForm'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const salesHours = [
  ['Mon, Fri', '9:00 AM – 5:00 PM'],
  ['Tue–Thu', '1:00 PM – 5:00 PM'],
  ['Sat', '9:00 AM – 3:00 PM'],
  ['Sun', 'Closed'],
]

export const HomeContactSection = () => (
  <section className="home-contact" aria-labelledby="home-contact-title">
    <div className="home-contact__info">
      <p className="home-contact__eyebrow">Have a Question?</p>
      <h2 id="home-contact-title">We’re Here<br />to Help</h2>
      <p className="home-contact__intro">If you have a question about a vehicle, availability, or anything else, reach out. Our team will get back to you as soon as possible.</p>

      <div className="home-contact__details">
        <a className="home-contact__detail" href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'Homepage Contact Phone')}>
          <span className="home-contact__icon home-contact__icon--red"><FaPhoneAlt aria-hidden="true" /></span>
          <span><small>Call Us</small><strong>{business.phoneDisplay}</strong></span>
        </a>
        <a className="home-contact__detail" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Homepage Contact Address')}>
          <span className="home-contact__icon"><FaMapMarkerAlt aria-hidden="true" /></span>
          <span><small>Visit Our Lot</small><strong>{business.address}<br />{business.cityState} {business.postalCode}</strong></span>
        </a>
        <div className="home-contact__detail home-contact__detail--hours">
          <span className="home-contact__icon"><FaClock aria-hidden="true" /></span>
          <span><small>Hours</small><strong>{salesHours.map(([days, hours]) => <span key={days}>{days}: {hours}<br /></span>)}</strong></span>
        </div>
      </div>
    </div>

    <div className="home-contact__photo">
      <div className="home-contact__form-card">
        <div className="home-contact__form-heading">
          <div className="lead-form-heading-copy"><h3>Send Us a Message</h3><p>Fill out the form and we’ll get back to you as soon as possible.</p></div>
        </div>
        <LeadForm
          title="Send Message"
          variant="contact"
          phonePlaceholder="(816) 358-0100"
          messagePlaceholder="Your message"
          className="home-contact__lead-form"
          fieldLabels={{ name: 'Full Name', phone: 'Phone', email: 'Email', message: 'Your Message' }}
        />
      </div>
    </div>
  </section>
)
