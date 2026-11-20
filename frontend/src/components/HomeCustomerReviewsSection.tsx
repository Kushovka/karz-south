import { FaChevronRight } from 'react-icons/fa'
import { business } from '../data/business'

const reviews = [
  {
    author: 'Lachell Wilkins',
    text: "My experience was amazing! Mark is an honest salesman for real...he explained everything. It has been almost 6 months and I'm still just as satisfied as the day I bought it. I've been telling everyone I can to go to Mark if they're looking for a new used reliable mode of transportation.",
  },
  {
    author: 'Miss C',
    text: "I recently bought a 2009 Hyundai Sonata from Mark and it’s a really good car! He’s a very honest salesman and super polite! I’m glad i found his lot thanks to my parents. I will definitely recommend him if you’re looking to buy a used car. I’m sure I’ll purchase another car from him in the future! Thanks Mark!",
  },
  {
    author: 'John Labarr (Jay)',
    text: "Bought a car from here. Hell of a nice guy. I recommend Mark all the way. He'll take care of you and very nice.",
  },
]

export const HomeCustomerReviewsSection = () => (
  <section className="home-reviews" aria-labelledby="home-reviews-title">
    <div className="home-reviews__inner">
      <header className="home-reviews__heading">
        <p className="home-reviews__eyebrow">Customer Reviews</p>
        <h2 id="home-reviews-title">What Our Customers Say</h2>
        <p className="home-reviews__intro">A few words from customers about their experience with Karz South.</p>
      </header>
      <div className="home-reviews__grid">
        {reviews.map((review) => (
          <article className="home-review-card" key={review.author}>
            <div className="home-review-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote>{review.text}</blockquote>
            <p className="home-review-card__author">{review.author}</p>
          </article>
        ))}
      </div>
      <a className="home-reviews__button" href={business.reviewsUrl} target="_blank" rel="noreferrer">
        View More Reviews <FaChevronRight aria-hidden="true" />
      </a>
    </div>
  </section>
)
