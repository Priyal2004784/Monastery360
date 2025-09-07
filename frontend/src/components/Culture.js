import React from 'react';
import './Culture.css';

// Array of images for the gallery
const cultureImages = [
  "https://media.istockphoto.com/id/530744284/photo/buddhist-prayer-flags-in-himalayas.webp?b=1&s=612x612&w=0&k=20&c=10US7NDIfLQnBpskSfA1tWOuoLcGcdrdNh6uMlBYBgc=",
  "https://cdn.pixabay.com/photo/2018/11/27/03/23/read-panda-3840674_1280.jpg"
];

function Culture() {
  return (
    <div className="culture-page">
      <section 
        className="hero-section"
        style={{ backgroundImage: `url('https://media.gettyimages.com/id/157316222/photo/monk-in-punakha-temple.jpg?s=612x612&w=0&k=20&c=7w3jq175o5bSXwhyniocVf0QbdpyybOZru5EbbInByk=')` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1>The Vibrant Culture of Sikkim</h1>
          <p>Discover the rich traditions, festivals, and spiritual heritage that define the unique cultural landscape of the Himalayas.</p>
        </div>
      </section>

      <div className="container page-content">
        <div className="culture-intro">
          <h2>A Fusion of Traditions</h2>
          <p>
            The culture of Sikkim is a rich mosaic of indigenous traditions and Tibetan Buddhism. From the colorful masked dances of the monastery festivals to the serene, everyday rituals, every aspect of life is steeped in deep-rooted spirituality and a reverence for nature. This unique blend creates a vibrant cultural atmosphere that is both ancient and ever-evolving.
          </p>
        </div>

        <div className="photo-gallery-section">
            <h3 className="section-heading">Glimpses of Sikkimese Culture</h3>
            <div className="photo-grid">
                {cultureImages.map((img, index) => (
                    <div key={index} className="photo-item">
                        <img src={img} alt={`Culture view ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Culture;