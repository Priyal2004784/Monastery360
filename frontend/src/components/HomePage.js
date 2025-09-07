import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Map from './Map';
import './HomePage.css';

// Array of background images for the hero slider
const heroImages = [
  "https://www.adventurenation.com/blog/wp-content/uploads/2014/09/Sikkim-2-3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b3/Sunrise_over_Kangchenjunga.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Gurudongmar.Lake.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/91/Ravangla_Buddha_Park%2C_Sikkim.jpg"
];

// A reusable component to animate sections when they scroll into view
const AnimatedSection = ({ children, className, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger once
        threshold: 0.1,    // Trigger when 10% of the element is visible
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <motion.section
            id={id}
            className={className}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
            whileHover={{ boxShadow: "0px 10px 30px rgba(0,0,0,0.05)", y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.section>
    );
};


function HomePage() {
  const [monasteries, setMonasteries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMonasteries, setFilteredMonasteries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/monasteries')
      .then(response => {
        setMonasteries(response.data);
        setFilteredMonasteries(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  
  // This useEffect hook will run whenever the search term changes
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = monasteries.filter(monastery =>
      monastery.tags.some(tag =>
        tag.toLowerCase().includes(lowercasedTerm)
      )
    );
    setFilteredMonasteries(results);
  }, [searchTerm, monasteries]);
  
  // New effect for the auto-sliding hero background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  // Animation variants for the monastery cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="homepage">
      {/* HERO SECTION - Now with dynamic style for background image */}
      <section 
        className="hero-section"
        style={{ backgroundImage: `url('${heroImages[currentImageIndex]}')` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>Sacred Monasteries of Sikkim</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>Discover the ancient Buddhist monasteries nestled in the Himalayan mountains, where spirituality and natural beauty create a transcendent experience.</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="hero-buttons">
            <a href="#featured" className="cta-button">Explore Monasteries</a>
            <a href="#plan" className="cta-button secondary">Plan Your Visit</a>
          </motion.div>
        </div>
      </section>

      {/* FEATURED MONASTERIES SECTION */}
      <AnimatedSection id="featured" className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Monasteries</h2>
          <p className="section-subtitle">Explore these sacred centers of learning, meditation, and art, each with its own unique history and spiritual significance.</p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search by tag to filter the list..."
              className="search-bar"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>

          <motion.div
            className="monastery-grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2, // Increased stagger time
                },
              },
            }}
          >
            {filteredMonasteries.slice(0, visibleCount).map(monastery => (
              <motion.div
                key={monastery._id}
                className="monastery-card"
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -8, boxShadow: "0px 15px 30px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {/* Icon from the image */}
                <div className="card-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#C89B3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="#C89B3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="#C89B3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h3>{monastery.name}</h3>
                <p className="card-description">
                  {monastery.history.substring(0, 120)}...
                </p>
                <div className="card-footer">
                    <div className="card-tags">
                    {monastery.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                    </div>
                    <Link to={`/monastery/${monastery._id}`} className="card-explore-link">
                    Explore <span>&rarr;</span>
                    </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {visibleCount < filteredMonasteries.length && (
            <div className="load-more-container">
              <button onClick={loadMore} className="cta-button">Load More</button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* MAP SECTION */}
      <AnimatedSection id="map-section" className="map-section">
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
      </AnimatedSection>
    </div>
  );
}

export default HomePage;