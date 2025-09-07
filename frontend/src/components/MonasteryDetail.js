import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PannellumViewer from './PannellumViewer';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

// Import the updated CSS files
import './MonasteryDetail.css';
import './Reviews.css';

function MonasteryDetail() {
  const [monastery, setMonastery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab
  const { id } = useParams();

  useEffect(() => {
    // Fetch monastery details
    axios.get(`http://localhost:5000/monasteries/${id}`)
      .then(response => { setMonastery(response.data); })
      .catch(error => { console.error('Error fetching monastery details!', error); });

    // Fetch reviews for this monastery
    axios.get(`http://localhost:5000/reviews/${id}`)
      .then(response => { setReviews(response.data); })
      .catch(error => { console.error('Error fetching reviews!', error); });
  }, [id]);

  const handleGetDirections = () => {
    // This function remains the same as your original
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLocation(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const monasteryLat = monastery.coordinates.lat;
        const monasteryLng = monastery.coordinates.lng;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${monasteryLat},${monasteryLng}`;
        window.open(googleMapsUrl, '_blank');
        setLoadingLocation(false);
      },
      (error) => {
        if (error.code === 1) {
          setLocationError("You've blocked location access. Please enable it in your browser settings to get directions.");
        } else {
          setLocationError("Could not get your location. Please try again.");
        }
        setLoadingLocation(false);
      }
    );
  };
  
  const handleReviewSubmit = (reviewData) => {
    // This function also remains the same
    axios.post('http://localhost:5000/reviews/add', reviewData)
      .then(response => {
        setReviews([response.data.review, ...reviews]);
        alert('Thank you for your review!');
      })
      .catch(error => {
        console.error('Error submitting review:', error);
        alert('There was an error submitting your review. Please try again.');
      });
  };

  if (!monastery) {
    return <div className="loading-container"><h2>Loading Monastery Details...</h2></div>;
  }

  // Helper to create the first letter drop cap
  const formatHistory = (text) => {
    if (!text) return { firstLetter: '', restOfText: '' };
    return {
      firstLetter: text.charAt(0),
      restOfText: text.substring(1),
    };
  };

  const { firstLetter, restOfText } = formatHistory(monastery.history);

  return (
    <div className="monastery-detail-page">
      {/* --- HERO SECTION --- */}
      <section 
        className="detail-hero-section" 
        style={{ backgroundImage: `url(${monastery.panoImage_url || 'https://as1.ftcdn.net/jpg/03/77/74/82/1000_F_377748272_90xLI43qaegbcyyqgvdoZehGS6Cyox2o.jpg'})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1>{monastery.name}</h1>
          <p>{monastery.district}, Sikkim</p>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="container">
        <div className="detail-content-wrapper">
          {/* --- TAB NAVIGATION --- */}
          <nav className="detail-nav">
            <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>Overview</button>
            <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>Reviews</button>
            <button onClick={() => setActiveTab('location')} className={activeTab === 'location' ? 'active' : ''}>Location & Directions</button>
            {monastery.panoImage_url && <button onClick={() => setActiveTab('tour')} className={activeTab === 'tour' ? 'active' : ''}>360° Tour</button>}
          </nav>

          {/* --- TAB CONTENT --- */}
          <div className="detail-content-area">
            {activeTab === 'overview' && (
              <div id="overview">
                <div className="info-grid">
                  <div className="info-card">
                    <h4>Founded</h4>
                    {/* NOTE: This data isn't in your model, so it's a placeholder */}
                    <p>1730 CE (Example)</p>
                  </div>
                  <div className="info-card">
                    <h4>Visiting Hours</h4>
                    {/* NOTE: This data isn't in your model, so it's a placeholder */}
                    <p>9:00 AM - 6:00 PM</p>
                  </div>
                  <div className="info-card">
                    <h4>Buddhist Sect</h4>
                     {/* NOTE: This data isn't in your model, so it's a placeholder */}
                    <p>{monastery.tags[0] || 'N/A'}</p>
                  </div>
                </div>

                <div className="history-section">
                  <h3>History & Heritage</h3>
                  <p className="history-text">
                    <span className="drop-cap">{firstLetter}</span>{restOfText}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div id="reviews" className="reviews-section">
                <ReviewList reviews={reviews} />
                <ReviewForm monasteryId={id} onReviewSubmit={handleReviewSubmit} />
              </div>
            )}

            {activeTab === 'location' && (
              <div id="location" className="getting-here-section">
                 <h3>Getting Here</h3>
                 <p>Plan your journey to {monastery.name}. Use the button below for live map directions from your current location.</p>
                 <button className="directions-button" onClick={handleGetDirections} disabled={loadingLocation}>
                  {loadingLocation ? 'Locating...' : 'Take Me There'}
                </button>
                {locationError && <p className="error-message">{locationError}</p>}
                
                <div className="transport-grid">
                    <div className="transport-card">
                        <h4>By Road</h4>
                        <p>Well-connected by road from Gangtok. Taxis and shared jeeps are readily available.</p>
                    </div>
                    <div className="transport-card">
                        <h4>By Air</h4>
                        <p>Nearest airport is Pakyong (PYG). From there, you can hire a cab to the monastery.</p>
                    </div>
                     <div className="transport-card">
                        <h4>By Train</h4>
                        <p>Nearest major railway station is New Jalpaiguri (NJP). It's a scenic drive from NJP to Sikkim.</p>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'tour' && monastery.panoImage_url && (
              <div id="tour" className="pannellum-container">
                <h3>360° Virtual Tour</h3>
                <p>Immerse yourself in the serene environment of the monastery. Click and drag to look around.</p>
                <PannellumViewer image={monastery.panoImage_url} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonasteryDetail;