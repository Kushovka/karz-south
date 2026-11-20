import { FiArrowRight, FiCheck, FiDollarSign, FiPhone, FiRefreshCw, FiShield } from 'react-icons/fi'
import { TbCar } from 'react-icons/tb'
import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const guaranteeTerms = [
  'Applies to vehicles purchased at Karz South.',
  'Return within 72 hours of the time of purchase.',
  'Limited to 250 miles of additional driving.',
  'Vehicle must be in substantially the same condition as purchased.',
  'Does not apply to damage, misuse, or excessive wear after purchase.',
]

const guaranteeHighlights = [
  'Return within 72 hours of purchase',
  'Up to 250 miles (whichever comes first)',
  'Full purchase refund (per guarantee terms)',
]

const guaranteeBenefits = [
  { title: 'Drive & Evaluate', description: 'Get behind the wheel and see how it fits your needs.', Icon: TbCar },
  { title: 'Peace of Mind', description: 'A simple, straightforward return process.', Icon: FiShield },
  { title: 'Full Refund', description: 'Receive a full purchase refund within the guarantee period.', Icon: FiRefreshCw, refund: true },
]

export const GuaranteePage = () => (
  <main className="guarantee-redesign">
    <Seo title="72 Hours / 250 Miles Guarantee" description={`If you're not completely satisfied with your vehicle, you may return it within 72 hours or 250 miles (whichever comes first) for a full purchase refund, subject to the terms below.`} />

    <section className="guarantee-redesign__hero" aria-labelledby="guarantee-title">
      <div className="guarantee-redesign__hero-inner">
        <div className="guarantee-redesign__intro">
          <div className="guarantee-redesign__title-row">
            <svg className="guarantee-redesign__shield" viewBox="0 0 72 82" fill="none" aria-hidden="true">
              <path d="M36 4 65 15v22c0 20-11.4 33.5-29 41C18.4 70.5 7 57 7 37V15L36 4Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <path d="m22 39 9 9 20-22" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="guarantee-redesign__title-rule" aria-hidden="true" />
            <h1 id="guarantee-title">72 Hours / 250 Miles<br />Guarantee</h1>
          </div>
          <p>If you're not completely satisfied with your vehicle, you may return it within 72 hours or 250 miles (whichever comes first) for a full purchase refund, subject to the terms below.</p>
        </div>

        <aside className="guarantee-redesign__panel" aria-labelledby="guarantee-panel-title">
          <h2 id="guarantee-panel-title">Guarantee Highlights</h2>
          <ul>{guaranteeHighlights.map((item) => <li key={item}><FiCheck aria-hidden="true" /><span>{item}</span></li>)}</ul>
        </aside>
      </div>
    </section>

    <section className="guarantee-redesign__story" aria-labelledby="guarantee-story-title">
      <div className="guarantee-redesign__story-inner">
        <img src="/images/guarantee-key-handover.webp" alt="A dealer hands a customer the keys to a vehicle" loading="lazy" />
        <div className="guarantee-redesign__story-copy">
          <h2 id="guarantee-story-title">Our 72-Hour / 250-Mile Guarantee</h2>
          <p>We want you to feel confident in your purchase. That’s why we offer a 72 Hours / 250 Miles Guarantee. It gives you time to drive, inspect, and make sure the vehicle is the right fit for you.</p>
          <div className="guarantee-redesign__benefits" aria-label="Guarantee benefits">
            {guaranteeBenefits.map(({ title, description, Icon, refund }) => (
              <article key={title}>
                <span className={`guarantee-redesign__benefit-icon${refund ? ' guarantee-redesign__benefit-icon--refund' : ''}`}>
                  <Icon aria-hidden="true" />
                  {refund && <FiDollarSign aria-hidden="true" />}
                </span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="guarantee-redesign__terms" aria-labelledby="guarantee-terms-title">
      <div className="guarantee-redesign__terms-inner">
        <div className="guarantee-redesign__terms-list">
          <h2 id="guarantee-terms-title">Guarantee Terms</h2>
          <p>To keep the process clear and fair, here are the key details of our guarantee:</p>
          <ul>{guaranteeTerms.map((term) => <li key={term}><FiCheck aria-hidden="true" /><span>{term}</span></li>)}</ul>
        </div>
        <img className="guarantee-redesign__terms-image" src="/images/guarantee-terms-vehicle.png" alt="A navy blue SUV in a bright vehicle delivery space" loading="lazy" decoding="async" />
      </div>
    </section>

    <section className="guarantee-redesign__cta" aria-labelledby="guarantee-cta-title">
      <h2 id="guarantee-cta-title">Questions About Our Guarantee?</h2>
      <p>Our team is happy to explain the guarantee, answer your questions, and go over the details before you buy.</p>
      <div className="guarantee-redesign__cta-actions">
        <a className="guarantee-redesign__button guarantee-redesign__button--light" href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'Guarantee CTA Phone')}><FiPhone aria-hidden="true" /> {business.phoneDisplay}</a>
        <Link className="guarantee-redesign__button guarantee-redesign__button--outline" to="/contact">Contact Us <FiArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  </main>
)
