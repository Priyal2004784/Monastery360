import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Map from './Map';

function HomePage() {
  const [monasteries, setMonasteries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially

  useEffect(() => {
    axios.get('http://localhost:5000/monasteries')
      .then(response => {
        setMonasteries(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1>Sacred Monasteries of Sikkim</h1>
          <p>Discover the ancient Buddhist monasteries nestled in the Himalayan mountains, where spirituality and natural beauty create a transcendent experience.</p>
          <div className="hero-buttons">
            <a href="#featured" className="cta-button">Explore Monasteries</a>
            <a href="#plan" className="cta-button secondary">Plan Your Visit</a>
          </div>
        </div>
      </section>

      <section id="featured" className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Monasteries</h2>
          <p className="section-subtitle">Explore these sacred centers of learning, meditation, and art, each with its own unique history and spiritual significance.</p>
          <div className="monastery-grid">
            {monasteries.slice(0, visibleCount).map(monastery => (
              <div key={monastery._id} className="monastery-card">
                <div className="card-icon">
                  <span role="img" aria-label="monastery icon"></span>
                </div>
                <h3>{monastery.name}</h3>
                <p className="card-description">
                  {monastery.history.substring(0, 120)}...
                </p>
                <div className="card-tags">
                  {monastery.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/monastery/${monastery._id}`} className="card-explore-link">
                  Explore <span>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
          {visibleCount < monasteries.length && (
            <div className="load-more-container">
              <button onClick={loadMore} className="cta-button">Load More</button>
            </div>
          )}
        </div>
      </section>

      <section id="map-section" className="map-section">
        <div className="container">
          <h2 className="section-title">Monastery Map</h2>
          <p className="section-subtitle">Discover the sacred geography of Sikkim's monasteries and plan your spiritual journey through the Himalayan landscape.</p>
          <div className="map-layout">
            <div className="map-container-wrapper">
              <Map monasteries={monasteries} />
            </div>
            <div className="map-legend">
              <h3>Sacred Geography</h3>
              <p>Discover monasteries located across the state, often on hilltops or in valleys with spiritual significance. Click on a monastery to see its location and details.</p>
              <ul>
                {monasteries.slice(0, 5).map(m => (
                  <li key={m._id}>
                    <span className="legend-icon"></span>
                    <div>
                      <strong>{m.name}</strong>
                      <small>{m.district}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;