import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PannellumViewer from './PannellumViewer';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import GettingHere from './GettingHere';
import PhotoGallery from './PhotoGallery'; // 1. IMPORT THE NEW COMPONENT
import './MonasteryDetail.css';
import './Reviews.css';
import './GettingHere.css';
import './PhotoGallery.css'; // 2. IMPORT THE NEW CSS

function MonasteryDetail() {
  const [monastery, setMonastery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
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

  return (
    <div className="detail-page-container">
      <div className="container">
        <Link to="/" className="back-link">← Back to Home</Link>
        <div className="detail-card">

          <div className="detail-header">
            <h1>{monastery.name}</h1>
            <p className="district-info">{monastery.district}</p>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <span className="info-title">Founded</span>
              <span className="info-value">1642 AD</span>
            </div>
            <div className="info-box">
              <span className="info-title">Visiting Hours</span>
              <span className="info-value">9:00 AM - 5:00 PM</span>
            </div>
            <div className="info-box">
              <span className="info-title">Location</span>
              <span className="info-value">{monastery.district}, Sikkim</span>
            </div>
          </div>

          {monastery.panoImage_url && (
            <div className="pannellum-container">
              <PannellumViewer image={monastery.panoImage_url} />
            </div>
          )}

          {/* 3. ADD THE GALLERY COMPONENT */}
          <PhotoGallery imageUrl={monastery.panoImage_url} />

          <h3 className="section-heading">History & Heritage</h3>
          <p className="history-text">{monastery.history}</p>

          <div className="tags-container">
            <strong>Tags:</strong> {monastery.tags.join(', ')}
          </div>

          <button
            className="directions-button"
            onClick={handleGetDirections}
            disabled={loadingLocation}
          >
            {loadingLocation ? 'Locating...' : 'Get Directions'}
          </button>
          {locationError && <p className="error-message">{locationError}</p>}

          <GettingHere />

          <div className="reviews-section">
            <ReviewList reviews={reviews} />
            <ReviewForm monasteryId={id} onReviewSubmit={handleReviewSubmit} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default MonasteryDetail;