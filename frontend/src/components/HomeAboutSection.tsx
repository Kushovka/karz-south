import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router'

export const HomeAboutSection = () => (
  <section className="home-about" aria-labelledby="home-about-title">
    <div className="home-about__photo">
      <img
        src="/images/dealer-location-lot.webp"
        alt="Vehicles parked at a dealership lot"
        loading="lazy"
      />
    </div>
    <div className="home-about__copy">
      <p className="home-about__eyebrow">About Karz South</p>
      <h2 id="home-about-title">A Local Dealership in Funkstown, MD</h2>
      <p>Karz South is located at 302 S Edgewood Dr in Funkstown, Maryland. Browse our selection of pre-owned cars, trucks, and SUVs at fair prices.</p>
      <p>Stop by to see available vehicles in person, or get in touch with our team for straightforward answers to your questions.</p>
      <Link to="/about" className="home-about__button">Learn More About Us <FaChevronRight aria-hidden="true" /></Link>
    </div>
  </section>
)
