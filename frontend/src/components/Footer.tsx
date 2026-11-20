import { Link } from 'react-router'
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const quickLinks = [
  ['Home', '/'],
  ['Inventory', '/inventory'],
  ['Vehicles by Make', '/#browse-makes-title'],
  ['About Us', '/about'],
  ['Contact Us', '/contact'],
]

const inventoryLinks = [
  ['Cars', '/inventory'],
  ['Trucks', '/inventory?bodyType=Truck'],
  ['SUVs', '/inventory?bodyType=SUV'],
  ['View All Inventory', '/inventory'],
]

const salesHours = [
  ['Mon, Fri', '9:00 AM – 5:00 PM'],
  ['Tue–Thu', '1:00 PM – 5:00 PM'],
  ['Sat', '9:00 AM – 3:00 PM'],
  ['Sun', 'Closed'],
]

export const Footer = () => (
  <footer className="dealer-footer">
    <div className="dealer-footer__main">
      <section className="dealer-footer__intro" aria-label="Mark's Pre-Owned Cars">
        <Link to="/" className="dealer-footer__logo" aria-label="Mark's Pre-Owned Cars home">
          <img src="/images/marks-preowned-logo.png" alt="Mark’s Pre-Owned" loading="lazy" />
        </Link>
        <p>Quality used cars, trucks, and SUVs at fair prices, here in Independence, Missouri.</p>
      </section>

      <nav className="dealer-footer__links" aria-label="Quick links">
        <h2>Quick Links</h2>
        {quickLinks.map(([label, href]) => <Link to={href} key={label}>{label}</Link>)}
      </nav>

      <nav className="dealer-footer__inventory" aria-label="Browse inventory by vehicle type">
        <h2>Inventory</h2>
        {inventoryLinks.map(([label, href]) => <Link to={href} key={label}>{label}</Link>)}
      </nav>

      <section className="dealer-footer__contact" aria-label="Contact information">
        <h2>Contact Information</h2>
        <a href={business.phoneHref} className="dealer-footer__main-contact-line" onClick={() => trackContactCta('phone_click', 'Footer Call')}>
          <span className="dealer-footer__main-contact-icon"><FaPhoneAlt aria-hidden="true" /></span>
          <strong>{business.phoneDisplay}</strong>
        </a>
        <a href={business.mapsUrl} className="dealer-footer__main-contact-line" target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Footer Address')}>
          <span className="dealer-footer__main-contact-icon"><FaMapMarkerAlt aria-hidden="true" /></span>
          <span>{business.address}<br />{business.cityState} {business.postalCode}</span>
        </a>
        <div className="dealer-footer__main-contact-line">
          <span className="dealer-footer__main-contact-icon"><FaClock aria-hidden="true" /></span>
          <span>{salesHours.map(([days, hours]) => <span key={days}>{days}: {hours}<br /></span>)}</span>
        </div>
      </section>

      <section className="dealer-footer__map" aria-label="Dealership location map">
        <iframe
          title={`Map to ${business.name} at ${business.address}, ${business.cityState} ${business.postalCode}`}
          src={business.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </div>

    <div className="dealer-footer__bottom">
      <span>© 2026 Mark&apos;s Pre-Owned Cars. All rights reserved.</span>
      <div><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms of Use</Link><a href="/sitemap.xml">Sitemap</a></div>
    </div>
  </footer>
)
