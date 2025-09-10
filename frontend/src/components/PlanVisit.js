import React from 'react';
import './PlanVisit.css';

const tourPackages = [
  {
    id: 1,
    title: 'Monastery Tour',
    duration: '4 Nights / 5 Days',
    description: 'A spiritual journey visiting the most sacred monasteries in Sikkim, including Rumtek, Pemayangtse, and Tashiding.',
    price: '₹15,000',
    image: 'https://www.sikkim-tourism.com/images/sikkim-monastery-tour.jpg'
  },
  {
    id: 2,
    title: 'North Sikkim Adventure',
    duration: '5 Nights / 6 Days',
    description: 'Explore the breathtaking landscapes of North Sikkim, including Gurudongmar Lake and Yumthang Valley.',
    price: '₹25,000',
    image: 'https://www.sikkim-tourism.com/images/north-sikkim-tour.jpg'
  },
  {
    id: 3,
    title: 'Sikkim Honeymoon Package',
    duration: '6 Nights / 7 Days',
    description: 'A romantic getaway to the most picturesque locations in Sikkim, including Pelling, Gangtok, and Ravangla.',
    price: '₹30,000',
    image: 'https://www.sikkim-tourism.com/images/sikkim-honeymoon-tour.jpg'
  }
];

function PlanVisit() {
  return (
    <div className="plan-visit-page">
      <div className="container">
        <h1 className="page-title">Plan Your Visit to Sikkim</h1>
        <p className="page-subtitle">Browse our curated tour packages to experience the best of the Himalayas.</p>
        <div className="packages-grid">
          {tourPackages.map(pkg => (
            <div key={pkg.id} className="package-card">
              <img src={pkg.image} alt={pkg.title} className="package-image" />
              <div className="package-info">
                <h3>{pkg.title}</h3>
                <p className="package-duration">{pkg.duration}</p>
                <p>{pkg.description}</p>
                <div className="package-footer">
                  <span className="package-price">{pkg.price}</span>
                  <button className="cta-button">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanVisit;