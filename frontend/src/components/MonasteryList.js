// Simplified frontend/src/components/MonasteryList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MonasteryList({ allMonasteries }) { // It now receives data as a "prop"
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMonasteries = allMonasteries.filter(monastery =>
    monastery.tags.some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
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
          <div key={monastery._id} className="monastery-card">
            <h2><Link to={`/monastery/${monastery._id}`} className="monastery-link">{monastery.name}</Link></h2>
            <p><strong>District:</strong> {monastery.district}</p>
            <p>{monastery.history}</p>
            <p><strong>Tags:</strong> {monastery.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonasteryList;