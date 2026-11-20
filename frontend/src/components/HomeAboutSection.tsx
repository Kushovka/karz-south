import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router'

export const HomeAboutSection = () => (
  <section className="home-about" aria-labelledby="home-about-title">
    <div className="home-about__photo">
      <img
        src="/images/marks-location-lot.webp"
        alt="Vehicles parked on Mark’s Pre-Owned Cars lot in Independence, Missouri"
        loading="lazy"
      />
    </div>
    <div className="home-about__copy">
      <p className="home-about__eyebrow">About Mark’s Pre-Owned Cars</p>
      <h2 id="home-about-title">A Local Dealership in Independence, MO</h2>
      <p>Mark’s Pre-Owned Cars is located on US Highway 40 in Independence, Missouri. Browse our selection of pre-owned cars, trucks, and SUVs at fair prices.</p>
      <p>Stop by to see available vehicles in person, or get in touch with our team for straightforward answers to your questions.</p>
      <Link to="/about" className="home-about__button">Learn More About Us <FaChevronRight aria-hidden="true" /></Link>
    </div>
  </section>
)
