import { FiArrowRight, FiCheck, FiPhone, FiTool, FiTruck, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const warrantyCoverage = [
  'Covered mechanical components',
  'Workmanship on covered repairs',
  'For 90 days or 3,000 miles, whichever comes first',
]

const warrantyBenefits = [
  { title: 'Added Protection', description: 'Coverage on key mechanical components.', Icon: FiTool },
  { title: 'Drive with Confidence', description: 'Extra peace of mind after your purchase.', Icon: FiTruck },
  { title: 'Here to Help', description: 'Contact our team with any warranty questions.', Icon: FiUsers },
]

export const WarrantyPage = () => (
  <main className="warranty-redesign">
    <Seo title="Warranty Information" description={`Ask ${business.name} about the limited warranty available on select vehicles.`} />

    <section className="warranty-redesign__overview" aria-labelledby="warranty-title">
      <div className="warranty-redesign__overview-inner">
        <div className="warranty-redesign__intro">
          <div className="warranty-redesign__title-row">
            <svg className="warranty-redesign__shield" viewBox="0 0 72 82" fill="none" aria-hidden="true">
              <path d="M36 4 65 15v22c0 20-11.4 33.5-29 41C18.4 70.5 7 57 7 37V15L36 4Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="m22 39 9 9 20-22" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="warranty-redesign__title-rule" aria-hidden="true" />
            <h1 id="warranty-title">90-Day / 3,000-Mile<br />Limited Warranty</h1>
          </div>
          <p>Many of our vehicles come with a 90-day / 3,000-mile limited warranty, giving you added protection after your purchase.</p>
        </div>

        <aside className="warranty-redesign__covered" aria-labelledby="warranty-covered-title">
          <h2 id="warranty-covered-title">What’s Covered</h2>
          <ul>{warrantyCoverage.map((item) => <li key={item}><FiCheck aria-hidden="true" /><span>{item}</span></li>)}</ul>
        </aside>
      </div>
    </section>

    <section className="warranty-redesign__commitment" aria-labelledby="warranty-commitment-title">
      <div className="warranty-redesign__commitment-inner">
        <img src="/images/warranty-inspection.webp" alt="Technician inspecting a vehicle engine with a checklist" loading="lazy" />
        <div>
          <h2 id="warranty-commitment-title">Our Warranty Commitment</h2>
          <p>We stand behind the quality of the vehicles we sell. Our limited warranty is designed to help cover select repairs and keep you on the road with confidence. For full details, please contact our team.</p>
        </div>
      </div>
    </section>

    <section className="warranty-redesign__benefits" aria-label="Warranty benefits">
      <div className="warranty-redesign__benefits-inner">
        {warrantyBenefits.map(({ title, description, Icon }) => <article key={title}>
          <Icon aria-hidden="true" />
          <div><h3>{title}</h3><p>{description}</p></div>
        </article>)}
      </div>
    </section>

    <section className="warranty-redesign__cta" aria-labelledby="warranty-cta-title">
      <h2 id="warranty-cta-title">Questions About Our Warranty?</h2>
      <p>Our team is happy to explain the coverage, answer your questions, and go over the details before you buy.</p>
      <div>
        <a className="warranty-redesign__button warranty-redesign__button--light" href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'Warranty CTA Phone')}><FiPhone aria-hidden="true" /> {business.phoneDisplay}</a>
        <Link className="warranty-redesign__button warranty-redesign__button--outline" to="/contact">Contact Us <FiArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  </main>
)
