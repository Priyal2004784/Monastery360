import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PannellumViewer from './PannellumViewer';
import ReviewList from './ReviewList';         // <-- 1. Import ReviewList
import ReviewForm from './ReviewForm';         // <-- 2. Import ReviewForm
import './MonasteryDetail.css';
import './Reviews.css';                        // <-- 3. Import the new CSS

function MonasteryDetail() {
  const [monastery, setMonastery] = useState(null);
  const [reviews, setReviews] = useState([]);  // <-- 4. Add state for reviews
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const { id } = useParams();

  // This useEffect now fetches BOTH monastery and review data
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
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=$${latitude},${longitude}&destination=${monastery.coordinates.lat},${monastery.coordinates.lng}`;
        window.open(googleMapsUrl, '_blank');
        setLoadingLocation(false);
      },
      (error) => {
        setLocationError("Could not get your location. Please enable location access.");
        setLoadingLocation(false);
      }
    );
  };
  
  // --- 5. Add a function to handle review submission ---
  const handleReviewSubmit = (reviewData) => {
    axios.post('http://localhost:5000/reviews/add', reviewData)
      .then(response => {
        // Add the new review to the top of the list for an instant update
        setReviews([response.data.review, ...reviews]);
        alert('Thank you for your review!');
      })
      .catch(error => {
        console.error('Error submitting review:', error);
        alert('There was an error submitting your review. Please try again.');
      });
  };

  if (!monastery) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h1>{monastery.name}</h1>
      <button
        className="directions-button"
        onClick={handleGetDirections}
        disabled={loadingLocation}
      >
        {loadingLocation ? 'Locating...' : 'Take Me There'}
      </button>
      {locationError && <p className="error-message">{locationError}</p>}

      {monastery.panoImage_url && (
        <div className="pannellum-container">
          <PannellumViewer image={monastery.panoImage_url} />
        </div>
      )}

      <p><strong>District:</strong> {monastery.district}</p>
      <p className="history-text">{monastery.history}</p>
      <p><strong>Tags:</strong> {monastery.tags.join(', ')}</p>

      {/* --- 6. Add the new components to the page --- */}
      <div className="reviews-section">
        <ReviewList reviews={reviews} />
        <ReviewForm monasteryId={id} onReviewSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
}

export default MonasteryDetail;