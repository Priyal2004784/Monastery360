import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MonasteryList({ allMonasteries }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMonasteries, setFilteredMonasteries] = useState(allMonasteries);

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = allMonasteries.filter(monastery =>
      monastery.tags.some(tag =>
        tag.toLowerCase().includes(lowercasedTerm)
      )
    );
    setFilteredMonasteries(results);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredMonasteries(allMonasteries);
    }
  };

  return (
    <div className="list-container">
      <h2>Find a Monastery</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by tag to filter the list..."
          className="search-bar"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
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