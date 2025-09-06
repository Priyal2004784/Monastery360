// The final, complete, and correct HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Map from './Map';

function HomePage() {
  const [monasteries, setMonasteries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/monasteries')
      .then(response => {
        setMonasteries(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const filteredMonasteries = monasteries.filter(monastery =>
    monastery.tags.some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="homepage">
      {/* --- THIS IS THE HERO SECTION THAT WAS MISSING --- */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1>Discover the Serenity of Sikkim's Monasteries</h1>
          <p>Explore centuries of spiritual heritage and breathtaking landscapes.</p>
        </div>
      </div>

      {/* --- This is the full-width white stripe for the content --- */}
      <div className="content-section">
        {/* This is the inner container that centers everything */}
        <div className="container">
          <h2>Interactive Monastery Map</h2>
          <div className="map-container">
            <Map monasteries={monasteries} />
          </div>

          <div className="list-container">
            <h2>Find a Monastery</h2>
            <input
              type="text"
              placeholder="Search by tag to filter the list..."
              className="search-bar"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="monastery-list">
              {filteredMonasteries.map(monastery => (
                // This is the new, improved card structure
                <div key={monastery._id} className="monastery-card">
                  <div className="card-content">
                    <h2>
                      <Link to={`/monastery/${monastery._id}`} className="monastery-link">
                        {monastery.name}
                      </Link>
                    </h2>
                    <p><strong>District:</strong> {monastery.district}</p>
                    <p>{monastery.history}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;