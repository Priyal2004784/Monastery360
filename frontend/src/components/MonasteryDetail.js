import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PannellumViewer from './PannellumViewer';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import './MonasteryDetail.css';
import './Reviews.css';

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

        // --- THIS IS THE CORRECTED LINE ---
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

      <div className="reviews-section">
        <ReviewList reviews={reviews} />
        <ReviewForm monasteryId={id} onReviewSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
}

export default MonasteryDetail;