import { useState } from 'react'
import { FaArrowRight, FaCheck, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router'
import { Seo } from '../components/Seo'
import { DeliveryRequestFormPanel } from '../components/DeliveryRequestFormPanel'
import { DeliveryRequestDialog } from '../components/DeliveryRequestDialog'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const deliveryBenefits = [
  'Local and out-of-state delivery available',
  'Safe and insured transport',
  'Convenient and flexible options',
  'A smooth and simple process',
]

const deliverySteps = [
  { title: 'Contact Us', description: 'Tell us which vehicle you’re interested in and where you need it delivered.' },
  { title: 'Get a Quote', description: 'We’ll provide a delivery estimate and coordinate the details with you.' },
  { title: 'Receive Your Vehicle', description: 'Your vehicle arrives at your location, ready for the road.' },
]

export const DeliveryPage = () => {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)

  return (
  <main className="delivery-redesign">
    <Seo title="Vehicle Delivery Information" description={`Ask ${business.name} about local and out-of-state vehicle delivery options, timing, and cost.`} />

    <section className="delivery-redesign__hero" aria-labelledby="delivery-title">
      <div className="delivery-redesign__hero-copy">
        <span className="delivery-redesign__eyebrow">Delivery</span>
        <h1 id="delivery-title">Vehicle Delivery Information</h1>
        <p>Contact our dealership to ask about delivery availability, timing, and a quote for your purchase. We’ll work with you to go over your options and the next steps.</p>
        <div className="delivery-redesign__hero-actions">
          <button type="button" className="delivery-redesign__button delivery-redesign__button--red" onClick={() => setRequestDialogOpen(true)}>Request Delivery Info <FaArrowRight aria-hidden="true" /></button>
          <a className="delivery-redesign__button delivery-redesign__button--outline" href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'Delivery Page Call')}><FaPhoneAlt aria-hidden="true" /> Call Us</a>
        </div>
        <small>Delivery availability and cost are provided upon request.</small>
      </div>
      <img className="delivery-redesign__hero-image" src="/images/delivery-carrier-road.webp" alt="Vehicles being transported on a car carrier" />
    </section>

    <div className="delivery-redesign__content">
      <section className="delivery-redesign__options" aria-labelledby="delivery-options-title">
        <div>
          <h2 id="delivery-options-title">Delivery Options</h2>
          <p>We offer convenient delivery for customers who are unable to visit our lot in person. Whether you’re nearby or out of state, we’ll work with you to arrange an option that fits your situation.</p>
        </div>
        <div className="delivery-redesign__benefits">
          <img src="/images/delivery-options-truck.png" alt="" aria-hidden="true" />
          <ul>{deliveryBenefits.map((benefit) => <li key={benefit}><FaCheck aria-hidden="true" />{benefit}</li>)}</ul>
        </div>
      </section>

      <section className="delivery-redesign__process" aria-labelledby="delivery-process-title">
        <h2 id="delivery-process-title">How the Delivery Process Works</h2>
        <ol>
          {deliverySteps.map((step, index) => <li key={step.title}>
            <span className="delivery-redesign__step-number">{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index < deliverySteps.length - 1 ? <FaArrowRight className="delivery-redesign__step-arrow" aria-hidden="true" /> : null}
          </li>)}
        </ol>
      </section>

      <section className="delivery-redesign__request" id="delivery-request" aria-labelledby="delivery-request-title">
        <img src="/images/delivery-carrier-detail.webp" alt="Close view of a vehicle secured on a transport trailer" loading="lazy" />
        <DeliveryRequestFormPanel />
      </section>
    </div>

    <section className="delivery-redesign__cta" aria-labelledby="delivery-cta-title">
      <h2 id="delivery-cta-title">Have Questions About Delivery?</h2>
      <p>Our team is here to help. Contact us today for availability and a delivery quote.</p>
      <div>
        <a className="delivery-redesign__button delivery-redesign__button--light" href={business.phoneHref} onClick={() => trackContactCta('phone_click', 'Delivery CTA Phone')}><FaPhoneAlt aria-hidden="true" /> {business.phoneDisplay}</a>
        <Link className="delivery-redesign__button delivery-redesign__button--cta-outline" to="/contact">Contact Us Online <FaArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
    <DeliveryRequestDialog open={requestDialogOpen} onClose={() => setRequestDialogOpen(false)} />
  </main>
  )
}
