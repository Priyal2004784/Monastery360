import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PannellumViewer from './PannellumViewer';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import GettingHere from './GettingHere';
import PhotoGallery from './PhotoGallery';
import './MonasteryDetail.css';
import './Reviews.css';
import './GettingHere.css';
import './PhotoGallery.css';

function MonasteryDetail() {
  const [monastery, setMonastery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // To manage tabs
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/monasteries/${id}`)
      .then(response => { setMonastery(response.data); })
      .catch(error => { console.error('Error fetching monastery details!', error); });

    axios.get(`http://localhost:5000/reviews/${id}`)
      .then(response => { setReviews(response.data); })
      .catch(error => { console.error('Error fetching reviews!', error); });
  }, [id]);

  const handleGetDirections = () => {
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
    return <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}><h2>Loading Monastery...</h2></div>;
  }

  // Helper to render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <h3 className="section-heading">History & Heritage</h3>
            <p className="history-text">{monastery.history}</p>
            <PhotoGallery imageUrl={monastery.panoImage_url} />
          </div>
        );
      case '360view':
        return (
          <div className="tab-content">
             <h3 className="section-heading">360° Virtual Tour</h3>
            {monastery.panoImage_url ? (
              <PannellumViewer image={monastery.panoImage_url} />
            ) : (
              <p>A 360° view is not available for this monastery yet.</p>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className="tab-content reviews-section">
            <ReviewList reviews={reviews} />
            <ReviewForm monasteryId={id} onReviewSubmit={handleReviewSubmit} />
          </div>
        );
      case 'location':
        return (
          <div className="tab-content">
            <GettingHere />
            <button
              className="directions-button"
              onClick={handleGetDirections}
              disabled={loadingLocation}
            >
              {loadingLocation ? 'Locating...' : 'Get Me There'}
            </button>
            {locationError && <p className="error-message">{locationError}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="detail-page-container">
       <div className="detail-hero" style={{backgroundImage: `url(${monastery.panoImage_url || 'https://as1.ftcdn.net/jpg/03/77/74/82/1000_F_377748272_90xLI43qaegbcyyqgvdoZehGS6Cyox2o.jpg'})`}}>
        <div className="detail-hero-overlay"></div>
        <div className="container detail-header">
            <h1>{monastery.name}</h1>
            <p className="district-info">{monastery.district}, Sikkim</p>
        </div>
      </div>

      <div className="container">
        <div className="detail-card">
          <div className="detail-tabs">
            <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>Overview</button>
            <button onClick={() => setActiveTab('360view')} className={activeTab === '360view' ? 'active' : ''}>360° View</button>
            <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>Reviews</button>
            <button onClick={() => setActiveTab('location')} className={activeTab === 'location' ? 'active' : ''}>Location & Directions</button>
          </div>

          <div className="info-grid">
            <div className="info-box">
                <span className="info-title">Founded</span>
                <span className="info-value">1730 CE (Example)</span>
            </div>
            <div className="info-box">
                <span className="info-title">Visiting Hours</span>
                <span className="info-value">9:00 AM - 6:00 PM</span>
            </div>
            <div className="info-box">
                <span className="info-title">Buddhist Sect</span>
                <span className="info-value">{monastery.tags.includes('Nyingma') ? 'Nyingma' : 'Kagyu'}</span>
            </div>
          </div>
          
          {renderTabContent()}

        </div>
        <Link to="/" className="back-link-bottom">← Back to All Monasteries</Link>
      </div>
    </div>
  );
}

export default MonasteryDetail;
