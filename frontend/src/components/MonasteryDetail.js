// Final version of MonasteryDetail.js using our own custom viewer
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PannellumViewer from './PannellumViewer'; // <-- 1. IMPORT OUR NEW COMPONENT

function MonasteryDetail() {
  const [monastery, setMonastery] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/monasteries/${id}`)
      .then(response => { setMonastery(response.data); })
      .catch(error => { console.error('Error fetching monastery details!', error); });
  }, [id]);

  if (!monastery) {
    return <div>Loading monastery details...</div>;
  }

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Back to List</Link>
      <h1>{monastery.name}</h1>

      {monastery.panoImage_url && (
        <div className="pannellum-container">
          {/* --- 2. USE OUR NEW COMPONENT --- */}
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