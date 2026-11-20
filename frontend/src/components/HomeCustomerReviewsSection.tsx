import { FaChevronRight } from 'react-icons/fa'
import { business } from '../data/business'

const reviews = [
  {
    author: 'Todd Hahn',
    text: "I recently bought a Dodge Ram fro Karz and I am very happy with my purchase. Even when there was an issue with one of the windows they worked with me to get it resolved quickly and I can't be happier with their service. My salesman Chuck was awesome to work with - very knowledgable and no pressure. It was the most enjoyable car buying experience I have ever had. I will definitely visit them in the future when I'm in the market for another vehicle.",
  },
  {
    author: 'Christina Dana',
    text: "This was my first time purchasing a car on my own without a co signer. My mother got a car from here and recommended. Chuck was an amazing help. I bought a 2009 Acura. It is very clean, well taken care of, and everything was up to par. I had an amazing time buying a car with him and I would recommend anyone to come here if you want friendly service. I was treated with the upmost respect. I am glad I had came here instead of some other places I had seen. :)",
  },
  {
    author: 'Antoinette Griffin',
    text: "I found this business after countless frustrations in dealing with several others. I went in already feeling defeated, but I pulled on the lot and was treated in such an awesome and refreshing manner. His name is Chuck!! He didn’t push a sale or try to throw me into any vehicle. He listened attentively to my wants and needs and really helped ease my anxiety of purchasing a new vehicle. In the end, I was able to purchase a car to fit my needs, to my liking and completely satisfied. Even after the purchase, I had a question about a feature and I went back to the dealer and was helped by both Chuck and Scott! I’d recommend any and everyone to Carz Inc. I also had the pleasure of meeting the owner Kay, and I expressed my gratitude. My experience with this establishment has been a breath of fresh air.",
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
