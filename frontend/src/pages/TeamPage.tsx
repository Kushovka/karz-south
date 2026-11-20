import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const teamPortraits = [
  { name: 'Daniel Brooks', title: 'General Manager', portrait: 2, scale: 2, origin: '35%' },
  { name: 'Ethan Cole', title: 'Account Manager', portrait: 4, scale: 2.1, origin: '48%' },
  { name: 'Renee Walker', title: 'Customer Experience Manager', portrait: 6, scale: 2.1, origin: '38%' },
  { name: 'Melissa Grant', title: 'Vehicle Inventory & Logistics Manager', portrait: 7, scale: 1.8, origin: '41%' },
  { name: 'Jordan Hayes', title: 'Sales Representative', portrait: 5, scale: 2.1, origin: '45%' },
  { name: 'Aaron Mitchell', title: 'Vehicle Specialist', portrait: 1, scale: 1.8, origin: '34%' },
  { name: 'Marcus Reed', title: 'Vehicle Specialist', portrait: 3, scale: 2.1, origin: '52%' },
  { name: 'Lisa Morgan', title: 'Vehicle Delivery Coordinator', portrait: 8, scale: 1.8, origin: '18%' },
].map((member) => ({
  ...member,
  src: `/images/team-portrait-${String(member.portrait).padStart(2, '0')}.png`,
  alt: `${member.name}, ${member.title}`,
}))

export const TeamPage = () => (
  <main className="team-page">
    <Seo title="Our Team" description="Contact Karz South about our current inventory." />
    <section className="team-section" aria-labelledby="team-title">
      <div className="team-intro">
        <div className="team-intro-copy">
          <h1 id="team-title">Contact<br />Karz South</h1>
          <p className="team-intro-description">Call or visit us with questions about our current vehicles.</p>
        </div>
        <aside className="team-visit-panel" aria-label="Visit or call Karz South">
          <FaMapMarkerAlt className="team-visit-icon" aria-hidden="true" />
          <div className="team-visit-copy">
            <span>Visit Us</span>
            <address>{business.address}<br />{business.cityState} {business.postalCode}</address>
          </div>
          <a href={business.phoneHref} className="team-visit-phone" onClick={() => trackContactCta('phone_click', 'Our Team Visit Us')}>
            <FaPhoneAlt aria-hidden="true" /> {business.phoneDisplay}<span aria-hidden="true">›</span>
          </a>
          <p>Call us with any questions. We’re always happy to help.</p>
        </aside>
      </div>
      <section className="team-gallery" aria-labelledby="team-gallery-title">
        <h2 id="team-gallery-title" className="team-gallery-title">Meet Our Team</h2>
        <div className="team-gallery-grid">
          {teamPortraits.map((member, index) => (
            <article className="team-member-card" key={member.src}>
              <div className="team-member-photo team-portrait">
                <img
                  className="team-member-portrait"
                  src={member.src}
                  alt={member.alt}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ transform: `scale(${member.scale})`, transformOrigin: `center ${member.origin}` }}
                />
              </div>
              <div className="team-member-caption">
                <h2>{member.name}</h2>
                <p>{member.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
    <section className="team-promise" aria-labelledby="team-promise-title">
      <div className="team-promise-inner">
        <h2 id="team-promise-title">Visit Karz South</h2>
        <div className="team-promise-points">
          <article><h3>Address</h3><p>{business.address}, {business.cityState} {business.postalCode}</p></article>
          <article><h3>Phone</h3><p>{business.phoneDisplay}</p></article>
          <article><h3>Hours</h3><p>{business.hours}</p></article>
        </div>
      </div>
    </section>
  </main>
)
