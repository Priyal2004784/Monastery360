// The final, complete MonasteryDetail.js with full directions logic
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PannellumViewer from './PannellumViewer';
import './MonasteryDetail.css'; // <-- This is the new line you are adding

function MonasteryDetail() {
  const [monastery, setMonastery] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/monasteries/${id}`)
      .then(response => { setMonastery(response.data); })
      .catch(error => { console.error('Error fetching monastery details!', error); });
  }, [id]);

  // --- THIS IS THE "BRAIN" WE ARE ADDING ---
  const handleGetDirections = () => {
    // 1. Check if Geolocation is available in the browser
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    // 2. Start the loading process
    setLoadingLocation(true);
    setLocationError('');

    // 3. Request the user's current position
    navigator.geolocation.getCurrentPosition(
      // SUCCESS CALLBACK
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const monasteryLat = monastery.coordinates.lat;
        const monasteryLng = monastery.coordinates.lng;

        // 4. Construct the Google Maps URL
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${monasteryLat},${monasteryLng}`;

        // 5. Open the URL in a new tab and stop loading
        window.open(googleMapsUrl, '_blank');
        setLoadingLocation(false);
      },
      // ERROR CALLBACK
      (error) => {
        // Handle different types of errors
        if (error.code === 1) { // User denied permission
          setLocationError("You've blocked location access. Please enable it in your browser settings to get directions.");
        } else { // Other errors (e.g., no signal, timeout)
          setLocationError("Could not get your location. Please try again.");
        }
        setLoadingLocation(false);
      }
    );
  };

  if (!monastery) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Back to List</Link>
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
    </div>
  );
}

export default MonasteryDetail;