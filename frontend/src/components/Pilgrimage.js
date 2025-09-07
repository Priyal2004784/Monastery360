import React from 'react';
import './Pilgrimage.css';

function Pilgrimage() {
  return (
    <div className="pilgrimage-page">
      <section 
        className="hero-section"
        style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/9/91/Ravangla_Buddha_Park%2C_Sikkim.jpg')` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1>The Sacred Pilgrimage Circuit of Sikkim</h1>
          <p>Embark on a spiritual journey through the breathtaking landscapes of Sikkim, visiting ancient monasteries that hold centuries of wisdom and peace.</p>
        </div>
      </section>

      <div className="container page-content">
        <div className="pilgrimage-intro">
          <h2>Follow the Path of Enlightenment</h2>
          <p>
            Sikkim is home to a rich tapestry of Buddhist culture, with a pilgrimage circuit that connects some of the most significant monasteries in the Himalayas. This journey is not just a tour but an opportunity for introspection and spiritual rejuvenation, following in the footsteps of masters and devotees through serene valleys and mountainside hermitages.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">1</div>
            <div className="timeline-content">
              <h3>Start at Rumtek Monastery</h3>
              <p>Begin your pilgrimage at the magnificent Rumtek Monastery, the seat of the Karmapa. Its grand prayer hall, intricate murals, and the golden stupa create an atmosphere of profound tranquility. It serves as the perfect starting point to immerse yourself in the spiritual energy of Sikkim.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">2</div>
            <div className="timeline-content right">
              <h3>Journey to Pemayangtse Monastery</h3>
              <p>Travel west to one of Sikkim’s oldest and most important monasteries, Pemayangtse. Known for its exquisite wooden sculptures and the majestic Zangdok Palri (a model of Guru Rinpoche's heavenly abode), this monastery offers stunning views of the Kanchenjunga range.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">3</div>
            <div className="timeline-content">
              <h3>Contemplate at Tashiding Monastery</h3>
              <p>Considered the spiritual heart of Sikkim, Tashiding is perched on a hilltop offering panoramic views. It is believed that a single glimpse of the Thongwa Rangdol chorten here can cleanse one of sins. It is a place of deep meditation and powerful spiritual vibrations.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-icon">4</div>
            <div className="timeline-content right">
              <h3>Find Peace at Dubdi Monastery</h3>
              <p>Trek to the serene Dubdi Monastery, also known as the "Hermit's Cell." As the oldest monastery in Sikkim, it holds a special place in the state's history. The peaceful trail and the tranquil environment make it a perfect spot for quiet reflection and meditation on your journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pilgrimage;