import { FaArrowRight, FaCarSide, FaCheck, FaHandshake, FaMapMarkerAlt, FaPhoneAlt, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const values = [
  { icon: FaCarSide, title: 'Quality Vehicles', text: 'A carefully selected inventory of used cars, trucks, and SUVs.' },
  { icon: FaUsers, title: 'Local & Trusted', text: 'A community-based dealership that puts customers first.' },
  { icon: FaHandshake, title: 'Honest Service', text: 'Clear information and a straightforward buying experience.' },
  { icon: FaMapMarkerAlt, title: 'Convenient Location', text: <>Located right on US Highway 40 in<br /> Independence, MO.</> },
]

const commitments = [
  'Reliable, pre-owned vehicles',
  'Friendly and knowledgeable team',
  'A simple and transparent process',
  'Ongoing support after your purchase',
]

export const AboutPage = () => <main className="about-page about-modern">
  <Seo title="About Mark's Pre-Owned Cars" description="Meet Mark's Pre-Owned Cars, a locally owned dealership serving Independence and nearby communities." />

  <section className="am-hero">
    <img className="am-hero-photo" src="/images/marks-location-hero.webp" alt="Mark’s Pre-Owned Cars dealership lot in Independence, Missouri" />
    <div className="am-hero-shade" />
    <div className="am-hero-inner">
      <p className="am-eyebrow">About Us</p>
      <h1>A Local Dealership<br />You Can Count On</h1>
      <p className="am-hero-description">Proudly serving Independence and the<br className="am-desktop-break" /> surrounding communities with quality<br className="am-desktop-break" /> pre-owned vehicles.</p>
      <Link to="/inventory" className="am-button am-button--red">View Our Inventory <FaArrowRight /></Link>
    </div>
  </section>

  <section className="am-intro">
    <div className="am-intro-copy">
      <h2>About Mark’s Pre-Owned Cars</h2>
      <p>At Mark’s Pre-Owned Cars, we’re a locally owned and operated dealership in Independence, Missouri, focused on one simple thing — helping our customers find a reliable, affordable vehicle.</p>
      <p>We offer a selection of quality used cars, trucks, and SUVs, with straightforward service and a no-pressure approach. Our goal is to make the buying process easy, honest, and stress-free.</p>
    </div>
    <img src="/images/marks-location-lot.webp" alt="Vehicles parked across the Mark’s Pre-Owned Cars lot" loading="lazy" />
  </section>

  <section className="am-values" aria-label="What customers can expect">
    {values.map(({ icon: Icon, title, text }) => <article key={title}>
      <Icon aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>)}
  </section>

  <section className="am-commitment">
    <img src="/images/marks-location-roadside.webp" alt="Mark’s Pre-Owned Cars lot along the roadside" loading="lazy" />
    <div className="am-commitment-copy">
      <h2>Our Commitment</h2>
      <p>We stand behind the vehicles we sell and work hard to earn the trust of every customer. Whether you’re buying your first vehicle, upgrading, or looking for a dependable truck or SUV, we’re here to help you find the right fit.</p>
      <ul>{commitments.map((item) => <li key={item}><FaCheck aria-hidden="true" /> <strong>{item}</strong></li>)}</ul>
    </div>
  </section>

  <section className="am-visit">
    <img src="/images/marks-location-hero.webp" alt="" aria-hidden="true" />
    <div className="am-visit-shade" />
    <div className="am-visit-content">
      <h2>Visit Us Today</h2>
      <p>Stop by our lot in Independence, MO, browse our inventory,<br className="am-desktop-break" /> and see why so many customers choose Mark’s Pre-Owned Cars.</p>
      <div className="am-visit-actions">
        <a className="am-button am-button--red" href={business.mapsUrl} target="_blank" rel="noreferrer"><FaMapMarkerAlt /> Get Directions</a>
        <a className="am-button am-button--light" href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'About Page Visit Us Phone')}><FaPhoneAlt /> {business.phoneDisplay}</a>
      </div>
    </div>
  </section>
</main>
