import { FaArrowRight, FaClock, FaExternalLinkAlt, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { LeadForm } from '../components/LeadForm'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const phoneHref = business.phoneHref || business.contactHref

export const ContactPage = () => (
  <main className="contact-page contact-redesign">
    <Seo title="Contact" description="Call, visit, or send a message to Mark's Pre-Owned Cars in Independence, MO." />

    <section className="contact-redesign__hero">
      <div className="contact-redesign__hero-inner">
        <p className="contact-redesign__eyebrow">Contact Us</p>
        <h1>We’re Here<br />to Help</h1>
        <p>Have a question, need more information, or ready to schedule a test drive? Get in touch with our team today.</p>
      </div>
    </section>

    <section className="contact-redesign__main" aria-label="Contact Mark’s Pre-Owned Cars">
      <div className="contact-redesign__form-column">
        <div className="contact-redesign__form-heading">
          <div className="lead-form-heading-copy"><h2>Send Us a Message</h2><p className="contact-redesign__intro">Fill out the form below and we’ll get back to you as soon as possible.</p></div>
        </div>
        <LeadForm title="Send Message" variant="contact" className="contact-redesign__form" phonePlaceholder="(816) 555-1234" messagePlaceholder="Your Message" splitNameFields inquiryRequired={false} inquiryLabel="I’m Interested In" inquiryOptions={['Vehicle Availability', 'Schedule a Test Drive', 'Warranty', 'Delivery', 'Other']} />
      </div>

      <aside className="contact-redesign__info">
        <h2>Contact Information</h2>
        <a className="contact-redesign__info-row" href={phoneHref} onClick={() => trackContactCta('phone_click', 'Contact Page Phone')}>
          <span className="contact-redesign__icon"><FaPhoneAlt /></span><strong>{business.phoneDisplay}</strong>
        </a>
        <a className="contact-redesign__info-row" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Contact Page Address')}>
          <span className="contact-redesign__icon"><FaMapMarkerAlt /></span><span>{business.address}<br />{business.cityState} {business.postalCode}</span>
        </a>
        <div className="contact-redesign__info-row contact-redesign__hours">
          <span className="contact-redesign__icon"><FaClock /></span><div><strong>Hours of Operation</strong><span>Mon, Fri: 9:00 AM – 5:00 PM<br />Tue – Thu: 1:00 PM – 5:00 PM<br />Sat: 9:00 AM – 3:00 PM<br />Sun: Closed</span></div>
        </div>
        <img className="contact-redesign__location-photo" src="/images/marks-location-lot.webp" alt="Vehicles on the Mark’s Pre-Owned Cars lot in Independence" loading="lazy" />
      </aside>
    </section>

    <section className="contact-redesign__map-section" aria-label="Find our dealership">
      <div className="contact-redesign__map-wrap">
        <iframe title="Map to Mark’s Pre-Owned Cars" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={business.mapEmbedUrl} />
        <div className="contact-redesign__map-card">
          <h2>Find Us</h2>
          <p><FaMapMarkerAlt /><span>{business.address}<br />{business.cityState} {business.postalCode}</span></p>
          <a href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Contact Page Map Directions')}>Get Directions <FaExternalLinkAlt /></a>
        </div>
      </div>
    </section>

    <section className="contact-redesign__cta">
      <div className="contact-redesign__cta-inner">
        <span className="contact-redesign__cta-icon"><img src="/images/contact-cta-car-icon.png" alt="" /></span>
        <div className="contact-redesign__cta-copy"><h2>Let’s Get You on the Road</h2><p>Contact our team today for vehicle information, availability,<br className="contact-redesign__desktop-break" /> or to schedule a test drive.</p></div>
        <div className="contact-redesign__cta-actions">
          <a href={phoneHref} onClick={() => trackContactCta('phone_click', 'Contact Page CTA Call')}><FaPhoneAlt />{business.phoneDisplay}</a>
          <a href="/inventory">View Inventory <FaArrowRight /></a>
        </div>
      </div>
    </section>
  </main>
)
