import { Link } from 'react-router'
import { FaChevronRight } from 'react-icons/fa'
import { Seo } from '../components/Seo'
import { BrowseByMakeSection } from '../components/BrowseByMakeSection'
import { FeaturedInventorySection } from '../components/FeaturedInventorySection'
import { HomeAboutSection } from '../components/HomeAboutSection'
import { HomeCustomerReviewsSection } from '../components/HomeCustomerReviewsSection'
import { HomeContactSection } from '../components/HomeContactSection'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'
import { autoDealerSchema } from '../utils/schema'

export const HomePage = () => (
  <>
    <Seo
      title="Used Cars in Funkstown, MD"
      description="Shop quality pre-owned cars, trucks, and SUVs at Karz South in Funkstown, Maryland."
      schema={autoDealerSchema}
    />
    <section className="mark-home-hero" aria-labelledby="home-title">
      <aside className="mark-home-hero__sidebar">
        <p className="mark-home-hero__eyebrow">Find Your Next Vehicle</p>
        <nav aria-label="Browse by vehicle type" className="mark-home-hero__categories">
          <Link to="/inventory"><span className="mark-home-hero__category-icon mark-home-hero__category-icon--car" aria-hidden="true" /><span className="mark-home-hero__category-label">Cars</span><FaChevronRight aria-hidden="true" /></Link>
          <Link to="/inventory?bodyType=Truck"><span className="mark-home-hero__category-icon mark-home-hero__category-icon--truck" aria-hidden="true" /><span className="mark-home-hero__category-label">Trucks</span><FaChevronRight aria-hidden="true" /></Link>
          <Link to="/inventory?bodyType=SUV"><span className="mark-home-hero__category-icon mark-home-hero__category-icon--suv" aria-hidden="true" /><span className="mark-home-hero__category-label">SUVs</span><FaChevronRight aria-hidden="true" /></Link>
        </nav>
        <Link to="/inventory" className="mark-home-hero__shop">Shop All Inventory <FaChevronRight aria-hidden="true" /></Link>
      </aside>
      <div className="mark-home-hero__photo">
        <img src="/images/dealer-location-hero.webp" alt="Vehicles parked at a dealership lot" fetchPriority="high" />
      </div>
      <div className="mark-home-hero__intro">
        <div>
          <h1 id="home-title">Used Cars, Trucks &amp; SUVs in Funkstown</h1>
          <p>Located at 302 S Edgewood Dr in Funkstown, Maryland. Browse available vehicles or give us a call.</p>
        </div>
        <a href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Homepage Hero Directions')}>Get Directions <FaChevronRight aria-hidden="true" /></a>
      </div>
    </section>
    <FeaturedInventorySection />
    <BrowseByMakeSection />
    <HomeAboutSection />
    <HomeCustomerReviewsSection />
    <HomeContactSection />
  </>
)
